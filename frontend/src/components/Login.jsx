import React from 'react';
import { Link } from "react-router-dom";
import useForm from "/src/hooks/useForm";

export default function Login() {
    const { values, errors, handleChange, handleError, clearError } = useForm({
        email: "",
        password: ""
    });

    const handleLogin = (e) => {
        e.preventDefault();

        if (!values.email) {
            handleError("email", "Email or phone number is required.");
            return;
        } else {
            clearError("email");
        }

        if (!values.password) {
            handleError("password", "Password is required.");
            return;
        } else {
            clearError("password");
        }

        console.log("Login successful:", values);
    };

    return (
        <div className='container-fluid container-img' style={{ overflow: "hidden" }}>
            <div className="col-12 d-sm-block d-md-none mt-5 text-center">
                <img className='w-50 h-50 img-fluid mb-5' src="src/Images/Logo.png" alt="Logo" />
            </div>
            <div className="row d-flex">
                <div className="col-12 col-md-6 d-none d-md-flex bg-color justify-content-center align-items-center">
                    <div>
                        <img className='w-25 h-25 mt-4 ms-4' src="src/Images/Logo.png" alt="Logo" />
                        <div className="mailImg mt-4 text-center">
                            <img style={{ width: "507px", height: "491px" }} src="src/Images/sideIMG.png" alt="Logo" className="img-fluid mt-3" />
                        </div>
                    </div>
                </div>

                <div className="col-12 col-md-6 d-flex justify-content-center align-items-center">
                    <form className="form-container from container radious border p-4" onSubmit={handleLogin} noValidate>
                        <div className="row">
                            <div className="col-12 d-sm-block d-md-none mt-5 text-center">
                                <img className='w-75 h-75 img-fluid mb-5' src="src/Images/sideIMG.png" alt="Logo" />
                            </div>

                            <div className="col-12 mt-3">
                            <h2 className='mt-3'>Login</h2>
                                <label htmlFor="email" style={{ fontWeight: "500" }}>
                                    Email or Phone <span className='text-danger'>*</span>
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="text"
                                    className='form-control radious p-3 mt-2'
                                    placeholder="Enter your email or phone"
                                    value={values.email}
                                    onChange={handleChange}
                                />
                                {errors.email && <span className='text-danger'>{errors.email}</span>}
                            </div>

                            <div className="col-12 mt-3">
                                <label htmlFor="password" style={{ fontWeight: "500" }}>
                                    Password <span className='text-danger'>*</span>
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    className='form-control radious p-3 mt-2'
                                    placeholder="Enter your password"
                                    value={values.password}
                                    onChange={handleChange}
                                />
                                {errors.password && <span className='text-danger'>{errors.password}</span>}
                            </div>

                            <div className="col-12 mt-3 d-flex justify-content-between">
                                <div className="form-check">
                                    <input
                                        type="checkbox"
                                        className='form-check-input'
                                        id="rememberMe"
                                    />
                                    <label htmlFor="rememberMe" className='form-check-label' style={{ color: "gray" }}>
                                        Remember me
                                    </label>
                                </div>
                                <Link to="/forget" className='text-decoration-none text-danger' style={{ cursor: "pointer" }}>
                                    Forgot Password?
                                </Link>
                            </div>

                            <div className="col-12 mt-3">
                                <button type="submit" className='btn text-white l-btn w-100 p-3'>
                                    Sign In
                                </button>
                            </div>

                            <div className="col-12 text-center mt-3">
                                <p>
                                    Don't have an account? <Link to="/registration" className='text-danger' style={{ cursor: "pointer" }}>Register</Link>
                                </p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
