import React from "react";
import CardHolder_one from "../../assets/Page Assets/Services/CardHolder_one.png";
import CardHolder_two from "../../assets/Page Assets/Services/CardHolder_two.png";
import Servicebg from "../../assets/Page Assets/Services/Servicebg.png";

const CardsHolder = () => {
  return (
    <div className="py-8">
    <div
      className="max-w-full h-auto flex justify-center items-center mt-20"
      style={{ backgroundImage: `url(${Servicebg})` , backgroundSize: 'cover'}}
    >
    
      <div className="w-11/12 flex-col justify-center items-center py-10 px-5 lg:px-10 rounded-lg mt-20">
        <div className="m-auto rounded-3xl mt-8">
          <div className="w-full flex flex-col-reverse lg:flex-row-reverse bg-white py-5 px-5 mt-4 rounded-3xl shadow-md">
            <div className="lg:w-3/5 mt-8 m-auto mb-8">
              <h2 className="font-bold text-2xl hidden lg:block text-green-4">ఆరోగ్య సలహా</h2>
              <p className="mt-4 text-gray-700 leading-relaxed text-sm">
                ఆయుర్వేద, అలోపతి, హోమియోపతి, యునాని, సిద్ధ వైద్య విధానం మొదలగు
                వైద్య విధానాలవలే ఇది ఒక వైద్య విధానం. పంచభూతాలతో చికిత్స చేసే ఒక
                ప్రక్రియ. ఇందులో మందులు కానీ, పసర్లు కానీ, పూతలు కానీ, లేపనాలు కానీ
                ఏమీ వుండవు. ఈ ట్రీట్మెంట్స్ మందుల్లేకుండా జబ్బులు తగ్గించడానికి
                ఉపయోగపడతాయి. ఈ వైద్య విధానంలో ట్రీట్మెంట్స్ – వాటర్ థెరపీ,
                ఫాస్టింగ్ థెరపీ, డైట్ థెరపీ, యోగా థెరపీ, మసాజ్ థెరపీ, మడ్ థెరపీ,
                సన్ లైట్ థెరపీ మొదలగు థెరపీలు వుంటాయి.
              </p>
            </div>
            <div className="h-2/5 lg:w-2/5 flex justify-center items-center">
              <img src={CardHolder_two} alt="Card Holder Two" className="rounded-lg" />
            </div>
            <h2 className="font-bold text-2xl lg:hidden text-green-4 text-center mb-4 mt-2">ఆరోగ్య సలహా</h2>
          </div>
        </div>

        <div className="m-auto">
          <div className="w-full flex flex-col-reverse lg:flex-row bg-white py-5 px-5 lg:px-10 rounded-3xl shadow-md mt-8">
            <div className="lg:w-3/5 my-8">
              <h2 className="font-bold text-2xl hidden lg:block text-green-4">ఆరోగ్య సలహా</h2>
              <p className="mt-4 text-gray-700 leading-relaxed text-sm">
                ఆయుర్వేద, అలోపతి, హోమియోపతి, యునాని, సిద్ధ వైద్య విధానం మొదలగు
                వైద్య విధానాలవలే ఇది ఒక వైద్య విధానం. పంచభూతాలతో చికిత్స చేసే ఒక
                ప్రక్రియ. ఇందులో మందులు కానీ, పసర్లు కానీ, పూతలు కానీ, లేపనాలు కానీ
                ఏమీ వుండవు. ఈ ట్రీట్మెంట్స్ మందుల్లేకుండా జబ్బులు తగ్గించడానికి
                ఉపయోగపడతాయి. ఈ వైద్య విధానంలో ట్రీట్మెంట్స్ – వాటర్ థెరపీ,
                ఫాస్టింగ్ థెరపీ, డైట్ థెరపీ, యోగా థెరపీ, మసాజ్ థెరపీ, మడ్ థెరపీ,
                సన్ లైట్ థెరపీ మొదలగు థెరపీలు వుంటాయి.
              </p>
            </div>
            <div className="h-2/5 md:m-auto lg:w-2/5 flex justify-center items-center">
              <img src={CardHolder_one} alt="Card Holder One" className="rounded-lg" />
            </div>
            <h2 className="font-bold text-2xl lg:hidden text-green-4 text-center mb-4 mt-2">ఆరోగ్య సలహా</h2>
          </div>
        </div>

        <div className="m-auto rounded-3xl mt-8">
          <div className="w-full flex flex-col-reverse lg:flex-row-reverse bg-white py-5 px-5 lg:px-10  mt-4 rounded-3xl shadow-md">
            <div className="lg:w-3/5 mt-8 m-auto mb-8">
              <h2 className="font-bold text-2xl hidden lg:block text-green-4">ఆరోగ్య సలహా</h2>
              <p className="mt-4 text-gray-700 leading-relaxed text-sm">
                ఆయుర్వేద, అలోపతి, హోమియోపతి, యునాని, సిద్ధ వైద్య విధానం మొదలగు
                వైద్య విధానాలవలే ఇది ఒక వైద్య విధానం. పంచభూతాలతో చికిత్స చేసే ఒక
                ప్రక్రియ. ఇందులో మందులు కానీ, పసర్లు కానీ, పూతలు కానీ, లేపనాలు కానీ
                ఏమీ వుండవు. ఈ ట్రీట్మెంట్స్ మందుల్లేకుండా జబ్బులు తగ్గించడానికి
                ఉపయోగపడతాయి. ఈ వైద్య విధానంలో ట్రీట్మెంట్స్ – వాటర్ థెరపీ,
                ఫాస్టింగ్ థెరపీ, డైట్ థెరపీ, యోగా థెరపీ, మసాజ్ థెరపీ, మడ్ థెరపీ,
                సన్ లైట్ థెరపీ మొదలగు థెరపీలు వుంటాయి.
              </p>
            </div>
            <div className="h-2/5 lg:w-2/5 flex justify-center items-center">
              <img src={CardHolder_two} alt="Card Holder Two" className="rounded-lg" />
            </div>
            <h2 className="font-bold text-2xl lg:hidden text-green-4 text-center mb-4 mt-2">ఆరోగ్య సలహా</h2>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};


export default CardsHolder