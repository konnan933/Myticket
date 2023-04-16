import { Box, IconButton, Modal } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Loader from 'PageContent/utils/Loader';
import ConfirmUserDelete from './ConfirmUserDelete';
import UserEventsTable from '../UserEventsTable';
import CloseIcon from '@mui/icons-material/Close';
import { getUserEvents } from 'redux/thunks/User';
import useMediaQuery from '@mui/material/useMediaQuery';
/* import { getSoldEventTickets } from 'redux/thunks/Event';
import { useEffect } from 'react'; */

function DeleteUser({ id }) {
  const { t } = useTranslation('adminUser');
  const dispatch = useDispatch();
  const { userEvents, userEventsLoading } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const hasEvent = userEvents[0] != undefined;
  const matches = useMediaQuery('(min-width:765px)');
  const hasAcceptedEvent = hasEvent && userEvents[0].status === 1;


  const handleClickOpen = () => {
    dispatch(getUserEvents(id));
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton onClick={handleClickOpen} color="error" component="label">
        <DeleteIcon />
      </IconButton>
      <Modal
        open={open}
        sx={{ overflowY: 'hidden' }}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            display: 'block',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            overflowY: 'auto',
            maxHeight: hasEvent && !matches ? '80%' : '100%',
            height: hasEvent && !matches ? '20%' : '80%',
            bgcolor: 'white',
            boxShadow: 24,
            borderRadius: 7
          }}>
          {userEventsLoading ? (
            <Loader />
          ) : (
            <div>
              {hasEvent ? (
                <div>
                  {hasAcceptedEvent ? (
                    <div>
                      <div className="flex justify-end">
                        <IconButton color="error" onClick={handleClose}>
                          <CloseIcon fontSize="medium" />
                        </IconButton>
                      </div>
                      <UserEventsTable
                        userEvents={userEvents}
                        setOpen={setOpen}
                        hasAcceptedEvent={hasAcceptedEvent}
                      />
                    </div>
                  ) : (
                    <div>
                      {matches ? (
                        <div>
                          <UserEventsTable
                            userEvents={userEvents}
                            setOpen={setOpen}
                            hasAcceptedEvent={hasAcceptedEvent}
                          />
                          <ConfirmUserDelete setOpen={setOpen} id={id} />
                        </div>
                      ) : (
                        <div>
                          <div className="flex justify-center items-center h-full p-2 pt-10">
                            <p>{t('CONFIRM_DELETE_USER')}</p>
                          </div>
                          <ConfirmUserDelete setOpen={setOpen} id={id} />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <div className="flex justify-center items-center h-full p-2 pt-10">
                    <p>{t('CONFIRM_DELETE_USER')}</p>
                  </div>
                  <ConfirmUserDelete setOpen={setOpen} id={id} />
                </div>
              )}
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
}

export default DeleteUser;
