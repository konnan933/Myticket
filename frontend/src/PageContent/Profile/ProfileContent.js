import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';

function ProfileContent() {
  const { loggedUser } = useSelector((state) => state.auth);

  console.log(loggedUser);
  return (
    <div className="flex justify-center">
      <div className="w-1/2 p-4">
        <Card>
          <Box sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography color="text.primary" variant="h5" gutterBottom>
                {`${'USER_NAME'} ${loggedUser.userName}`}
              </Typography>
              <Typography color="text.primary" variant="h5" gutterBottom>
                {`${'USER_EMAIL'} ${loggedUser.email}`}
              </Typography>
              <Typography color="text.primary" variant="h5" gutterBottom>
                {`${'USER_NAME'} ${loggedUser.phoneNumber}`}
              </Typography>
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
