import { Box, Button, Modal, TextField } from '@mui/material';
import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import modalStyle from 'PageContent/utils/ModalStyle';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';

function AddEvent() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { t } = useTranslation('adminUser');
  const { register, handleSubmit } = useForm();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const userNameChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div className="flex justify-start pl-72">
      <div className="pt-8">
        <Button onClick={handleOpen} variant="outlined" endIcon={<AddIcon />}>
          {t('ADD_EVENT')}
        </Button>
      </div>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
          <Box sx={modalStyle}>
            <div className="flex justify-center">
              <h2>{t('ADD_USER')}</h2>
            </div>
            <form onSubmit={handleSubmit((data) => {})}>
              <fieldset>
                <div className="grid gap-8 p-4">
                  <TextField
                    {...register('fel_nev')}
                    required
                    type="text"
                    value={email}
                    onChange={userNameChangeHandler}
                    label={t('NAME')}
                    className="border-2"
                  />

                  <Button
                    variant="contained"
                    color="info"
                    className=" w-full mt-16"
                    aria-label="Sign in"
                    type="submit"
                    size="large">
                    {t('LOGIN_SEND')}
                  </Button>
                </div>
              </fieldset>
            </form>
          </Box>
        </Modal>
      </div>
    </div>
  );
}

export default AddEvent;
