import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button, IconButton, TextField, Typography } from '@mui/material';
import { updateUser } from 'redux/thunks/Admin';

function EditUserName({ loggedUser }) {
  const [isEdit, setIsEdit] = useState(false);
  const [name, setName] = useState(loggedUser.name);
  const dispatch = useDispatch();
  const { t } = useTranslation('profile');
  const { register } = useForm();
  const handleOnSubmit = () => {
    const localUser = { ...loggedUser };
    localUser[name] = name;

    dispatch(updateUser(localUser)).then(() => {
      window.location.reload(true);
    });
  };

  const handleUserNameChange = () => {
    setIsEdit(true);
  };

  const onNameChangeHandler = (event) => {
    setName(event.target.value);
  };

  return (
    <div className="flex flex-row">
      <div className="p-4">
        {isEdit ? (
          <form className="flex flex-row w-full p-4" onSubmit={handleOnSubmit}>
            <TextField
              {...register('userName')}
              type="text"
              label={t('USER_NAME')}
              value={name}
              onChange={onNameChangeHandler}
              className="w-3/4"
            />
            <div className="flex justify-between w-11">
              <IconButton color="error" onClick={() => setIsEdit(false)}>
                <CloseIcon />
              </IconButton>
              <Button onClick={handleOnSubmit}>{t('SAVE')}</Button>
            </div>
          </form>
        ) : (
          <div className="flex flex-row">
            <Typography color="text.primary" variant="h5" gutterBottom>
              {`${'USER_NAME'} ${loggedUser.name}`}
            </Typography>
            <IconButton onClick={handleUserNameChange}>
              <EditIcon />
            </IconButton>
          </div>
        )}
      </div>
    </div>
  );
}
export default EditUserName;
