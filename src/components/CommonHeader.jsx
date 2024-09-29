import React from 'react'

const CommonHeader = ({heading, icon})=> {
  return (
    <div className='w-full'>
        <div className='flex flex-row items-center mb-10'>
          <h1 className="text-md md:text-xl lg:text-2xl">Hello <span className="font-medium">Admin!!</span></h1>
          <span className="ml-4 border-[1px] border-l-gray-500 h-12"></span>
          <div className="flex justify-center items-center">
            <span className="text-1xl ml-2">{icon}</span>
            <p className="text-lg ml-1">{heading}</p>
          </div>
        </div>        
    </div>
  )
}

export default CommonHeader