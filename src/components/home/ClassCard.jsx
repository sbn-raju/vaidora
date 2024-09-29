import React from "react";
import HomeClassCard from "../../assets/Page Assets/Home/Home Class Card.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import GTranslateRoundedIcon from '@mui/icons-material/GTranslateRounded';
import CurrencyRupeeRoundedIcon from '@mui/icons-material/CurrencyRupeeRounded';


const ClassCard = () => {
  const {token, user} = useSelector((state)=>state.auth);

  const navigate = useNavigate();

  const handleClassOpen = () =>{
    if(token != null && user != null){
      navigate("/class");
    }
    else{
      navigate("/user/login");
    }
  } 

  return (
    <>
      <div className="hidden md:block">
        <div className="h-[330px] lg:h-[400px] my-10 w-full flex justify-center">
          <div className="shadow-lg relative w-4/5 mt-20 bg-green-3 p-4 lg:p-10 rounded-tl-[200px] rounded-[50px]">
            <div className="flex justify-end">
              <div className="w-3/5">
                <p className="text-right text-white text-[20px] lg:text-[30px] font-leagueSpartanMedium mb-4">
                  <span className="font-gurajadaRegular text-[25px] lg:text-[40px]">ప్రకృతే వైద్యుడు</span><br/>
                  21 days - Naturopathy Workshop
                </p>
                <div className="flex justify-end">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <CalendarMonthRoundedIcon sx={{color:"white"}}/>
                      <p className="text-white text-xs sm:text-base lg:text-lg">Duration: 21 Days</p>
                    </div>
                    <div className="flex items-center">
                      <span>
                        <AccessTimeRoundedIcon sx={{color:"white"}}/>
                      </span>
                      <p className="text-white text-xs sm:text-base lg:text-lg">Time: 7:00pm to 8:00pm</p>
                    </div>
                    <div className="flex items-center">
                      <span>
                        <GTranslateRoundedIcon sx={{color:"white"}}/>
                      </span>
                      <p className="text-white text-xs sm:text-base lg:text-lg">Telugu తెలుగు</p>
                    </div>
                    <div className="flex items-center">
                      <CurrencyRupeeRoundedIcon sx={{color:"white"}}/>
                      <p className="text-white text-xs sm:text-base lg:text-lg">Fees: 1000</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <img src={HomeClassCard} className="absolute -top-16 left-16 lg:left-20 w-[200px] lg:w-[260px]"/>
            <button 
              className="absolute left-20 lg:left-24 bottom-10 text-[18px] lg:text-[20px] bg-green-2 px-10 lg:px-16 py-3 rounded-tl-full rounded-br-full shadow-md font-gurajadaRegular"
              onClick={handleClassOpen}>
                సంప్రదించండి
            </button>
          </div>
        </div>
      </div>

      <div className="md:hidden">
        <div className="h-auto my-10 w-full flex justify-center">
          <div className="shadow-lg relative w-4/5 mt-20 bg-green-3 p-6 rounded-2xl">
            <div className="flex justify-center mt-10">
              <div className="text-center">
                <p className="text-white text-lg font-medium my-4">
                  ప్రకృతే వైద్యుడు<br/>
                  21 days - Naturopathy Workshop
                </p>
                <div className="flex justify-end">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <CalendarMonthRoundedIcon sx={{color:"white"}}/>
                      <p className="text-white text-xs sm:text-base">Duration: 21 Days</p>
                    </div>
                    <div className="flex items-center">
                      <span>
                        <AccessTimeRoundedIcon sx={{color:"white"}}/>
                      </span>
                      <p className="text-white text-xs sm:text-base">Time: 7:00pm to 8:00pm</p>
                    </div>
                    <div className="flex items-center">
                      <span>
                        <GTranslateRoundedIcon sx={{color:"white"}}/>
                      </span>
                      <p className="text-white text-xs sm:text-base">Telugu తెలుగు</p>
                    </div>
                    <div className="flex items-center">
                     <CurrencyRupeeRoundedIcon sx={{color:"white"}}/>
                      <p className="text-white text-xs sm:text-base">Fees: 1000</p>
                    </div>
                  </div>
                </div>
                <button 
                  className="mt-2 bg-green-2 px-4 py-1 rounded-tl-full rounded-br-full shadow-md font-medium"
                  onClick={handleClassOpen}>
                    సంప్రదించండి
                </button>
              </div>
            </div>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <img src={HomeClassCard} className="w-36" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClassCard;
