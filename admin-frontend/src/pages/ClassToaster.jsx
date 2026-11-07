import React from 'react'
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';

const ClassToaster = ({ t, message, subMessage, onAgree, onDisagree }) => {
  return (
    <div
      className={`${
        t.visible ? 'animate-enter' : 'animate-leave'
      } max-w-md w-full bg-white shadow-xl rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5 transform transition-all duration-300 ease-in-out`}
    >
    <div className='flex flex-col w-full rounded-lg p-2'>
      <div className="flex-1 w-full p-4 rounded-lg">
        <div className="flex items-start rounded-lg">
          <div className="flex-1">
            <p className="text-md font-semibold text-gray-900">{message}</p>
            <p className=" text-sm text-gray-500">{subMessage}</p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between border-l rounded-lg">
        <button
          onClick={onAgree}
          className="w-full border-0 rounded-lg p-4 flex items-center justify-center text-sm font-medium text-green-600 bg-green-50 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-150 ease-in-out"
        >
          <CheckIcon/>&nbsp;
          Yes
        </button>
        <button
          onClick={onDisagree}
          className="w-full border-0 rounded-lg p-4 ml-1 flex items-center justify-center text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-150 ease-in-out"
        >
          <ClearIcon/>&nbsp;No
        </button>
      </div>
      </div>
    </div>
  )
}

export default ClassToaster
