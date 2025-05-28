import React from 'react'

function LapanganJam({jam, harga}) {
    return (
        <div>
            <a href="">
                <div className='border border-solid border-gray-300 rounded-xl h-20'>
                    <div className='flex flex-col p-0 w-full h-full'>
                        <div className='flex w-full h-7/12 justify-center items-center font-bold'>
                            {jam}
                        </div>
                        <div className='flex w-full grow justify-center items-centers text-[14px]'>
                            {harga}
                        </div>
                    </div>
                </div>
            </a>
        </div>
    )
}

export default LapanganJam