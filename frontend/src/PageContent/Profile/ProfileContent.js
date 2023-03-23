import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';
import EditUserName from './components/EditUserName';
import EditUserEmail from './components/EditUserEmail';
import EditUserPhoneNum from './components/EditUserPhoneNum';

function ProfileContent() {
  const { loggedUser } = useSelector((state) => state.auth);
  return (
    <div className="flex justify-center">
      <div className="w-1/2 p-4">
        <Card>
          <Box sx={{ minWidth: 275 }}>
            <CardContent>
              <EditUserName loggedUser={loggedUser} />
              <EditUserEmail loggedUser={loggedUser} />
              <EditUserPhoneNum loggedUser={loggedUser} />
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Box>
        </Card>
      </div>
    </div>
  );
}

export default ProfileContent;
