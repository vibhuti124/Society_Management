import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

export default function ResetPassword() {
    const [password, setPassword] = useState({
        newPassword: "",
        confirmPassword: ""
    });
    const [errors, setErrors] = useState({
        newPassword: "",
        confirmPassword: ""
    });

    const validatePassword = () => {
        let valid = true;
        let newErrors = { newPassword: "", confirmPassword: "" };

        if (password.newPassword.length < 8) {
            newErrors.newPassword = "Password must be at least 8 characters long.";
            valid = false;
        }

        if (password.newPassword !== password.confirmPassword) {
            newErrors.confirmPassword = "Passwords don't match.";
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    async function setNewPassword() {
        if (validatePassword()) {
            try {
                alert("Password reset successful!");
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <div className='container-fluid'>
            <div className="row container-img">
                <div className="col-12 d-block d-md-none mt-5 text-center">
                    <img className='w-50 h-50 img-fluid mb-5' src="src/Images/Logo.png" alt="Logo" />
                </div>

                <div className="col-12 col-md-6 d-none d-md-block bg-color">
                    <div className="logo">
                        <img className='w-25 h-25 mt-4 ms-4' src="src/Images/Logo.png" alt="Logo" />
                    </div>
                    <div className="mailImg mt-5 text-center">
                        <img className="img-fluid" style={{ width: "100%", maxWidth: "507px", height: "auto" }} src="src/Images/forget-img.png" alt="Forget" />
                    </div>
                </div>

                <div className="col-12 col-md-6 mt-5 d-flex justify-content-center align-items-center">
                    <from className="from1 row mb-5 p-3">
                        <div className="col-12 d-sm-block d-md-none mb-4 text-center">
                            <img style={{ height: "332.99px", width: "355.11px" }} className='img-fluid' src="src/Images/forget-img.png" alt="Forget" />
                        </div>

                        <h3 className='mt-4 mb-4'>Reset Password</h3>

                        <div className="col-12 mt-3 mb-3">
                            <label style={{ fontWeight: "500" }} htmlFor="newPassword">
                                New Password <span className='text-danger'>*</span>
                            </label>
                            <input
                                id="newPassword"
                                type="password"
                                onChange={(e) => setPassword({
                                    ...password, newPassword: e.target.value
                                })}
                                className='form-control radious p-3 mt-2'
                                placeholder="Enter your new password"
                            />
                            {errors.newPassword && <small className="text-danger">{errors.newPassword}</small>}
                        </div>

                        <div className="col-12 mt-3 mb-3">
                            <label style={{ fontWeight: "500" }} htmlFor="confirmPassword">
                                Confirm Password <span className='text-danger'>*</span>
                            </label>
                            <input
                                id="confirmPassword"
                                type="password"
                                onChange={(e) => setPassword({
                                    ...password, confirmPassword: e.target.value
                                })}
                                className='form-control radious p-3 mt-2'
                                placeholder="Confirm your password"
                            />
                            {errors.confirmPassword && <small className="text-danger">{errors.confirmPassword}</small>}
                        </div>

                        <div className="col-12 mt-2 mb-3">
                            <button onClick={setNewPassword} className='btn text-white l-btn w-100 p-3'>
                                Reset Password
                            </button>
                        </div>
                    </from>
                </div>
            </div>
        </div>
    );
}
