import React, {useEffect } from 'react';
import Input from "../components/Input";
import { useForm } from 'react-hook-form';
import {toast} from "react-hot-toast";
import {useMutation, useQuery} from "@tanstack/react-query";
import axios from "axios";
import ScheduleSendIcon from '@mui/icons-material/ScheduleSend';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CommonHeader from '../components/CommonHeader';
import { logoutAdmin } from '../slices/adminSlice';
import { useDispatch } from 'react-redux';


const SetSlotsPage = () => {
  document.title = 'Set Slots | Admin'
  const { register, handleSubmit, reset } = useForm();

  const dispatch = useDispatch();
  
  const setSlotData = async(formData)=>{
   try {
     const response = await axios.post("/api/v1/appointment/create/slot",formData)
     return response
   } catch (error) {
    console.log(error);
    if (isValidToken(error)) {
      dispatch(logoutAdmin());
    } else {
      console.log(error);
      toast.error(error.response.data.message);
      return Promise.reject(error);
    }
   }
  }

  const createSlot = useMutation({
    mutationFn:setSlotData,
  })
  
  const onSubmit = (data) => {
    createSlot.mutate(data);
  };

  useEffect(() => {
     if(createSlot.isSuccess){
      toast.success("All slots have been created successfully.")
      reset()
     }
     else if(createSlot.isError) {
      toast.error("Slots could not be set up successfully.")
     }
  }, [createSlot.isSuccess, createSlot.isError, reset])
  

  



 const fetchDoctor = async()=>{
   try {
    const response = await axios.get("/api/v1/doctor/get-doctors")
    return response.data.data
   } catch (error) {
    if (isValidToken(error)) {
      dispatch(logoutAdmin());
    } else {
      console.log(error);
      toast.error(error.response.data.message);
      return Promise.reject(error);
    }
   }
 }

 const {data: doctorData} = useQuery({
  queryKey:['doctorData'],
  queryFn:fetchDoctor
 })
 
 console.log(doctorData);
 
 
  return (
    <div className='h-auto w-full bg-gray-1 flex flex-col justify-center items-center p-8'>
      <div className='w-full'>
        <CommonHeader heading={"Set Slots"} icon={<CalendarMonthIcon />}/>
            
      </div>

      <div className='w-full mb-8 shadow-md bg-white px-4 py-6 rounded-2xl'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='grid grid-cols-1 md:grid-cols-2 px-5 items-center gap-4'>
            <Input
              label="Set Date"
              type="date"
              placeholder="Select Date"
              className="border-[1px] border-gray-2 w-full"
              {...register("date", { required: true, valueAsDate:true })}
            />

            <Input
              label="Slot Duration"
              type="text"
              placeholder="Select Time"
              className="border-[1px] border-gray-2 w-full"
              {...register("time_duration", { required: true, maxLength:2, setValueAs: v => parseInt(v) })}
            />

            <Input
              label="Start Time"
              type="time"
              placeholder="Set Start Date"
              className="border-[1px] border-gray-2 w-full"
              {...register("start_time", { required: true})}
            />

            <Input
              label="End Time"
              type="time"
              placeholder="Set End Time"
              className="border-[1px] border-gray-2 w-full"
              {...register("end_time", { required: true })}
            />

            <span>
              <label htmlFor='doctor' className='text-sm self-start mt-1'>Choose the Doctor *</label>
              <select
                id="doctor"
                defaultValue="selectDoctor"
                className="border-[1px] border-green-800 w-full md:w-11/12 h-10 rounded-[5px] mb-[4px]"
                {...register("doctor_id", { required: true })}
              >
                  <option value="selectDoctor" disabled hidden>Select your doctor</option>
                  {doctorData?.map((doctor, i) => (
                    <option key={i} value={doctor.id}>{doctor.name}</option>
                  ))}
              </select>
            </span>

            <div className='flex items-center justify-center md:justify-end self-center'>

              <button type='submit' className='bg-green-600 text-white rounded-xl p-2 w-32 hover:bg-green-800'><ScheduleSendIcon/>&nbsp;Set Slot</button>
            </div>
          </div>
        </form>
       
      </div>

      <div className='bg-white shadow-md p-4 rounded-2xl w-full'>
        <p className='my-2 font-medium text-lg'>Instructions:</p>
        <p className='my-2 text-sm'>Your privacy is important to us. We guarantee that your username and personal information will be kept confidential and will not be shared with any third parties. Feel safe knowing your data is secure.</p>
      </div>
    </div>
  )
}

export default SetSlotsPage;
