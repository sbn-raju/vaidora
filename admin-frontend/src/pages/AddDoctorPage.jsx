import React from 'react'
import {useDispatch}from "react-redux" 
import { useForm } from 'react-hook-form';
import {useMutation} from '@tanstack/react-query'

//Logout
import { logoutAdmin } from '../slices/adminSlice.js';

//Utililty Packages
import toast from "react-hot-toast"
import axios from 'axios';

//Utils
import isValidToken from '../utils/isValidToken.js';

//Components
import Input from "../components/Input.jsx";
import CommonHeader from '../components/CommonHeader.jsx';

//Icons
import LocalPharmacyRoundedIcon from '@mui/icons-material/LocalPharmacyRounded';
import PersonAddAlt1RoundedIcon from '@mui/icons-material/PersonAddAlt1Rounded';



const AddDoctorPage = () => {
  document.title = "Add Doctor | Admin Portal"
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();


  const addDoctor = async(doctorData)=>{
    try {
      const response = await axios.post("/api/v1/doctor/set-doctors",doctorData)
      return response
    } catch (error) {
      console.log(error);
      if(isValidToken(error)){
       dispatch(logoutAdmin())
      }else{
        console.log(error)
        return Promise.reject(error);
      }
    }
  }
  
  const fromMutation = useMutation({
    mutationFn:addDoctor, 
    onSuccess:async(data)=>{
      toast.success(data.data.message);
      reset();
    },
    onError:async(data)=>{
      toast.success(data.response.data.message);
    }
  })

  const handleFormSubmit = (doctorData) => {
    fromMutation.mutate(doctorData)
  }


  return (
    <div className='h-auto w-full bg-gray-1 flex flex-col justify-center items-center p-8'>
      <CommonHeader heading={"Add Doctor"} icon={<LocalPharmacyRoundedIcon/>}/>

      <div className='w-full shadow-md mt-6 bg-white px-4 py-6 rounded-2xl'>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className='grid grid-cols-1 px-10 items-center gap-4'>
            <Input
              label="Docter Name"
              type="text"
              placeholder="Enter Docter Name"
              className="border-[1px] border-green-800 w-full"
              {...register("name", { required: true })}
            />

            <Input
              label="Username"
              type="text"
              placeholder="Enter Username"
              className="border-[1px] border-green-800 w-full"
              {...register("username", { required: true })}
            />

            <Input
              label="Password"
              type="password"
              placeholder="Enter Password"
              className="border-[1px] border-green-800 w-full"
              {...register("password", { required: true })}
            />

              <div className='w-full flex justify-end mt-2'>
                <button type='submit' className='bg-green-600 text-white px-4 py-2 font-medium rounded-xl flex flex-row justify-between hover:bg-green-800'><PersonAddAlt1RoundedIcon/>&nbsp;Add Doctor</button>
              </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddDoctorPage

//NO CHNAGES REQUIRED