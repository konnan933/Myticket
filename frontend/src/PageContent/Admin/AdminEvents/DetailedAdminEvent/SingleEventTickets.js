import Loader from 'PageContent/utils/Loader';

import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function SingleEventTickets() {
  const { t } = useTranslation('adminEvent');

  const { id } = useParams();

  const dispatch = useDispatch();

  const { eventTickets, eventTicketsLoading } = useSelector((state) => state.admin);

  if (eventTicketsLoading) {
    return <Loader />;
  }
  console.log(eventTickets);

  return <div className="flex justify-center">asd</div>;
}
export default SingleEventTickets;
