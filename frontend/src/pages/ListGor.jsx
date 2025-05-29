import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function ListGor() {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [listGor, setListGor] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${BASE_URL}/api/fields`)
      .then(response => {
        const rawData = response.data.data;
        const flattenedData = rawData.flat(); // Karena data berbentuk nested array
        setListGor(flattenedData);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching GOR list:', err);
        setError('Gagal memuat daftar GOR.');
        setLoading(false);
      });
  }, [BASE_URL]);

  const handleClick = (id) => {
    // Redirect ke halaman Home dengan ID lapangan sebagai parameter (misalnya: /gor/1)
    navigate(`/gor/${id}`);
  };

  if (loading) return <div className="text-center p-8">Loading...</div>;
  if (error) return <div className="text-center p-8 text-red-600">{error}</div>;

  return (
    <>
      <Navbar />
      <div className="bg-white min-h-screen px-4 py-6 max-w-6xl mx-auto md:pt-20">

        <h1 className="text-2xl font-bold mb-6">Daftar GOR</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listGor.map(gor => (
            <div
              key={gor.id}
              className="cursor-pointer rounded-lg border shadow-sm hover:shadow-md transition p-4 bg-white"
              onClick={() => handleClick(gor.id)}
            >
              <img
                className="w-full h-48 object-cover rounded-md mb-4"
                src={`https://drive.google.com/thumbnail?id=${gor.image_path}&sz=w1000`}
                alt={gor.name}
              />
              <h2 className="text-lg font-semibold mb-1">{gor.name}</h2>
              <p className="text-sm text-gray-600 mb-2">{gor.address}</p>
              <p className="text-sm text-gray-700">{gor.description}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ListGor;
