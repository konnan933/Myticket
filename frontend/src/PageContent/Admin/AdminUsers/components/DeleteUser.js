import { Box, IconButton, Modal } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { getUserEvents } from 'redux/thunks/Admin';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Loader from 'PageContent/utils/Loader';
import bigModalStyle from 'PageContent/utils/BigModalStyle';
import ConfirmUserDelete from './ConfirmUserDelete';
import UserEventsTable from '../UserEventsTable';

function DeleteUser({ id }) {
  const { t } = useTranslation('adminEvent');
  const dispatch = useDispatch();
  const { userEvents, userEventsLoading } = useSelector((state) => state.admin);
  const [open, setOpen] = useState(false);
  const hasEvent = userEvents[0] != undefined;
  const hasAcceptedEvent = hasEvent && userEvents[0].statusz === 1;

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
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={bigModalStyle}>
          {userEventsLoading ? (
            <Loader />
          ) : (
            <div>
              {hasEvent ? (
                <div>
                  {hasAcceptedEvent ? (
                    <UserEventsTable
                      userEvents={userEvents}
                      setOpen={setOpen}
                      hasAcceptedEvent={hasAcceptedEvent}
                    />
                  ) : (
                    <div>
                      <UserEventsTable
                        userEvents={userEvents}
                        setOpen={setOpen}
                        hasAcceptedEvent={hasAcceptedEvent}
                      />
                      <ConfirmUserDelete setOpen={setOpen} id={id} />
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <div className="flex justify-center p-2">
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
