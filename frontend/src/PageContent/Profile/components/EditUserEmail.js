import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';

function EditUserEmail({ email }) {
  return (
    <div className="flex flex-row">
      <Typography color="text.primary" variant="h5" gutterBottom>
        {`${'USER_EMAIL'} ${email}`}
      </Typography>
      <IconButton>
        <EditIcon />
      </IconButton>
    </div>
  );
}
export default EditUserEmail;
