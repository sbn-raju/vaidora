import React, { useState, useEffect, useMemo } from 'react';
import {useNavigate } from "react-router-dom";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import axios from "axios";
import DoctorTable from '../components/DoctorTable';
import { formatDate } from '../utils/formateDate';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';

const DoctorAppointments = () => {


  document.title = "Doctor DashBoard | Admin Panel"
  const query = useQueryClient();
  
  const [selectedAppointmentType, setSelectedAppointmentType] = useState('Appointment')

  //Count Apppointments
  const fetchCountAppointment = async()=>{
    const response = await axios.get("/api/v1/doctor/count/completed");
    console.log(response);
    return response.data
  }

  const {data: countAppointments} = useQuery({
    queryKey:['AppointmentsCount'],
    queryFn:fetchCountAppointment
  })


  console.log(countAppointments);



  const fetchUserAppointment = async()=>{
    const response = await axios.get("/api/v1/doctor/get/appointment")
    return response?.data?.data
  }
  // /get/completed/appointments

  const {data: userAppointment} = useQuery({
    queryKey:['doctorAppointment'],
    queryFn:fetchUserAppointment
  })


  console.log(userAppointment);


  const data = useMemo(() => {
      return userAppointment
  }, [userAppointment])



  const columns = useMemo(()=>[
    {
        header: 'Patient Name',
        accessorKey: 'p_name',
        enableColumnFilter:true,
        enableSorting: false,
    },
    {
        header: 'Patient Contact',
        accessorKey: 'mobile_no',
        enableColumnFilter:true,
        enableSorting: false,
    },
    {
        header: 'Date',
        accessorKey: 'date',
        cell:({getValue})=> formatDate(getValue()),
        enableColumnFilter:false,
        enableSorting: true,
    },
    {
        header: 'Slot Time',
        accessorKey: 'slot_start_time',
        enableColumnFilter:true,
        enableSorting: false,
    },
    {
      header: 'Purpose',
      accessorKey: 'purpose_of_visit',
      enableColumnFilter:false,
      enableSorting: false,
  },
  ],[])

  const fetchCompletedAppointment = async()=>{
    try {
      const response = await axios.get("/api/v1/doctor/get/completed/appointments");
      return response?.data?.data;
    } catch (error) {
      console.error("Error fetching completed appointments:", error);
      throw error;
    }
  }


  const {data: completedAppointment} = useQuery({
    queryKey:['doctorCompletedAppointment'],
    queryFn:fetchCompletedAppointment
  })


  console.log(completedAppointment);


 const handleAppointments = ()=>{
     
 }


  
  




  


  return (
    <div className='min-h-screen bg-gray-1 p-8 flex flex-col md:flex-row'>
      <div className='w-full lg:w-9/12 flex flex-col justify-center items-center'>
      <div className='w-full flex justify-between'>
        <div className='flex flex-row items-center'>
          <h1 className="text-md md:text-xl lg:text-2xl">Hello <span className="font-medium">Doctor!!</span></h1>
          
          {/* Vertical Line */}
          <span className="ml-4 border-[1px] border-l-gray-500 h-12"></span>
          
          <div className="flex justify-center items-center ml-3">
            <span className="text-sm ml-0 md:ml-4"><CalendarMonthRoundedIcon/></span>
            <p className="text-sm ml-1">Appointments</p>
          </div>
        </div>

        <div className='flex justify-end items-center'>
  
          <select className='shadow rounded-2xl p-[6px] h-10 mx-2 md:mx-4' 
          onChange={handleAppointments} 
          value={selectedAppointmentType}
          >
            <option value="Appointments">Appointments</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>

      
        {
          data ? <DoctorTable data={data} columns={columns}/> :<div>
          Currently, no slots have been booked for your appointments.
        </div>
        }
        
      </div>
      <div className='h-full w-full lg:w-3/12 mx-4'>
        <div className='flex md:flex-row lg:flex-col justify-end items-center'>
            <div className='bg-white w-full rounded-xl'>
                <div className='px-4 py-2'>
                    <p>Gratitude Box</p>
                </div>
                <hr className='border-[1px] border-gray-2'/>
                <div className='p-4'>
                    <p className='text-[#666666]'>
                        “Your genuine concern and support have meant a lot to me. Thank you for going above and beyond to ensure my well-being.”
                    </p>
                </div>
            </div>
            <div className='bg-white w-full rounded-xl my-10'>
                <div className='px-4 py-2'>
                    <p>Number of souls you have touched.</p>
                </div>
                <hr className='border-[1px] border-gray-2'/>
                <div className='p-4 flex flex-col justify-center items-center'>
                    <div className='border-8 border-white bg-green-4 h-44 w-44 rounded-full flex justify-center items-center text-white shadow-xl'>
                        {countAppointments?.data || "Lot"}
                    </div>
                    <p className='self-start my-4'>Lot more to go..........</p>
                </div>
            </div>      
        </div>
      </div>
    </div> 
  )
}

export default DoctorAppointments;
