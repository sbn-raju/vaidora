import React, { useState, useEffect } from "react";
import Input from "../components/Input";
import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import ClassToaster from "./ClassToaster.jsx";
import AddLinkIcon from "@mui/icons-material/AddLink";
import DangerousIcon from "@mui/icons-material/Dangerous";
import { formatDate } from "../utils/formateDate";
import { useDispatch } from "react-redux";
import { logoutAdmin } from "../slices/adminSlice.js"; 
import isValidToken from "../utils/isValidToken.js";
import CommonHeader from "../components/CommonHeader.jsx";
import SystemUpdateAltRoundedIcon from '@mui/icons-material/SystemUpdateAltRounded';

const ClassUpdatesPage = () => {
  document.title = "Class Updates | Admin Panel";

  const { register, handleSubmit, reset } = useForm();
  const [classTabType, setClassTabType] = useState("setClass");

  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  //Set new Class
  const setNewClass = async (classDetails) => {
    try {
      const response = await axios.post(
        "/api/v1/class/admin/setClass",
        classDetails
      );
      return response;
    } catch (error) {
      if (isValidToken(error)) {
        dispatch(logoutAdmin());
      } else {
        console.log(error);
        return Promise.reject(error);
      }
      return null;
    }
  };

  const classDetailsMutation = useMutation({
    mutationFn: setNewClass,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["upcomingClassDetails"],
      });
    },
    onError: async(data)=>{
      console.log(data);
      toast.error(data?.response.data.message);
    }
  });

  const handleClassDetails = async (classDetails) => {
    classDetailsMutation.mutate(classDetails);
  };

  console.log(classDetailsMutation);
  useEffect(() => {
    if (classDetailsMutation.isSuccess) {
      toast.success(classDetailsMutation.data.data.message);
      reset({ class_date: "", class_time: "" });
    } else if (classDetailsMutation.isError) {
      toast.error(classDetailsMutation.error?.response.data.message);
      reset();
    }
  }, [classDetailsMutation.isSuccess, classDetailsMutation.isError, reset]);

  //Ongoing Class
  //Fetching details of the ongoing class
  const fetchOngoingClassDetails = async () => {
    try {
      const response = await axios.get("/api/v1/class/admin/ongoing-class");
      console.log(response);
      return response?.data.data;
    } catch (error) {
      if (isValidToken(error)) {
        dispatch(logoutAdmin());
      } else {
        console.log(error);
        return Promise.reject(error);
      }
      return null;
    }
  };

  const { data: ongoingClassDetails } = useQuery({
    queryKey: ["ongoingClassDetails"],
    queryFn: fetchOngoingClassDetails,
  });

  console.log(ongoingClassDetails);

  //Adding Class Link
  const addClassLink = async (link) => {
    try {
      console.log(link);
      const response = await axios.post("/api/v1/class/admin/class-link", link);
      console.log(response);
      return response.data;
    } catch (error) {
      if (isValidToken(error)) {
        dispatch(logoutAdmin());
      } else {
        console.log(error);
        return Promise.reject(error);
      }
      return null;
    }
  };

  const addClassLinkMutation = useMutation({
    mutationFn: addClassLink,
    onSuccess: () => {
      reset({ link: "" });
    },
  });

  console.log(addClassLinkMutation);

  const handleAddClassLink = (link) => {
    addClassLinkMutation.mutate(link);
  };

  useEffect(() => {
    if (addClassLinkMutation.isSuccess) {
      toast.success(addClassLinkMutation.data.message);
    } else if (addClassLinkMutation.isError) {
      toast.error(addClassLinkMutation.error?.response.data.message);
    }
  }, [addClassLinkMutation.isSuccess, addClassLinkMutation.isError]);

  //Terminating Class Functinality
  const terminateClass = async () => {
    try {
      const response = await axios.post(
        "/api/v1/class/admin/terminate-Bookings"
      );
      return response;
    } catch (error) {
      if (isValidToken(error)) {
        dispatch(logoutAdmin());
      } else {
        console.log(error);
        return Promise.reject(error);
      }
      return null;
    }
  };

  const terminationMutation = useMutation({
    mutationFn: terminateClass,
    onSuccess: async () => {
      window.location.reload();
    },
  });

  const handleTerminateAgree = () => {
    terminationMutation.mutate();
    console.log(terminationMutation);
  };

  const handleTerminateDisagree = () => {
    toast.error("Terminating of Class is Disagreed");
  };
  const handleTerminateClick = () => {
    const result = toast.custom((t) => (
      <ClassToaster
        t={t}
        message={"Class Terminating"}
        subMessage={
          "Are you sure you want to proceed with terminating the class?"
        }
        onAgree={handleTerminateAgree}
        onDisagree={handleTerminateDisagree}
      />
    ));
    console.log(result);
  };

  useEffect(() => {
    if (terminationMutation.isSuccess) {
      console.log(terminationMutation);
      toast.success(terminationMutation.data.data.message);
    } else if (terminationMutation.isError) {
      toast.error(terminationMutation.error?.response.data.message);
    }
  }, [terminationMutation.isSuccess, terminationMutation.isError]);

  //Upcoming Class
  //Fetching the upcoming class Details
  const fetchUpcomingClassDetails = async () => {
    try {
      const response = await axios.get("/api/v1/class/admin/upcoming-class");
      return response.data.data;
    } catch (error) {
      if (isValidToken(error)) {
        dispatch(logoutAdmin());
      } else {
        console.log(error);
        return Promise.reject(error);
      }
      return null;
    }
  };

  const { data: fetchUpClassDetails } = useQuery({
    queryKey: ["upcomingClassDetails"],
    queryFn: fetchUpcomingClassDetails,
  });

  console.log(fetchUpClassDetails);

  //Handling Stop Booking
  const setStopBooking = async () => {
    try {
      const response = await axios.post("/api/v1/class/admin/close-Bookings");
      console.log(response);
      return response;
    } catch (error) {
      if (isValidToken(error)) {
        dispatch(logoutAdmin());
      } else {
        console.log(error);
        return Promise.reject(error);
      }
      return null;
    }
  };

  const stopBooking = useMutation({
    mutationFn: setStopBooking,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["ongoingClassDetails"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["upcomingClassDetails"],
      });
    },
  });

  const handleStopBookingAgree = () => {
    stopBooking.mutate();
    console.log(stopBooking);
  };

  const handleStopBookingDisAgree = () => {
    toast.error("Class have  not stopped Booking");
  };

  const handleStopBookingClick = () => {
    toast.custom((t) => (
      <ClassToaster
        t={t}
        message={"Class Stop Booking"}
        subMessage={
          "Are you sure you want to stop accepting bookings for this class?"
        }
        onAgree={handleStopBookingAgree}
        onDisagree={handleStopBookingDisAgree}
      />
    ));
  };

  // console.log(stopBooking.error?.response.data.message)
  useEffect(() => {
    if (stopBooking.isSuccess) {
      toast.success(stopBooking.data.data.message);
    } else if (stopBooking.isError) {
      toast.error(stopBooking.error?.response.data.message);
    }
  }, [stopBooking.isSuccess, stopBooking.isError]);

  return (
    <div className="min-h-screen w-full bg-gray-1 flex flex-col justify-center items-center px-8 py-4">
      <CommonHeader heading={"Class Updates"} icon={<SystemUpdateAltRoundedIcon/>}/>

      <div className="w-full flex justify-center items-center mb-6">
        <button
          className={`w-1/2 py-2 shadow-md mx-2 rounded-xl text-medium ${
            classTabType === "setClass"
              ? "bg-green-3 text-white"
              : "bg-white text-green-3"
          }`}
          onClick={() => setClassTabType("setClass")}
        >
          Set Class
        </button>
        <button
          className={`w-1/2 py-2 shadow-md mx-2 rounded-xl text-medium ${
            classTabType === "classDetail"
              ? "bg-green-3 text-white"
              : "bg-white text-green-3"
          }`}
          onClick={() => setClassTabType("classDetail")}
        >
          Class Details
        </button>
      </div>

      {classTabType === "setClass" ? (
        <>
          <div className="shadow-md w-full mb-8 bg-white px-4 py-8 rounded-2xl">
            <form onSubmit={handleSubmit(handleClassDetails)}>
              <div className="grid grid-cols-1 md:grid-cols-2 px-10 items-center gap-4">
                <Input
                  label="Start Date"
                  type="date"
                  placeholder="Select Start Date"
                  className="border-[1px] border-green-800 w-full"
                  {...register("class_date", { required: true })}
                />

                <Input
                  label="Fees"
                  type="text"
                  placeholder="Select Fees"
                  className="border-[1px] border-green-800 w-full"
                  defaultValue={1000}
                  {...register("class_fees", { required: true, maxLength: 4 })}
                />

                <Input
                  label="Set Time"
                  type="time"
                  placeholder="Select Time"
                  className="border-[1px] border-green-800 w-full"
                  {...register("class_time", { required: true })}
                />

                <div className="flex justify-center md:justify-end self-center">
                  <button
                    type="submit"
                    className="bg-green-4 text-white rounded-xl p-2 w-24"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="bg-white shadow-md p-4 rounded-2xl w-full">
            <p className="my-2 font-medium text-lg">Instructions:</p>
            <p className="my-2 text-sm">
              Your privacy is important to us. We guarantee that your username
              and personal information will be kept confidential and will not be
              shared with any third parties. Feel safe knowing your data is
              secure.
            </p>
          </div>
        </>
      ) : (
        <>
          {ongoingClassDetails !== null ? (
            <div className="bg-white shadow-md rounded-2xl py-4 w-full h-[300px]">
              <div className="border-b-[1px] border-gray-2">
                <h1 className="mx-8 pb-2">Ongoing class details</h1>
              </div>
              <div className="p-8 py-4">
                <div className="flex justify-between">
                  <p className="font-thin">
                    Batch:{" "}
                    <span className="font-medium">
                      {ongoingClassDetails?.id
                        ? ongoingClassDetails?.id
                        : "Upcoming Class Booking needs to be stopped"}
                    </span>
                  </p>
                  <p className="font-thin">
                    Date:{" "}
                    <span className="font-medium">
                      {formatDate(ongoingClassDetails?.class_date)}
                    </span>
                  </p>
                  <p className="font-thin">
                    Time:{" "}
                    <span className="font-medium">
                      {ongoingClassDetails?.class_time
                        ? ongoingClassDetails.class_time
                        : "Upcoming Class Booking needs to be stopped"}
                    </span>
                  </p>
                </div>
                <div className="w-full">
                  <form onSubmit={handleSubmit(handleAddClassLink)}>
                    <input
                      className="border-[1px] border-green-700 p-4 rounded-xl w-full h-24 mt-8"
                      placeholder="Paste the joining link of the class prior the to the class start"
                      {...register("link", { required: true })}
                    />
                    <div className="w-full flex justify-between mt-2">
                      <button
                        className="text-red-500 border-[1px] border-white hover:border-red-500 rounded-xl py-2 px-4 hover:bg-red-100"
                        type="button"
                        onClick={handleTerminateClick}
                      >
                        {" "}
                        <DangerousIcon />
                        &nbsp;Terminate Class
                      </button>
                      <button
                        className="bg-green-600  text-white px-4 py-2 font-medium rounded-xl hover:bg-green-800 flex flex-row justify-center"
                        type="submit"
                      >
                        <AddLinkIcon />
                        &nbsp;Add&nbsp;Link
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white shadow-md rounded-2xl py-4 w-full h-[300px] mt-6">
              <div className="border-b-[1px] border-gray-2">
                <h1 className="mx-8 pb-2">Ongoing class details</h1>
              </div>
              <div className="p-8 py-4 flex justify-center items-center h-full">
                <p className="text-[#666666] text-lg">No Classes to show</p>
              </div>
            </div>
          )}

          {fetchUpClassDetails?.length !== 0 ? (
            <div className="bg-white shadow-md rounded-2xl py-4 w-full mt-6 h-[200px]">
              <div className="border-b-[1px] border-gray-2">
                <h1 className="mx-8 pb-2">Upcoming class details</h1>
              </div>
              <div className="p-8 py-4">
                <div className="flex justify-between">
                  <p className="font-thin">
                    Batch:{" "}
                    <span className="font-medium">
                      {fetchUpClassDetails?.id}
                    </span>
                  </p>
                  <p className="font-thin">
                    Date:{" "}
                    <span className="font-medium">
                      {formatDate(fetchUpClassDetails?.class_date)}
                    </span>
                  </p>
                  <p className="font-thin">
                    Time:{" "}
                    <span className="font-medium">
                      {fetchUpClassDetails?.class_time}
                    </span>
                  </p>
                </div>
                <div className="w-full mt-8">
                  <div className="w-full flex justify-between mt-2">
                    <p>
                      Kindly stop taking booking on the day of the class, make
                      sure you are prior of atleast 5 hours before class timings
                    </p>
                    <button
                      className="bg-green-600  text-white px-4 py-2 font-medium rounded-xl hover:bg-green-800 flex flex-row justify-center"
                      onClick={handleStopBookingClick}
                    >
                      Stop Bookings
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white shadow-md rounded-2xl py-4 w-full h-[200px] mt-6">
              <div className="border-b-[1px] border-gray-2">
                <h1 className="mx-8 pb-2">Upcoming class details</h1>
              </div>
              <div className="p-8 py-4 flex justify-center items-center h-full">
                <p className="text-[#666666] text-lg">No upcoming classes to show</p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ClassUpdatesPage;
