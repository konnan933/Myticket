import { useMediaQuery } from '@mui/material';
import event from 'API/Event';
import { useParams } from 'react-router-dom';

function EventPicture() {
  const { id } = useParams();
  const mobile = useMediaQuery('(min-width:765px)');

  return (
    <div className="w-4/5 max-md:w-9/10">
      <div
        style={{
          backgroundImage: `url(${event.eventPicture}${id})`,
          width: '100%',
          height: mobile ? '400px' : '350px',
          backgroundSize: 'contain',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat'
        }}
        className="flex justify-center"
      />
    </div>
  );
}

export default EventPicture;
