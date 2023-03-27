import { Box, IconButton, Modal, Button, Typography } from '@mui/material';
import { useState } from 'react';
import modalStyle from 'PageContent/utils/ModalStyle';
import { useTranslation } from 'react-i18next';
import CloseIcon from '@mui/icons-material/Close';
import {} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { pay } from 'redux/thunks/Basket';
import { deleteUserBasket } from 'redux/thunks/Basket';

function PaymentModal() {
  const { loggedUser } = useSelector((state) => state.auth);
  const { t } = useTranslation('basket');
  const [open, setOpen] = useState(false);
  const [payed, setPayed] = useState(false);
  const dispatch = useDispatch();
  const handleOpen = () => {
    setOpen(true);
  };

  const handlePay = () => {
    setPayed(true);
    dispatch(pay(loggedUser.id));
  };

  const handleClose = () => {
    setOpen(false);
    if (payed) {
      dispatch(deleteUserBasket(loggedUser.id));
    }
  };

  return (
    <div>
      <Button onClick={handleOpen}>{t('PAY')}</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={modalStyle}>
          <div className="flex justify-end">
            <IconButton color="error" onClick={handleClose}>
              <CloseIcon fontSize="medium" />
            </IconButton>
          </div>
          <div className="flex justify-center flex-col">
            {payed ? (
              <div className="flex justify-center">
                <Typography color="text.primary" variant="h5">
                  {t('PAYMENT_SUCCESS')}
                  <br></br>
                  {t('CHECK_EMAIL')}
                </Typography>
              </div>
            ) : (
              <div className="flex justify-center">
                <Typography color="text.primary" variant="h5">
                  {t('CONFIRM_PAY')}
                </Typography>
              </div>
            )}
            {!payed && (
              <div className="flex justify-center">
                <div className="flex justify-between w-2/3">
                  <Button onClick={handlePay}>{t('YES')}</Button>
                  <Button onClick={handleOpen}>{t('NO')}</Button>
                </div>
              </div>
            )}
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default PaymentModal;
