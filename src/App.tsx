import './App.css';
import { useEffect } from 'react';
import API_Request from './API_Request';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';

function App(): JSX.Element {
  useEffect(() => {
    async function checkAuth(){
      const data = await API_Request.GET(`${import.meta.env.VITE_BACKEND_ENDPOINT}/account/authCheck`);
      console.log(data);
    }

    checkAuth();


  }, [])

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Register' element={<Register />} />
        <Route path='/Login' element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App
