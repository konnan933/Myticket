import './App.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchLogin } from 'redux/thunks/Auth';
import LoginPage from 'pages/login/LoginPage';
/* import i18next from 'i18next';
import i18n from 'i18n';

i18n.init({
  lng: 'en',
  debug: true,
  resources: {
    en: {
      translation: {
        key: 'hello world'
      }
    }
  }
}); */

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const email = 'student1@gmail.com';
    const password = 'Aa123456';

    dispatch(fetchLogin({ email: email, password: password }));
  }, []);

  return (
    <div className="App">
      <LoginPage />
    </div>
  );
}

export default App;
