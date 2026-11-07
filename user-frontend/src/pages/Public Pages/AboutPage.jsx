import React from 'react'
import AboutImage from'../../assets/Page Assets/Home/shaketree.png';
import { aboutLeftCardData ,aboutRightCardData, team } from '../../constants/index.js';
import line from '../../assets/Page Assets/Home/aboutLine.png';
import LeftCard from '../../components/LeftCard.jsx';
import RightCard from '../../components/RightCard.jsx';



const AboutPage = () => {
  document.title = "Dr.RamaChandra & Padma | AboutUs"

  return (
    <>
      <div className='w-full h-auto my-20 bg-white px-10'>
        <div className='p-4 md:p-10 w-full flex flex-col md:flex-row justify-around items-center'>
          <div className='w-full text-center md:w-1/2 md:text-start mb-10 md:my-0 pl-4'>
            <p className="text-amber-900 font-bold text-[25px] md:text-4xl">మా   ప్రస్తావన</p>
            <h1 className='text-green-4 font-bold text-[40px] md:text-[80px] mb-2 leading-tight'>About us!!</h1>
            <p className='text-red-400 text-base md:text-lg w-full md:w-4/5'>
              More than 3 lakhs patients consulted personally at Prakruti Ashram. The consultation and food is served for 
              FREE since the inception of this Ashram.
            </p>
          </div>
          <div className='w-full md:w-1/2 flex justify-center md:justify-end'>
            <img src={AboutImage} className='w-full md:w-[650px]' alt="AboutUs"/>
          </div>
        </div>
        <div className='hidden md:block '>
          <div className='my-20 w-full flex flex-col justify-center items-center'>
            <p className="text-amber-900 font-bold text-4xl my-2">మా   ప్రస్తావన</p>
            <div className='mt-10 flex'>
              <div className='mt-10'>
                {aboutLeftCardData.map((cardDetails, index)=>(
                  <LeftCard year={cardDetails.year} work={cardDetails.work}/>
                ))}
              </div>
              <img src={line} className='w-4'/>
              <div className='mt-10'>
                {aboutRightCardData.map((cardDetails, index)=>(
                  <RightCard year={cardDetails.year} work={cardDetails.work}/>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className='md:hidden'>
        <div className='my-20 w-full flex flex-col justify-center items-center'>
            <p className="text-amber-900 font-bold text-4xl my-2">మా   ప్రస్తావన</p>
            <div className='mt-10 flex'>
              <img src={line} className='w-4'/>
              <div className='mt-10'>
              {aboutRightCardData.map((cardDetails, index)=>(
                  <RightCard year={cardDetails.year} work={cardDetails.work}/>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-col justify-center items-center my-10'>
          <p className="text-amber-900 font-bold text-4xl my-2">Our Team</p>
          <p className='text-red-400 text-lg leading-6 w-2/3 text-center'>
            More than 3 lakhs patients consulted personally at Prakruti Ashram. The consultation and food is served for 
            FREE since the inception of this Ashram.
          </p>
          <div className='flex flex-wrap justify-center'>
            {team.map((mem, index) => (
              <div className='p-10 flex flex-col justify-center items-center'>
                <img src={mem.img} className='h-[200px] w-[200px] rounded-full border-[1px] border-green-3' />
                <p>{mem.name}</p>
                <p>{mem.position}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div class="bg-green-4 p-10 w-full">
        <div className='flex flex-col justify-center items-center mb-10'>
          <h1 className='text-white font-medium text-4xl'>Address</h1>
        </div>
        <div className='flex flex-col md:flex-row w-full'>
          <div className='w-full md:w-1/2 mr-2'>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3813.247343790198!2d80.06439797532117!3d17.10943001075275!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a34ffd2d66ca133%3A0xfde774891c93c989!2sSiddhardha%20Yoga%20Vidyalayam%2C%20Prakruthi%20Ashram%20(Dr.K.Y.Ramachandra%20Rao%20%26%20Dr.N.G.Padma)!5e0!3m2!1sen!2sin!4v1718198966293!5m2!1sen!2sin" 
              style={{border:0}} allowfullscreen="" loading="lazy" 
              referrerpolicy="no-referrer-when-downgrade"
              className="w-full h-48 md:h-96"
            ></iframe>
          </div>
          <div className='w-full md:w-1/2 text-white ml-2'>
            <p className='my-2 leading-6'>
              నేలకొండపల్లి ప్రకృతి ఆశ్రమం వైద్య సలహాల కొరకు కేవలం బుధ, గురు, శుక్ర వారాలలో మాత్రమే తెరిచి ఉంటుంది. ఏమైనా మార్పులు ఉంటే ఈ పైన/ప్రక్కన క్యాలెండర్ లో ఎప్పటికప్పుడు తాజా సమాచారం ఇవ్వబడుతుంది
            </p>
            <p className='my-2 leading-6'>
              ఆశ్రమంలో ఇన్ పేషంట్ సదుపాయం లేదు.హైదరాబాద్లో కన్సల్టేషన్ లేదు.టెలిఫోన్ ద్వారా అపాయింట్మెంట్స్ ఇవ్వబడవు.
            </p>
            <p className='my-2 leading-6'>
              ఆశ్రమానికి నేరుగా ఉదయం 8 గంటల లోపు వచ్చిన వారికి మాత్రమే టోకెన్లు ఇవ్వబడతాయి. వారిని మాత్రమే డాక్టర్ గారు చూస్తారు.
            </p>
            <p className='my-2 leading-6'>
              ఆశ్రమంలో సప్లిమెంట్ షాపు కన్సల్టేషన్ ఉన్న రోజులతో సంబంధం లేకుండా సంవత్సరమంతా ప్రతీ బుధ, గురు, శుక్ర వారాలలో ఉదయం 9 గంటల నుంచి 11 గంటల వరకు మాత్రమే తెరిచి ఉంటుంది.
            </p>
            <p className='my-2 leading-6'>
              ఆశ్రమం రావడానికి మార్గాలు: <br/>
              1. ఇతర ఊళ్ళ నుంచి నేలకొండపల్లి రావడానికి<br/>
              2. నేలకొండపల్లి నుంచి ఆశ్రమానికి<br/>
              3. గూగుల్ డైరెక్షన్స్
            </p>
            <p className='my-2 leading-6 font-semibold'>
              ఆరోగ్య సలహాలు ఉచితం.<br/>భోజన సదుపాయం ఉచితం.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default AboutPage