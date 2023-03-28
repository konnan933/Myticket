import { Typography } from '@mui/material';
import Loader from 'PageContent/utils/Loader';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { emailVerifiedViaEmail } from 'redux/thunks/User';

function EmailVerificationContent() {
  const { t } = useTranslation('profile');
  const { rndCodeEmail } = useParams();
  const dispatch = useDispatch();
  const { emailVerify, emailVerifyLoading } = useSelector((state) => state.user);
  const { loggedIn } = useSelector((state) => state.auth);
  console.log(emailVerify);

  useEffect(() => {
    if (loggedIn) {
      dispatch(emailVerifiedViaEmail(rndCodeEmail));
    }
  }, [loggedIn]);

  if (emailVerifyLoading) {
    return <Loader />;
  }

  return (
    <div>
      <Typography variant="h5" align="center">
        {t('SUCCES_VERIFY')}
      </Typography>
    </div>
  );
}

export default EmailVerificationContent;
