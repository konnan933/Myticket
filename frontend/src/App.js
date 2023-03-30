import { Route, Routes } from 'react-router-dom';
import Navbar from 'PageContent/navbar/Navbar';
import { allRootConfig } from 'pages/routes/RootConfig';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedLink from 'pages/routes/ProtectedLink';
import { useSelector } from 'react-redux';
function App() {
  const { login } = useSelector((state) => state.auth);
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
