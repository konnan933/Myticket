import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from 'redux/thunks/Admin';
import UsersTable from './UsersTable';
import Loader from 'PageContent/utils/Loader';
function AdminUserContent() {

  const dispatch = useDispatch();
  const { users, usersLoading } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getUsers());
  }, []);
  if (usersLoading || users.length === 0) {
    return <Loader />;
  }
  return (
    <div>
      <div className="flex justify-center w-full">
        <UsersTable />
      </div>
    </div>
  );
}
export default AdminUserContent;
