import React, {useMemo, Suspense } from "react";
import "../styles/scrollbar.styles.css";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import AppointmentsTable from "../components/AppointmentsTable.jsx";
import Loading from "../components/Loading.jsx";
import { formatDate } from "../utils/formateDate.js";
import isValidToken from "../utils/isValidToken.js";
import { useDispatch, useSelector } from "react-redux";
import { logoutAdmin } from "../slices/adminSlice.js";
import EditCalendarRoundedIcon from '@mui/icons-material/EditCalendarRounded';
import CommonHeader from "../components/CommonHeader.jsx";
import toast from "react-hot-toast";
import NoData from "../components/NoData.jsx";


const AppointmentsPage = () => {
  const dispatch = useDispatch();
  //Fetching All Appointments
  const fetchAllAppointments = async () => {
    try {
      const response = await axios.get("/api/v1/appointment/get/appointments");
      console.log(response);
      return response?.data.data;
    } catch (error) {
      console.log(error);
      if (isValidToken(error)) {
        dispatch(logoutAdmin());
      } else {
        console.log(error);
        toast.error(error.response.data.message);
        return Promise.reject(error);
      }
      return null;
    }
  };

  const { data: userappointments } = useQuery({
    queryKey: ["userAppointments"],
    queryFn: fetchAllAppointments,
    retry: false
  });

  console.log(userappointments);

  const data = useMemo(() => {
    return userappointments;
  }, [userappointments]);

  const columns = useMemo(
    () => [
      {
        header: "Patient Name",
        accessorKey: "p_name",
        enableColumnFilter: true,
        enableSorting: false,
      },
      {
        header: "Doctor Name",
        accessorKey: "name",
        enableColumnFilter: true,
        enableSorting: false,
      },

      {
        header: "Date",
        accessorKey: "date",
        cell: ({ getValue }) => formatDate(getValue()),
        enableColumnFilter: true,
        enableSorting: true,
      },
      {
        header: "Time",
        accessorKey: "slot_start_time",
        enableColumnFilter: false,
        enableSorting: true,
      },
      {
        header: "Contact",
        accessorKey: "mobile_no",
        enableColumnFilter: false,
        enableSorting: false,
      },
      {
        header: "Purpose",
        accessorKey: "purpose_of_visit",
        enableColumnFilter: false,
        enableSorting: false,
      },
    ],
    []
  );

  return (
    <div className="h-auto w-full bg-gray-1 flex flex-col justify-center items-center p-8">
      <div className="w-full flex justify-between mt-6">
        <CommonHeader heading={"Appointments"} icon={<EditCalendarRoundedIcon/>}/>
        <div className="flex justify-end items-center">
          <select className="shadow rounded-2xl p-[6px] h-10 mx-2 md:mx-4">
            <option value="Appointments">Appointments</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>
      {userappointments ? (
        <Suspense fallback={<Loading />}>
          <AppointmentsTable data={data ||[]} columns={columns} />
        </Suspense>
      ) : (
        <div>
          <NoData details={"Appointment Slots"}/>
        </div>
      )}
    </div>
  );
};

export default AppointmentsPage;
