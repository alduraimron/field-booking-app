import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ProfileDropdown from './ProfileDropdown';

function Navbar() {
    const [token, setToken] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
     // Fungsi untuk memeriksa status login dan data user dari sessionStorage
    const checkLoginStatus = () => {
        const token = sessionStorage.getItem('sanctumToken');
        const userDataString = sessionStorage.getItem('user'); // Ambil data user sebagai string JSON

        if (token && userDataString) {
            setToken(token);
            setIsLoggedIn(true);
            try {
                // Pastikan userDataString valid JSON
                setUser(JSON.parse(userDataString));
            } catch (e) {
                console.error("Error parsing user data from sessionStorage:", e);
                setUser(null); // Reset user jika parsing gagal
                setIsLoggedIn(false); // Reset isLoggedIn jika ada masalah data
            }
        } else {
            setIsLoggedIn(false);
            setUser(null);
        }
    };

    // Effect untuk inisialisasi dan mendengarkan event 'storage'
    useEffect(() => {
        // 1. Panggil saat komponen dimuat pertama kali
        checkLoginStatus();

        // 2. Tambahkan event listener untuk memantau perubahan storage
        // Ini akan terpicu jika ada perubahan dari tab lain atau jika Anda dispatch secara manual
        window.addEventListener('storage', checkLoginStatus);

        // 3. Cleanup function: hapus event listener saat komponen dilepas
        return () => {
            window.removeEventListener('storage', checkLoginStatus);
        };
    }, []); // Dependensi kosong agar hanya berjalan sekali saat mount

    // Effect untuk debugging (opsional, bisa dihapus setelah fix)
    useEffect(() => {
        console.log("Navbar: isLoggedIn changed to", isLoggedIn);
        console.log("Navbar: User data changed to", user);
    }, [isLoggedIn, user]);



    return (
        <nav className="bg-white dark:bg-zinc-900 md:fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-4 px-4 sm:px-6 sm:max-w-xl md:max-w-2xl lg:max-w-5xl xl:max-w-7xl">
                <Link
                    to="/"
                    className="flex items-center space-x-3 rtl:space-x-reverse"
                >
                    {/* <img
                        src="https://flowbite.com/docs/images/logo.svg"
                        className="h-8"
                        alt="Flowbite Logo"
                    /> */}
                    <div className="relative mr-3">
                        <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                            <div className="flex space-x-1">
                                <div className="w-0.5 h-3 bg-yellow-400 rounded-full" />
                                <div className="w-0.5 h-4 bg-yellow-400 rounded-full" />
                                <div className="w-0.5 h-3 bg-yellow-400 rounded-full" />
                            </div>
                        </div>
                        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-orange-500 rounded-full" />
                    </div>
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                        Seport
                    </span>
                </Link>
                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    {!isLoggedIn ? (
                        <Link to="/login">
                            <button
                                type="button"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-yellow-700"
                            >
                                Login
                            </button>
                        </Link>
                    ) : (
                        <Link to="/profile" className="flex items-center space-x-2 cursor-pointer">
                            <img
                                src={user?.avatarUrl || 'https://ui-avatars.com/api/?name=' + (user?.name || 'User')}
                                alt="User avatar"
                                className="w-8 h-8 rounded-full"
                            />
                            <span className="text-gray-800 dark:text-white font-medium hidden sm:inline">
                                {user?.name || 'Profil'} {/* Ubah teks menjadi "Profil" atau nama user */}
                            </span>
                        </Link>
                    )}
                </div>
                {/* <button
                        data-collapse-toggle="navbar-sticky"
                        type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        aria-controls="navbar-sticky"
                        aria-expanded="false"
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg
                            className="w-5 h-5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 17 14"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M1 1h15M1 7h15M1 13h15"
                            />
                        </svg>
                    </button> */}

                {/* <div
                    className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
                    id="navbar-sticky"
                >
                    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li>
                            <a
                                href="#"
                                className="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                                aria-current="page"
                            >
                                Home
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                            >
                                About
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                            >
                                Services
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                            >
                                Contact
                            </a>
                        </li>
                    </ul>
                </div> */}
            </div>
        </nav>

    )
}

export default Navbar
