import { MenuItem, Select } from '@mui/material';
import { changeLanguage } from 'i18next';
import { useState } from 'react';

function LangChanger() {
  const [lang, setLang] = useState('hu');

  const handleChange = (event) => {
    changeLanguage(event.target.value);
    setLang(event.target.value);
  };

  return (
    <Select
      value={lang}
      onChange={handleChange}
      displayEmpty
      inputProps={{ 'aria-label': 'Without label' }}>
      <MenuItem value={'hu'}>HU</MenuItem>
      <MenuItem value={'en'}>EN</MenuItem>
    </Select>
  );
}
export default LangChanger;
