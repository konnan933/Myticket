import { useEffect } from 'react';
import { HashLoader } from 'react-spinners';

function Loader() {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => (document.body.style.overflow = 'scroll');
  });
  return (
    <div className="w-full h-full flex justify-center items-center">
      <HashLoader color="#FBC95C" size={150} />
    </div>
  );
}
export default Loader;
