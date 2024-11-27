import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import OTPImage from '../assets/forgotpassword.jpg';
import '../style.css';
import Logo from './Logo';
import toast from "react-hot-toast"
import axios from 'axios';
import { verifyOtp } from '../services/authentication';

 function EnterOtp() {
  const { register, handleSubmit } = useForm();
  const { state } = useLocation(); 
  const [counter, setCounter] = useState(30);
  const [resendAvailable, setResendAvailable] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    if (counter > 0) {
      const timer = setInterval(() => setCounter((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    } else {
      setResendAvailable(true);
    }
  }, [counter]);

  // const onSubmit = (data) => {
  //   console.log('OTP Submitted:', data);
  //   const otpValid = true; // Simulated OTP validation logic

  //   if (otpValid) {
  //     navigate('/reset-password'); // Navigate to Reset Password page
  //   } else {
  //     alert('Invalid OTP. Please try again.');
  //   }
  // };
  

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:5000/api/v1/verify-otp", {
        EmailOrPhone: state.EmailOrPhone,
        otp: data.otp.join(''),
      });
      // const localStorage.getItem("EmailorPhone")

      if (response.data.success) {
        toast.success('OTP verified successfully.');
        navigate('/reset-password');
      } else {
        toast.error(response.data.message || 'Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred. Please try again.');
    }
  };

  // const resendOtp = () => {
  //   console.log('Resending OTP...');
  //   setCounter(45);
  //   setResendAvailable(false);
  // };
  const resendOtp = async () => {
    try {
      const EmailOrPhone = localStorage.getItem("EmailOrPhone");
      const response = await verifyOtp({ EmailOrPhone });
      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Error sending OTP");
    }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center">
      <div className="row w-100">
        <div className="left-side col-lg-6 d-flex justify-content-center align-items-center bg-light">
          <div>
            <div className='stack mt-5 '>

            <Logo />
            </div>
            <img
              src={OTPImage}
              alt="Reset Password Illustration"
              className="EnterOtp-image mx-5 mt-5"
              style={{ maxWidth: '80%' }}
            />
          </div>
        </div>

        <div className="right-sec col-lg-6 d-flex justify-content-center align-items-center">
          <div className="EnterOtp-form-container p-4 shadow-lg bg-white rounded" style={{ width: '400px' }}>
            <h2 className="text-center">Enter OTP</h2>
            <p className="text-center">
              Please enter the 6-digit code sent to {state?.EmailOrPhone}.
            </p>
            <form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column align-items-center">
              <div className="otp-input-group d-flex justify-content-between mb-4" style={{ width: '100%' }}>
                {[...Array(6)].map((_, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    className="form-control text-center"
                    style={{ width: '48px', height: '58px', fontSize: '24px' }}
                    {...register(`otp[${index}]`, { required: true })}
                  />
                ))}
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100 mb-3"
                style={{ backgroundColor: '#ee6a42', border: 'none' }}
              >
                Verify
              </button>

              <div className="d-flex justify-content-between w-100">
                <span>{counter > 0 ? `00:${String(counter).padStart(2, '0')}` : 'Time expired'}</span>
                {resendAvailable && (
                  <button onClick={resendOtp} className="btn btn-link p-0" style={{ color: '#ee6a42' }}>
                    Resend OTP
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EnterOtp;