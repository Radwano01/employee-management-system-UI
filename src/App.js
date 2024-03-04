import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/login/Login';
import Homepage from './pages/homepage/Homepage';
import LoggedPermission from './components/LoggedPermission';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path='/homepage/*' element={
          <LoggedPermission>
            <Homepage/>
          </LoggedPermission>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
