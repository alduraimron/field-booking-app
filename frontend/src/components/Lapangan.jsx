import React from 'react'

function Lapangan() {
    return (
        <div className='mt-10 grid grid-cols-3 gap-4 w-full px-3'>
            <div className='w-full'>
                <img
                    className="rounded-xl h-full object-cover object-center w-full mb-2"
                    src="https://cdn.pixabay.com/photo/2020/07/31/02/45/field-5451797_960_720.jpg"
                    alt="Gambar Lapangan" />
            </div>
            <div className='col-span-2 w-full my-5'>
                <div className='flex h-full'>
                    <div className='shrink'>
                        <div class="flex flex-1 h-full">
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
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor error iure odit, quibusdam quasi praesentium tempora unde architecto necessitatibus, et facilis? Reiciendis, placeat accusantium! Incidunt ipsum laboriosam consequatur cum nemo?
                        </p>
                        <button
                            type='button'
                            className='mt-3 w-1/3 h-10 bg-red-800 hover:bg-red-900 active:bg-red-950 rounded-[12px] text-white font-bold text-[15px] py-2 flex items-center justify-center text-center no-underline'>
                            Lihat Jadwal
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Lapangan