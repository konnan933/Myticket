import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import Navbar from 'PageContent/navbar/Navbar';
import { allRootConfig } from 'pages/routes/RootConfig';
function App() {
  const dispatch = useDispatch();

  return (
    <div className="App">
      <Navbar />
      <Routes>
        {allRootConfig.map((root, index) => {
          return <Route key={index} path={root.pagePath} element={root.element} />;
        })}
      </Routes>
    </div>
  );
}

export default App;
