import {
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField
} from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import CreateIcon from '@mui/icons-material/Create';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import { putEventTicket } from 'redux/thunks/Ticket';
import CloseIcon from '@mui/icons-material/Close';
import Loader from 'PageContent/utils/Loader';
import { getCurrency } from 'redux/thunks/Currencies';
import { getTicketTypes } from 'redux/thunks/TicketTypes';

function UserEditTicket({ ticket }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { t } = useTranslation('userEvent');
  const { singleEvent } = useSelector((state) => state.event);
  const { register, handleSubmit } = useForm();
  const { id } = useParams();
  const [ticketType, setTicketType] = useState(ticket.type);
  const [startDateErrorMsg, setStartDateErrorMsg] = useState('');
  const [allAmountErrorMsg, setAllAmountErrorMsg] = useState('');
  const [startDateError, setStartDateError] = useState(false);
  const [allAmountError, setAllamountError] = useState(false);
  const startDate = moment(singleEvent.startDate).format('yyyy-MM-DDTHH:mm');
  const date = moment(new Date()).format('yyyy-MM-DDTHH:mm');
  const [allAmount, setAllAmount] = useState(ticket.freeTicket);
  const { ticketTypes, TicketTypesLoading } = useSelector((state) => state.ticketTypes);
  const dispatch = useDispatch();
  const loading = TicketTypesLoading;
  const errors = allAmountError || startDateError;

  useEffect(() => {
    dispatch(getTicketTypes());
    dispatch(getCurrency());
  }, []);

  const allAmountChangeHandler = (event) => {
    setAllAmount(event.target.value);
    if (event.target.value <= ticket.bookedTicket) {
      setAllamountError(true);
      setAllAmountErrorMsg(t('TICKET_AMOUNT_LOWER') + ` (${ticket.bookedTicket})`);
    } else {
      setAllamountError(false);
      setAllAmountErrorMsg('');
    }
  };
  const ticketTypeChangeHandler = (event) => {
    setTicketType(event.target.value);
  };

  const startDateChangeHandler = (event) => {
    if (event.target.value > startDate) {
      setStartDateError(true);
      setStartDateErrorMsg(t('SALE_DATE_LOWER'));
    } else if (event.target.value <= date) {
      setStartDateError(true);
      setStartDateErrorMsg(t('SALE_DATE_LOWER_TODAY'));
    } else {
      setStartDateError(false);
      setStartDateErrorMsg('');
    }
  };
  return (
    <div>
      <div>
        <IconButton onClick={handleOpen} color="primary">
          <CreateIcon />
        </IconButton>
      </div>
      <div>
        <Modal open={open} onClose={handleClose} aria-labelledby="modal" aria-describedby="modal">
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'white',
              boxShadow: 24,
              p: 4,
              borderRadius: 7
            }}>
            {loading ? (
              <Loader />
            ) : (
              <div className="flex justify-center flex-col">
                <div className="flex justify-end">
                  <IconButton color="error" onClick={handleClose}>
                    <CloseIcon fontSize="medium" />
                  </IconButton>
                </div>
                <div className="flex justify-center">
                  <h2>{t('EDIT_TICKET')}</h2>
                </div>
                <div className="flex justify-center">
                  <form
                    onSubmit={handleSubmit((data) => {
                      data.eventId = id;
                      data.conceptTicketId = ticket.conceptTicketId;
                      data.currencies = ticket.currencies;
                      data.price = ticket.price;
                      dispatch(
                        putEventTicket({ data, ticketId: ticket.conceptTicketId, eventId: id })
                      );
                    })}>
                    <fieldset>
                      <div className="grid gap-8 p-5">
                        <FormControl>
                          <InputLabel shrink={true} id="demo-simple-select-label">
                            {t('EDIT_TICKET_TYPE')}
                          </InputLabel>
                          <Select
                            {...register('type')}
                            value={ticketType}
                            notched={true}
                            required
                            label={t('TICKET_TYPE')}
                            onChange={ticketTypeChangeHandler}
                            inputProps={{ 'aria-label': 'Without label' }}>
                            {ticketTypes.map((ticketTypes) => (
                              <MenuItem key={ticketTypes.id} value={ticketTypes.id}>
                                {ticketTypes.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>

                        <TextField
                          {...register('allTicket')}
                          required
                          type="number"
                          error={allAmountError}
                          helperText={allAmountErrorMsg}
                          value={allAmount}
                          onChange={allAmountChangeHandler}
                          label={t('ALL_TICKET_AMOUNT')}
                          className="border-2"
                        />

                        <TextField
                          {...register('startDate')}
                          error={startDateError}
                          defaultValue={startDate}
                          onSelect={startDateChangeHandler}
                          InputLabelProps={{ shrink: true }}
                          helperText={startDateErrorMsg}
                          label={t('SALE_START')}
                          type="datetime-local"
                          className="border-2 px-2 pt-2"
                        />

                        <Button
                          variant="contained"
                          disabled={errors}
                          color="info"
                          className=" w-full mt-16"
                          aria-label="Edit ticket"
                          type="submit"
                          size="large">
                          {t('SEND')}
                        </Button>
                      </div>
                    </fieldset>
                  </form>
                </div>
              </div>
            )}
          </Box>
        </Modal>
      </div>
    </div>
  );
}

export default UserEditTicket;
