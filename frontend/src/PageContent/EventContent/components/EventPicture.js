import event from 'API/Event';
import { useParams } from 'react-router-dom';

function EventPicture() {
  const { id } = useParams();

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
        className="flex justify-center"
      />
    </div>
  );
}

export default EventPicture;
