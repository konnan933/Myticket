import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import api from './axios/axois';
import React from 'react';

function App() {
  useEffect(() => {
    const email = 'student1@gmail.com';
    const password = 'Aa123456';
    const login = async () => {
      const csrf = () => api.get('/sanctum/csrf-cookie');
      await csrf();
      api.get('api/location' /* , { email, password } */).then(() => {
        console.log('siker');
      });
    };
    login();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Müködj breeze</h1>
      </header>
    </div>
  );
}

export default App;
