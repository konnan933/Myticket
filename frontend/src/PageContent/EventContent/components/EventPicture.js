import { Typography } from '@mui/material';
import event from 'API/Event';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function EventPicture() {
  const { id } = useParams();

  const { singleDetailedEvent } = useSelector((state) => state.event);

  return (
    <div className="w-4/5">
      <div
        style={{
          backgroundImage: `url(${event.eventPicture}${id})`,
          width: '100%',
          height: '380px',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat'
        }}
        className="flex justify-center">
        <Typography variant="h4" color="white">
          {singleDetailedEvent.title}
        </Typography>
      </div>
    </div>
  );
}

export default EventPicture;
