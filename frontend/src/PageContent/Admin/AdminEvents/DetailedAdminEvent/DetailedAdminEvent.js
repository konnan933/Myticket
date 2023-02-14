import Loader from 'PageContent/utils/Loader';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSingleEvent } from 'redux/thunks/Admin';
import BackToButton from './components/BackToButton';

function DetailedAdminEvent() {
  const { t } = useTranslation('adminEvent');

  const { id } = useParams();

  const dispatch = useDispatch();

  const { singleEvent, singleEventLoading } = useSelector((state) => state.admin);
  useEffect(() => {
    dispatch(getSingleEvent(id));
  }, []);

  if (singleEventLoading) {
    return <Loader />;
  }

  return (
    <>
      <BackToButton />
      <h1>{singleEvent.cim}</h1>
    </>
  );
}
export default DetailedAdminEvent;
