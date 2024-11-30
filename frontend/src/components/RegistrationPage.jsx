import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Modal, Button, Toast } from 'react-bootstrap';
import { toast } from "react-hot-toast";
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';
import axios from 'axios';
import img from '../assets/img.png';
import { createSociety, signup, viewSociety } from '../apiservices/Authentication';

function RegistrationPage() {
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm();
  const [formData, setUserData] = useState({
    UserName: "",
    SurName: "",
    Email: "",
    Phone_Number: "",
    Country: "",
    State: "",
    City: "",
    select_society: "",
    password: "",
    Cpassword: "",
  });

  const [isAgreed, setIsAgreed] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showPassword, ShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(prev => !prev);
  };

  const [societies, setSocieties] = useState({
    Society_Name: "",
    Society_Address: "",
    Country_Name: "",
    State_Name: "",
    City_Name: "",
    ZipCode_Number: "",
  });

  const [societiesList, setSocietiesList] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...formData, [name]: value });
  };

  // const handlesocietyChange = (e) => {
  //   const { name, value } = e.target;
  //   setUserData({ ...societies, [name]: value });
  // };

  const handleCloseModal = () => {
    setShowModal(false);
    setValue('society', '');
  };

  const societySubmit = async (data) => {
    try {
      const response = await signup(data);
      console.log(data);
        // Pass the form data directly to the signup function
      toast.success(response.data.message);
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
      console.log(error);
      
    } finally {
      setUserData({
        UserName: "",
        SurName: "",
        Email: "",
        Phone_Number: "",
        Country: "",
        State: "",
        City: "",
        select_society: "",
        password: "",
        Cpassword: "",
      });
    }
  };
  
  
  // const signup = async (formData) => {
  //   try {
  //     const response = await axios.post('http://localhost:8001/api/auth/signup', formData, {
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     });
  //     return response;
  //   } catch (error) {
  //     throw error; // Re-throw error to be caught in onSubmit
  //   }
  // };

  const togglePasswordVisibility = () => {
    showPassword(prev => !prev);
  };

  const handleSocietiesChange = (e) => {
    const { name, value } = e.target;
    setSocieties({ ...societies, [name]: value });
  };

  const handleCreateSociety = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await createSociety(societies); // Assuming createSociety is an API call
      toast.success(response.data.message); // Success Toast message
      fetchSocieties(); // Fetch the updated list of societies after creation
      setShowModal(false); // Close the modal
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create society');
    } finally {
      setSocieties({
        Society_Name: "",
        Society_Address: "",
        Country_Name: "",
        State_Name: "",
        City_Name: "",
        ZipCode_Number: "",
      });
      setIsLoading(false); // Hide loading indicator
    }
  };
  

  const handleSocietiesSelect = (e) => {
    const selectedValue = e.target.value;
    setUserData({ ...formData, select_society: selectedValue });
    if (selectedValue === "createNew") {
      setShowModal(true); // Show the modal if "Create New Society" is selected
    }
  };
  

  // get all societies
  const fetchSocieties = async () => {
    setIsLoading(true);
    try {
      const response = await viewSociety(); // Assuming viewSociety is an API call
      setSocietiesList(response.data.Society || []);
    } catch (error) {
      console.error('Error fetching societies:', error);
      toast.error('Failed to fetch societies');
      setSocietiesList([]); // Empty the societies list on error
    } finally {
      setIsLoading(false); // Stop the loading state
    }
  };
  
  useEffect(() => {
    fetchSocieties(); // Fetch societies when the component mounts
  }, []);
  

  return (
    <div className="registration-container">

      <div className="left-section">
        <div className="content text-center" style={{ marginTop: "60px" }}>
          <h1 className="logo-text text-start" style={{ color: '#F48020', paddingLeft: "50px" }}>Dash<span style={{ color: 'black' }}>Stack</span></h1>
          <div className="image-container">
            <img src={img} alt="Logo" className="img-fluid" style={{ width: "668px" }} />
          </div>
        </div>
      </div>


      <div className="form-section">
        <div className="form-wrapper">
          <h2 style={{ color: "black",marginLeft:"-5px" }} className='text-start'>Registration</h2>
          <form onSubmit={handleSubmit(societySubmit)}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label>First Name<span style={{ color: "red" }}>*</span></label>
                <input
                  type="text"
                  name='UserName'
                  value={formData.UserName} 
                  className={`form-control ${errors.UserName ? 'is-invalid' : ''}`}
                  placeholder="Enter First Name"
                  style={{ borderRadius: "15px", border: "1px solid #D3D3D3" }}
                  {...register('UserName', { required: true })}
                  onChange={handleChange}
                />
                {errors.UserName && <p className="text-danger">{errors.UserName.message}</p>}
              </div>

              <div className="col-md-6 mb-3">
                <label>Last Name<span style={{ color: "red" }}>*</span></label>
                <input
                  type="text"
                  name='SurName'
                  value={formData.SurName}
                  className={`form-control ${errors.SurName ? 'is-invalid' : ''}`}
                  placeholder="Enter Last Name"
                  style={{ borderRadius: "15px", border: "1px solid #D3D3D3" }}
                  {...register('SurName', { required: true })}
                  onChange={handleChange} 
                />
                {errors.SurName && <p className="text-danger">{errors.SurName.message}</p>}
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label>Email Address<span style={{ color: "red" }}>*</span></label>
                <input
                  type="email"
                  name='Email'
                  value={formData.Email}
                  className={`form-control ${errors.Email ? 'is-invalid' : ''}`}
                  placeholder="Enter Email Address"
                  style={{ borderRadius: "15px", border: "1px solid #D3D3D3" }}
                  {...register('Email', { required: true })}
                  onChange={handleChange} 
                />
                {errors.Email && <p className="text-danger">{errors.Email.message}</p>}
              </div>

              <div className="col-md-6 mb-3">
                <label>Phone Number<span style={{ color: "red" }}>*</span></label>
                <input
                  type="tel"
                  name='Phone_Number'
                  value={formData.Phone_Number}
                  className={`form-control ${errors.Phone_Number ? 'is-invalid' : ''}`}
                  placeholder="91+"
                  style={{ borderRadius: "15px", border: "1px solid #D3D3D3" }}
                  {...register('Phone_Number', { required: true })}
                  onChange={handleChange} 
                />
                {errors.Phone_Number && <p className="text-danger">{errors.Phone_Number.message}</p>}
              </div>
            </div>

            <div className="row">
              <div className="col-md-4 mb-3">
                <label>Country<span style={{ color: "red" }}>*</span></label>
                <input
                  type="text"
                  name='Country'
                  className={`form-control ${errors.Country ? 'is-invalid' : ''}`}
                  placeholder="Enter Country"
                  style={{ borderRadius: "15px", border: "1px solid #D3D3D3" }}
                  {...register('Country', { required: true })}
                  value={formData.Country}
                  onChange={handleChange}
                />
                {errors.Country && <p className="text-danger">{errors.Country.message}</p>}
              </div>

              <div className="col-md-4 mb-3">
                <label>State<span style={{ color: "red" }}>*</span></label>
                <input
                  type="text"
                  name='State'
                  className={`form-control ${errors.State ? 'is-invalid' : ''}`}
                  placeholder="Enter State"
                  style={{ borderRadius: "15px", border: "1px solid #D3D3D3" }}
                  {...register('State', { required: true })}
                  value={formData.State}
                  onChange={handleChange}
                />
                {errors.State && <p className="text-danger">{errors.State.message}</p>}
              </div>

              <div className="col-md-4 mb-3">
                <label>City<span style={{ color: "red" }}>*</span></label>
                <input
                  type="text"
                  name='City'
                  className={`form-control ${errors.City ? 'is-invalid' : ''}`}
                  placeholder="Enter City"
                  style={{ borderRadius: "15px", border: "1px solid #D3D3D3" }}
                  {...register('City', { required: true })}
                  value={formData.City}
                  onChange={handleChange}
                />
                {errors.City && <p className="text-danger">{errors.City.message}</p>}
              </div>
            </div>

            <div className="mb-3">
  <label className="form-label">Select Society<span style={{ color: "red" }}>*</span></label>
  <select
     style={{
      width: 'auto',
     minWidth: '100%',
     height: '44px',
     fontSize: '13px',
     appearance: 'none',
     MozAppearance: 'none',
     WebkitAppearance: 'none',
     border: '1px solid #ccc',
     borderRadius: '10px',
     paddingTop: '12px',
     paddingRight: '14px',
     paddingBottom: '12px',
     paddingLeft: '14px',
     gap: '10px', // Ensures full width and allows text to wrap
     }}
    className="form-select"
    id="selectSociety"
    name="select_society"
    value={formData.select_society}
    {...register('select_society', { required: true })}
    onChange={handleSocietiesSelect}
  >
    <option value="">Choose a society...</option>
    {societiesList?.map(({ _id, Society_Name }) => (
      <option key={_id} value={_id}>
        {Society_Name}
      </option>
    ))}
    <option value="">arice western</option>
    <option value="">iscon heights</option>

    <option value="createNew" style={{ backgroundColor: "#FE512E", color: "white" }}>
      Create a new society
    </option>
  </select>
  {errors.select_society && <p className="text-danger">{errors.select_society.message}</p>}
</div>


            <div className="mb-3" style={{ position: 'relative' }}>
              <label>Password<span style={{ color: "red" }}>*</span></label>
              <input
                type={showPassword ? 'text' : 'password'}
                name='password'
                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                placeholder="Enter Password"
                style={{
                  borderRadius: "15px",
                  border: "1px solid #D3D3D3",
                  paddingRight: '40px'
                }}
                value={formData.password}
                {...register('password', { required: true })}
                onChange={handleChange}
              />
              <span
                className="input-group-text"
                onClick={togglePasswordVisibility}
                style={{
                  cursor: 'pointer',
                  backgroundColor: 'transparent',
                  border: 'none',
                  position: 'absolute',
                  right: '10px',
                  top: '70%',
                  transform: 'translateY(-50%)',
                }}
              >
                <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </span>
              {errors.password && <p className="text-danger">{errors.password.message}</p>}
            </div>


            <div className="mb-3" style={{ position: 'relative' }}>
              <label htmlFor="">Confirm password <span style={{ color: "red" }}>*</span></label>
              <input
                type={ShowConfirmPassword ? 'text' : 'password'}
                className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                placeholder="Confirm Password"
                name='Cpassword'
                style={{
                  borderRadius: "15px",
                  border: "1px solid #D3D3D3",
                  paddingRight: '40px'
                }}
                value={formData.Cpassword}
                {...register('Cpassword', {
                  required: true,
                  validate: (value) => value === watch('password') || "Passwords do not match",
                })}
                onChange={handleChange}
              />
              <span
                className="input-group-text"
                onClick={toggleConfirmPasswordVisibility}
                style={{
                  cursor: 'pointer',
                  backgroundColor: 'transparent',
                  border: 'none',
                  position: 'absolute',
                  right: '10px',
                  top: '70%',
                  transform: 'translateY(-50%)',
                }}
              >
                <i className={`fas ${ShowConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </span>
            </div>


            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                onChange={(e) => setIsAgreed(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="agreeTerms">
                I agree to the terms and <span className='text-danger'> privacy policies</span>
              </label>
            </div>

            <button
              type="submit"
              className="btn"
              style={{
                width: "100%",
                background: !Object.keys(errors).length && isAgreed ? "linear-gradient(90deg, #F09619, #FE512E)" : "lightgrey",
                color: "white",
                border: "none",
                borderRadius: "5px",
                padding: "10px",
                cursor: !Object.keys(errors).length && isAgreed ? "pointer" : "not-allowed",
              }}
              disabled={Object.keys(errors).length > 0 || !isAgreed}
            >
              Register
            </button>
          </form>


          <div className="text-center mt-3">
            <Link to="/" style={{ textDecoration: "none", color: "black" }}>Already have an account?<span className='text-danger'>Login</span> </Link>
          </div>
        </div>
      </div>


<Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Dialog className="modal-dialog-centered">
        <Modal.Header>
          <Modal.Title>Create a New Society</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleCreateSociety}>
            <div className="mb-3">
              <label>Society Name <span style={{ color: "red" }}>*</span></label>
              <input
                type="text"
                name="Society_Name"
                className="form-control"
                value={societies.Society_Name}
                onChange={handleSocietiesChange}
                required
              />
            </div>
            <div className="mb-3">
              <label>Society Address <span style={{ color: "red" }}>*</span></label>
              <input
                type="text"
                name="Society_Address"
                className="form-control"
                value={societies.Society_Address}
                onChange={handleSocietiesChange}
                required
              />
            </div>
            <div className="row">
              <div className="col-md-4 mb-3">
                <label>Country <span style={{ color: "red" }}>*</span></label>
                <input
                  type="text"
                  name="Country_Name"
                  className="form-control"
                  value={societies.Country_Name}
                  onChange={handleSocietiesChange}
                  required
                />
              </div>
              <div className="col-md-4 mb-3">
                <label>State <span style={{ color: "red" }}>*</span></label>
                <input
                  type="text"
                  name="State_Name"
                  className="form-control"
                  value={societies.State_Name}
                  onChange={handleSocietiesChange}
                  required
                />
              </div>
              <div className="col-md-4 mb-3">
                <label>City <span style={{ color: "red" }}>*</span></label>
                <input
                  type="text"
                  name="City_Name"
                  className="form-control"
                  value={societies.City_Name}
                  onChange={handleSocietiesChange}
                  required
                />
              </div>
            </div>
            <div className="mb-3">
              <label>ZIP Code <span style={{ color: "red" }}>*</span></label>
              <input
                type="text"
                name="ZipCode_Number"
                className="form-control"
                value={societies.ZipCode_Number}
                onChange={handleSocietiesChange}
                required
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <Button
            style={{
              backgroundColor: 'transparent',
              color: 'black',
              border: '1px solid grey',
              width: '45%',
            }}
            onClick={() => setShowModal(false)}
          >
            Cancel
          </Button>
          <Button
            onClick={handleCreateSociety}
            style={{
              background: (societies.Society_Name && societies.Society_Address && societies.Country_Name && societies.State_Name && societies.City_Name && societies.ZipCode_Number)
                ? 'linear-gradient(90deg, #F09619, #FE512E)'
                : 'lightgrey',
              width: '45%',
              border: 'none',
              cursor: (societies.Society_Name && societies.Society_Address && societies.Country_Name && societies.State_Name && societies.City_Name && societies.ZipCode_Number)
                ? 'pointer'
                : 'not-allowed',
            }}
            disabled={!societies.Society_Name || !societies.Society_Address || !societies.Country_Name || !societies.State_Name || !societies.City_Name || !societies.ZipCode_Number}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </Modal>



    </div>
  );
}

export default RegistrationPage;