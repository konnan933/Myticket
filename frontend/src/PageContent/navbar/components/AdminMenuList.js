import { MenuItem, Select, Typography } from '@mui/material';
import { adminConfig } from 'pages/routes/RootConfig';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import '../underline.css';
function AdminMenuList() {
  const { t } = useTranslation('rootes');
  const [page, setPage] = useState('ADMINUSER');

  const handleChange = (event) => {
    setPage(event.target.value);
  };
  return (
    <Select
      sx={{ color: 'white' }}
      value={page}
      onChange={handleChange}
      variant="standard"
      inputProps={{ 'aria-label': 'Without label' }}>
      {adminConfig.map((root, index) => {
        return (
          <MenuItem key={index} value={root.pageName}>
            <Link to={root.pagePath} key={index}>
              <Typography className="link-underline link-underline-black">
                {t(root.pageName)}
              </Typography>
            </Link>
          </MenuItem>
        );
      })}
    </Select>
  );
}

export default AdminMenuList;
