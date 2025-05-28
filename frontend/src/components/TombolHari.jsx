import React from 'react'

function TombolHari({hari, tanggal}) {
    return (
        <div className='min-w-20 h-20'>
            <a
                href="#"
                className='w-full h-full bg-red-800 rounded-[12px] text-white font-bold text-[15px] py-2 flex items-center justify-center text-center no-underline'
            >
                <div className='flex-col gap-1 justify-center'>
                    <div>
                        {hari}
                    </div>
                    <div className='text-[10px]'>
                        {tanggal}
                    </div>
                </div>
            </a>
        </div>
    )
}

export default TombolHari