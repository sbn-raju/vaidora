import React, { useState } from 'react';
import HomeServices_one from "../../../assets/Page Assets/Home/HomeServices_one.png";
import HomeServices_two from "../../../assets/Page Assets/Home/HomeServices_two.png";
import HomeServices_three from "../../../assets/Page Assets/Home/HomeServices_three.png";
import HomeServices_one_corresponding from "../../../assets/Page Assets/Home/HomeServices_one_correspond.png";

const ServiceHoverableImg = () => {
  const mainImages = [
    {
      id: 1,
      image_one: HomeServices_one,
      image_two: HomeServices_one_corresponding,
    },
    {
      id: 2,
      image_one: HomeServices_two,
      image_two: HomeServices_one_corresponding,
    },
    {
      id: 3,
      image_one: HomeServices_three,
      image_two: HomeServices_one_corresponding,
    },
  ];

  // Initialize an array of false values corresponding to the number of images
  const [hoverStates, setHoverStates] = useState(new Array(mainImages.length).fill(false));

  const handleMouseEnter = (index) => {
    const newHoverStates = [...hoverStates];
    newHoverStates[index] = true;
    setHoverStates(newHoverStates);
  };

  const handleMouseLeave = (index) => {
    const newHoverStates = [...hoverStates];
    newHoverStates[index] = false;
    setHoverStates(newHoverStates);
  };

  return (
    <div className='w-full mt-16 flex justify-center items-center flex-col'>
      <div>
        <h2 className='font-semibold text-2xl lg:font-bold lg:text-3xl text-green-700'>మా సేవలు</h2>
      </div>
      <div className='w-full lg:w-4/5 h-auto flex flex-col items-center justify-between lg:flex-row'>
        {mainImages.map((image, index) => (
          <div key={image.id} className='m-4 cursor-pointer'>
            <img
              src={hoverStates[index] ? image.image_two : image.image_one}
              alt=""
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceHoverableImg;
