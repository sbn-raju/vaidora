import React, { useEffect, useState } from "react";
import EditNotificationsSharp from "@mui/icons-material/EditNotificationsSharp";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import isValidToken from "../utils/isValidToken.js";
import { useDispatch } from "react-redux";
import { logoutAdmin } from "../slices/adminSlice";
import CommonHeader from "../components/CommonHeader.jsx";

const Notifications = () => {
  document.title = "Notifications | Admin Portal";
  const [message, setMessage] = useState();
  const { register, handleSubmit, reset } = useForm();

  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  //Fetched The Last message
  const fetchedMessage = async () => {
    try {
      const response = await axios.get("/api/v1/admin/message/getMessage");
      return response?.data?.data?.message_data || null;
    } catch (error) {
      if (isValidToken(error)) {
        dispatch(logoutAdmin());
      } else {
        console.error(error);
        return Promise.reject(error);
      }
    }
  };

  const { data: messageData } = useQuery({
    queryKey: ["fetchedLastMessage"],
    queryFn: fetchedMessage,
  });

  //Post The last message
  const handlePostNotifications = async (message) => {
    const response = await axios.post(
      "/api/v1/admin/message/setMessage",
      message
    );
    return response.data;
  };

  const lastMessage = useMutation({
    mutationFn: handlePostNotifications,
    onSuccess: async (response) => {
      reset();
      toast.success(response.message);
      return await queryClient.invalidateQueries({
        queryKey: ["fetchedLastMessage"],
      });
    },
    onError: async (error) => {
      reset();
      toast.error(error.message);
    },
  });

  const handleMessaging = async (message) => {
    console.log(message);
    lastMessage.mutate(message);
  };

  //Terminate the Notifications
  const triggerTerminateNotifications = async () => {
    const response = await axios.delete(
      "/api/v1/admin/message/terminateMessage"
    );
    return response.data;
  };

  const terminateNotifications = useMutation({
    mutationFn: triggerTerminateNotifications,
    onSuccess: async (response) => {
      toast.success(response.message);
      await queryClient.invalidateQueries({ queryKey: ["fetchedLastMessage"] });
    },
  });

  const handleTerminate = () => {
    terminateNotifications.mutate();
  };

  const defaultMessage =
    "This is the Test message which will only be displayed on the Admin portal but will not display on the User Dashboard.";

  return (
    <div className="h-auto w-full bg-gray-1 flex flex-col justify-center items-center px-8">
      <div className="w-full">
        <CommonHeader heading={"Notifications"} icon={<EditNotificationsSharp/>}/>
      </div>

      <div className="mb-8 w-full px-20 bg-red-200 border-2 border-red-800 p-8 rounded-2xl shadow-md flex flex-row">
        <div className="w-full flex h-auto flex-nowrap">
          {messageData ? messageData : defaultMessage}
        </div>
        <div className="w-1/3 flex flex-row-reverse">
          <button
            onClick={handleTerminate}
            className="bg-red-500 text-white px-4 py-2 font-medium rounded-xl hover:bg-red-700"
          >
            <DeleteSweepIcon /> Remove Notification
          </button>
        </div>
      </div>

      <div className="w-full px-20 bg-white p-8 rounded-2xl shadow-md mb-16">
        <p className="text-lg mb-2">Send Notifications</p>
        <form onSubmit={handleSubmit(handleMessaging)}>
          <input
            id="message"
            className="border-[1px] border-green-700 p-4 rounded-xl w-full h-24 focus:border-green-900"
            placeholder="Type your Notification Message here!"
            {...register("message", { required: true })}
          />
          <div className="w-full flex justify-end mt-2">
            <button
              type="submit"
              className="bg-green-600  text-white px-4 py-2 font-medium rounded-xl hover:bg-green-800 "
            >
              {" "}
              <EditNotificationsSharp /> Send Notification{" "}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Notifications;
