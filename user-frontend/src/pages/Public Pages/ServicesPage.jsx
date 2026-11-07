import React from "react";
import posterImage from "../../assets/Page Assets/Home/serviceImg.png";
import ClassCard from "../../components/home/ClassCard.jsx";
import AppointmentCards from "../../components/home/AppointmentCards.jsx";
import CardsHolder from "../../components/services/CardsHolder.jsx";


const ServicesPage = () => {
  document.title = "Dr.RamaChandra & Padma| Services"

  return (
    <>
      {/* Poster */}
      <div className="bg-white">
        <div className='p-4 md:p-20 w-full flex flex-col md:flex-row justify-around items-center'>
          <div className='w-full text-center md:w-1/2 md:text-start mb-10 md:my-0 pl-4'>
            <h2 className="text-[30px] md:text-[50px] font-bold text-[#792F2F]">డా.రామచంద్ర’s</h2>
            <h1 className="text-[40px] md:text-[70px] text-green-3 font-bold">Service with a Smile</h1>
            <p className="text-[10px] md:text-[24px] text-red-400 font-normal">Discover how our natural approach to healing can bring a smile to your face and wellness to your life!</p>
          </div>
          <div className='w-full md:w-1/2 flex justify-center'>
            <img src={posterImage} className='w-[200px] md:w-[500px]' />
          </div>
        </div>

        {/* Card Holders */}
        <CardsHolder />

        {/* Card of Appointment Booking */}
        <AppointmentCards />
        <div className="mt-10"></div>
      </div>

      {/* Card of Appointment */}
      <div className="mt-20">
        <ClassCard />
      </div>
    </>
  );
};

export default ServicesPage;
