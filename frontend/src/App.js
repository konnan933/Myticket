import { Route, Routes } from 'react-router-dom';
import Navbar from 'PageContent/navbar/Navbar';
import { allRootConfig } from 'pages/routes/RootConfig';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchLoggedIn } from 'redux/thunks/Auth';
import Loader from 'PageContent/utils/Loader';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setRememberMe } from 'redux/slices/AuthSlice';
import ProtectedLink from 'pages/routes/ProtectedLink';
function App() {
  const dispatch = useDispatch();

  const { loginLoading, login } = useSelector((state) => state.auth);

  useEffect(() => {
    if (localStorage.getItem('rememberMe') === 'true') {
      dispatch(fetchLoggedIn());
      dispatch(setRememberMe(true));
    }
  }, []);

  if (loginLoading) {
    return <Loader />;
  }

  return (
    <div className="App">
      <Navbar />
      <Routes>
        {allRootConfig.map((root, index) => {
          return (
            <Route
              key={index}
              path={root.pagePath}
              element={
                <ProtectedLink level={root.level} userLevel={login[0].level}>
                  {root.element}
                </ProtectedLink>
              }
            />
          );
        })}
      </Routes>
      <ToastContainer
        closeOnClick
        hideProgressBar={false}
        newestOnTop={false}
        pauseOnFocusLoss
        pauseOnHover
        rtl={false}
        theme="colored"
      />
    </div>
  );
}

export default App;
