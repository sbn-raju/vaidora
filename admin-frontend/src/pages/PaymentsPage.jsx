import React, { useState, useMemo } from "react";
import axios from "axios";
import { useQuery} from "@tanstack/react-query";
import Table from "../components/Table";
import CreditScoreRoundedIcon from '@mui/icons-material/CreditScoreRounded';
import { formatDate } from "../utils/formateDate";
import { formatTime } from "../utils/formateTime";
import CommonHeader from "../components/CommonHeader";
import toast from "react-hot-toast";
import NoData from "../components/NoData";
import { useDispatch } from "react-redux";
import { logoutAdmin } from "../slices/adminSlice";





const PaymentsPage = () => {
  document.title = "Payment | Admin";

  const [limit] = useState(10);
  const [skip, setSkip] = useState(0);

  const dispatch = useDispatch();

  const fetchPaymentDetails = async () => {
    try {
      const response = await axios.get(
        `/api/v1/orders/admin/payments?limit=${limit}&skip=${skip}`
      );
      return response.data.data;
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
  };

  const { data: fetchUserPaymentDetails } = useQuery({
    queryKey: ["fetchUserPayDetails", skip],
    queryFn: fetchPaymentDetails,
  });

  console.log(fetchUserPaymentDetails);

  const handleMove = (moveCount) => {
    setSkip((prevSkip) => {
      return Math.max(prevSkip + moveCount, 0);
    });
  };

  const columns = [
    {
      header: "Name",
      accessorKey:"name",
      cell:(info) => info.row.original.name || info.row.original.p_name
    },
    {
      header: "Contact",
      accessorKey: "mobile_no",
      cell:(info) => info.row.original.mobile_no || info.row.original.whatsapp_no
    },
    {
      header: "Date",
      accessorKey: "payment_date",
      cell: ({ getValue }) => formatDate(getValue()),
    },
    {
      header: "Time",
      accessorKey: "payment_time",
      cell: ({ getValue }) => formatTime(getValue()),
    },
    {
      header: "Transaction Id",
      accessorKey: "razorpay_payment_id",
    },
    {
      header: "Purpose",
      accessorKey: "payment_amount",
    },
  ];

  const data = useMemo(
    () => fetchUserPaymentDetails,
    [fetchUserPaymentDetails]
  );

  return (
    <div className="h-auto w-full bg-gray-1 flex flex-col justify-center items-center px-8">
      <div className="w-full flex justify-between">
        <CommonHeader heading={"User Payments"} icon={<CreditScoreRoundedIcon/>}/>
      </div>

      {Array.isArray(fetchUserPaymentDetails) ? (
        <Table data={data || []} columns={columns} />
      ) : (
        <div><NoData details={"Payments"}/></div>
      )}

      {/* <>
        <div className="hidden md:block w-full">
          <div className="w-full my-6 shadow-md bg-white p-3 px-6 rounded-2xl flex justify-between">
            <div className="flex w-1/3">
              <p className="text-sm">Row Per Page: </p>
              <select value={rowsPerPage} onChange={handleRowsPerPage} className='bg-gray-200 mx-2 rounded-md'>
                {renderRowsPerPage()}
                <option value={adminPaymentDetails.length}>{adminPaymentDetails.length}</option>
              </select>
            </div>
            <div className="flex justify-end items-center w-2/3">
              <button className="mx-2" onClick={() => handleMove(-limit)}>
                Previous
              </button>
              <div className="overflow-auto whitespace-nowrap admin-scrollbar">
                <div className=''>
                  {Array.from({length: totalPages}, (_, index) => (
                    <button
                      key={index + 1}
                      className={`w-6 mx-1 rounded-full ${currentPage === index + 1 ? 'bg-green-4 text-white' : 'bg-white text-black'}`}
                      onClick={() => handlePageClick(index + 1)}
                    >
                    {index + 1}
                  </button>
                  ))}
                </div>
              </div>
              <button
                className="mx-2"
                onClick={() => handleMove(limit)}
                disabled={fetchUserPaymentDetails == undefined}
              >
                Next
              </button>
            </div>
          </div>
        </div>

        <div className="md:hidden w-full">
          <div className='my-6 shadow-md bg-white p-3 px-6 rounded-2xl flex justify-between'>
            <button className='mx-2' onClick={handlePreviousPage} disabled={currentPage === 1}>
              Previous
            </button>

        <select value={rowsPerPage} onChange={handleRowsPerPage} className='bg-gray-200 mx-2 rounded-md'>
              {renderRowsPerPage()}
              <option value={adminPaymentDetails.length}>{adminPaymentDetails.length}</option>
            </select>
        <button className='mx-2' onClick={handleNextPage} disabled={endIndex >= adminPaymentDetails.length}>
              Next
            </button>
          </div>
        </div>
      </> */}
    </div>
  );
};

export default PaymentsPage;
