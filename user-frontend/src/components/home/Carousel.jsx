import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import homebg from "../../assets/Page Assets/Home/homebg.png";
import homebgM from '../../assets/Page Assets/Home/homebg_m.svg';
import homebgMedium from '../../assets/Page Assets/Home/homebg_m_png.png'
import '../../styles/carousal.styles.css';

const slides = [
  {
    img: homebg,
    para: "ఇల్లే వైద్యశాల - వంటగధే మందుల షాపు - అమ్మే డాక్టర్",
    title: "డా.రామచంద్ర",
  },
  {
    img: homebg,
    para: "2ఇల్లే వైద్యశాల - వంటగధే మందుల షాపు - అమ్మే డాక్టర్",
    title: "డా.రామచంద్ర",
  },
  {
    img: homebg,
    para: "3ఇల్లే వైద్యశాల - వంటగధే మందుల షాపు - అమ్మే డాక్టర్",
    title: "డా.రామచంద్ర",
  },
  {
    img: homebg,
    para: "4ఇల్లే వైద్యశాల - వంటగధే మందుల షాపు - అమ్మే డాక్టర్",
    title: "డా.రామచంద్ర",
  },
]

const Carousal = () => {
  return (
    <div className="w-full flex justify-center items-center h-[626px] mt-6">
      <div className="hidden md:block w-full rounded-md p-10" style={{ fontFamily: 'Roboto, sans-serif' }}>
        <Carousel autoPlay infiniteLoop showStatus={false} showThumbs={false}>
          {slides.map((slide, index) => (
            <div
              key={index}
              className="w-full h-[650px] rounded-2xl shadow-md p-10"
              style={{
                backgroundImage: `url(${slide.img})`,
                backgroundSize: 'cover',
              }}
            >
              <div className="flex justify-end w-full h-full p-2">
                <div className='flex flex-col justify-center text-end'>
                  <p className='text-[#71FF77] text-[24px] md:text-[24px] my-2 font-suravaramRegular'>{slide.para}</p>
                  <h1 className='text-white text-center text-[128px] md:text-[100px] my-4 font-gurajadaRegular'>{slide.title}</h1>
                  <div className='flex justify-end'>
                    <button className="my-2 w-48 py-2 bg-[#497246] text-white rounded-md font-gurajadaRegular text-[32px] transition transform ease-in-out hover:scale-110 duration-300 shadow-lg hover:bg-[#355a34] ">
                      సంప్రదించండి
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>

      {/* For Medium and Lower Width Devices */}
      <div className="md:hidden w-full my-4" style={{ fontFamily: 'Roboto, sans-serif' }}>
        <div
          className="w-full h-[650px] shadow-md p-4"
          style={{
            backgroundImage: `url(${homebgMedium})`,
            backgroundSize: 'cover',
          }}
        >
          <div className="flex justify-center w-full h-full p-2">
            <div className='flex flex-col justify-start text-center'>
              <p className='text-[#71FF77] text-[10px] md:text-lg my-2'>3ఇల్లే వైద్యశాల - వంటగధే మందుల షాపు - అమ్మే డాక్టర్</p>
              <h1 className='text-white text-center text-4xl md:text-7xl font-bold my-4'>డా.రామచంద్ర</h1>
              <div className='flex justify-center'>
                <button className="text-sm md:text-lg my-2 w-36 md:w-44 py-2 bg-[#497246] text-white rounded-md font-medium md:font-semibold transition transform ease-in-out hover:scale-110 duration-300 shadow-lg hover:bg-[#355a34] ">
                  సంప్రదించండి
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousal;
