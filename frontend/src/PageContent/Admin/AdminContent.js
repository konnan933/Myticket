import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from 'redux/thunks/Admin';

function AdminContent() {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.admin);
  useEffect(() => {
    dispatch(getUsers());
  }, []);
  console.log(users);
  return (
    <>
      <h1>Admin</h1>
    </>
  );
}
export default AdminContent;
