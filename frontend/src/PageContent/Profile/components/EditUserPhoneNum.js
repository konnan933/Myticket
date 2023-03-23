import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';

function EditUserPhoneNum({ phoneNum }) {
  return (
    <div className="flex flex-row">
      <Typography color="text.primary" variant="h5" gutterBottom>
        {`${'USER_PHONE_NUM'} ${phoneNum}`}
      </Typography>
      <IconButton>
        <EditIcon />
      </IconButton>
    </div>
  );
}
export default EditUserPhoneNum;
