  import React from "react";
  import logo from "../../assets/Logo/image 2.png";
  import { FaFacebookF } from "react-icons/fa";
  import { PiYoutubeLogoFill } from "react-icons/pi";
  import { FaInstagramSquare } from "react-icons/fa";
  import { FaTelegram } from "react-icons/fa";



  const Footer = () => {
    return (
      <> 
        <div className="max-w-full h-auto flex flex-col bg-green-4 text-white lg:flex-col">
          <div className="max-w-full h-auto flex flex-col lg:flex-row">

          {/* Container 1 */}
          <div className="max-w-full h-60 flex justify-center items-center flex-col lg:w-1/3">


            {/* Dividing Container 1 into two section one is heading and other for logo */}
            {/* Heading Section */}
              <div className="w-full h-1/4 font-semibold text-center">
                    <h2 className="lg:text-2xl font-leagueSpartanMedium">LET'S WORK TOGETHER</h2>
                    <h3 className="lg:text-2xl font-leagueSpartanMedium">For diseases free world</h3>
              </div>


            {/* Logo Section */}
              <div className="w-full h-1/2 flex flex-col lg:mt-6">
                <div className="flex justify-center items-center">
                  <img src={logo} alt="Logo Image" />
                </div>
                <div className="flex justify-center items-center pl-2">
                  <p className="font-light text-center w-52">Dr. Padma &amp; Dr. Ramachandra Naturopathy</p>
                </div>
              </div>
          </div>

          {/* Container 2 */}
          {/* Dividing Container 2 in two main div */}
          <div className="max-w-full h-60 flex flex-col mt-6 lg:w-1/3">

          {/* First Div into further two div */}
            <div className="flex flex-row">
                <div className="w-1/2 text-center lg:text-left">
                  <ul children className="mb-1 font-leagueSpartanMedium">
                    <li>About Us</li>
                    <li>Service</li>
                    <li>Appointment</li>
                    <li>Online Classes</li>
                  </ul>
                </div>
                <div className="w-1/2 text-center lg:text-left">
                  <ul className=" mb-1 font-leagueSpartanMedium">
                    <li>Terms &amp; Conditions</li>
                    <li>Privacy Policy</li>
                  </ul>
                </div>
            </div>

            {/* Second Div */}
            <div className="flex justify-center items-center flex-col mt-10 lg:items-start">
                <h5 className="font-bold lg:text-left font-leagueSpartanSemiBold">
                  Address
                </h5>
                <p className="w-9/12 text-center font-leagueSpartanLight lg:text-left">
                  Siddhardha Yoga Vidyalayam, Siddhardha Nagar, Opp Bouddha Stupam, Nelakondapalli, Khammam, Telangana. 507160
                </p>      
            </div>
          </div>


          {/* Container 3 */}
          <div className="max-w-full h-auto flex justify-center items-center flex-col lg:w-1/3 lg:flex-col-reverse">
            
            {/* First Section With Phone and email */}
            <div className="w-1/2 h-auto flex flex-col lg:items-start">
              <div className="text-center mt-12 lg:text-left">
                <h5 className="font-leagueSpartanMedium">Phone</h5>
                <p className="font-leagueSpartanLight"><span className="font-leagueSpartanMedium">+91 99666 66627 </span>
                (Call on Wed, Thu, Fri, between 9am to 5pm only)</p>
              </div>
              <div className="text-center mt-10 lg:text-left">
                <h5 className="font-leagueSpartanMedium">Email</h5>
                <p className="font-leagueSpartanRegular">info@DrRamaChandra.com</p>
              </div>
            </div>
            
            {/* Second Section With Social media */}
            <div className="w-full h-12 flex justify-center items-center flex-row mt-8 text-3xl " >
                 <span className="mr-3"><FaTelegram/></span>
                 <span className="mr-3"><FaInstagramSquare/></span>
                 <span className="mr-3"><PiYoutubeLogoFill/></span>
                 <span className="mr-3"><FaFacebookF/></span>
            </div>
          </div>
          </div>
          <div className="mb-5 mt-5 pt-3 flex justify-center items-center border-t-2 border-white w-full">
             <p className="w-3/4 h-auto text-center"><span className="font-bold">Dr. PadmaRamachandra Naturopathy</span> &copy; 2024. All rights reserved. Made with Love by <i><a href="https://collasyn.com/" target="_blanck">Collasyn</a></i></p>
          </div>
        </div>
      </>
    );
  };

  export default Footer;
