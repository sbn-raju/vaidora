import React, { useEffect, useState } from "react";
import AppointmentImg from "../../assets/Page Assets/Home/appointment-img.png";
import AppointmentBg from "../../assets/Page Assets/Home/appointment-bg.png";
import Clock from "../../assets/Page Assets/Home/clock.png";
import docter from "../../assets/Page Assets/Home/docter image.png";
import Input from "../../components/Input.jsx";
import { diseasePurpose } from "../../constants";
import DoctorProfile from "../../components/DoctorProfile.jsx";
import FaqAccordin from "../../components/FaqAccordin.jsx";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import payImage from "../../assets/Logo/image 2.png";
import { convertTo12Hour } from "../../utils/convertTime.js";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { refreshTheAccessToken } from "../../slices/userSlice.js";

const AppointmentPage = () => {
  document.title = "Dr.RamaChandra & Padma | Appointment";

  const [appointmentFormData, setAppointmentFromData] = useState({
    name: "",
    phone_no: "",
    choose_purpose: "",
    doctor_id: "",
    date: "",
  });

  const [slots, setSlots] = useState([]);
  const [doctor, setDoctor] = useState([]);
  const [selectedDate, setSelectedDate] = useState();
  const [timeSlot, setTimeSlot] = useState();
  const [error, setError] = useState("");

  const [selectSlot, setSelectSlot] = useState(0);
  const [check, setCheck] = useState(false);
  const [loader, setLoader] = useState(false);

  const dispatch = useDispatch();

  const handleCheckBoxChange = () => {
    setCheck(!check);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setAppointmentFromData({
      ...appointmentFormData,
      [name]: value,
    });
    setSelectedDate(appointmentFormData.date);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!check) {
      toast.error("Kindly select the checkbox.");
      return;
    }

    const appointmentData = {
      appointmentFormData,
      timeSlot,
    };
    console.log(appointmentData);

    try {
      const amount = import.meta.env.VITE_APPOINTMENT_AMOUNT;
      const {
        data: { order },
      } = await axios.post("/api/v1/orders/payment", { amount });
      console.log(order);
      if (!order) {
        toast.error("Order is not Created");
        return;
      }

      // Creating Options of the RazorPay Instance
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard//Should BE in the Env File
        amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "Dr. Padma & Ramachandra",
        description: "Appointment Booking",
        image: payImage,
        order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        handler: async function (response) {
          const paymentData = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            appointmentData,
          };
          let loadingToaster ;
          try {
            loadingToaster = toast.loading(
              "Payment Processing...!. Please don't press back or refresh the Page"
            );
            const verifyUrl = "/api/v1/appointment/user/bookSlots";
            const verifyResponse = await axios.post(verifyUrl, paymentData);
            console.log(verifyResponse);
            if (verifyResponse.data.success) {
              toast.dismiss(loadingToaster);
              toast.success(verifyResponse?.data.messgae);
              setAppointmentFromData({
                name: "",
                phone_no: "",
                choose_purpose: "",
                doctor_id: "",
                date: "",
              });
              setSlots([]);
              setSelectSlot(0);
            } else {
              toast.dismiss(loadingToaster);
              toast.error("Payment not Done");
            }
          } catch (error) {
            toast.dismiss(loadingToaster);
            toast.error(error);
            console.error("Verification error:", error);
          }
        },
        theme: {
          color: "#006400",
        },
      };
      const razor = new Razorpay(options);
      razor.open();
    } catch (error) {
      if (error?.response.status == 401) {
        console.log("hi");
        dispatch(refreshTheAccessToken());
      }
      console.log(error);
    }
    console.log(appointmentData);
  };

  useEffect(() => {
    if (appointmentFormData.date && appointmentFormData.doctor_id) {
      const slotFetch = {
        date: appointmentFormData.date,
        doctor_id: appointmentFormData.doctor_id,
      };
      const fetchTimeSlot = async () => {
        try {
          const fetchSlots = await axios.post(
            "/api/v1/appointment/empty-slots",
            slotFetch
          );
          console.log(fetchSlots);
          if (!fetchSlots.data.data) {
            setError(fetchSlots.data.message);
          } else if (Array.isArray(fetchSlots.data.data)) {
            setSlots(fetchSlots.data.data);
            setError(null);
          }
        } catch (error) {
          console.log(error);
          if (error?.response.status === 401 || error?.response.status == 403) {
            dispatch(refreshTheAccessToken());
          }
          return Promise.reject(error);
        }
      };
      fetchTimeSlot();
    }
  }, [appointmentFormData.date, appointmentFormData.doctor_id]);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get("/api/v1/appointment/user/get/doctors");
      console.log(response);
      return response?.data.data;
    } catch (error) {
      console.log(error);
      if (error?.response.status === 401 || error?.response.status == 403) {
        dispatch(refreshTheAccessToken());
      }
      return Promise.reject(error);
    }
  };

  const { data: doctorData } = useQuery({
    queryKey: ["Doctors"],
    queryFn: fetchDoctors,
  });

  console.log(doctorData);

  const handleSelectSlot = (id, index) => {
    console.log(id);
    setTimeSlot(id);
    setSelectSlot(index);
  };

  return (
    <>
      <div className="w-full h-auto mb-10 bg-white">
        <div className="p-4 md:p-10 w-full flex flex-col md:flex-row justify-around items-center">
          <div className="w-full text-center md:w-1/2 md:text-start mb-10 md:my-0 pl-4">
            <p className="text-amber-900 font-bold text-[25px] md:text-4xl">
              డా.రామచంద్ర’s
            </p>
            <h1 className="text-green-4 font-bold text-[40px] md:text-[80px] mb-2 leading-tight">
              Harmony Heal
            </h1>
            <p className="text-red-400 text-base md:text-lg w-full md:w-4/5">
              Our platform offers a seamless journey towards well-being through
              personalized appointments with experienced naturopathy
              practitioners
            </p>
          </div>
          <div className="w-full md:w-1/2 flex justify-center md:justify-end">
            <img src={AppointmentImg} className="w-full md:w-[650px]" />
          </div>
        </div>

        <div
          className="rounded-2xl p-8 md:p-28 max-w-full"
          style={{
            backgroundImage: `url(${AppointmentBg})`,
            backgroundSize: "cover",
          }}
        >
          <p className="text-white text-4xl mb-10 mt-5 font-bold text-center">
            Book your Appointment
          </p>
          <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col justify-center items-center"
          >
            <div className="w-full flex flex-col md:flex-row">
              <div className="w-full md:w-1/2 order-3 md:order-1">
                <div className="p-8 bg-white rounded-[40px] shadow-lg mt-4 md:mx-5 md:mr-10">
                  <div className="flex justify-center items-center">
                    <img className="w-1/2" src={Clock} alt="Clock" />
                  </div>
                  <div className="mt-4">
                    <p className="text-xs md:text-lg">
                      <span className="font-medium">Instructions:</span>
                      <br />
                      Please arrive 5-10 minutes prior to your scheduled
                      appointment time to allow for check-in procedures.
                      <br />
                      Write down any questions or concerns you have before your
                      appointment to ensure you address them during your visit.
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-1/2 order-1 md:order-2 my-5 flex flex-col md:justify-evenly">
                <div className="flex flex-col">
                  <label htmlFor="name" className="text-white">
                    Name<sup className="text-red-600 text-lg">*</sup>
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Enter Patient Name"
                    value={appointmentFormData.name}
                    onChange={handleChange}
                    required
                    className="border-[1px] p-2 border-green-800 w-full md:w-11/12 h-10 rounded-[5px] mb-[4px]"
                    // style={{ color: "white" }}
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="phoneNumber" className="text-white">
                    Whatsapp Number<sup className="text-red-600 text-lg">*</sup>
                  </label>
                  <input
                    label="Phone Number *"
                    type="text"
                    name="phone_no"
                    placeholder="Enter WhatsApp Number"
                    id="phoneNumber"
                    value={appointmentFormData.phone_no}
                    onChange={handleChange}
                    required
                    className="border-[1px] p-2 border-green-800 w-full md:w-11/12 h-10 rounded-[5px] mb-[4px]"
                    // style={{ color: "" }}
                  />
                </div>

                <div>
                  <label htmlFor="purpose" className="text-white">
                    Choose the Purpose
                    <sup className="text-red-600 text-lg">*</sup>
                  </label>
                  <select
                    id="purpose"
                    type="text"
                    name="choose_purpose"
                    value={appointmentFormData.choose_purpose}
                    onChange={handleChange}
                    className="border-[1px] border-green-800 w-full md:w-11/12 h-10 rounded-[5px] mb-[4px]"
                  >
                    <option value="selectPurpose">Select your purpose</option>
                    {diseasePurpose.map((purpose, index) => (
                      <option key={index} value={purpose.purposeOfVisit}>
                        {purpose.purposeOfVisit}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="doctor" className="text-white">
                    Choose the Doctor
                    <sup className="text-red-600 text-lg">*</sup>
                  </label>
                  <select
                    id="doctor"
                    name="doctor_id"
                    value={appointmentFormData.doctor_id}
                    className="border-[1px] border-green-800 w-full md:w-11/12 h-10 rounded-[5px] mb-[4px]"
                    onChange={handleChange}
                  >
                    <option value="selectDoctor">Select your doctor</option>
                    {doctorData?.map((doctor, index) => (
                      <option key={index} value={doctor.id}>
                        {doctor.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="date" className="text-white">
                    Date<sup className="text-red-600 text-lg">*</sup>
                  </label>
                  <input
                    type="date"
                    name="date"
                    id="date"
                    placeholder="Select Date of Appointment"
                    value={appointmentFormData.date}
                    onChange={handleChange}
                    required
                    className="border-[1px] border-green-800 w-full md:w-11/12 h-10 rounded-[5px] mb-[2px] p-2"
                  />
                </div>
                {error ? <p className="text-red-500">{error}</p> : null}
              </div>

              {selectedDate && (
                <div className="md:hidden w-full order-2 md:order-3">
                  {slots?.length !== 0 ? (
                    <>
                      <p className="text-white">
                        Available Slots <sup className="text-red-600">*</sup>
                      </p>
                      <div className="mx-2 flex flex-wrap h-[90px] overflow-y-scroll admin-scrollbar">
                        {slots?.map((slot, index) => (
                          <div
                            key={index}
                            name="slot_id"
                            value={slot.id}
                            onClick={() => handleSelectSlot(slot.id, index)}
                            className={`m-1 md:m-2 w-auto text-sm text-white rounded-[5px] p-[1px] px-4 border-[1px] border-white-800 hover:text-white hover:bg-green-400 hover:border-2 hover:border-white hover:cursor-pointer ${
                              selectSlot === index
                                ? "bg-green-400"
                                : "bg-transparent"
                            }`}
                          >
                            {convertTo12Hour(slot.slot_start_time)}
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <p>
                      No slots available on selected date and for selected
                      Doctor
                    </p>
                  )}
                </div>
              )}
            </div>

            {selectedDate && (
              <div className="hidden md:block ml-12 w-full mt-5">
                {slots?.length !== 0 ? (
                  <>
                    <p className="text-white text-lg">
                      Available Slots{" "}
                      <sup className="text-red-600 font-bold text-lg">*</sup>
                    </p>
                    <div className="-mx-2 flex flex-wrap h-[90px] overflow-y-scroll admin-scrollbar">
                      {slots?.map((slot, index) => (
                        <div
                          key={index}
                          value={slot.id}
                          onClick={() => handleSelectSlot(slot.id, index)}
                          className={` m-1 md:m-2 w-auto text-sm text-white rounded-[5px] p-[1px] px-4 border-[1px] border-white-800 hover:text-white hover:bg-green-400 hover:border-2 hover:border-white hover:cursor-pointer ${
                            selectSlot === index
                              ? "bg-green-400"
                              : "bg-transparent"
                          }`}
                        >
                          {convertTo12Hour(slot.slot_start_time)}
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <p className="text-white">
                    No slots available on the selected date, please select
                    another date
                  </p>
                )}
              </div>
            )}

            <div className="w-full m-4 md:ml-12 flex flex-start">
              <input
                type="checkbox"
                id="checkbox"
                className="mr-2 transform scale-150"
                onChange={handleCheckBoxChange}
                checked={check}
              />
              <label
                htmlFor="checkbox"
                className="text-white text-xs md:text-base"
              >
                By checking this box, you agree to our terms and conditions and
                confirm your appointment booking.
              </label>
            </div>

            <div className="flex justify-center my-4">
              <button
                type="submit"
                className="bg-white text-green-4 p-2 px-4 w-44 rounded-lg font-medium"
              >
                Pay Now
              </button>
            </div>
          </form>
        </div>

        <div className="flex flex-col justify-center items-center my-10 p-6">
          <p className="text-green-700 text-3xl mb-10 mt-5 font-semibold">
            Know your Doctor
          </p>
          <DoctorProfile
            image={docter}
            name={"Dr. Ramachandra"}
            text={
              "ఆయుర్వేద, అలోపతి, హోమియోపతి, యునాని, సిద్ధ వైద్య విధానం మొదలగు వైద్య విధానం. పంచభూతాలతో చికిత్స చేసే ఒక ప్రక్రియ. ఇందులో మందులు కానీ, పసర్లు కానీ, పూతలు"
            }
          />
          <DoctorProfile
            image={docter}
            name={"Dr. Ramachandra"}
            text={
              "ఆయుర్వేద, అలోపతి, హోమియోపతి, యునాని, సిద్ధ వైద్య విధానం మొదలగు వైద్య విధానం. పంచభూతాలతో చికిత్స చేసే ఒక ప్రక్రియ. ఇందులో మందులు కానీ, పసర్లు కానీ, పూతలు"
            }
          />
          <DoctorProfile
            image={docter}
            name={"Dr. Ramachandra"}
            text={
              "ఆయుర్వేద, అలోపతి, హోమియోపతి, యునాని, సిద్ధ వైద్య విధానం మొదలగు వైద్య విధానం. పంచభూతాలతో చికిత్స చేసే ఒక ప్రక్రియ. ఇందులో మందులు కానీ, పసర్లు కానీ, పూతలు"
            }
          />
        </div>

        <div className="flex flex-col justify-center items-center my-10 p-6">
          <div className="w-full md:w-5/6">
            <div className="my-4 text-center">
              <p className="font-semibold text-2xl">FAQs</p>
            </div>
            <div className="w-full mt-4">
              <FaqAccordin
                text={"1. What conditions can Naturopathy help with?"}
                answer={
                  "Naturopathy can help with chronic conditions like arthritis and digestive disorders, as well as mental health issues such as stress and anxiety, using natural remedies and lifestyle changes. It also supports immune system health, helping with frequent colds and infections."
                }
              />
              <FaqAccordin
                text={"2. What can I expect from a Naturopathic consultation?"}
                answer={
                  "During a naturopathic consultation, you can expect a comprehensive assessment of your health, including a detailed discussion of your medical history, lifestyle, diet, and any symptoms you're experiencing. The naturopath will then develop a personalized treatment plan, which may include dietary recommendations, lifestyle changes, herbal remedies, and other natural therapies tailored to your specific needs."
                }
              />
              <FaqAccordin
                text={
                  "3. How long does it take to see results with Naturopathy?"
                }
                answer={
                  "The time it takes to see results with naturopathy can vary widely depending on the individual and the condition being treated. Generally, some improvements may be noticed within a few weeks, but more significant or chronic conditions might take several months to show substantial results. Consistency with the recommended lifestyle changes and treatments is key to achieving the best outcomes."
                }
              />
              <FaqAccordin
                text={"4. Are Naturopathic treatments evidence-based?"}
                answer={
                  "Naturopathic treatments can be evidence-based, especially when they incorporate dietary changes, exercise, and certain herbal remedies that have been scientifically studied. However, the extent of evidence varies, and some treatments may rely more on traditional use and practitioner experience rather than rigorous scientific research. It’s important to discuss the evidence supporting specific treatments with your naturopath to make informed decisions."
                }
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppointmentPage;
