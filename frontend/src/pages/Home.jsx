import React from 'react'
import Navbar from '../components/Navbar'
import Lapangan from '../components/Lapangan'
import GarisLapangan from '../components/GarisLapangan'
import TombolHari from '../components/TombolHari'

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
                  <div className='py-1.5 grow w-full'>
                    <a 
                      className='flex justify-center w-full  bg-red-800 rounded-[12px] hover:bg-red-900 active:bg-red-950 text-white font-bold text-[15px] py-2'
                      href='/#pilih-lapangan'>
                      BOOK
                    </a>
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
          <h1 className='mt-5 font-sans font-bold text-left text-3xl' id='pilih-lapangan'>
            Pilih Lapangan
          </h1>
        </div>
        <div className='flex gap-4 justify-center mt-5 rounded-xl outline-hidden shadow-md p-3 h-fit w-fit justify-self-center'>
          <div className='min-w-15 h-15'>
            <a href="">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full p-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
              </svg>
            </a>
          </div>
          <TombolHari hari="Minggu" tanggal="04 Mei"/>
          <TombolHari hari="Senin" tanggal="05 Mei"/>
          <TombolHari hari="Selasa" tanggal="06 Mei"/>
          <TombolHari hari="Rabu" tanggal="07 Mei"/>
          <TombolHari hari="Kamis" tanggal="08 Mei"/>
          <TombolHari hari="Jum'at" tanggal="09 Mei"/>
          <TombolHari hari="Sabtu" tanggal="10 Mei"/>
          <div className='w-15 h-15'>
            <a href="">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full p-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </a>
          </div>
        </div>
        <div>
          <Lapangan/>
          <GarisLapangan/>
          <Lapangan/>
          <GarisLapangan/>
          <Lapangan/>
          <GarisLapangan/>
        </div>
      </div>
    </div>
  )
}

export default Home