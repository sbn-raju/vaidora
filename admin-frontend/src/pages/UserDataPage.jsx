import React, { useEffect, useState, useMemo, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {useQuery } from "@tanstack/react-query";
import Table from "../components/Table";
import { useDispatch } from "react-redux";
import Loading from "../components/Loading.jsx"
import isValidToken from "../utils/isValidToken";
import { logoutAdmin } from "../slices/adminSlice";
import CommonHeader from "../components/CommonHeader";
import HailRoundedIcon from '@mui/icons-material/HailRounded';
import NoData from "../components/NoData";

const UserDataPage = () => {
  document.title = "User Details| Admin Portal"
  
const dispatch = useDispatch();

  const fetchUserDetails = async () => {
    console.log("hello");
    try {
      const response = await axios.get("/api/v1/admin/user/details");
      console.log(response);
      return response?.data.data;
    } catch (error) {
      if(isValidToken(error)){
        dispatch(logoutAdmin())
      }else{
        console.log(error)
        return Promise.reject(error);
      }
    }
  };

  const { data: userDetails } = useQuery({
    queryKey: ["userData"],
    queryFn: fetchUserDetails,
  });

  console.log(userDetails);

  const data = useMemo(() => userDetails , [userDetails]);

  console.log(data);

  const columns = useMemo(
    () => [
      {
        header: "Name",
        accessorKey: "name",
        enableColumnFilter: true,
        enableSorting: false,
      },
      {
        header: "Phone Number",
        accessorKey: "mobile_no",
        enableColumnFilter: true,
        enableSorting: false,
      },
      {
        header: "Email",
        accessorKey: "email",
        enableColumnFilter: true,
        enableSorting: false,
      },
      {
        header: "Gender",
        accessorKey: "gender",
        enableColumnFilter: true,
        enableSorting: false,
      },
      {
        header: "Age",
        accessorKey: "age",
        enableColumnFilter: true,
        enableSorting: false,
      },
      {
        header: "City",
        accessorKey: "city",
        enableColumnFilter: true,
        enableSorting: false,
      },
    ],
    []
  );

  

  return (
    <div className="h-auto w-full bg-gray-1 flex flex-col justify-center items-center p-8">
      <div className="w-full flex justify-between mt-6">
        <CommonHeader heading={"Members"} icon={<HailRoundedIcon/>}/>
      </div>

      {data?.length != 0 ? (
        <Suspense fallback={<Loading />}>
          <Table data={data || []} columns={columns}/>
        </Suspense>
      ) : (
        <div>
          <NoData details={"Users"}/>
        </div>
      )}

    </div>
  );
};

export default UserDataPage;
