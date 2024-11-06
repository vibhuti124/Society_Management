import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Modal, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css'; // Custom styles for additional tweaks
import img from '../Images/RegFormBackImg.png';
import img1 from '../Images/Registration.png';

function RegistrationPage() {
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm();
  const [showModal, setShowModal] = useState(false);
  const [societies, setSocieties] = useState([]);
  const [societyName, setSocietyName] = useState('');
  const [societyAddress, setSocietyAddress] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [isAgreed, setIsAgreed] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const onSubmit = async (data) => {
    if (!isAgreed) {
      alert('You must agree to the terms and conditions to register.');
      return;
    }
     try { 
      const response = await fetch('http://localhost:9000/api/auth/register', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json', }, 
        body: JSON.stringify({ firstName: data.firstName, lastName: data.lastName, email: data.email, phoneNumber: data.phone, country: data.country, state: data.state, city: data.city, society: data.society, password: data.password, confirmPassword: data.confirmPassword, }), });
    

        if (response.ok) { 
          alert('Registration successful'); 
          navigate('/login'); } 
        else { 
          alert('Registration failed');
         } } 
     catch (error) { 
      console.error('Error:', error); 
      alert('An error occurred. Please try again.');
     };
  }

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setValue('society', '');
    setSocietyName('');
    setSocietyAddress('');
    setCountry('');
    setState('');
    setCity('');
    setZipCode('');
  };

  const handleCreateSociety = () => {
    const newSociety = {
      name: societyName,
      address: societyAddress,
      country,
      state,
      city,
      zipCode,
    };
    setSocieties([...societies, newSociety]);
    console.log("New Society Created:", newSociety);
    handleCloseModal();
  };

  return (
    <div className="flex flex-col lg:flex-row w-full h-screen">
      {/* Left Section */}
      <div className="lg:w-1/2 bg-gray-50 p-6 lg:p-12 flex flex-col justify-center">
        <h1 className="text-5xl font-bold">
          <span className="text-orange-600">Dash</span>Stack
        </h1>
        <div className="flex flex-col justify-center items-center pt-5 mt-5">
          <img
            src={img1}
            alt="Society management illustration"
            className="mb-6 w-full max-w-md" // Make the image responsive
          />
        </div>
      </div>

      {/* Right Section - Form */}
      <div
        className="lg:w-1/2 flex justify-center items-center p-6 lg:p-12 bg-cover bg-right"
        style={{
          backgroundImage: `url(${img})`
        }}
      >
        <div className="w-full max-w-lg bg-white p-6 lg:p-10 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-6">Registration</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* First Name and Last Name Fields */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">First Name</label>
                <input
                  type="text"
                  className={`w-full px-3 py-2 border rounded ${errors.firstName ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-orange-600`}
                  placeholder="Enter First Name"
                  {...register('firstName', { required: 'First name is required' })}
                />
                {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Last Name</label>
                <input
                  type="text"
                  className={`w-full px-3 py-2 border rounded ${errors.lastName ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-orange-600`}
                  placeholder="Enter Last Name"
                  {...register('lastName', { required: 'Last name is required' })}
                />
                {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
              </div>
            </div>

            {/* Email and Phone Number Fields */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium mb-1">Email Address</label>
                <input
                  type="email"
                  className={`w-full px-3 py-2 border rounded ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-orange-600`}
                  placeholder="Enter Email Address"
                  {...register('email', { required: 'Email is required' })}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Phone Number</label>
                <input
                  type="tel"
                  className={`w-full px-3 py-2 border rounded ${errors.phone ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-orange-600`}
                  placeholder="Enter Phone Number"
                  {...register('phone', { required: 'Phone number is required' })}
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
              </div>
            </div>

            {/* Country, State, City Fields */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium mb-1">Country</label>
                <input
                  type="text"
                  className={`w-full px-3 py-2 border rounded ${errors.country ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-orange-600`}
                  placeholder="Enter Country"
                  {...register('country', { required: 'Country is required' })}
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
                {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">State</label>
                <input
                  type="text"
                  className={`w-full px-3 py-2 border rounded ${errors.state ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-orange-600`}
                  placeholder="Enter State"
                  {...register('state', { required: 'State is required' })}
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
                {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">City</label>
                <input
                  type="text"
                  className={`w-full px-3 py-2 border rounded ${errors.city ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-orange-600`}
                  placeholder="Enter City"
                  {...register('city', { required: 'City is required' })}
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
                {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
              </div>
            </div>

            {/* Society Selection */}
            <div className="mt-4">
              <label className="block text-sm font-medium mb-1">Select Society</label>
              <select
                className={`w-full px-3 py-2 border rounded ${errors.society ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-orange-600`}
                {...register('society', { required: 'Please select a society' })}
                onChange={(e) => {
                  if (e.target.value === 'create') {
                    setShowModal(true);
                  }
                }}
              >
                <option value="">Choose a society...</option>
                {societies.map((society, index) => (
                  <option key={index} value={society.name}>
                    {society.name}
                  </option>
                ))}
                <option value="create" className="text-lg text-white bg-orange-600">
                  Create a new society
                </option>
              </select>
              {errors.society && <p className="text-red-500 text-xs mt-1">{errors.society.message}</p>}
            </div>

            {/* Password Fields */}
            <div className="mt-4">
              <label className="block text-sm font-medium mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className={`w-full px-3 py-2 border rounded ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-orange-600`}
                  placeholder="Enter Password"
                  {...register('password', { required: 'Password is required' })}
                />
                <button
                  type="button"
                  className="absolute right-2 top-2 text-gray-500"
                  onClick={togglePasswordVisibility}
                >
                  <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium mb-1">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  className={`w-full px-3 py-2 border rounded ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-orange-600`}
                  placeholder="Confirm Password"
                  {...register('confirmPassword', {
                    validate: (value) => value === watch('password') || 'Passwords do not match',
                  })}
                />
                <button
                  type="button"
                  className="absolute right-2 top-2 text-gray-500"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  <i className={`fas ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </button>
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-center mt-4">
              <input
                type="checkbox"
                className="mr-2 h-4 w-4 text-orange-600 border-gray-300 rounded focus:ring-0"
                checked={isAgreed}
                onChange={(e) => setIsAgreed(e.target.checked)}
              />
              <label className="text-sm">
                I agree to the <Link to="/terms" className="text-orange-600">terms and conditions</Link>
              </label>
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn text-white l-btn w-100 p-3 mt-4">
              Register
            </button>
            <p className="text-center text-gray-500 mt-4">
              Already have an account?
              <Link to="/" className="text-orange-500">Login</Link>
            </p>
          </form>
        </div>
      </div>

      {/* Modal for Creating a New Society */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Society</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Society Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:border-orange-600"
                value={societyName}
                onChange={(e) => setSocietyName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Society Address</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:border-orange-600"
                value={societyAddress}
                onChange={(e) => setSocietyAddress(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Country</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:border-orange-600"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">State</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:border-orange-600"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">City</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:border-orange-600"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium mb-1">Zip Code</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:border-orange-600"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700 transition"
            onClick={handleCloseModal}
          >
            Close
          </button>
          <button
            className="bg-orange-600 text-white py-2 px-4 rounded hover:bg-orange-700 transition ml-2"
            onClick={handleCreateSociety}
          >
            Save Changes
          </button>
        </Modal.Footer>
      </Modal>
    </div>

  );
}

export default RegistrationPage;
