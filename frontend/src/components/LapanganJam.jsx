// LapanganJam.jsx
import React from 'react';
import { privateApi } from '../api/axiosConfig';

// Terima prop 'onBookClick'
function LapanganJam({id, jam, harga, available, onBookClick }) {

  const buttonClasses = `
    w-full h-16 sm:h-20
    rounded-lg shadow-sm
    flex flex-col items-center justify-center
    font-bold text-sm sm:text-base
    transition-all duration-200 ease-in-out
    ${
      available // Jika 'available' true
        ? 'bg-white text-green-600 border border-green-600 hover:bg-green-600 hover:text-white active:bg-green-700'
        : 'bg-gray-200 text-gray-500 border border-gray-300 cursor-not-allowed opacity-70' // Jika 'available' false
    }
  `;

  // Handler klik tombol LapanganJam
  const handleClick = () => {
    if (available && onBookClick) { // Pastikan tersedia dan ada fungsi onBookClick
      onBookClick(); // Panggil fungsi dari prop
        console.log(id)
        const response = privateApi.post('/api/bookings', {
            schedule_id: id,
        });
        console.log(response)
    }
  };

  return (
    <button
      type='button'
      className={buttonClasses}
      disabled={!available} // Menonaktifkan tombol jika tidak 'available'
      onClick={handleClick} // Tambahkan onClick handler
    >
      <span className="mb-1">{jam}</span>
      <span>{harga}</span>
      {!available && (
        <span className="text-xs mt-1 text-gray-600">Terisi</span>
      )}
    </button>
  );
}

export default LapanganJam;