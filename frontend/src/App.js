import './App.css';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchLogin } from 'redux/thunks/Auth';
import { Route, Routes } from 'react-router-dom';
import RegisterPage from 'pages/register/RegisterPage';
import LoginPage from 'pages/login/LoginPage';
import { Button, Drawer, Link } from '@mui/material';
import { Box } from '@mui/system';
function App() {
  const dispatch = useDispatch();

  const [drawer, setDrawer] = useState(false);

  useEffect(() => {
    const email = 'student1@gmail.com';
    const password = 'Aa123456';

    dispatch(fetchLogin({ email: email, password: password }));
  }, []);

  return (
    <div className="App">
      <Button onClick={() => setDrawer(true)}>Drawer</Button>
      <Drawer anchor="left" open={Boolean(drawer)} onClose={() => setDrawer(false)}>
        <Box>
          <div className="flex flex-col gap-10">
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </div>
        </Box>
      </Drawer>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
