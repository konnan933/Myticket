import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function ProtectedLink({ level, userLevel, children }) {
  const { loggedIn } = useSelector((state) => state.auth);

  if (!level.includes(userLevel)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
export default ProtectedLink;
