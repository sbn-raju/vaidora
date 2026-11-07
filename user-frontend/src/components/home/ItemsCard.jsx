import React from 'react';
import item1 from "../../assets/Page Assets/Home/Item1.png";
import item2 from "../../assets/Page Assets/Home/Item2.png";
import item3 from "../../assets/Page Assets/Home/Item3.png";
import item4 from "../../assets/Page Assets/Home/Item4.png";

function ItemsCard() {
  const items = [
    {
      id: 1,
      imgSrc: item1,
      title: 'మాయిశ్చరైజర్',
      price: '₹200.00',
    },
    {
      id: 2,
      imgSrc: item2,
      title: 'కరివేపాకు నూనె',
      price: '₹408.00',
    },
    {
      id: 3,
      imgSrc: item3,
      title: 'రోజ్మేరీ జెల్',
      price: '₹420.00',
    },
    {
      id: 4,
      imgSrc: item4,
      title: 'విటమిన్ సి జెల్',
      price: '₹260.00',
    },
  ];

  return (
    <div className="w-full mt-20 flex flex-col justify-center items-center">
      <h2 className="font-gurajadaRegular text-[40px] lg:text-[50px] text-[#5A7F53] mt-4 mb-8">
        మా స్టోర్
      </h2>
      <div className="min-w-full h-auto flex flex-col justify-center items-center mt-6 gap-4 mb-20">
        <div className="w-full flex flex-wrap justify-center gap-12 mb-10">
          {items.map((item) => (
            <div key={item.id} className="w-1/5 min-w-[200px] flex flex-col items-start">
              <img src={item.imgSrc} alt={item.title} className="w-full h-48 object-cover rounded-lg mb-2 shadow-sm"/>
              <h3 className="text-xl font-suravaramRegular  text-[#34442C]">{item.title}</h3>
              <div className="flex items-center ">
                <span className="text-lg text-[#34442C]">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
              </div>
              <p className="text-lg text-[#34442C] font-suravaramRegular">{item.price}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <button className="px-6 py-3 bg-green-600 text-white rounded-full font-semibold transition transform ease-in-out hover:scale-110 duration-300 hover:delay-75 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-cart3 mr-2" viewBox="0 0 16 16">
              <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
            </svg>
            View More
          </button>
        </div>
      </div>
    </div>
  );
}


export default ItemsCard;