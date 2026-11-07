import React from 'react'

const DoctorProfile = ({image, name, text}) => {
    return (
        <div className='w-full my-16 flex justify-center'>
            <div className='relative w-full md:w-3/4 flex flex-col md:flex-row p-6 rounded-3xl shadow-lg'>
                <div className='w-full md:w-1/5 flex justify-center md:justify-start'>
                    <img className='hidden md:block w-36 md:absolute md:bottom-0 md:left-0 lg:left-10' src={image} />
                </div>
                <div className='block md:hidden relative'>
                    <div className='flex justify-center'>
                        <img className='absolute bottom-0 w-36 text-center' src={image}/>
                        <div className='bg-[#E9F4EE] shadow-md w-full py-16 px-20 rounded-2xl'>
                        </div>
                    </div>
                </div>
                <div className='w-full md:w-4/5 mt-4 md:mt-0 md:ml-5'>
                    <h1 className='text-lg md:text-[25px] text-green-4 font-semibold'>{name}</h1>
                    <p className='text-sm my-2'>
                        {text} 
                    </p>
                </div>
            </div>
        </div>
    )
}

export default DoctorProfile