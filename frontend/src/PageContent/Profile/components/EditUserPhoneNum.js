import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button, IconButton, TextField, Typography } from '@mui/material';
import { updateUserProfile } from 'redux/thunks/User';

function EditUserPhoneNum() {
  const { loggedUser } = useSelector((state) => state.auth);
  const [isEdit, setIsEdit] = useState(false);
  const [userPhoneNum, setUserPhoneNum] = useState(loggedUser.phoneNumber);
  const dispatch = useDispatch();
  const { t } = useTranslation('profile');
  const { register } = useForm();
  const handleOnSubmit = () => {
    const localUser = { ...loggedUser };
    localUser.phoneNumber = userPhoneNum;
    dispatch(updateUserProfile({ id: loggedUser.id, formData: localUser })).then(() =>
      setIsEdit(false)
    );
  };

  const handleUserNameChange = () => {
    setIsEdit(true);
  };

  const onNameChangeHandler = (event) => {
    setUserPhoneNum(event.target.value);
  };

  return (
    <div className="flex flex-row">
      <div className="p-2">
        {isEdit ? (
          <form className="flex flex-row w-full p-4" onSubmit={handleOnSubmit}>
            <TextField
              {...register('phoneNumber')}
              type="text"
              label={t('USER_NAME')}
              value={userPhoneNum}
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
              {`${t('USER_PHONE_NUM')}: ${userPhoneNum}`}
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
export default EditUserPhoneNum;
