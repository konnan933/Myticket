import { Button } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

function Addimage({ uploadImage }) {
  const { register, handleSubmit } = useForm();
  const [path, setPath] = useState(null);
  return (
    <div>
      {path && (
        <div>
          <img alt="not fount" width={'250px'} src={URL.createObjectURL(path)} />
          <br />
          <Button onClick={() => setPath(null)}>Remove</Button>
        </div>
      )}
      <br />
      <br />
      <input
        {...register('path')}
        type="file"
        name="image"
        onChange={(event) => {
          console.log(event.target.files[0]);
          setPath(event.target.files[0]);
          handleSubmit(path);
          uploadImage(path);
        }}
      />
    </div>
  );
}

export default Addimage;
