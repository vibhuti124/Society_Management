import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { resetpass } from "../apiservices/Authentication";
import toast from "react-hot-toast";
import img1 from "../assets/forget-img.png";
import img2 from "../assets/back.png";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Toggle Password Visibility for New Password
  const handleToggleNewPasswordVisibility = () => {
    setShowNewPassword((prev) => !prev);
  };

  // Toggle Password Visibility for Confirm Password
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  // Handle Form Submission
  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    const email = localStorage.getItem("EmailOrPhone");
    try {
      const response = await resetpass({ newPassword, confirmPassword, email });
      toast.success(response.data.message);
      localStorage.clear("EmailOrPhone");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setNewPassword("");
      setConfirmPassword("");
    }
  };

  // Check if the Reset Password button should be enabled
  const isButtonDisabled = !newPassword || !confirmPassword;

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      <div className="lg:w-1/2 bg-gray-50 p-6 lg:p-12">
        <h1 className="text-5xl font-bold">
          <span className="text-orange-600">Dash</span>Stack
        </h1>
        <div className="flex flex-col justify-center items-center pt-5 mt-5">
          <img src={img1} alt="Illustration" className="mb-6" />
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
        <form
          className="w-full max-w-lg bg-white p-10 rounded-lg shadow-sm"
          onSubmit={handleResetPassword}
        >
          <h2 className="text-4xl font-semibold mb-6">Reset Password</h2>

          {/* New Password Field */}
          <div className="col-12 mt-3 mb-3">
            <label style={{ fontWeight: "500" }} htmlFor="newPassword">
              New Password <span className="text-danger">*</span>
            </label>
            <div className="relative mt-2">
              <input
                id="newPassword"
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="form-control rounded p-3 w-full"
                placeholder="Enter your new password"
              />
              <span
                className="absolute top-3 right-3 cursor-pointer"
                onClick={handleToggleNewPasswordVisibility}
              >
                <i
                  className={`fas ${
                    showNewPassword ? "fa-eye" : "fa-eye-slash"
                  }`}
                ></i>
              </span>
            </div>
          </div>

          {/* Confirm Password Field */}
          <div className="col-12 mt-3 mb-3">
            <label style={{ fontWeight: "500" }} htmlFor="confirmPassword">
              Confirm Password <span className="text-danger">*</span>
            </label>
            <div className="relative mt-2">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="form-control rounded p-3 w-full"
                placeholder="Confirm your password"
              />
              <span
                className="absolute top-3 right-3 cursor-pointer"
                onClick={toggleConfirmPasswordVisibility}
              >
                <i
                  className={`fas ${
                    showConfirmPassword ? "fa-eye" : "fa-eye-slash"
                  }`}
                ></i>
              </span>
            </div>
          </div>

          {/* Reset Password Button */}
          <div className="col-12 mt-3">
            <button
              type="submit"
              disabled={isButtonDisabled}
              className={`w-full p-3 rounded text-white ${
                isButtonDisabled
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
              }`}
            >
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
