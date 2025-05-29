// Lapangan.jsx
import React, { useEffect, useState } from 'react';
import LapanganJam from './LapanganJam';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Terima prop onBookClick dari Home
function Lapangan({ id, deskripsi, visible, onToggleVisibility, selectedDate, onBookClick }) {
  const [allJadwal, setAllJadwal] = useState([]);
  const [filteredJadwal, setFilteredJadwal] = useState([]);
  const [loadingJadwal, setLoadingJadwal] = useState(false);
  const [errorJadwal, setErrorJadwal] = useState(null);

  useEffect(() => {
    if (visible) {
      setLoadingJadwal(true);
      setErrorJadwal(null);
      
      fetch(`${BASE_URL}/api/courts/${id}/schedules`)
        .then(res => {
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          return res.json();
        })
        .then(data => {
          if (data.status === "Request was success" && Array.isArray(data.data)) {
            setAllJadwal(data.data.flat()); 
          } else {
            setAllJadwal([]); 
            console.warn("API response format unexpected or no data:", data);
          }
        })
        .catch(err => {
          console.error("Gagal mengambil data jadwal:", err);
          setErrorJadwal('Gagal memuat jadwal.'); 
          setAllJadwal([]); 
        })
        .finally(() => {
          setLoadingJadwal(false);
        });
    } else {
        setAllJadwal([]);
        setFilteredJadwal([]);
        setErrorJadwal(null);
    }
  }, [visible, id, BASE_URL]);

  useEffect(() => {
    if (selectedDate && allJadwal.length > 0) {
      const selectedDate_YYYYMMDD = selectedDate.getFullYear() + '-' +
                                   ('0' + (selectedDate.getMonth() + 1)).slice(-2) + '-' +
                                   ('0' + selectedDate.getDate()).slice(-2);

      const newFilteredJadwal = allJadwal.filter(item => {
        const itemDateObject = new Date(item.date); 
        const itemDate_YYYYMMDD = itemDateObject.toISOString().split('T')[0];
        
        return itemDate_YYYYMMDD === selectedDate_YYYYMMDD;
      });
      setFilteredJadwal(newFilteredJadwal);
    } else if (!selectedDate) {
      setFilteredJadwal([]);
    } else if (allJadwal.length === 0 && !loadingJadwal) {
        setFilteredJadwal([]);
    }
  }, [allJadwal, selectedDate, loadingJadwal]);

  return (
    <div className='w-full px-4 sm:px-3 mt-6 sm:mt-8 lg:mt-10'>
      <div className='flex flex-col md:grid md:grid-cols-3 gap-4 w-full'>
        {/* Gambar (tidak ada perubahan) */}
        <div className='w-full sm:w-full'>
          <img
            className="rounded-lg w-full h-48 sm:h-52 lg:h-[220px] object-cover object-center"
            src="https://cdn.pixabay.com/photo/2020/07/31/02/45/field-5451797_960_720.jpg"
            alt="Gambar Lapangan"
          />
        </div>

        {/* Konten (tidak ada perubahan signifikan di sini) */}
        <div className='w-full sm:col-span-2 mt-4 sm:my-5'>
          <div className='flex h-full'>
            <div className='hidden md:block shrink'>
              <div className="flex flex-1 h-full">
                <div className="h-full w-0.5 bg-neutral-500 mr-2.5"></div>
              </div>
            </div>

            <div className='w-full sm:grow'>
              <div className='mb-4'>
                <h3 className='font-sans font-bold text-lg sm:text-xl mb-2'>
                  Deskripsi
                </h3>
                <p className='text-sm sm:text-base text-gray-700 leading-relaxed'>
                  {deskripsi}
                </p>
              </div>

              <button
                type='button'
                onClick={() => onToggleVisibility(id)}
                className='w-full sm:w-1/2 lg:w-1/3 h-12 sm:h-10 bg-green-600 hover:bg-green-700 active:bg-green-800 rounded-lg text-white font-bold text-sm sm:text-[15px] py-2 px-4 flex items-center justify-center transition-colors duration-200'>
                <span>Lihat Jadwal</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className={`w-5 h-5 ml-2 transition-transform duration-200 ${visible ? 'rotate-180' : ''}`}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </button>

              {visible && (
                <div className='w-full mt-4 sm:mt-3'>
                  {loadingJadwal ? (
                    <div className="text-gray-500 text-center">Memuat jadwal...</div>
                  ) : errorJadwal ? (
                    <div className="text-red-600 text-center">{errorJadwal}</div>
                  ) : filteredJadwal.length === 0 ? (
                    <div className="text-gray-500 text-center">Tidak ada jadwal tersedia untuk tanggal ini.</div>
                  ) : (
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4'>
                      {filteredJadwal.map((item) => (
                        <LapanganJam
                          key={item.id}
                          id={item.id}
                          jam={`${item.start_time.slice(0, 5)} - ${item.end_time.slice(0, 5)}`}
                          harga={`Rp${item.price.toLocaleString('id-ID')}`}
                          available={item.available}
                          onBookClick={onBookClick} // Meneruskan fungsi onBookClick ke LapanganJam
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Lapangan;