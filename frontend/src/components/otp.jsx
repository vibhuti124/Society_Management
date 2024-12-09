import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { GetOtp, Otpverification } from '../apiservices/Authentication';
import toast from 'react-hot-toast';
import img1 from "../assets/forget-img.png";
import img2 from "../assets/back.png";

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background: ${({ disabled }) =>
    disabled
      ? "gray"
      : "linear-gradient(90deg, #FE512E 0%, #F09619 100%)"};
  color: ${({ disabled }) => (disabled ? "white" : "white")};
  border: none;
  border-radius: 4px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: background 0.3s ease;

  &:hover {
    background: ${({ disabled }) =>
      disabled ? "gray" : "linear-gradient(90deg, #F09619 0%, #FE512E 100%)"};
  }
`;

const OTPInput = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;

  input {
    width: 45px;
    height: 45px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 18px;
  }
`;

const OTPVerification = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [error, setError] = useState("");
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(59);
  // const [isOtpVerified, setIsOtpVerified] = useState(false);

  const handleChange = (index, value) => {
    if (/^[0-9]*$/.test(value) && value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < otp.length - 1) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };

  const handleOtp = async () => {
    try {
      const OTP = otp.join("");
      const EmailOrPhone = localStorage.getItem("EmailOrPhone");

      if (!OTP || !EmailOrPhone) {
        throw new Error("Missing OTP or Email/Phone");
      }

      const otpDetail = { otp: OTP, EmailOrPhone };
      const response = await Otpverification(otpDetail);
      toast.success(response.data.message);

      // Save OTP verification status in localStorage
      localStorage.setItem("otpVerified", "true");

      navigate("/resetpassword", { replace: true });
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Error verifying OTP"
      );
    }
  };
  
  useEffect(() => {
    // If OTP has already been verified (from localStorage), redirect to the reset password page
    if (localStorage.getItem("otpVerified") === "true") {
      navigate("/resetpassword", { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds, minutes]);

  const resendOtp = async () => {
    try {
      const EmailOrPhone = localStorage.getItem("EmailOrPhone");
      const response = await GetOtp({ EmailOrPhone });
      toast.success(response.data.message);
      setMinutes(0);
      setSeconds(59);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error sending OTP");
    }
  };

  const isButtonDisabled = otp.some((value) => value === "");

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
        <form className="w-full max-w-lg bg-white p-10 rounded-lg shadow-sm">
          <h2 className="text-4xl font-semibold mb-6">Enter OTP</h2>
          <p className="mb-7 text-gray-600">
            Please enter the 6-digit code sent to your phone number.
          </p>

          <OTPInput>
            {otp.map((value, index) => (
              <input
                key={index}
                type="text"
                id={`otp-input-${index}`}
                maxLength="1"
                value={value}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
              />
            ))}
          </OTPInput>

          {error && <p style={{ color: "red" }}>{error}</p>}

          <div className="col-12 d-flex justify-content-between mb-6">
            <div>
              {seconds > 0 || minutes > 0 ? (
                <p>
                  {minutes < 10 ? `0${minutes}` : minutes}:
                  {seconds < 10 ? `0${seconds}` : seconds}
                </p>
              ) : (
                <p>Didn't receive code?</p>
              )}
            </div>
            <div>
              <span
                onClick={resendOtp}
                style={{
                  color: seconds > 0 ? "gray" : "red",
                  cursor: seconds > 0 ? "not-allowed" : "pointer",
                }}
              >
                Resend OTP
              </span>
            </div>
          </div>

          <Button disabled={isButtonDisabled} onClick={handleOtp}>
            Verify
          </Button>
        </form>
      </div>
    </div>
  );
};

export default OTPVerification;