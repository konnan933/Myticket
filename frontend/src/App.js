import './App.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchLogin } from 'redux/thunks/Auth';
import { Route, Routes } from 'react-router-dom';
import RegisterPage from 'pages/register/RegisterPage';
import LoginPage from 'pages/login/LoginPage';
import HomePage from 'pages/Home/HomePage';
import Navbar from 'PageContent/navbar/Navbar';
import rootConfig from 'pages/routes/RootConfig';
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const email = 'student1@gmail.com';
    const password = 'Aa123456';

    dispatch(fetchLogin({ email: email, password: password }));
  }, []);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        {rootConfig.map((root, index) => {
          return <Route key={index} path={root.pagePath} element={root.element} />;
        })}
      </Routes>
    </div>
  );
}

export default App;
