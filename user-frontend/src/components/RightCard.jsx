import React from 'react';
import AboutDot from '../assets/Page Assets/Home/aboutDot.png';

const RightCard = ({year, work}) => {

    // This is for the date of the present year in case of the prop failure fo better error handling 
    const date = new Date();
    const newYear = date.getFullYear();

    // This is for the default description of the column in casse of the props failure error handling
    const newWork = "మా డైట్ పేజీకి ఒక్క క్లిక్తో మీ ఆరోగ్య లక్ష్యాలను సాధించడానికి మీకు శక్తినిచ్చే డాక్టర్ రామచంద్ర యొక్క పరివర్తన ఆహార ప్రణాళికను కనుగొనండి"


    return (
        <div className='ml-6 relative bg-green-4 p-4 text-left text-white rounded-tr-lg rounded-br-lg my-[100px] md:my-[150px]'>
            <p className='font-medium text-lg'>{year?year:newYear}</p>
            <p>{work?work:newWork}</p>
            <span className='absolute top-[35%] -left-[16px]'>
                <svg width="17" height="25" viewBox="0 0 17 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 12.791L16.5558 24.9915V0.590545L0 12.791Z" fill="#497246"/>
                </svg>
            </span>
            <img src={AboutDot} className='w-10 absolute top-[30%] -left-[50px]'/>
        </div>
    )
}

export default RightCard;