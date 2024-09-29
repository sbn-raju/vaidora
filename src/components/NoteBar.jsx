import React from 'react'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from "axios"



const NoteBar = () => {
  const fetchNotification = async()=>{
    const response = await axios.get("/api/v1/admin/message/getMessage");
    return response?.data
  }
  
  const {data: getNotification} = useQuery({
    queryKey:['getNotify'],
    queryFn:fetchNotification
  })
  
  
  
  console.log(getNotification);
  
  return (
    <>
    {getNotification?.data != null? <div className="w-full bg-red-200 rounded-2xl border-[1px] border-red-600 my-6 p-2 px-4 shadow-md">
        <p className='my-2 font-medium text-sm md:text-base'>Note</p>
        <p className='my-2 text-[10px] md:text-sm'>{getNotification?.data.message_data}</p>
    </div> : <div></div> }
    </>
    
  )
}

export default NoteBar