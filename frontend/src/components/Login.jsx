import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import img1 from "../assets/Login.png";
import img2 from "../assets/back.png";

export default function Login() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange", // Validation mode to enable button only when inputs are valid
  });

  const onSubmit = (data) => {
    console.log("Form Submitted:", data);
    alert("Sign In Successful!");
  };

  // Watching input values for validation
  const watchAllFields = watch();

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      {/* Left Section */}
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

      {/* Right Section */}
      <div
        className="lg:w-1/2 flex justify-center items-center bg-white p-6 lg:p-12"
        style={{
          backgroundImage: `url(${img2})`,
          backgroundSize: "cover",
          backgroundPosition: "right",
        }}
      >
        <div className="w-full max-w-lg bg-white p-10 rounded-lg pb-5 shadow-sm">
          <h2 className="text-4xl font-semibold mb-6">Login</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Email or Phone */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Email or Phone<span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                className={`mt-1 block w-full p-2 border rounded ${
                  errors.identifier ? "border-red-500" : "border-gray-300"
                }`}
                {...register("identifier", {
                  required: "Email or Phone is required",
                  minLength: {
                    value: 3,
                    message: "Must be at least 3 characters",
                  },
                })}
                placeholder="Enter Your Phone Number Or Email"
              />
              {errors.identifier && (
                <p className="text-red-500 text-sm">
                  {errors.identifier.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                className={`mt-1 block w-full p-2 border rounded ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                placeholder="Enter Password"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password.message}</p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex justify-between items-center mt-4">
              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2 text-orange-500"
                    {...register("remember")}
                  />
                  <span className="text-sm text-gray-700">Remember me</span>
                </label>
              </div>
              <div>
                <Link to="/forget" className="text-sm text-red-500">
                  Forgot Password?
                </Link>
              </div>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              className="mt-6 w-full bg-orange-500 text-white p-2 rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
              disabled={!isValid} // Disable the button if the form is invalid
            >
              Sign In
            </button>

            {/* Registration Link */}
            <p className="text-center text-gray-500 mt-4">
              Don't have an account?{" "}
              <Link to={"/"} className="text-orange-500">
                Registration
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
