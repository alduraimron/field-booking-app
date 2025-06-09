// TombolHari.jsx (Pastikan nama file ini sudah benar di project Anda)
import React from 'react';

// Terima prop baru: dateObject, isSelected, onSelect
function TombolHari({ hari, tanggal, dateObject, isSelected, onSelect }) {
  const handleClick = () => {
    onSelect(dateObject); // Panggil fungsi onSelect dengan objek Date lengkap
  };
  console.log(dateObject)

  return (
    <button
      type='button'
      onClick={handleClick}
      // Gunakan isSelected untuk mengubah styling tombol yang aktif
      className={`
        flex flex-col items-center justify-center
        w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28
        rounded-lg shadow-sm border
        transition-all duration-200 ease-in-out
        ${isSelected ? 'bg-green-600 text-white border-green-700' : 'bg-white text-gray-800 border-gray-200 hover:bg-gray-50'}
      `}
    >
      <span className={`font-semibold text-sm sm:text-base ${isSelected ? 'text-white' : 'text-gray-700'}`}>
        {hari}
      </span>
      <span className={`font-bold text-lg sm:text-xl ${isSelected ? 'text-white' : 'text-gray-900'}`}>
        {tanggal.split('-')[0]} {/* Hanya tampilkan tanggal numerik */}
      </span>
      <span className={`text-xs sm:text-sm ${isSelected ? 'text-white' : 'text-gray-600'}`}>
        {tanggal.split('-')[1]} {/* Hanya tampilkan nama bulan */}
      </span>
    </button>
  );
}

export default TombolHari;