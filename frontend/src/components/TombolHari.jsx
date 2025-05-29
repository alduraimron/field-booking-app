import React from 'react'

function TombolHari({hari, tanggal, size}) {
    const sizeClasses = size ? `min-w-${size} h-${size}` : 'min-w-15 h-15'
    return (
        <div className={`${sizeClasses}`}>
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