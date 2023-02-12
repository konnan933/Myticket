import { Route, Routes } from 'react-router-dom';
import Navbar from 'PageContent/navbar/Navbar';
import { allRootConfig } from 'pages/routes/RootConfig';
function App() {
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
