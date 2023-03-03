import { Route, Routes } from 'react-router-dom';
import Navbar from 'PageContent/navbar/Navbar';
import { allRootConfig } from 'pages/routes/RootConfig';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchLoggedIn } from 'redux/thunks/Auth';
import Loader from 'PageContent/utils/Loader';
import { ToastContainer } from 'react-toastify';
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
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
        {allRootConfig.map((root, index) => {
          return <Route key={index} path={root.pagePath} element={root.element} />;
        })}
      </Routes>
    </div>
  );
}

export default App;
