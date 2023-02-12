import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from 'redux/thunks/Admin';
//import { useTranslation } from 'react-i18next';
import { HashLoader } from 'react-spinners';
import UsersTable from './UsersTable';
function AdminUserContent() {
  //const { t } = useTranslation('adminUser');

  const dispatch = useDispatch();
  const { users, usersLoading } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getUsers());
  }, []);
  if (usersLoading || users.length === 0) {
    return (
      // TODO CSS FIX hogy kozépen legyen
      <div className="w-full flex justify-center items-center">
        <HashLoader color="#FBC95C" size={150} />
      </div>
    );
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
