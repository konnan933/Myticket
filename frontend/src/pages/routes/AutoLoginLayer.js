import Loader from 'PageContent/utils/Loader';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setRememberMe } from 'redux/slices/AuthSlice';
import { fetchLoggedIn } from 'redux/thunks/Auth';

function AutoLoginLayer({ children }) {
  const dispatch = useDispatch();

  const { loginLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (localStorage.getItem('rememberMe') === 'true') {
      dispatch(fetchLoggedIn());
      dispatch(setRememberMe(true));
    }
    localStorage.setItem('level', 0);
  }, []);

  if (loginLoading) {
    return <Loader />;
  }
  return children;
}

export default AutoLoginLayer;
