import { Route, Routes } from 'react-router-dom';
import Navbar from 'PageContent/navbar/Navbar';
import { allRootConfig } from 'pages/routes/RootConfig';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchLoggedIn } from 'redux/thunks/Auth';
import Loader from 'PageContent/utils/Loader';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  const dispatch = useDispatch();

  const { loginLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchLoggedIn());
  }, []);

  if (loginLoading) {
    return <Loader />;
  }

  return (
    <div className="App">
      <Navbar />

      <Routes>
        {allRootConfig.map((root, index) => {
          return <Route key={index} path={root.pagePath} element={root.element} />;
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
