import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from 'react-hot-toast'
import axios from "axios";
import { logoutUser } from "../slices/userSlice";


const Sidebar = () => {
  //Integration Frontend And backend
  const dispatch = useDispatch();
  const handleSignOut = async() =>{
      try {
        const response = await axios.post("/api/v1/auth/logout")
        console.log(response.data);
        dispatch(logoutUser())
        window.location.href = '/'
        toast.success(response.data.message)
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message)
      }
  } 





  //FrontEnd
  const [activeBtn, setActiveBtn] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(null);

  const handleBtn = (path) => {
    if(window.innerWidth < 768){
      setActiveBtn(path);
      setIsExpanded(false);
    } else {
      setActiveBtn(path);
    }
  };

  const isActive = (path) => activeBtn === path;

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const renderIcon = (name) => {
    const icons = {
      profile: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          className="bi bi-person-fill"
          viewBox="0 0 16 16"
        >
          <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
        </svg>
      ),
      appointment: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          className="bi bi-ticket-detailed"
          viewBox="0 0 16 16"
        >
          <path d="M4 5.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5M5 7a1 1 0 0 0 0 2h6a1 1 0 1 0 0-2z" />
          <path d="M0 4.5A1.5 1.5 0 0 1 1.5 3h13A1.5 1.5 0 0 1 16 4.5V6a.5.5 0 0 1-.5.5 1.5 1.5 0 0 0 0 3 .5.5 0 0 1 .5.5v1.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 11.5V10a.5.5 0 0 1 .5-.5 1.5 1.5 0 1 0 0-3A.5.5 0 0 1 0 6zM1.5 4a.5.5 0 0 0-.5.5v1.05a2.5 2.5 0 0 1 0 4.9v1.05a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-1.05a2.5 2.5 0 0 1 0-4.9V4.5a.5.5 0 0 0-.5-.5z" />
        </svg>
      ),
      payment: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          className="bi bi-credit-card"
          viewBox="0 0 16 16"
        >
          <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z" />
          <path d="M2 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z" />
        </svg>
      ),
      class: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          className="bi bi-journal-text"
          viewBox="0 0 16 16"
        >
          <path d="M5 10.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5m0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5" />
          <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2" />
          <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1z" />
        </svg>
      ),
    };
    return icons[name];
  };

  return (
    <aside className="lg:static bg-gray-1 transition-all duration-300">
      <div className={`fixed md:static md:h-full lg:flex flex-col justify-start items-start text-white bg-green-4 p-2 md:p-10 ${isExpanded ? "w-80 absolute lg:static h-full" : "w-6 hover:w-12 md:w-20 md:hover:20 static rounded-br-2xl rounded-tr-2xl"} md:rounded-none mb-2 transition-all duration-300`}>
        <div className={`w-full flex justify-end ${isExpanded ? "" : "md:ml-6"}`}>
          <button onClick={toggleSidebar} className="bg-green-3 p-2 md:p-3 rounded-full hover:bg-green-2 transition-all duration-300">
            {isExpanded ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
              </svg>
            )}
          </button>
        </div>

        <div className={`${isExpanded ? "block" : "hidden"} md:block`}>
          <div className="w-full flex flex-col py-4">
            {["profile", "appointment", "payment", "class"].map((item) => (
              <Link
                to={`/user/${item}`}
                key={item}
                onClick={() => handleBtn(item)}
                className={`relative hover:bg-green-3 ${isActive(item) ? "bg-green-3" : ""} transition-all duration-300 rounded-2xl cursor-pointer flex ${isExpanded ? "p-4 m-1" : "m-[8px] md:-m-[20px] h-10 w-10 flex justify-center my-2 md:my-4"}`}
              >
                <span 
                  className="px-2 flex justify-center items-center text-lg" 
                  onMouseEnter={() => setIsHovered(item)} 
                  onMouseLeave={() => setIsHovered(null)}>
                    {renderIcon(item)}
                </span>
                {isExpanded && <p className="text-lg">My {item.charAt(0).toUpperCase() + item.slice(1)}</p>}
                {!isExpanded && <p className={`absolute bottom-0 left-10 p-[1px] px-[2px] rounded bg-[#333] text-white text-xs ${isHovered === item ? '' : 'hidden'}`}>{item.charAt(0).toUpperCase() + item.slice(1)}</p>}
              </Link>
            ))}
            <Link
              // to={'/'}
              onClick={handleSignOut}
              className={`relative hover:bg-green-3 ${isActive("signOut") ? "bg-green-3" : ""} transition-all duration-300 rounded-2xl cursor-pointer flex ${isExpanded ? "p-4 m-1" : "-m-[8px] md:-m-[20px] h-10 w-10 flex justify-center my-2 md:my-4"}`}
              >
                <span 
                  className="px-2 flex justify-center items-center text-lg"
                  onMouseEnter={() => setIsHovered("signOut")} 
                  onMouseLeave={() => setIsHovered(null)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-box-arrow-left" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0z"/>
                      <path fill-rule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708z"/>
                    </svg>
                </span>
                {isExpanded && <p className="text-lg">Sign Out</p>}
                {!isExpanded && <p className={`absolute bottom-0 left-10 p-[1px] px-[2px] bg-[#333] rounded text-white text-xs ${isHovered === "signOut" ? '' : 'hidden'}`}>Sign&nbsp;Out</p>}
            </Link>
          </div>
        </div>
        {isExpanded && (
          <div className="w-full flex flex-col justify-end flex-grow pb-16">
            <p className="text-gray-200 font-thin text-xl ml-[25%]">Version 1.0</p>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;

// import React, { useState } from "react";
// import { Link } from "react-router-dom";

// const Sidebar = () => {
//   const [activeBtn, setActiveBtn] = useState("");
//   const [isExpanded, setIsExpanded] = useState(true);
//   const [isHovered, setIsHovered] = useState(false);

//   const handleBtn = (path) => {
//     if(window.innerWidth < 768){
//       setActiveBtn(path);
//       setIsExpanded(false);
//     } else {
//       setActiveBtn(path);
//     }
//   };

//   const isActive = (path) => activeBtn === path;

//   const toggleSidebar = () => {
//     setIsExpanded(!isExpanded);
//   };

//   return (
//     <>
//       <aside className={`lg:static bg-gray-1 transition-all duration-300`}>
//         <div className={`h-full lg:flex flex-col justify-start items-start text-white bg-green-4 p-6 md:p-10 ${isExpanded ? "w-80 absolute lg:static h-full" : "w-20 static"} mb-2 transition-all duration-300`}>
//           <div className={`w-full flex justify-end ${isExpanded ? "" : "md:ml-6"}`}>
//             <button
//               onClick={toggleSidebar}
//               className="bg-green-3 p-2 rounded-full hover:bg-green-2 transition-all duration-300"
//             >
//               {isExpanded ? (
//                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
//                   <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
//                 </svg>
//               ) : (
//                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
//                   <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
//                 </svg>
//               )}
//             </button>
//           </div>

//           <div className=''>
//             <div className="w-full flex flex-col py-4">
//               <Link
//                 to="/user/profile"
//                 onClick={() => handleBtn("profile")}
//                 className={`relative hover:bg-green-3 ${isActive("profile") ? "bg-green-3" : ""} transition-all duration-300 rounded-2xl cursor-pointer flex ${isExpanded ? "p-4 m-1" : "-m-[8px] md:-m-[20px] h-10 w-10 flex justify-center my-2 md:my-2"}`}
//               >
//                 <span className="px-2 flex justify-center items-center text-lg" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
//                   <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
//                     <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
//                   </svg>
//                 </span>
//                 {isExpanded && <p className="text-lg">Profile</p>}
//                 {!isExpanded && <p className={`absolute bottom-0 left-10 p-[1px] bg-[#333] text-white text-xs ${isHovered ? '' : 'hidden'}`}>Profile</p>}
//               </Link>
//               <Link
//                 to="/user/appointment"
//                 onClick={() => handleBtn("appointment")}
//                 className={`relative hover:bg-green-3 ${isActive("appointment") ? "bg-green-3" : ""} transition-all duration-300 rounded-2xl cursor-pointer flex ${isExpanded ? "p-4 m-1" : "-m-[8px] md:-m-[20px] h-10 w-10 flex justify-center my-2 md:my-2"}`}
//               >
//                 <span className="px-2 flex justify-center items-center text-lg" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
//                   <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-ticket-detailed" viewBox="0 0 16 16">
//                     <path d="M4 5.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5M5 7a1 1 0 0 0 0 2h6a1 1 0 1 0 0-2z" />
//                     <path d="M0 4.5A1.5 1.5 0 0 1 1.5 3h13A1.5 1.5 0 0 1 16 4.5V6a.5.5 0 0 1-.5.5 1.5 1.5 0 0 0 0 3 .5.5 0 0 1 .5.5v1.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 11.5V10a.5.5 0 0 1 .5-.5 1.5 1.5 0 1 0 0-3A.5.5 0 0 1 0 6zM1.5 4a.5.5 0 0 0-.5.5v1.05a2.5 2.5 0 0 1 0 4.9v1.05a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-1.05a2.5 2.5 0 0 1 0-4.9V4.5a.5.5 0 0 0-.5-.5z" />
//                   </svg>
//                 </span>
//                 {isExpanded && <p className="text-lg">My Appointment</p>}
//                 {!isExpanded && <p className={`absolute bottom-0 left-10 p-[1px] bg-[#333] text-white text-xs ${isHovered ? '' : 'hidden'}`}>Appointments</p>}
//               </Link>
//               <Link
//                 to="/user/payment"
//                 onClick={() => handleBtn("payment")}
//                 className={`hover:bg-green-3 ${isActive("payment") ? "bg-green-3" : ""} transition-all duration-300 rounded-2xl cursor-pointer flex ${isExpanded ? "p-4 m-1" : "-m-[8px] md:-m-[20px] h-10 w-10 flex justify-center my-2 md:my-2"}`}
//               >
//                 <span className="px-2 flex justify-center items-center text-lg">
//                   <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-credit-card" viewBox="0 0 16 16">
//                     <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z" />
//                     <path d="M2 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z" />
//                   </svg>
//                 </span>
//                 {isExpanded && <p className="text-lg">My Payments</p>}
//               </Link>
//               <Link
//                 to="/user/class"
//                 onClick={() => handleBtn("class")}
//                 className={`hover:bg-green-3 ${isActive("class") ? "bg-green-3" : ""} transition-all duration-300 rounded-2xl cursor-pointer flex ${isExpanded ? "p-4 m-1" : "-m-[8px] md:-m-[20px] h-10 w-10 flex justify-center my-2 md:my-4"}`}
//               >
//                 <span className="px-2 flex justify-center items-center text-lg">
//                   <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-journal-text" viewBox="0 0 16 16">
//                     <path d="M5 10.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5m0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5" />
//                     <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2" />
//                     <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1z" />
//                   </svg>
//                 </span>
//                 {isExpanded && <p className="text-lg">My Classes</p>}
//               </Link>
//               <Link
//                 to={'/'}
//                 onClick={() => handleBtn("signOut")}
//                 className={`hover:bg-green-3 ${isActive("signOut") ? "bg-green-3" : ""} transition-all duration-300 rounded-2xl cursor-pointer flex ${isExpanded ? "p-4 m-1" : "-m-[8px] md:-m-[20px] h-10 w-10 flex justify-center my-2 md:my-4"}`}
//                 >
//                 <span className="px-2 flex justify-center items-center text-lg">
//                   <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-box-arrow-left" viewBox="0 0 16 16">
//                     <path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0z"/>
//                     <path fill-rule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708z"/>
//                   </svg>
//                 </span>
//                 {isExpanded && <p className="text-lg">Sign Out</p>}
//               </Link>
//             </div>
//           </div>
//           {isExpanded && (
//             <div className="w-full flex flex-col justify-end flex-grow pb-16">
//               <p className="text-gray-200 font-thin text-xl ml-[25%]">Version 1.0</p>
//             </div>
//           )}
//         </div>
//       </aside>
//     </>
//   );
// };

// export default Sidebar;