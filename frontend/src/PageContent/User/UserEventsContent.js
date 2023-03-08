import { useTranslation } from 'react-i18next';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { getUserEventsWithDetails } from 'redux/thunks/User';
import { useEffect, useState } from 'react';
import Loader from 'PageContent/utils/Loader';
import event from '../../API/Event';
import { Box } from '@mui/system';
import { Button, CardActionArea, useMediaQuery } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

function UserEventsContent() {
  const navigate = useNavigate();
  const width = useMediaQuery('(max-width:1000px)');
  const { userEventsWithDetails, userEventsWithDetailsLoading } = useSelector(
    (state) => state.user
  );
  const hasntEvent = userEventsWithDetails[0] === undefined;
  const { loggedUser } = useSelector((state) => state.auth);
  const [scrollPosition, setScrollPosition] = useState(0);
  const dispatch = useDispatch();
  const { t } = useTranslation('userEvent');
  useEffect(() => {
    dispatch(getUserEventsWithDetails(loggedUser.id));
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleClick = (event) => {
    navigate(`/userEventsEdit/${event}`);
  };
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  if (userEventsWithDetailsLoading || loggedUser.id === undefined) {
    return <Loader />;
  }

  if (hasntEvent) {
    return (
      <div className="flex justify-center">
        <Typography gutterBottom variant="h5" component="div">
          {t('YOU_DONT_HAVE_EVENT')}
        </Typography>
        <Link to="/userAddEvent">
          <Button>{t('ADD_EVENT')}</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <div className="flex-col w-2/4">
        {userEventsWithDetails.map((userEvent) => (
          <div className="p-7" key={userEvent.eventId}>
            <CardActionArea>
              <Card
                sx={{ display: 'flex', flexDirection: width ? 'column' : 'row' }}
                onClick={() => handleClick(userEvent.eventId)}>
                <LazyLoadImage
                  alt="Esemeny kep"
                  src={`${event.eventPicture}${userEvent.eventId}`}
                  effect="blur"
                  scrollPosition={scrollPosition}
                  width={width ? '100%' : '65%'}
                />
                <Box className="pt-9">
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
    </div>
  );
}

export default UserEventsContent;
