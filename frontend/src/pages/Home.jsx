import React from 'react'
import Navbar from '../components/Navbar'

function Home() {
  return (
    <div className='bg-white'>
      <Navbar />
      <div className='max-w-7xl md:max-w-5xl mx-auto px-0 mt-5 pt-25'>
        <div className='flex flex-wrap p-0'>
          <div className='w-full'>
            <img
              className="rounded-xl h-[500px] object-cover object-center w-full mb-2"
              src="https://cdn.pixabay.com/photo/2020/07/31/02/45/field-5451797_960_720.jpg"
              alt="Gambar Lapangan" />
          </div>

          <div className='mt-10 grid grid-cols-3 gap-4 w-full px-3'>
            <div className='col-span-2 w-full my-5'>
              <h1 className='font-sans font-bold text-left text-3xl'>
                Lapangan Basket FILKOM
              </h1>
              <h5 className='mt-5 font-sans'>
                Malang, Jawa Timur
              </h5>
              <hr className="my-5 h-0.5 border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-50 dark:via-neutral-400" />
              <h3 className='font-sans font-bold text-left text-xl'>
                Deskripsi
              </h3>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nulla sint illo quas ab quae labore pariatur architecto adipisci. Mollitia odio iste obcaecati cupiditate temporibus eius corrupti! Natus tempora illum odit.
              <h3 className='font-sans font-bold text-left text-xl mt-5'>
                Aturan
              </h3>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nulla sint illo quas ab quae labore pariatur architecto adipisci. Mollitia odio iste obcaecati cupiditate temporibus eius corrupti! Natus tempora illum odit.
              <hr className="my-5 h-0.5 border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-50 dark:via-neutral-400" />
              {/* <h3 className='font-sans font-bold text-left text-xl'>
                Fasilitas
              </h3>
              <div>
                <ul className='list-disc list-inside'>
                  <li>Lapangan</li>
                  <li>Kamar mandi</li>
                  <li>Kelas abangku</li>
                </ul>
              </div> */}
            </div>
            <div>
              <div className='rounded-xl outline-hidden shadow-md p-3 h-fit'>
                <div className='flex-col'>
                  <div className='flex p-0'>
                    <div className='shrink w-fit'>
                      <h3 className='font-bold text-2xl mb-3'>
                        Rp 50.000 
                      </h3>
                    </div>
                    <div className='grow w-auto'>
                      <h5 className='pl-2 pt-2 text-gray-700'>
                        per sesi
                      </h5>
                    </div>
                  </div>
                  <div className='py-1.5 grow'>
                    <button 
                      className='w-full bg-red-800 rounded-[12px] hover:bg-red-900 active:bg-red-950 text-white font-bold text-[15px] py-2'
                      type='button'>
                      BOOK
                    </button>
                  </div>
                </div>
              </div>

              <div className='mt-5 rounded-xl outline-hidden shadow-md p-3 h-fit'>
                <h3 className='font-sans font-bold text-left text-xl'>
                Fasilitas
                </h3>
                <ul className='list-disc list-inside'>
                  <li>Lapangan</li>
                  <li>Kamar mandi</li>
                  <li>Kelas abangku</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className='w-full'>
          <h1 className='mt-5 font-sans font-bold text-left text-3xl'>
            Pilih Lapangan
          </h1>
        </div>
        <div className='flex gap-4 justify-center mt-5 rounded-xl outline-hidden shadow-md p-3 h-fit'>
          <div className='min-w-20 h-20'>
            <a href="">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full p-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
              </svg>
            </a>
          </div>
          <div className='min-w-20 h-20'>
            <a
              href="#"
              className='w-full h-full bg-red-800 rounded-[12px] text-white font-bold text-[15px] py-2 flex items-center justify-center text-center no-underline'
            >
              <div className='flex-col gap-1 justify-center'>
                <div>
                  Minggu
                </div>
                <div className='text-[10px]'>
                  04 Mei
                </div>
              </div>
            </a>
          </div>
          <div className='w-20 h-20'>
            <a
              href="#"
              className='w-full h-full bg-red-800 rounded-[12px] text-white font-bold text-[15px] py-2 flex items-center justify-center text-center no-underline'
            >
              <div className='flex-col gap-1 justify-center'>
                <div>
                  Senin
                </div>
                <div className='text-[10px]'>
                  05 Mei
                </div>
              </div>
            </a>
          </div>
          <div className='w-20 h-20'>
            <a
              href="#"
              className='w-full h-full bg-red-800 rounded-[12px] text-white font-bold text-[15px] py-2 flex items-center justify-center text-center no-underline'
            >
              <div className='flex-col gap-1 justify-center'>
                <div>
                  Selasa
                </div>
                <div className='text-[10px]'>
                  06 Mei
                </div>
              </div>
            </a>
          </div>
          <div className='w-20 h-20'>
            <a
              href="#"
              className='w-full h-full bg-red-800 rounded-[12px] text-white font-bold text-[15px] py-2 flex items-center justify-center text-center no-underline'
            >
              <div className='flex-col gap-1 justify-center'>
                <div>
                  Rabu
                </div>
                <div className='text-[10px]'>
                  07 Mei
                </div>
              </div>
            </a>
          </div>
          <div className='w-20 h-20'>
            <a
              href="#"
              className='w-full h-full bg-red-800 rounded-[12px] text-white font-bold text-[15px] py-2 flex items-center justify-center text-center no-underline'
            >
              <div className='flex-col gap-1 justify-center'>
                <div>
                  Kamis
                </div>
                <div className='text-[10px]'>
                  08 Mei
                </div>
              </div>
            </a>
          </div>
          <div className='w-20 h-20'>
            <a
              href="#"
              className='w-full h-full bg-red-800 rounded-[12px] text-white font-bold text-[15px] py-2 flex items-center justify-center text-center no-underline'
            >
              <div className='flex-col gap-1 justify-center'>
                <div>
                  Jum'at
                </div>
                <div className='text-[10px]'>
                  09 Mei
                </div>
              </div>
            </a>
          </div>
          <div className='w-20 h-20'>
            <a
              href="#"
              className='w-full h-full bg-red-800 rounded-[12px] text-white font-bold text-[15px] py-2 flex items-center justify-center text-center no-underline'
            >
              <div className='flex-col gap-1 justify-center'>
                <div>
                  Sabtu
                </div>
                <div className='text-[10px]'>
                  10 Mei
                </div>
              </div>
            </a>
          </div>
          <div className='w-20 h-20'>
            <a href="">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full p-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home