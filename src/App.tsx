import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import DogProfile from './pages/DogProfile';
import { ToastContainer } from 'react-toastify';
import SubBreedProfile from './pages/SubBreedProfile';

function App(): JSX.Element {
  // useEffect(() => {
  //   async function checkAuth(){
  //     const { success } = await API_Request.GET(`${import.meta.env.VITE_BACKEND_ENDPOINT}/account/authCheck`);
  //     if(!success){
  //       // Direct to login page
  //       toast.error("No token or expired. Please login first. Rediecting to login page...")
  //     }
  //   }

  //   checkAuth();


  // }, [])

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Register' element={<Register />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/dog_profile' element={<DogProfile />} />
        <Route path='/dog_profile/Sub_breedOf/:main_breed' element={<SubBreedProfile />} />
      </Routes>
      <ToastContainer autoClose={1500} />
    </Router>
  )
}

export default App
