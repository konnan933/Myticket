import axios from './axois';
import { useNavigate, useParams } from 'react-router-dom';

export const UseAuth = () => {
  let navigate = useNavigate();

  const csrf = () => axios.get('/sanctum/csrf-cookie');

  const login = async ({ setErrors, setSuccessResponse }) => {
    await csrf();
    axios
      .post('/login', props)
      .then(() => {
        setSuccessResponse();
        navigate('/dashboard');
      })
      .catch((error) => {
        setErrors(error);
      });
  };

  return {
    login
  };
};
