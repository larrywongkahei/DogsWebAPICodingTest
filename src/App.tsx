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

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Register' element={<Register />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/dog_profile/:main_breed_name' element={<DogProfile />} />
        <Route path='/dog_profile/Sub_breedOf/:main_breed' element={<SubBreedProfile />} />
      </Routes>
      <ToastContainer autoClose={1500} />
    </Router>
  )
}

export default App
