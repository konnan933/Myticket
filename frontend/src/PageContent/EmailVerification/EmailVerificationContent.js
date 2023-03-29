import { Button, Typography } from '@mui/material';
import Loader from 'PageContent/utils/Loader';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { emailVerifiedViaEmail } from 'redux/thunks/User';

function EmailVerificationContent() {
  const { t } = useTranslation('email');
  const { rndCodeEmail } = useParams();
  const dispatch = useDispatch();
  const { emailVerifyLoading } = useSelector((state) => state.user);
  const { loggedIn } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (loggedIn) {
      dispatch(emailVerifiedViaEmail(rndCodeEmail));
    }
  }, []);

  if (emailVerifyLoading) {
    return <Loader />;
  }

  return (
    <div>
      <Typography variant="h5" align="center">
        {t('SUCCES_VERIFY')}
      </Typography>
      <div className="flex justify-center">
        <Button onClick={() => navigate('/')}>{t('SEARCH_EVENTS')}</Button>
      </div>
    </div>
  );
}

export default EmailVerificationContent;
