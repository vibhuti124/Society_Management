import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { GetOtp } from "../apiservices/Authentication";
import img1 from "../assets/forget-img.png";
import img2 from "../assets/back.png";

export default function ForgetScreen() {
  const navigate = useNavigate();

  // State to manage input and validation
  const [EmailOrPhone, setEmailOrPhone] = useState("");
  const [error, setError] = useState("");

  // Validate the email or phone input
  const validateInput = () => {
    if (!EmailOrPhone) {
      setError("This field is required.");
      return false;
    }
    // Basic email/phone validation logic
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!emailRegex.test(EmailOrPhone) && !phoneRegex.test(EmailOrPhone)) {
      setError("Enter a valid email or 10-digit phone number.");
      return false;
    }
    setError("");
    return true;
  };

  // Handle the "Get OTP" button click
  const handleSendOtp = async () => {
    if (!validateInput()) return;

    try {
      const response = await GetOtp({ EmailOrPhone });
      localStorage.setItem("EmailOrPhone", EmailOrPhone);
      toast.success(response.data.message);
      navigate("/otp");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setEmailOrPhone("");
    }
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row h-screen">

        <div className="lg:w-1/2 bg-gray-50 p-6 lg:p-12">
          <h1 className="text-5xl font-bold">
            <span className="text-orange-600">Dash</span>Stack
          </h1>
          <div className="flex flex-col justify-center items-center pt-5 mt-5">
            <img
              src={img1}
              alt="Society management illustration"
              className="mb-6"
            />
          </div>
        </div>

        <div
          className="lg:w-1/2 flex justify-center items-center bg-white p-6 lg:p-12"
          style={{
            backgroundImage: `url(${img2})`,
            backgroundSize: "cover",
            backgroundPosition: "right",
          }}
        >
          <form className="w-full bg-white p-10 rounded-lg shadow-sm" style={{width:'80%'}}>
            <h2 className="text-4xl font-semibold mb-6">Forget Password</h2>
            <p className="mb-6 text-gray-600">
              Enter your email or phone number, and we'll send you an OTP to
              reset your password.
            </p>

            {/* Email or Phone Input */}
            <div className="mb-4">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="email"
              >
                Email or Phone <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                name="EmailOrPhone"
                type="text"
                value={EmailOrPhone}
                onChange={(e) => {
                  setEmailOrPhone(e.target.value);
                  setError(""); // Clear error on change
                }}
                onBlur={validateInput} // Validate on blur
                className={`mt-1 block w-full p-3 border rounded ${
                  error ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your email or phone number"
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>

            {/* Get OTP Button */}
            <div className="mb-4">
              <button
                type="button"
                onClick={handleSendOtp}
                className="w-full bg-orange-500 text-white p-3 rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
                disabled={!EmailOrPhone || !!error} // Disable button if input is empty or invalid
              >
                Get OTP
              </button>
            </div>

            {/* Back to Login Link */}
            <div className="text-center">
              <Link to="/" className="text-orange-500 text-sm">
                Back to Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
