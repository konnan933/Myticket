import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import EditUserName from './components/EditUserName';
import EditUserEmail from './components/EditUserEmail';
import EditUserPhoneNum from './components/EditUserPhoneNum';
import ResetPassword from './components/ResetPassword';
import NotConfrimedUser from './components/NotConfirmedUser';
import { useSelector } from 'react-redux';
import Loader from 'PageContent/utils/Loader';

function ProfileContent() {
  const { loggedUser } = useSelector((state) => state.auth);
  if (loggedUser.id === undefined) {
    return <Loader />;
  }

  return (
    <div>
      <div className="flex justify-center">
        <div style={{ width: '95%' }}>
          <NotConfrimedUser />
          <div className="flex justify-center p-4">
            <Card>
              <Box>
                <CardContent>
                  <EditUserName />
                  <EditUserEmail />
                  <EditUserPhoneNum />
                </CardContent>
                <CardActions>
                  <ResetPassword />
                </CardActions>
              </Box>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileContent;
