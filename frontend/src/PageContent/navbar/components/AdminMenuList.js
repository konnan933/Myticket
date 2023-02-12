import { Button, MenuItem, Select } from '@mui/material';
import { adminConfig } from 'pages/routes/RootConfig';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
function AdminMenuList() {
  const { t } = useTranslation('rootes');
  const [page, setPage] = useState('ADMINUSER');

  const handleChange = (event) => {
    setPage(event.target.value);
  };
  return (
    <Select value={page} onChange={handleChange} inputProps={{ 'aria-label': 'Without label' }}>
      {adminConfig.map((root, index) => {
        return (
          <MenuItem key={index} value={root.pageName}>
            <Link to={root.pagePath} key={index}>
              <Button sx={{ color: 'white', borderColor: 'white' }}>{t(root.pageName)}</Button>
            </Link>
          </MenuItem>
        );
      })}
    </Select>
  );
}

export default AdminMenuList;
