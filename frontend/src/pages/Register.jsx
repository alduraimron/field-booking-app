import React from 'react'
import { useState } from 'react';

function Register(){
    const [state, setState] = useState({
        password : "", 
        showPassword : false, 
        confirmPassword : "", 
        showConfirmPassword : false}
    );
    const password = state.password
    const showPassword = state.showPassword
    const confirmPassword = state.confirmPassword
    const showConfirmPassword = state.showConfirmPassword

    function setPasswordChange(newPassword){
        setState(prevState => {
            return {...prevState, password : newPassword}
        })
    }

    function setShowPassword(){
        setState(prevState => {
            return {...prevState, showPassword : !prevState.showPassword}
        })
    }

    function setConfirmPasswordChange(newConfirmPassword){
        setState(prevState => {
            return {...prevState, confirmPassword : newConfirmPassword}
        })
    }

    function setShowConfirmPassword(){
        setState(prevState => {
            return {...prevState, showConfirmPassword : !prevState.showConfirmPassword}
        })
    }

    return (
        <>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Seport - Register</title>
            <div className="flex min-h-screen">
                {/* Left Side - Welcome Section */}
                <div className="flex-1 bg-white flex flex-col items-center justify-center p-8">
                    {/* Logo */}
                    <div className="flex items-center mb-8">
                        {/* Carrot Icon */}
                        <div className="relative mr-3">
                            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                                <div className="flex space-x-1">
                                    <div className="w-1 h-4 bg-yellow-400 rounded-full" />
                                    <div className="w-1 h-5 bg-yellow-400 rounded-full" />
                                    <div className="w-1 h-4 bg-yellow-400 rounded-full" />
                                </div>
                            </div>
                            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-orange-500 rounded-full" />
                        </div>
                        {/* Brand Name */}
                        <h1 className="text-4xl font-bold text-gray-800">Seport</h1>
                    </div>
                    {/* Tagline */}
                    <p className="text-gray-600 text-lg text-center max-w-xs">
                        Cari GOR? Seport Aja!
                    </p>
                </div>
                {/* Right Side - Login Form */}
                <div className="flex-1 bg-gradient-to-b from-green-500 to-green-400 flex flex-col justify-center p-8">
                    <div className="max-w-sm mx-auto w-full">
                        {/* Welcome Text
                        <div className="text-white mb-8">
                            <h2 className="text-2xl font-semibold mb-2">Selamat Datang</h2>
                            <p className="text-green-100 text-sm leading-relaxed">
                                Masukkan data untuk mendaftar
                            </p>
                        </div> */}
                        {/* Register Form */}
                        <form className="space-y-4">
                            {/* Nama Field */}
                            <div>
                                <label className="block text-white text-sm font-medium mb-2">
                                    Nama
                                </label>
                                <input
                                    type="name"
                                    defaultValue=""
                                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-gray-800"
                                    placeholder="Enter your name"
                                />
                            </div>
                            {/* Email Field */}
                            <div>
                                <label className="block text-white text-sm font-medium mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    defaultValue=""
                                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-gray-800"
                                    placeholder="Enter your email"
                                />
                            </div>
                            {/* Password Field */}
                            <div>
                                <label className="block text-white text-sm font-medium mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPasswordChange(e.target.value)}
                                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-gray-800 pr-12"
                                        placeholder="Confirm your password"
                                    />
                                    <button
                                        type="button"
                                        onClick={setShowPassword}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        <svg
                                            className="w-5 h-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                            />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            {/* Confirm Password Field */}
                            <div>
                                <label className="block text-white text-sm font-medium mb-2">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPasswordChange(e.target.value)}
                                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-gray-800 pr-12"
                                        placeholder="Confirm your password"
                                    />
                                    <button
                                        type="button"
                                        onClick={setShowConfirmPassword}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        <svg
                                            className="w-5 h-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                            />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            {/* Register Button */}
                            <button
                                type="submit"
                                className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-semibold py-3 px-4 rounded-lg transition duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                            >
                                Register
                            </button>
                        </form>
                        {/* Login Link */}
                        <div className="text-center mt-6">
                            <p className="text-green-100 text-sm">
                                Sudah memiliki akun?
                                <a
                                    href="/login"
                                    className="text-yellow-300 hover:text-yellow-200 font-medium underline"
                                >
                                    Login sekarang
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Register