import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import useForm from "/src/hooks/useForm";
import { login } from '../apiservices/Authentication';
import { useDispatch } from "react-redux";
import toast from 'react-hot-toast';
import { StoreUser } from '../redux/authslice';

export default function Login() {
    const { errors, handleError, clearError } = useForm({
        EmailOrPhone: "",
        password: ""
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [user, setUser] = useState({
        EmailOrPhone: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await login(user);
            toast.success(response.data.message);
            dispatch(StoreUser(response.data.user));
            navigate("/dashboard");
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            setUser({
                EmailOrPhone: "",
                password: "",
            });
        }
    };

    return (
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-100">
            <div className="hidden md:flex md:w-1/2 items-center justify-center bg-indigo-50">
                <div className="flex flex-col items-center">
                    <img src="src/assets/Logo.png" alt="Logo" className="w-40 mb-6" />
                    <img src="src/assets/login.png" alt="Side Image" className="w-full max-w-lg" />
                </div>
            </div>

            <div className="w-full md:w-1/2 p-6 md:p-12">
                <form 
                    className="bg-white rounded-lg shadow-lg p-8 space-y-6"
                    onSubmit={handleLogin}
                    noValidate
                >
                    <h2 className="text-2xl font-bold text-gray-700 text-center">Login</h2>

                    <div>
                        <label htmlFor="email" className="block text-gray-600 font-medium">
                            Email or Phone <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="email"
                            name="EmailOrPhone"
                            type="text"
                            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-100"
                            placeholder="Enter your email or phone"
                            value={user.EmailOrPhone}
                            onChange={handleChange}
                        />
                        {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-gray-600 font-medium">
                            Password <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-100"
                                placeholder="Enter your password"
                                value={user.password}
                                onChange={handleChange}
                            />
                            <button 
                                type="button" 
                                onClick={togglePasswordVisibility} 
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                            >
                                <i className={fas ${showPassword ? 'fa-eye' : 'fa-eye-slash'}} />
                            </button>
                        </div>
                        {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input 
                                type="checkbox" 
                                id="rememberMe" 
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" 
                            />
                            <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-600">
                                Remember me
                            </label>
                        </div>
                        <Link to="/forget" className="text-sm text-red-500 hover:underline">
                            Forgot Password?
                        </Link>
                    </div>

                    <div>
                        <button 
                            type="submit" 
                            disabled={!user.EmailOrPhone || !user.password}
                            className="w-full bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
                        >
                            Sign In
                        </button>
                    </div>

                    <div className="text-center">
                        <p>
                            Don't have an account?{" "}
                            <Link to="/Registration" className="text-indigo-600 hover:underline">
                                Register
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}