import React from 'react'
import LapanganJam from './LapanganJam'

function Lapangan({ id, deskripsi, visible, onToggleVisibility }) {
    return (
        <div className='mt-10 grid grid-cols-3 gap-4 w-full px-3'>
            {/*Gambar*/}
            <div className='w-full'>
                <img
                    className="rounded-xl h-[220px] object-cover object-center w-full mb-2"
                    src="https://cdn.pixabay.com/photo/2020/07/31/02/45/field-5451797_960_720.jpg"
                    alt="Gambar Lapangan" />
            </div>
            {/*Gambar*/}
            {/*Keterangan*/}
            <div className='col-span-2 w-full my-5'>
                <div className='flex h-full'>
                    <div className='shrink'>
                        <div className="flex flex-1 h-full">
                            <div
                                className="h-full w-0.5 bg-neutral-500 mr-2.5">
                            </div>
                        </div>
                    </div>
                    <div className='grow'>
                        <h3 className='font-sans font-bold text-left text-xl my-1.5'>
                            Deskripsi
                        </h3>
                        <p>
                            {deskripsi}
                        </p>
                        <button
                            type='button'
                            onClick={() => onToggleVisibility(id)}
                            className='mt-3 w-1/3 h-10 bg-red-800 hover:bg-red-900 active:bg-red-950 rounded-[12px] text-white font-bold text-[15px] py-2 flex items-center justify-center text-center no-underline'>
                            Lihat Jadwal
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                                className="inline size-6 ml-1">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                            </svg>

                        </button>
                        {visible ? (
                            <div className='w-full grid grid-cols-4 gap-4 pt-3'>
                                <LapanganJam jam="19:00 - 20:00" harga="Rp100.000"/>
                            </div>
                        ) : (
                            <div></div>
                        )}
                        
                    </div>
                </div>
            </div>
            {/*Keterangan*/}
        </div>
    )
}

export default Lapangan