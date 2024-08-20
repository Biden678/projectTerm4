import { Route, Routes } from 'react-router-dom';
import { publicRouter } from './router/ListRouter';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
      <Routes>
        {publicRouter.map((route, index) => (
          <Route key={index} path={route.path} element={route.component} />
        ))}
      </Routes>
      {/* Other components or elements */}
      <ToastContainer />
    </div>
  );
}

export default App;
