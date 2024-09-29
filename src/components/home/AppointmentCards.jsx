import React from "react";
import Clock from "../../assets/Page Assets/Home/clock.png";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AppointmentCards = () => {
  const {token, user} = useSelector((state)=>state.auth);
  const navigate = useNavigate();

  const handleAppointmentOpen = () =>{
    if(token != null && user != null){
      navigate("/appointment");
    }
    else{
      navigate("/user/login");
    }
  }
  return (
    <>
      <div className="hidden md:block">
        <div className="h-[330px] lg:h-[400px] my-10 w-full flex justify-center">
          <div className="shadow-lg relative w-4/5 mt-20 bg-green-3 rounded-[50px] rounded-br-[200px]">
            <div className="flex justify-start px-4 lg:px-10">
              <div className="w-3/5 text-left">
                <p className="text-white text-[30px] lg:text-[40px] font-gurajadaRegular mb-4 mt-10">
                  అపాయింట్‌మెంట్
                </p>
                <p className="text-white text-[18px] lg:text-[24px] leading-relaxed font-tenaliRamaKrishnaRegular">
                  ప్రకృతి వైద్యం మిమ్మల్ని నయం చేయడంలో సహాయపడనివ్వండి! ఇది అన్నింటికీ నివారణ కానప్పటికీ, ప్రకృతి వైద్యం మీకు ఆరోగ్యంగా మరియు సంతోషంగా ఉండేందుకు సహాయపడుతుంది.
                </p>
              </div>
            </div>
            <img src={Clock} className="w-44 lg:w-48 absolute -top-28 right-12 lg:right-20"/>
            <button 
              className="absolute right-[55px] bottom-[55px] lg:right-20 lg:bottom-24 bg-green-2 text-[18px] lg:text-[20px] px-10 lg:px-16 py-3 rounded-tl-full rounded-br-full shadow-md font-gurajadaRegular"
              onClick={handleAppointmentOpen}>
                సంప్రదించండి
            </button>
          </div>
        </div>
      </div>

      <div className="md:hidden">
        <div className="h-auto my-10 w-full flex justify-center">
          <div className="shadow-lg relative w-4/5 mt-20 bg-green-3 p-10 rounded-2xl">
            <div className="flex justify-end mt-10">
              <div className="text-center">
                <p className="text-white text-base font-medium my-4">
                  అపాయింట్‌మెంట్
                </p>
                <p className="text-white text-sm leading-6">
                  ప్రకృతి వైద్యం మిమ్మల్ని నయం చేయడంలో సహాయపడనివ్వండి! ఇది అన్నింటికీ నివారణ కానప్పటికీ, ప్రకృతి వైద్యం మీకు ఆరోగ్యంగా మరియు సంతోషంగా ఉండేందుకు సహాయపడుతుంది.
                </p>
                <button 
                  className="mt-2 bg-green-2 px-4 py-1 rounded-tl-full rounded-br-full shadow-md font-medium"
                  onClick={handleAppointmentOpen}>
                    సంప్రదించండి
                </button>
              </div>
            </div>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <img src={Clock} className="w-36" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppointmentCards;
