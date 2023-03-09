import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import event from 'API/Event';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

function EventCards() {
  const { t } = useTranslation('home');
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { filteredEvent } = useSelector((state) => state.event);

  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  return (
    <div className="w-full grid grid-cols-2 max-md:grid-cols-1 gap-10s place-items-center">
      {filteredEvent.map((oneEvent) => {
        return (
          <Card
            className="w-4/5 my-7"
            key={oneEvent.eventId}
            onClick={() => navigate(`event/${oneEvent.eventId}`)}>
            <CardActionArea>
              <LazyLoadImage
                alt="Esemeny kep"
                src={`${event.eventPicture}${oneEvent.eventId}`}
                effect="blur"
                scrollPosition={scrollPosition}
              />
              <CardContent>
                <div className="w-full flex justify-between">
                  <Typography gutterBottom variant="h5" component="div">
                    {oneEvent.title}
                  </Typography>
                  <Typography gutterBottom variant="h5" component="div">
                    {oneEvent.ekName}
                  </Typography>
                </div>
                <Typography color="text.primary">{`${t('LOCATION')}: ${
                  oneEvent.locationName
                }`}</Typography>
                <Typography color="text.primary">{`${t('STARTS')}: ${
                  oneEvent.startDate
                }`}</Typography>
                <Typography color="text.primary">{`${t('STARTS')}: ${
                  oneEvent.endDate
                }`}</Typography>
              </CardContent>
              <div className="absolute top-0 right-0 bottom-0 left-0 h-full  w-full overflow-hidden opacity-0 bg-fixed transition duration-300 ease-in-out bg-slate-300 hover:bg-opacity-40 hover:opacity-100 flex justify-center items-center">
                <Typography variant="h5" className="text-white">
                  {t('SHOW_EVENT')}
                </Typography>
              </div>
            </CardActionArea>
          </Card>
        );
      })}
    </div>
  );
}

export default EventCards;
