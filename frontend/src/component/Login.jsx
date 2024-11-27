// Login.js
// import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import loginImage from '../assets/login.png';
import '../style.css';
import Logo from './Logo';
import axios from 'axios';
import { StoreUser } from "../redux/authslice"

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  // const onSubmit = (data) => {
  //   const storedUser = JSON.parse(localStorage.getItem('user'));

  //   // Check if email and password match with registration data
  //   if (storedUser && storedUser.email === data.email && storedUser.password === data.password) {
  //     alert('Login successful!');
  //     navigate('/home'); // Redirect to homepage
  //   } else {
  //     alert('Invalid email or password. Please try again.');
  //   }
  // };

  const onSubmit = async (data) => {
    try {
      const response  = await axios.post("http://localhost:5000/api/v1/login",data);
      console.log(response.data); // Log response data for debugging

      // Handle successful login
      if (response.data.success) {
        alert(response.data.success) // Assuming the API response has a "success" property
        const user = response.data.user; // Assuming the API response includes user data
        StoreUser(user); // Assuming this function stores user data in Redux store (if applicable)
        navigate('/dashboard'); // Redirect to homepage after successful login
      } else {
        alert(response.data.message || 'Login failed!'); // Display error message from response or a generic message
      }
    } catch (error) {
      console.log(error); // Log errors for debugging
      // alert('An error occurred. Please try again.'); // Generic error message for user
    }
  };

  return (
    <div className="container-fluid d-flex align-items-center min-vh-100">
      <div className="row w-100">
        <div className="left-side col-lg-6 col-md-6 col-sm-12 justify-content-center align-items-center d-flex flex-column">
          <div className='stack mt-5 '>

            <Logo />
          </div>

          <div>
            <img
              className="login-image mx-5 mt-5"
              src={loginImage}
              alt="Login"
              style={{ maxWidth: '80%' }}
            />
          </div>
        </div>

        <div className="right-sec col-lg-6 col-md-6 col-sm-12 d-flex justify-content-center align-items-center">
          <div className="login-form-container p-4 shadow-lg bg-white rounded">
            <h2>Login</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <label htmlFor="Email" className="form-label">
                  Email or Phone <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.Email ? 'is-invalid' : ''}`}
                  id="Email"
                  placeholder="Enter Email or Phone"
                  {...register('Email', { required: 'Email or phone is required' })}
                />
                {errors.Email && <div className="invalid-feedback">{errors.Email.message}</div>}
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password <span className="text-danger">*</span>
                </label>
                <input
                  type="password"
                  className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                  id="password"
                  placeholder="Enter Password"
                  {...register('password', { required: 'Password is required' })}
                />
                {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
              </div>

              <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="rememberMe"
                    {...register('rememberMe')}
                  />
                  <label className="form-check-label" htmlFor="rememberMe">
                    Remember me
                  </label>
                </div>
                <Link to="/forgot-password" className="text-decoration-none" style={{ color: '#ee6a42' }}>
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100"
                style={{ backgroundColor: '#ee6a42', border: 'none' }}
              >
                Sign In
              </button>

              <p className="text-center mt-3">
                Don't have an account?{' '}
                <Link to="/" className="text-decoration-none" style={{ color: '#ee6a42' }}>
                  Register
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;