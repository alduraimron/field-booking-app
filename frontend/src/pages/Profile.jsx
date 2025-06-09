import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const userData = sessionStorage.getItem('user');
        if (userData) {
            try {
                setUser(JSON.parse(userData));
            } catch (error) {
                console.error("Failed to parse user data from session storage:", error);
                setUser(null);
            }
        }
        setLoading(false);
    }, []);

    const handleLogout = () => {
        sessionStorage.removeItem('sanctumToken');
        sessionStorage.removeItem('user');
        window.dispatchEvent(new Event('storage')); // Trigger storage event
        // Tidak perlu setIsLoggedIn atau setUser di sini karena ini adalah halaman,
        // dan Navbar akan mendengarkan event storage.
        navigate('/login'); // Redirect ke halaman login
    };

    if (loading) {
        return (
            <div className='bg-white min-h-screen flex items-center justify-center'>
                <p>Memuat profil...</p>
            </div>
        );
    }

    if (!user) {
        return (
            <div className='bg-white min-h-screen'>
                <Navbar />
                <div className='mx-auto px-4 pt-16 mt-5 sm:px-6 max-w-full sm:max-w-xl md:max-w-2xl lg:max-w-5xl xl:max-w-7xl text-center'>
                    <h1 className='font-sans font-bold text-xl sm:text-2xl lg:text-3xl text-left mb-3'>
                        Profil Tidak Ditemukan
                    </h1>
                    <p className='text-gray-700'>
                        Anda perlu login untuk melihat halaman profil.
                    </p>
                    <button
                        onClick={() => navigate('/login')}
                        className='mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-yellow-700'
                    >
                        Login Sekarang
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className='bg-white min-h-screen'>
            <Navbar />

            <div className='mx-auto px-4 pt-16 mt-5 sm:px-6 sm:pt-20 max-w-full sm:max-w-xl md:max-w-2xl lg:max-w-5xl xl:max-w-7xl'>
                <h1 className='font-sans font-bold text-xl sm:text-2xl lg:text-3xl text-left mb-6'>
                    Profil Pengguna
                </h1>

                <div className='bg-white rounded-lg shadow-md border border-gray-100 p-6 mb-6'>
                    <div className='flex flex-col items-center sm:flex-row sm:space-x-6'>
                        <img
                            src={user.avatarUrl || 'https://ui-avatars.com/api/?name=' + (user.name || 'User')}
                            alt="User Avatar"
                            className="w-24 h-24 rounded-full object-cover mb-4 sm:mb-0"
                        />
                        <div className='text-center sm:text-left'>
                            <h2 className='font-bold text-xl sm:text-2xl text-gray-900'>{user.name || 'Nama Pengguna'}</h2>
                            <p className='text-gray-600'>{user.email || 'email@example.com'}</p>
                            {/* Anda bisa menambahkan detail profil lain di sini */}
                            {/* <p className='text-gray-600 mt-2'>Role: {user.role || 'Pengguna'}</p> */}
                        </div>
                    </div>
                    <hr className="my-6 h-0.5 border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-200 to-transparent opacity-50" />
                    <div className='flex justify-center sm:justify-start'>
                        <button
                            onClick={handleLogout}
                            className='text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-700'
                        >
                            Logout
                        </button>
                    </div>
                </div>

                {/* Anda bisa menambahkan bagian lain di halaman profil, misalnya riwayat booking, pengaturan, dll.
                <div className='bg-white rounded-lg shadow-md border border-gray-100 p-6'>
                    <h3 className='font-sans font-bold text-lg sm:text-xl mb-3'>
                        Informasi Tambahan
                    </h3>
                    <p className='text-sm sm:text-base text-gray-700'>
                        Ini adalah halaman profil Anda. Anda bisa mengedit detail atau melihat riwayat aktivitas di sini (fitur tambahan).
                    </p>
                </div> */}

            </div>
        </div>
    );
};

export default Profile