import { useTranslation } from 'react-i18next';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { getUserEventsWithDetails } from 'redux/thunks/User';
import { useEffect } from 'react';
import Loader from 'PageContent/utils/Loader';
import event from '../../API/Event';
import { Box } from '@mui/system';
import { CardActionArea } from '@mui/material';

function UserEventsContent() {
  const { userEventsWithDetails, userEventsWithDetailsLoading } = useSelector(
    (state) => state.user
  );
  const hasntEvent = userEventsWithDetails[0] === undefined;
  const { loggedUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { t } = useTranslation('userEvent');
  useEffect(() => {
    dispatch(getUserEventsWithDetails(loggedUser.id));
  }, []);

  const handleClick = () => {};

  if (userEventsWithDetailsLoading || loggedUser.id === undefined) {
    return <Loader />;
  }

  if (hasntEvent) {
    return (
      <div className="flex justify-center">
        <Typography gutterBottom variant="h5" component="div">
          {t('YOU_DONT_HAVE_EVENT')}
        </Typography>
      </div>
    );
  }

  return (
    <div className="flex justify-center gap-5 grid-cols-3 ">
      {userEventsWithDetails.map((userEvent) => (
        <div key={userEvent.eventId}>
          <CardActionArea>
            <Card sx={{ display: 'flex' }} onClick={handleClick}>
              <img src={`${event.eventPicture}${userEvent.eventId}`} />
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                  <Typography gutterBottom variant="h5" component="div">
                    {`${t('EVENT_TITLE')}: ${userEvent.title}`}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {`${t('EVENT_LOCATIONNAME')}: ${userEvent.locationName}`}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {`${t('EVENT_CATEGORY')}: ${userEvent.ekName}`}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {`${t('EVENT_BUISNESS_PHONENUMBER')}: ${userEvent.phoneNumber}`}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {`${t('EVENT_BUISNESS_EMAIL')}: ${userEvent.email}`}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {`${t('EVENT_START_DATE')}: ${userEvent.startDate}`}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {`${t('EVENT_END_DATE')}: ${userEvent.endDate}`}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {`${t('EVENT_STATUS')}: ${t(`STATUS_${userEvent.status}`)}`}
                  </Typography>
                </CardContent>
              </Box>
            </Card>
          </CardActionArea>
        </div>
      ))}
    </div>
  );
}

export default UserEventsContent;
