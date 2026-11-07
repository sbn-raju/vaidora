import React, { useEffect, useState } from 'react';
import { userProfile, paymentDetails } from '../../constants';
import { useQuery } from '@tanstack/react-query';
import { MdPayment } from "react-icons/md";
import axios from "axios"
import '../../styles/scrollbar.styles.css';
import appointment from '../../assets/Page Assets/User Dashboard/svg/appointment.svg';
import { useDispatch } from 'react-redux';
import { refreshUserToken } from '../../slices/refreshSlice';
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
import CreditScoreOutlinedIcon from '@mui/icons-material/CreditScoreOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import { refreshTheAccessToken } from '../../slices/userSlice.js';


// const fetchPaymentDetails = async () => {
   
//   const userId = "123"; // Assuming userId needs to be passed
//   const requestOptions = {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ user_id: userId })
//   };

//   const response = await fetch('/api/v1/orders/user-payments', requestOptions);
//   console.log(response)
//   if (!response.ok) {
//     throw new Error('Network response was not ok');
//   }
//   return response.data.json();
// };

const formatDate = (isDateString) => {
  const options = { year: 'numeric', month: 'short', day: '2-digit'};
  const date = new Date(isDateString);
  return date.toLocaleDateString('en-GB', options).toUpperCase().replace(/ /g, ' ');
}

const PaymentItem = ({ payment }) => (
  <div className="py-2 pb-4 px-6 md:px-10 my-4 rounded-2xl border-[1px] border-gray-2 bg-white shadow-md">
    <div className="mt-2 gap-4 md:gap-2">
      <div className='w-full flex'>
        <p className="w-1/2 text-xs md:text-base flex items-center font-medium flex-shrink-0">
          <CalendarTodayOutlinedIcon sx={{color: "green"}}/>&nbsp;
          {formatDate(payment.payment_date)}
        </p>
        <p className="w-1/2 text-xs md:text-base flex items-center font-medium flex-shrink-0">
          <span className="mr-2 text-xl">
            <SellOutlinedIcon sx={{color: "green"}}/>
          </span>
          {payment.payment_amount == 1000?"Class Fees":"Appointment Fees"}
        </p>
      </div>
      <p className="w-full font-thin md:font-normal text-sm flex items-center mt-2">
        <CreditScoreOutlinedIcon sx={{color: "green"}}/>&nbsp;
        Transaction ID: <span className="ml-1 font-medium">{payment.razorpay_payment_id}</span>
      </p>
    </div>
  </div>
);

const NoData = () => (
  <div className="flex flex-col justify-center items-center h-screen">
    <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" fill="#999999" className="bi bi-file-earmark-x" viewBox="0 0 16 16">
      <path d="M6.854 7.146a.5.5 0 1 0-.708.708L7.293 9l-1.147 1.146a.5.5 0 0 0 .708.708L8 9.707l1.146 1.147a.5.5 0 0 0 .708-.708L8.707 9l1.147-1.146a.5.5 0 0 0-.708-.708L8 8.293z" />
      <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2M9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z" />
    </svg>
    <p className="text-2xl my-4 text-gray-500">No data to show</p>
  </div>
);

const MyPaymentsPage = () => {
document.title = "User Payments"
  const dispatch = useDispatch();
  const [paymentRecords, setPaymentRecords] = useState([]);
  // const {token} = useSelector((state)=>state.authUser)

  useEffect(()=> {
    const fetchData = async ()=> {
      const requestOptions= {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      try{
        const response = await axios.post('/api/v1/orders/user-payments',{}, requestOptions);
        console.log(response);
        const data = response.data
        console.log(data);
        setPaymentRecords(data?.data ? data.data : [])
        console.log(paymentRecords);
      } catch(error){
        console.log(error.response.status)
        if(error.response.status === 401){
          dispatch(refreshTheAccessToken())
        }
        console.log('Error occured', error);
      }
    }
    fetchData();
  }, []);

//   const { isPending, isError, data, error } = useQuery({
//     queryKey: ['todos'],
//     queryFn: fetchPaymentDetails,
//   })
//   console.log(data);

  return (
    <div className="h-screen w-full p-4 md:p-6 flex flex-col items-center bg-gray-100">
      <div className="w-full my-8 flex flex-col md:flex-row items-center bg-white border border-gray-200 rounded-2xl md:px-10 py-3">
        <div className="flex items-center">
             <div className="flex justify-center items-center ml-3">
            <span className="text-md ml-4"><MdPayment /></span>
            <p className="text-[10px] md:text-sm ml-1">My Payments</p>
          </div>
        </div>
      </div>

      {paymentRecords?.length != 0 ? (
        <>
          <div className="w-full h-full md:h-3/6 overflow-auto scrollbar">

            {paymentRecords?.map((payment, index) => (
              <PaymentItem key={index} payment={payment} />
            ))}
          </div>
          <div className="w-full bg-white rounded-2xl border border-gray-200 my-6 md:my-20 p-2 px-4 md:p-4 shadow-md">
            <p className="my-2 font-medium text-sm md:text-base">Instructions:</p>
            <p className="my-2 text-[10px] md:text-sm">Your privacy is important to us. We guarantee that your username and personal information will be kept confidential and will not be shared with any third parties. Feel safe knowing your data is secure.</p>
          </div>
        </>
      ) : (
        <NoData />
      )}
    </div>
  );
}

export default MyPaymentsPage;

