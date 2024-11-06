import './App.css'
import {
  BrowserRouter,
  Routes,
  Route,

} from "react-router-dom";
import Login from './components/Login';
import RegistrationPage from './components/Registretion';
import ForgetScreen from './components/ForgetScreen';
import OTPVerification from './components/otp';
import ResetPassword from './components/ResetPassword';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/registration' element={<RegistrationPage />} />
        <Route path='/forget' element={<ForgetScreen/>} />
        <Route path='/otp' element={<OTPVerification />} />
        <Route path='/resetpassword' element={ <ResetPassword/>}/>

    </Routes>

    </BrowserRouter>
  )
}

export default App

