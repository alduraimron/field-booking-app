import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Lapangan from '../components/Lapangan';
import GarisLapangan from '../components/GarisLapangan';
import TombolHari from '../components/TombolHari';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Footer from '../components/Footer';
import  {privateApi} from '../api/axiosConfig';

// Komponen Modal/Popup baru
const PaymentModal = ({ onClose, onCloseBayar, description }) => {
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose} // Menutup saat klik di luar konten
    >
      <div 
        className="bg-white rounded-lg p-6 sm:p-8 max-w-sm sm:max-w-md w-full shadow-lg relative"
        onClick={(e) => e.stopPropagation()} // Mencegah klik di dalam modal menutupnya
      >
        <h2 className="font-sans font-bold text-xl sm:text-2xl mb-4 text-gray-900">
          Tata Cara Pembayaran
        </h2>
        <div className="text-sm sm:text-base text-gray-700 leading-relaxed mb-6">
          {description ? (
            <p>{description}</p>
          ) : (
            <>
              <p className="mb-2">1. Lakukan pembayaran via transfer bank ke rekening berikut:</p>
              <p className="font-mono bg-gray-100 p-2 rounded text-gray-800">Bank Mandiri: 1440023975425 (a.n. Aldura Armanu Shaufa)</p>
              {/* <p className="mb-2">2. Cantumkan ID booking Anda pada catatan transfer.</p> */}
              <p className="mb-2">2. Screenshot bukti transfer dan kirimkan ke WhatsApp admin.</p>
              <p className="mb-2">3. Booking Anda akan dikonfirmasi setelah pembayaran diverifikasi.</p>
            </>
          )}
        </div>
        <button
          onClick={onCloseBayar}
          className="w-full bg-green-600 rounded-lg hover:bg-green-700 active:bg-green-800 text-white font-bold text-sm sm:text-base py-2.5 px-4 transition-colors duration-200"
        >
          Bayar
        </button>
      </div>
    </div>
  );
};


function getSevenDaysDetails(dateInput = new Date()) {
  const startDate = new Date(dateInput);
  startDate.setHours(0, 0, 0, 0); // Reset waktu ke 00:00:00:000

  const weekDetails = [];
  const dayNames = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const monthNames = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  for (let i = 0; i < 7; i++) {
    const currentDay = new Date(startDate);
    currentDay.setDate(startDate.getDate() + i);

    weekDetails.push({
      dateObject: currentDay,
      hari: dayNames[currentDay.getDay()],
      tanggal: currentDay.getDate().toString(),
      bulan: monthNames[currentDay.getMonth()]
    });
  }
  return weekDetails;
}

function Home() {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const { id } = useParams();

  const [lapangan, setLapangan] = useState(null);
  const [list_lapangan, setListLapangan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date()); 
  
  // State baru untuk popup
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  // Optional: Anda bisa menyimpan deskripsi pembayaran di sini jika setiap lapangan memiliki deskripsi berbeda
  const [paymentDescription, setPaymentDescription] = useState(null);

  // Effect untuk mengambil detail lapangan utama
  useEffect(() => {
    axios.get(`${BASE_URL}/api/fields/${id}`)
      .then(response => {
        setLapangan(response.data.data[0]);
        // Set deskripsi pembayaran dari lapangan utama jika ada
        // Asumsi ada properti 'payment_rules' atau 'payment_description' di data lapangan
        if (response.data.data[0] && response.data.data[0].payment_rules) {
            setPaymentDescription(response.data.data[0].payment_rules);
        } else {
            setPaymentDescription(null); // Jika tidak ada, pakai default di modal
        }
      })
      .catch(err => {
        console.error('Error fetching field data:', err);
        setError('Failed to load field data.');
      });
  }, [BASE_URL, id]);

  // Effect untuk mengambil daftar lapangan (courts)
  useEffect(() => {
    axios.get(`${BASE_URL}/api/fields/${id}/courts`)
      .then(response => {
        const rawData = response.data.data;
        const processedData = rawData.flat().map(item => ({
          ...item,
          visible: false
        }));
        setListLapangan(processedData);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching courts data:', err);
        setError('Failed to load courts data.');
        setLoading(false);
      });
  }, [BASE_URL, id, showPaymentModal]);

  const toggleVisibility = (idToToggle) => {
    setListLapangan(prevListLapangan => {
      if (!Array.isArray(prevListLapangan)) {
        console.warn("prevListLapangan is not an array, cannot toggle visibility.");
        return prevListLapangan;
      }
      return prevListLapangan.map(lapanganItem => {
        if (lapanganItem.id === idToToggle) {
          return { ...lapanganItem, visible: !lapanganItem.visible };
        }
        return lapanganItem;
      });
    });
  };

  const handleDateSelect = (dateObject) => {
    setSelectedDate(dateObject);
    setListLapangan(prevList => prevList.map(item => ({ ...item, visible: false })));
  };

  // Fungsi untuk menampilkan popup pembayaran
  const handleShowPaymentModal = () => {
    setShowPaymentModal(true);
  };

  // Fungsi untuk menutup popup pembayaran
  const handleClosePaymentModal = () => {
    setShowPaymentModal(false);
  };

  // Fungsi untuk menutup popup pembayaran dan membayar
  const handleClosePaymentModalBayar = () => {
    setShowPaymentModal(false);
    
  };

  // Pastikan selectedDate disetel ke waktu awal hari ini untuk perbandingan yang akurat
  useEffect(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    setSelectedDate(today);
  }, []);

  const list_tanggal = getSevenDaysDetails();

  if (loading) {
    return <div className="text-center p-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center p-8 text-red-600">{error}</div>;
  }

  return (
    <div className='bg-white min-h-screen'>
      <Navbar />

      <div className='mx-auto px-4 pt-16 mt-5 sm:px-6 sm:pt-20 max-w-full sm:max-w-xl md:max-w-2xl lg:max-w-5xl xl:max-w-7xl'>

        <div className='w-full mb-4'>
          <img
            className="rounded-lg w-full h-48 sm:h-64 md:h-80 lg:h-[500px] object-cover object-center"
            src={
              lapangan && (`https://drive.google.com/thumbnail?id=${lapangan.image_path}&sz=w1000`)
            }
            alt="Gambar Lapangan"
          />
        </div>

        <div className='w-full'>
          <div className='flex flex-col lg:grid lg:grid-cols-3 lg:gap-6'>

            <div className='w-full lg:col-span-2 mb-6 lg:mb-0'>

              <div className='mb-6'>
                <h1 className='font-sans font-bold text-xl sm:text-2xl lg:text-3xl text-left mb-3'>
                  {lapangan?.name}
                </h1>
                <h5 className='font-sans text-sm sm:text-base text-gray-600'>
                  {lapangan?.address}
                </h5>
              </div>

              <hr className="mb-6 h-0.5 border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-50" />

              <div className='mb-6'>
                <h3 className='font-sans font-bold text-lg sm:text-xl mb-3'>
                  Deskripsi
                </h3>
                <p className='text-sm sm:text-base text-gray-700 leading-relaxed'>
                  {lapangan?.description}
                </p>
              </div>

              <div className='mb-6'>
                <h3 className='font-sans font-bold text-lg sm:text-xl mb-3'>
                  Aturan
                </h3>
                <ul className='list-disc list-inside space-y-1 text-sm sm:text-base text-gray-700'>
                  {lapangan?.rules && lapangan.rules.map((rule, index) => (
                    <li key={index}>{rule}</li>
                  ))}
                </ul>
              </div>

              <hr className="mb-6 h-0.5 border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-50" />
            </div>

            <div className='w-full space-y-4'>

              <div className='rounded-lg shadow-md border border-gray-100 p-4 bg-white'>
                <div className='flex items-center justify-between mb-4'>
                  <div className='flex items-baseline'>
                    <h3 className='font-bold text-xl sm:text-2xl text-gray-900'>
                      Rp 50.000
                    </h3>
                    <span className='ml-2 text-sm text-gray-600'>
                      per sesi
                    </span>
                  </div>
                </div>

                {/* Tombol BOOK, sekarang memanggil handleShowPaymentModal */}
                <button
                  type='button'
                  onClick={handleShowPaymentModal}
                  className='block w-full text-center bg-green-600 rounded-lg hover:bg-green-700 active:bg-green-800 text-white font-bold text-sm sm:text-base py-3 px-4 transition-colors duration-200'
                >
                  BOOK
                </button>
              </div>

              <div className='rounded-lg shadow-md border border-gray-100 p-4 bg-white'>
                <h3 className='font-sans font-bold text-lg sm:text-xl mb-3'>
                  Fasilitas
                </h3>
                <ul className='list-disc list-inside space-y-1 text-sm sm:text-base text-gray-700'>
                  {lapangan?.facilities && (
                    lapangan.facilities.map((facility, index) => (
                      <li key={index}>{facility}</li>
                    ))
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className='w-full mt-8'>
          <h1 className='font-sans font-bold text-xl sm:text-2xl lg:text-3xl mb-6' id='pilih-lapangan'>
            Pilih Lapangan
          </h1>

          <div className='w-full mb-6'>
            <div className='flex md:justify-center items-center gap-2 sm:gap-4 p-3 sm:p-4 rounded-lg shadow-md border border-gray-100 bg-white overflow-x-auto scrollbar-hide'>
              {list_tanggal.map((tanggal, index) => (
                <div key={index} className='flex-shrink-0'>
                  <TombolHari
                    hari={tanggal.hari}
                    tanggal={tanggal.tanggal + " " + tanggal.bulan}
                    dateObject={tanggal.dateObject}
                    isSelected={
                      selectedDate.toDateString() === tanggal.dateObject.toDateString()
                    }
                    onSelect={handleDateSelect}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className='w-full'>
            {list_lapangan.map(item => (
              <div key={item.id}>
                <Lapangan
                  id={item.id}
                  deskripsi={item.description}
                  visible={item.visible}
                  onToggleVisibility={toggleVisibility}
                  selectedDate={selectedDate}
                  onBookClick={handleShowPaymentModal} // Meneruskan fungsi ke Lapangan
                />
                <GarisLapangan />
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />

      {/* Render PaymentModal jika showPaymentModal true */}
      {showPaymentModal && (
        <PaymentModal 
          onClose={handleClosePaymentModal} 
          onCloseBayar={handleClosePaymentModalBayar}
          description={paymentDescription} // Kirim deskripsi yang didapat dari API
        />
      )}
    </div>
  );
}

export default Home;