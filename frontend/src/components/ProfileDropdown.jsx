import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const ProfileDropdown = ({ user, setIsLoggedIn, setUser }) => {
  const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate(); // Initialize navigate

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        sessionStorage.removeItem('sanctumToken');
        sessionStorage.removeItem('user');
        window.dispatchEvent(new Event('storage')); // Trigger storage event
        setIsLoggedIn(false);
        setUser(null);
        setIsOpen(false); // Close dropdown after logout
        navigate('/login'); // Redirect to login page after logout
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <div
                className="flex items-center space-x-2 cursor-pointer"
                onClick={toggleDropdown}
            >
                <img
                    src={user?.avatarUrl || 'https://ui-avatars.com/api/?name=' + (user?.name || 'User')}
                    alt="User avatar"
                    className="w-8 h-8 rounded-full"
                />
                <span className="text-gray-800 dark:text-white font-medium hidden sm:inline">
                    {user?.name || 'User'}
                </span>
            </div>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-zinc-800 rounded-md shadow-lg py-1 z-50">
                    <div className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200">
                        {user?.email || 'user@example.com'} {/* Display user email or default */}
                    </div>
                    <hr className="border-gray-200 dark:border-gray-600" />
                    <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-zinc-700"
                    >
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
}

export default ProfileDropdown;