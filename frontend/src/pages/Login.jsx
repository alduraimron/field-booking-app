import axios from 'axios';
import React, { useState } from 'react'
import {  useNavigate } from 'react-router-dom';
import { publicApi } from '../api/axiosConfig';

function Login() {
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await publicApi.post('/api/login', {
                email, 
                password,
            });
            // const response = await axios.post(`${BASE_URL}/api/login`, {
            //     email,
            //     password,
            // });
            if (response.status === 201 || response.status === 200) {
                //const {user, token} = response.data.data;
                const token = response.data.data.token;
                const user = response.data.data.user;
                if (token && user) {
                    sessionStorage.setItem('sanctumToken', token);
                    sessionStorage.setItem('user', JSON.stringify(user));
                    window.dispatchEvent(new Event('storage'));
                }
                setEmail('');
                setPassword('');
                navigate('/');
            }else{
                console.log('memek');
            }
            console.log('asu');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Seport - Login</title>

            <div className="min-h-screen bg-white">
                <div className="flex flex-col lg:flex-row min-h-screen">

                    {/* Welcome Section - Only on Desktop */}
                    <div className="hidden lg:flex w-full lg:flex-1 bg-white flex-col items-center justify-center p-6 sm:p-8 py-8 lg:py-16">
                        {/* Logo Section */}
                        <div className="flex items-center mb-6 sm:mb-8">
                            {/* Carrot Icon */}
                            <div className="relative mr-3">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-600 rounded-full flex items-center justify-center">
                                    <div className="flex space-x-1">
                                        <div className="w-1 h-3 sm:h-4 bg-yellow-400 rounded-full" />
                                        <div className="w-1 h-4 sm:h-5 bg-yellow-400 rounded-full" />
                                        <div className="w-1 h-3 sm:h-4 bg-yellow-400 rounded-full" />
                                    </div>
                                </div>
                                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-orange-500 rounded-full" />
                            </div>
                            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">Seport</h1>
                        </div>
                        <p className="text-gray-600 text-base sm:text-lg text-center max-w-xs px-4">
                            Cari GOR? Seport Aja!
                        </p>
                    </div>

                    {/* Login Form Section */}
                    <div className="w-full min-h-screen lg:flex-1 bg-gradient-to-b from-green-500 to-green-400 flex flex-col justify-center p-6 sm:p-8 py-8 lg:py-16">
                        <div className="max-w-sm mx-auto h-full w-full">

                            {/* Logo + Tagline - Mobile Only */}
                            <div className="block lg:hidden text-center mb-6 sm:mb-8">
                                <div className="flex justify-center items-center mb-3">
                                    <div className="relative mr-3">
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-600 rounded-full flex items-center justify-center">
                                            <div className="flex space-x-1">
                                                <div className="w-1 h-3 sm:h-4 bg-yellow-400 rounded-full" />
                                                <div className="w-1 h-4 sm:h-5 bg-yellow-400 rounded-full" />
                                                <div className="w-1 h-3 sm:h-4 bg-yellow-400 rounded-full" />
                                            </div>
                                        </div>
                                        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-orange-500 rounded-full" />
                                    </div>
                                    <h1 className="text-3xl sm:text-4xl font-bold text-white">Seport</h1>
                                </div>
                                <p className="text-green-100 text-sm sm:text-base px-4">
                                    Cari GOR? Seport Aja!
                                </p>
                            </div>

                            {/* Welcome Text */}
                            <div className="text-white mb-6 sm:mb-8">
                                <h2 className="text-xl sm:text-2xl font-semibold mb-2">Selamat Datang</h2>
                                <p className="text-green-100 text-sm leading-relaxed">
                                    Masukkan email dan password untuk mengakses akun anda. Jika belum
                                    memiliki akun silahkan daftar terlebih dahulu
                                </p>
                            </div>

                            {/* Login Form */}
                            <form className="space-y-4 sm:space-y-5" onSubmit={handleSubmit}>
                                {/* Email */}
                                <div>
                                    <label className="block text-white text-sm font-medium mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full px-4 py-3 sm:py-3.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-gray-800 text-base"
                                        placeholder="Enter your email"
                                        required
                                    />
                                </div>

                                {/* Password */}
                                <div>
                                    <label className="block text-white text-sm font-medium mb-2">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            name="password"
                                            value={password}
                                            onChange={handlePasswordChange}
                                            className="w-full px-4 py-3 sm:py-3.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-gray-800 pr-12 text-base"
                                            placeholder="Enter your password"
                                            required
                                        />
                                        <button
                                            type="button"
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
                                            onClick={toggleShowPassword}
                                            aria-label={showPassword ? "Hide password" : "Show password"}
                                        >
                                            {showPassword ? (
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L8.464 8.464M9.878 9.878a3 3 0 00.7 2.122m5.657 5.657l1.414 1.414M14.828 14.828a3 3 0 01-.7-2.122m0 0l1.414-1.414m-1.414 1.414L14.828 14.828" />
                                                </svg>
                                            ) : (
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                            )}
                                        </button>
                                    </div>
                                </div>

                                {/* Submit */}
                                <button
                                    type="submit"
                                    className="w-full bg-yellow-400 hover:bg-yellow-500 active:bg-yellow-600 text-gray-800 font-semibold py-3.5 sm:py-4 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-yellow-300 text-base sm:text-lg"
                                >
                                    Log In
                                </button>
                            </form>

                            {/* Link to Register */}
                            <div className="text-center mt-6 sm:mt-8">
                                <p className="text-green-100 text-sm">
                                    Belum memiliki akun?{' '}
                                    <a
                                        href="/register"
                                        className="text-yellow-300 hover:text-yellow-200 font-medium underline transition-colors duration-200"
                                    >
                                        Daftar sekarang
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login