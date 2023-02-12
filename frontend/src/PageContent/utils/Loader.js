import { HashLoader } from 'react-spinners';

function Loader() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <HashLoader color="#FBC95C" size={150} />
    </div>
  );
}
export default Loader;
