import { Navigate } from 'react-router-dom';

function ProtectedLink({ level, userLevel, children }) {
  console.log({ level });
  console.log({ userLevel });
  console.log(!level.includes(userLevel));

  if (!level.includes(userLevel)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
export default ProtectedLink;
