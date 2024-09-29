import React from 'react'

const DashboardUserHeader = ({userName, Dashboardicon, heading}) => {
  return (
    <div className="flex flex-row items-center mb-10 bg-white rounded-2xl px-6 py-3 border-[1px] border-gray-2">
          <h1 className="text-sm md:text-xl">Hello <span className="font-medium">{userName}!!</span></h1>
          
          {/* Vertical Line */}
          <span className="ml-4 border-[1px] border-l-gray-500 h-6"></span>
          
          <div className="flex justify-center items-center ml-3">
            <span className="text-sm ml-0 md:ml-4">
              {Dashboardicon}
            </span>
            <p className="text-xs md:text-sm ml-1">{heading}</p>
          </div>
        </div>
  )
}

export default DashboardUserHeader