import React, { useEffect, useState, useMemo } from 'react'
import '../styles/scrollbar.styles.css'
import { Suspense } from 'react'
import {useQuery} from '@tanstack/react-query'
import axios from "axios"
import { useDispatch } from 'react-redux';
import Table from '../components/Table';
import isValidToken from '../utils/isValidToken.js';
import { logoutAdmin } from '../slices/adminSlice.js';
import EditCalendarRoundedIcon from '@mui/icons-material/EditCalendarRounded';
import CommonHeader from '../components/CommonHeader.jsx';
import NoData from '../components/NoData.jsx';
import Loading from "../components/Loading.jsx"



const ClassBookingPage = () => {

  const dispatch = useDispatch();
  const columns = [
    {
      header: 'Name',
      accessorKey: 'name',
    },
    {
      header: 'Contact',
      accessorKey: 'whatsapp_no' || 'mobile_no',
    },
    {
      header: 'Batch',
      accessorKey: 'class_id',
    },
    {
      header:"Email",
      accessorKey:"email"
    },
    {
      header: 'City',
      accessorKey: 'city',
    },
    
  ];

  




  const [batchClassDetails, setBatchClassDetails] = useState([]);
  const [keyBatch, setKeyBatch] = useState("");


  const fetchBatchNumber = async () => {
    try {
      const response = await axios.get("/api/v1/class/admin/getClass");
      return response.data.data;
    } catch (error) {
      if(isValidToken(error)){
        dispatch(logoutAdmin());
      }else{
        console.log(error);
        return Promise.reject(error);
      }
      return null 
    }
  };

  const fetchBatchWiseMembers = async (batch) => {
   try {
     const response = await axios.get(`/api/v1/class/admin/class/batches?batch=${batch}`);
     return response.data.data;
   } catch (error) {
    if(isValidToken(error)){
      dispatch(logoutAdmin());
    }else{
      console.log(error);
      return Promise.reject(error);
    }
    return null 
   }
  };

  const fetchClassDetails = async () => {
   try {
     const response = await axios.get("/api/v1/class/admin/users/booked");
     return response.data.data;
   } catch (error) {
    if(isValidToken(error)){
      dispatch(logoutAdmin());
    }else{
      console.log(error);
      return Promise.reject(error);
    }
    return null 
   }
  };

  const { data: batchDetails } = useQuery({
    queryKey: ['batches'],
    queryFn: fetchBatchNumber,
  });

  const { data: classDetails } = useQuery({
    queryKey: ['classMembers'],
    queryFn: fetchClassDetails,
  });


  useEffect(() => {
    if (keyBatch) {
      const fetchData = async () => {
        const batchMember = await fetchBatchWiseMembers(keyBatch);
        setBatchClassDetails(Array.isArray(batchMember) ? batchMember : []);
      };
      fetchData();
    } else {
      setBatchClassDetails(Array.isArray(classDetails) ? classDetails : []);
    }
  }, [keyBatch, classDetails]);

  const data = useMemo(()=> batchClassDetails , [batchClassDetails])
  




  return (
    <div className='h-auto w-full bg-gray-1 flex flex-col justify-center   items-center px-8'>
      <div className='w-full flex justify-between mt-6'>
        <CommonHeader heading={'Class Booking'} icon={<EditCalendarRoundedIcon/>}/> 

        <div className='flex justify-end items-center'>
          <select 
            className='shadow rounded-2xl p-[6px] h-10 mx-2 md:mx-4'
            onChange={(e)=>setKeyBatch(e.target.value)}
            >
              <option value={''}>All</option>
              {batchDetails?.map((batch, index) => (
                <option value={batch.id} key={index}>Batch No.:{batch.id}</option>
              )) }
          </select>
        </div>
      </div>

      
      {data?.length !== 0 ? (
        <Suspense fallback={<Loading />}>
          <Table data={data || []} columns={columns}/>
        </Suspense>
      ) : (
        <div>
          <NoData details={"Class Booking"}/>
        </div>
      )}

    </div>
  )
}

export default ClassBookingPage

