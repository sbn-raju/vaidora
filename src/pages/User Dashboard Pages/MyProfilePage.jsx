import React, { useState, useEffect } from "react";
import { userProfile } from "../../constants/index";
import { BsFillPersonVcardFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import membershipBg from "../../assets/Page Assets/Home/memebership-bg.png";
import logo from "../../assets/Page Assets/Home/New Logo.png";
import { toast } from "react-hot-toast";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ModeEditRoundedIcon from "@mui/icons-material/ModeEditRounded";
import BookmarkAddedRoundedIcon from "@mui/icons-material/BookmarkAddedRounded";
import Man2RoundedIcon from "@mui/icons-material/Man2Rounded";
import WomanRoundedIcon from "@mui/icons-material/WomanRounded";
import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { refreshTheAccessToken } from "../../slices/userSlice.js";
import DashboardUserHeader from "../../components/header/DashboardUserHeader.jsx";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";

const MembershipCard = ({ handleCloseCard, id, details }) => {
  return (
    <div className="min-h-screen fixed inset-0 bg-gray-1 bg-opacity-75 flex justify-center items-center z-[60]">
      <div className="relative  min-w-[300px] p-4 rounded-xl shadow-lg flex flex-col justify-center items-center bg-gradient-to-r from-green-500 to-emerald-600">
        <div className="w-full flex items-center">
          <img src={logo} className="w-10" />
          <p className="text-white ml-10 font-semibold">Membership Card</p>
        </div>
        <div className="my-4">
          <p className="text-slate-300">
            Name: <span className="text-white font-medium">{details.name}</span>
          </p>
          <p className="text-slate-300">
            Age: <span className="text-white font-medium">{details.age}</span>
          </p>
          <p className="text-slate-300">
            Email:{" "}
            <span className="text-white font-medium">{details.email}</span>
          </p>
          <p className="text-slate-300">
            City: <span className="text-white font-medium">{details.city}</span>
          </p>
          <p className="text-slate-300">
            ID no: <span className="text-white font-medium">{id}</span>
          </p>
        </div>
        <p className="text-center text-slate-50 font-thin">
          Dr.&nbsp;Ramachandra &amp; Padma Naturopathy
        </p>
        <button className="absolute top-4 right-4" onClick={handleCloseCard}>
          <CloseRoundedIcon sx={{ color: "white" }} />
        </button>
      </div>
    </div>
  );
};

const MyProfilePage = () => {
  document.title = "User Profile";
  const queryClient = useQueryClient();
  const [isMembershipCardOpen, setIsMemebershipCardOpen] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    city: "",
    gender: "selectGender",
  });

  const dispatch = useDispatch();

  const handleMembershipCard = () => {
    if (
      formData.name !== "" &&
      formData.age !== "" &&
      formData.email !== "" &&
      formData.gender !== "" &&
      formData.gender !== "selectGender"
    ) {
      setIsMemebershipCardOpen(true);
    } else {
      toast.error("Please fill all the details to generate membership card");
    }
  };

  const handleCloseCard = () => {
    setIsMemebershipCardOpen(false);
  };
  const getUserDetailsIfExist = async () => {
    try {
      const response = await axios.get("/api/v1/login/get/details");
      console.log(response);
      return response?.data.data;
    } catch (error) {
      console.log(error);
      if(error.response.status === 401 || error.response.status === 403 ){
        dispatch(refreshTheAccessToken())
      }
      return Promise.reject(error);
    }
  };

  const { data: preExistUserDetails } = useQuery({
    queryKey: ["userDetails"],
    queryFn: getUserDetailsIfExist,
  });

  console.log(preExistUserDetails);

  useEffect(() => {
    if (preExistUserDetails) {
      setFormData({
        name: preExistUserDetails.name || "",
        age: preExistUserDetails.age || "",
        email: preExistUserDetails.email || "",
        city: preExistUserDetails.city || "",
        gender: preExistUserDetails.gender || "selectGender",
      });
    }
  }, [preExistUserDetails]);

  const postFormData = async (formData) => {
    try {
      const response = await axios.put("/api/v1/login/update/details", {
        ...formData,
      });
      console.log(response);
      return response?.data;
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  };

  const userData = useMutation({
    mutationFn: postFormData,
    onSuccess: async (data) => {
      console.log(data);
      toast.success(data.message);
      await queryClient.invalidateQueries({ queryKey: ["userDetails"] });
    },
    onError: async (data) => {
      toast.error(data);
    },
  });

  console.log(userData);

  const handleSave = () => {
    if (
      formData.name == "" ||
      formData.age == "" ||
      formData.email == "" ||
      formData.gender == "selectGender"
    ) {
      toast.error("Please fill all the details to save");
      return;
    }
    // api axios call
    userData.mutate(formData);
    setIsDisabled(true);
  };

  const handleEdit = () => {
    setIsDisabled(false);
    //api axios call
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const generateRandomId = () => {
    const fourDigits = new Date().getFullYear();
    const twoDigits = new Date().getMonth();
    const number = preExistUserDetails?.mobile_no || 47894561230;
    const name = formData?.name || "user";
    const city = formData?.city || "city";
    const threeChar = city.substring(0, 3).toUpperCase();
    const generateId = `${fourDigits}${number}${twoDigits}@${name}-${threeChar}`;
    return generateId;
  };

  const userId = generateRandomId();

  return (
    <div className="h-full w-full p-6 flex justify-center items-center bg-gray-1">
      <div className="w-full">
        <DashboardUserHeader
          userName={formData.name != null ? formData.name : "User"}
          Dashboardicon={<PersonRoundedIcon />}
          heading={"Profile"}
        />
        <div className="mb-8 lg:mb-16 rounded-2xl bg-white shadow-md pb-4">
          <div className="w-full border-b-[1px] border-green-2 p-4 px-6 md:px-8">
            <div className="flex items-center">
              <span className="text-green-4 text-xl md:text-2xl">
                <BsFillPersonVcardFill />
              </span>
              <span className="ml-2 text-base md:text-lg">
                Personal Information
              </span>
            </div>
          </div>
          <div className="w-full border-b-[1px] border-green-2 p-4 px-6 md:px-8">
            <div className="flex">
              <span className="w-2/5 md:w-3/6 text-xs md:text-base">Name</span>
              <input
                type="text"
                placeholder="Enter your Name"
                className="text-xs md:text-base px-4 py-1 rounded-md"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={isDisabled}
              />
            </div>
          </div>
          <div className="w-full border-b-[1px] border-green-2 p-4 px-6 md:px-8">
            <div className="flex">
              <span className="w-2/5 md:w-3/6 text-xs md:text-base">Age</span>
              <input
                type="text"
                placeholder="Enter your Age"
                className="text-xs md:text-base px-4 py-1 rounded-md"
                name="age"
                value={formData.age}
                onChange={handleChange}
                disabled={isDisabled}
              />
            </div>
          </div>
          <div className="w-full border-b-[1px] border-green-2 p-4 px-6 md:px-8">
            <div className="flex">
              <span className="w-2/5 md:w-3/6 text-xs md:text-base">Email</span>
              {/* <span className="w-3/5 md:w-3/6">{userProfile.Email}</span> */}
              <input
                type="text"
                placeholder="Enter your Email"
                className="text-xs md:text-base px-4 py-1 rounded-md"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={isDisabled}
              />
            </div>
          </div>
          <div className="w-full border-b-[1px] border-green-2 p-4 px-6 md:px-8">
            <div className="flex">
              <span className="w-2/5 md:w-3/6 text-xs md:text-base">City</span>
              {/* <span className="w-3/5 md:w-3/6">{userProfile.Email}</span> */}
              <input
                type="text"
                placeholder="Enter your City"
                className="text-xs md:text-base px-4 py-1 rounded-md"
                name="city"
                value={formData.city}
                onChange={handleChange}
                disabled={isDisabled}
              />
            </div>
          </div>
          <div className="w-full border-b-[1px] border-green-2 p-4 px-6 md:px-8">
            <div className="flex">
              <span className="w-2/5 md:w-3/6 text-xs md:text-base">
                Gender
              </span>
              {/* <span className="w-3/5 md:w-3/6">{userProfile.Gender}</span> */}
              {/* <input type="text" placeholder='Enter your Gender' className='text-xs md:text-base px-4 py-1 rounded-md'/> */}
              <span>
                <select
                  id="gender"
                  defaultValue="selectGender"
                  className="text-xs md:text-base px-4 py-1 rounded-md focus:border-[1px] border-black"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  disabled={isDisabled}
                >
                  <option value="selectGender" hidden>
                    Select your gender
                  </option>
                  <option value="male">Male&nbsp;</option>
                  <option value="female">Female&nbsp;</option>
                </select>
              </span>
            </div>
          </div>

          <div className="w-full border-b-[1px] border-green-2 p-4 px-6 md:px-8">
            <div className="flex">
              <span className="w-2/5 md:w-3/6 text-xs md:text-base">
                Membership Card
              </span>
              <button
                className="bg-white border-[1px] border-green-4 px-2 py-1 md:py-0 rounded-md text-green-4 text-xs md:text-base ml-4"
                onClick={handleMembershipCard}
              >
                View Membership
              </button>
            </div>
          </div>
          {isMembershipCardOpen && (
            <MembershipCard
              handleCloseCard={handleCloseCard}
              id={userId}
              details={formData}
            />
          )}

          <div className="flex justify-end pt-4">
            <div className="flex mx-4 md:mx-10">
              <button
                className=" border-2 border-green-700 mr-4 text-green-700 px-4 py-2 font-medium rounded-xl flex felx-row hover:bg-green-600 hover:text-white"
                onClick={handleEdit}
              >
                Edit&nbsp;
                <ModeEditRoundedIcon />
              </button>
              <button
                className="bg-green-600  text-white px-4 py-2 font-medium rounded-xl hover:bg-green-800 "
                onClick={handleSave}
              >
                Save&nbsp;
                <BookmarkAddedRoundedIcon />
              </button>
            </div>
          </div>
        </div>

        <div className="shadow-md bg-white rounded-2xl border-[1px] border-custom-red p-4 px-6 lg:px-8">
          <p className="font-medium mb-2 text-sm md:text-base">Note:</p>
          <p className="text-xs md:text-sm">
            Your privacy is important to us. We guarantee that your username and
            personal information will be kept confidential and will not be
            shared with any third parties. Feel safe knowing your data is
            secure.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MyProfilePage;
