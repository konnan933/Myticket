import { Navigate } from 'react-router-dom';

function ProtectedLink({ level, userLevel, children }) {
  if (!level.includes(userLevel)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
export default ProtectedLink;
