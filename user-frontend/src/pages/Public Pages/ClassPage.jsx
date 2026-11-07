import React, { useState, useEffect } from "react";
import classImg from "../../assets/Page Assets/Home/class-img.png";
import Input from "../../components/Input.jsx";
import FaqAccordin from "../../components/FaqAccordin.jsx";
import classBg from "../../assets/Page Assets/Home/class-bg.png";
import axios from "axios";
import Loading from "../../components/common/Loading.jsx";
import Toast, { toast, Toaster } from "react-hot-toast";
import payImage from "../../assets/Logo/image 2.png";
import { formatDate } from "../../utils/formateDate";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { refreshTheAccessToken } from "../../slices/userSlice.js";

const ClassPage = () => {
  document.title = "Dr.RamaChandra & Padma | Workshop";
  const [checked, setChecked] = useState(false);
  const [inputError, setInputError] = useState(null);
  const dispatch = useDispatch();

  //Initating the Form Data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
    city: "",
  });

  const fetchClassDate = async () => {
    try {
      const response = await axios.get("/api/v1/class_booking/upcoming/date");
      console.log(response);
      return response?.data.data;
    } catch (error) {
      console.log(error);
      if(error?.response.status === 401 || error?.response.status == 403){
        dispatch(refreshTheAccessToken());
      }
      return Promise.reject(error);
    }
  };

  const { data: classDate } = useQuery({
    queryKey: ["dateclass"],
    queryFn: fetchClassDate,
  });

  console.log(classDate);

  const fetchClassPrice = async () => {
    try {
      const response = await axios.get("/api/v1/class_booking/class/price");
      console.log(response);
      return response?.data.data;
    } catch (error) {
      console.log(error);
      if(error?.response.status === 401 || error?.response.status == 403){
        dispatch(refreshTheAccessToken());
      }
      return Promise.reject(error);
    }
  };

  const { data: price } = useQuery({
    queryKey: ["classPrice"],
    queryFn: fetchClassPrice,
  });

  console.log(price);

  //Handle Change on the input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setInputError();
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!checked){
      toast.error("Kindly select the checkbox.");
      return
    }

    const { name, email, whatsapp } = formData;
    if (!(name && email && whatsapp)) {
      toast.error("Fill the Form Compeletely");
      setInputError("Fill The Form Completely");
      return;
    }

    //Creating the order on the amount change
    const amount = price?.class_fees;
    console.log(formData);

    try {
      const {
        data: { order },
      } = await axios.post("api/v1/orders/payment", { amount });
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
        description: "Class Booking",
        image: payImage,
        order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        handler: async function (response) {
          const paymentData = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            formData,
            amount
          };
          let loadingToaster;
          try {
            loadingToaster = toast.loading("Payment Processing..!. Please don't press back or refresh the page!")
            const verifyUrl = "api/v1/class_booking/user/setClass_booking";
            const verifyResponse = await axios.post(verifyUrl, paymentData);
            if (verifyResponse.data.success) {
              console.log(verifyResponse);
              toast.dismiss(loadingToaster);
              toast.success(verifyResponse.data.message);
              setFormData({
                name: "",
                email: "",
                whatsapp: "",
                city: "",
              });
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
      console.log(error);
      if(error?.response.status === 401 || error?.response.status == 403){
        dispatch(refreshTheAccessToken());
      }
      return Promise.reject(error);
    }
  };

  const handleCheckBoxChange = () => {
    if (checked) {
      setChecked(false);
    } else {
      setChecked(true);
    }
  };

  return (
    <div className="w-full h-auto mb-10 bg-white">
      <div className="p-4 md:p-10 w-full flex flex-col md:flex-row justify-around items-center">
        <div className="w-full text-center md:w-1/2 md:text-start mb-10 md:my-0 pl-4">
          <p className="text-amber-900 font-bold text-[25px] md:text-4xl">
            డా.రామచంద్ర’s
          </p>
          <h1 className="text-green-4 font-bold text-[40px] md:text-[80px] mb-2 leading-tight">
            Naturopathy Workshop
          </h1>
          <p className="text-red-400 text-base md:text-lg w-full md:w-4/5">
            Explore a variety of holistic classes, from yoga to herbal remedies,
            and effortlessly reserve your spot.
          </p>
        </div>
        <div className="w-full md:w-1/2 flex justify-center md:justify-end -mt-10 md:m-0">
          <img src={classImg} className="w-full md:w-[450px]" />
        </div>
      </div>

      <div className="my-8 text-center p-6">
        <p className="text-[24px] md:text-[30px] text-[#194D2E] font-semibold">
          21 రోజుల ప్రకృతే వైద్యుడు వర్కషాప్ {formatDate(classDate?.class_date)}{" "}
          నుంచి ప్రారంభం
        </p>
      </div>

      <div
        className="flex flex-col justify-center items-center rounded-2xl p-4 pt-40 md:pt-40 md:p-10 text-white bg-center md:bg-top"
        style={{ backgroundImage: `url(${classBg})`, backgroundSize: "cover" }}
      >
        <div className="w-full md:flex md:flex-row md:p-0">
          <div className="w-full md:w-2/5 flex flex-col justify-center items-center mb-6 md:mb-0">
            <div className="w-full flex justify-center">
              <iframe
                src={
                  "https://www.youtube.com/embed/uJv63hoxgWc?si=tAcwZvpWmLowdvGr&amp;start=3"
                }
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="rounded-2xl sm:w-[300px] sm:h-[154px] md:w-[360px] md:h-[205px] lg:w-[600] lg:h-[268px] "
              ></iframe>
            </div>
            <p className="text-white text-base md:text-lg my-2 text-center">
              Online Classes Preview
            </p>
          </div>
          <div className="w-full md:w-3/5 text-white md:pr-8">
            <p className="text-center mb-6">
              ప్రస్తుత ప్రపంచానికి అసాధ్యం అనిపించే అనారోగ్య సమస్యల సైతం ఇంటి
              వద్దనే ఎలా తేలికగా తగ్గుతాయో అందరికీ అర్థం అయ్యేలా చెప్పిన, తెలుగు
              జాతికి సుపరిచితులయిన, ఎన్నో లక్షల మందిని ప్రత్యక్షంగా, యూట్యూబ్,
              టివీల ద్వారా ఆరోగ్యవంతులుగా మార్చిన "డా.ఏ.పీ.జే. అబ్దుల్ కలాం
              నేషనల్ అవార్డ్ గ్రహీత", "ఏ లివింగ్ చరక బిరుదు గ్రహీత" ప్రముఖ
              ప్రకృతి వైద్యులు డా.రామచంద్ర మరియు డా.పద్మ గార్లచే ప్రకృతి జీవన
              విధానంపై శిక్షణా కార్యక్రమాలు.
            </p>

            <p className="text-center">
              Online trainings on Naturopathic lifestyle that changes
              everything. An ancient knowledge with modern scientific approach
              that healed lakhs of people from uncurable ailments, by Dr. Padma
              & Dr. Ramachandra ("Dr. APJ Abdul Kalam National" Awardee & "A
              Living Charaka" Awardee)
            </p>
          </div>
        </div>

        <div className="w-full mt-6">
          <p className="text-center font-medium text-4xl">Book Your Seat</p>
        </div>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="w-full my-4 flex flex-col justify-center items-center md:block">
            <div className="flex flex-col md:flex-row justify-around my-2">
              <div className="flex flex-col">
                <label htmlFor="name" className="text-lg">
                  Name<sup className="text-red-600 text-xl">*</sup>
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Enter your name here"
                  className="border-[1px] border-green-700 w-[300px] md:w-[400px] my-2 md:my-0 text-black p-2 rounded-lg"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="email" className="text-lg">
                  Email<sup className="text-red-600 text-xl">*</sup>
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email here"
                  className="border-[1px] border-green-700 w-[300px] md:w-[400px] my-2 md:my-0 text-black p-2 rounded-lg"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-around my-2 ">
              <div className="flex flex-col">
                <label htmlFor="number" className="text-lg">
                  WhatsApp Number<sup className="text-red-600 text-xl">*</sup>
                </label>
                <input
                  id="number"
                  type="text"
                  placeholder="Whatsapp Number only"
                  className="border-[1px] border-green-700 w-[300px] md:w-[400px] my-2 md:my-0 text-black p-2 rounded-lg"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="city" className="text-lg">
                  City&nbsp;(Optional)
                </label>
                <input
                  id="city"
                  type="text"
                  placeholder="Enter your city here"
                  className="border-[1px] p-2 rounded-lg border-green-700 w-[300px] md:w-[400px] my-2 md:my-0 text-black"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="p-6 mt-6">
            <p className="font-medium mb-2 flex">
              గమనిక: You will get updates on your WhatsApp number. పైన మీ
              వాట్సాప్ ఫోన్ నంబరు సరిగ్గా ఎంటర్ చేయకపోతే ట్రైనింగ్ లో
              పాల్గొనలేరు.
            </p>

            <div className="w-full flex flex-start mt-6 justify-start">
              <input
                type="checkbox"
                id="check"
                className="mr-2 transform scale-150"
                onChange={handleCheckBoxChange}
                checked={checked}
              />
              <label
                htmlFor="check"
                className="text-white text-xs md:text-base"
              >
                I agree and accept the payment's{" "}
                <Link to={"/term"} className="text-blue-400">
                  Terms and conditions
                </Link>
                . I understand that this training is NOT a substitute for the
                consultation, diagnosis, and/or medical treatment. *
              </label>
            </div>

            <p className="text-sm my-6">
              <span className="font-medium text-lg">
                Important Note About Registrations:
              </span>
              <br />
              When registering, please double-check that you have entered your
              phone number correctly. In the event that you provide incorrect
              information, we will be unable to contact you. Thank you for your
              cooperation.
            </p>
          </div>
          <p className="text-red-700">{inputError ? inputError : null}</p>
          <div className="flex justify-center mt-6">
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
              text={"3. How long does it take to see results with Naturopathy?"}
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
  );
};
export default ClassPage;
