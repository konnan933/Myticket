import './App.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchLogin } from 'redux/thunks/Auth';
import { Route, Routes } from 'react-router-dom';
import RegisterPage from 'pages/register/RegisterPage';
import LoginPage from 'pages/login/LoginPage';
import HomePage from 'pages/Home/HomePage';
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const email = 'student1@gmail.com';
    const password = 'Aa123456';

    dispatch(fetchLogin({ email: email, password: password }));
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
