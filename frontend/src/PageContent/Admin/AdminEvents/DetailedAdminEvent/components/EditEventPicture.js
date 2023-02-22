import admin from 'API/Admin';
import { useParams } from 'react-router-dom';
import ChangeEventPicture from './ChangeEventPicture';

function EditEventPictures() {
  const { id } = useParams();

  return (
    <div className="flex flex-col w-4/5">
      <div className="flex  justify-center">
        <ChangeEventPicture />
      </div>
      <div className="flex  justify-center">
        <img src={`${admin.eventPicture}${id}`} className="w-1/2" />
      </div>
    </div>
  );
}
export default EditEventPictures;
