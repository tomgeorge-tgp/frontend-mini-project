import React, { useState } from 'react';
import Modal from "react-modal";
import { NavLink, Link } from 'react-router-dom';
import UserDetails from "../component/UserDetail";
import Scheduling from '../component/Scheduling';
import BookingScheduling from '../component/BookingSchedule';
import { getCounsilorSchedule } from "../api/api";
import { QueryClient, useQuery, useMutation, QueryCache } from "react-query";

function CounsilorDashboard() {
  const [activeComponent, setActiveComponent] = useState('scheduling');
  const authData = JSON.parse(localStorage.getItem("auth"));

  const {
    isLoading,
    isError,
    error,
    data: scheduleData,
  } = useQuery(['scheduleData', authData.user._id], () => getCounsilorSchedule(authData.user._id));

  if (isLoading) {
    return <div>Loading...</div>;
  } else if (isError) {
    return <div>Error: {error.message}</div>;
  }

  const renderComponent = (component) => {
    setActiveComponent(component);
  };

  return (
    <>
      <div className="lg:px-32 py-8 md:px-8 md:py-8">
        <div className="flex justify-center">
          <h2 className="text-2xl font-bold">Counsellor Dashboard</h2>
        </div>
        <UserDetails />
        <div className="bg-gray-100 py-1">
          <div className="flex justify-center mt-8">
            <Link
              to="/dashboard/counsilor#scheduling"
              className={`text-white px-4 py-2 rounded-l ${
                activeComponent === 'scheduling' ? 'bg-black' : 'bg-gray-400'
              }`}
              onClick={() => renderComponent('scheduling')}
            >
              Scheduling
            </Link>
            <Link
              to="/dashboard/counsilor#booked"
              className={`text-white px-4 py-2 rounded-r ${
                activeComponent === 'booked' ? 'bg-black' : 'bg-gray-400'
              }`}
              onClick={() => renderComponent('booked')}
            >
              Booked List
            </Link>
          </div>

          <div className="mt-4 p-4 bg-gray-100">
            {activeComponent === 'scheduling' && <Scheduling data={scheduleData} />}
            {activeComponent === 'booked' && <BookingScheduling />}
          </div>
        </div>
      </div>
    </>
  );
}

export default CounsilorDashboard;




















// import React, { useState } from 'react';
// import Modal from "react-modal";
// import Navbar from "../component/NavBar";
// import UserDetails from "../component/UserDetail";
// import Scheduling from '../component/Scheduling';
// import BookingScheduling from '../component/BookingSchedule';
// import { getCounsilorSchedule } from "../api/api";
// import { QueryClient, useQuery, useMutation, QueryCache } from "react-query";
// import { NavLink } from 'react-router-dom';

// function CounsilorDashboard() {
//   const [activeComponent, setActiveComponent] = useState('scheduling');
//   const authData = JSON.parse(localStorage.getItem("auth"));

//   const {
//     isLoading,
//     isError,
//     error,
//     data: scheduleData,
//   } = useQuery(['scheduleData', authData.user._id], () => getCounsilorSchedule(authData.user._id));

//   if (isLoading) {
//     return <div>Loading...</div>;
//   } else if (isError) {
//     return <div>Error: {error.message}</div>;
//   }

//   const renderComponent = (component) => {
//     setActiveComponent(component);
//   };

//   return (
//     <>
//       <div className="lg:px-32 py-8 md:px-8 md:py-8">
//         <div className="flex justify-center">
//           <h2 className="text-2xl font-bold">Counsilor Dashboard</h2>
//         </div>
//         <UserDetails />
//         <div className="bg-gray-100 py-1">
//           <div className="flex justify-center mt-8">
//             <NavLink
//               to="/counsilor/scheduling"
//               className={`text-white px-4 py-0 rounded-l ${
//                 activeComponent === 'scheduling' ? 'bg-black' : 'bg-gray-400'
//               }`}
//               activeClassName="bg-black"
//               onClick={() => renderComponent('scheduling')}
//             >
//               Scheduling
//             </NavLink>
//             <NavLink
//               to="/counsilor/booked"
//               className={`text-white px-4 py-2 rounded-r ${
//                 activeComponent === 'booked' ? 'bg-black' : 'bg-gray-400'
//               }`}
//               activeClassName="bg-black"
//               onClick={() => renderComponent('booked')}
//             >
//               Booked List
//             </NavLink>
//           </div>

//           <div className="mt-4 p-4 bg-gray-100">
//             {activeComponent === 'scheduling' && <Scheduling data={scheduleData} />}
//             {activeComponent === 'booked' && <BookingScheduling />}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default CounsilorDashboard;



















// // import React, { useState } from 'react';
// // import Modal from "react-modal";
// // import Navbar from "../component/NavBar"
// // import UserDetails from "../component/UserDetail";
// // import Scheduling from '../component/Scheduling';
// // import  BookingScheduling from '../component/BookingSchedule';
// // import { addSchedule,getCounsilorSchedule } from "../api/api";
// // import { QueryClient, useQuery, useMutation, QueryCache } from "react-query";
// // // import useLocalStorageRef from "../hooks/LocalStorage";
// // import { NavLink } from 'react-router-dom';



// // function CounsilorDashboard(){

// //   const [activeComponent, setActiveComponent] = useState('scheduling');
// //   // const [userData, setUserData, removeUserData] = useLocalStorageRef("user");
// //   const authData = JSON.parse(localStorage.getItem("auth"));
// //   // console.log("authData",authData.user);

// //     const {
// //     isLoading,
// //     isError,
// //     error,
// //     data:scheduleData,
// //   }=useQuery(['scheduleData', authData.user._id], () => getCounsilorSchedule(authData.user._id));

  
// //   // console.log("isLoading",isLoading);

// //   if (isLoading) {
// //     return <div>Loading...</div>;
// //   }

// //  else if (isError) {
// //     return <div>Error: {error.message}</div>;
// //   }

// //   const renderComponent = (component) => {
// //     setActiveComponent(component);
// //   };


// //   return (<>
// //     <div className="lg:px-32 py-8 md:px-8 md:py-8">
    
// //     <div className="flex justify-center">
// //     <h2 className="text-2xl font-bold">Counsilor Dashboard</h2>
// //     </div>
// //      <UserDetails/>
// //      <div className="bg-gray-100 py-1">
// //       <div className="flex justify-center mt-8 ">
// //         {/* <button
// //           className={` text-white px-4 py-0 rounded-l ${
// //             activeComponent === 'scheduling' ? 'bg-black' : 'bg-gray-400'
// //           }`}
// //           onClick={() => renderComponent('scheduling')}
// //         >
// //           Scheduling
// //         </button> */}
// //         <NavLink
// //   to="/counsilor/scheduling"
// //   className={` text-white px-4 py-0 rounded-l ${
// //             activeComponent === 'scheduling' ? 'bg-black' : 'bg-gray-400'
// //           }`}
// //   activeClassName="bg-black"
// //   onClick={() => renderComponent('scheduling')}
// // >
// //   Scheduling
// // </NavLink>
// //         {/* <button
// //           className={` text-white px-4 py-2 rounded-r ${
// //             activeComponent === 'booked' ? 'bg-black' : 'bg-gray-400'
// //           }`}
// //           onClick={() => renderComponent('booked')}
// //         >
// //           Booked List
// //         </button> */}
// //         <NavLink
// //   to="/counsilor/scheduling"
// //   className={` text-white px-4 py-2 rounded-r ${
// //             activeComponent === 'booked' ? 'bg-black' : 'bg-gray-400'
// //           }`}
// //   activeClassName="bg-black"
// //   onClick={() => renderComponent('booked')}
// // >
// //   Booked List
// // </NavLink>
// //       </div>

// //       <div className="mt-4 p-4 bg-gray-100">
// //         {activeComponent === 'scheduling' && (
// //           <div>
// //             {/* <h2>Post Component</h2> */}
// //             <Scheduling data={scheduleData}/>
// //           </div>
// //         )}
// //         {activeComponent === 'booked' && (
// //           <div>
// //           <BookingScheduling/>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //     </div>
// //   </>
// //   )

// // };

// // export default CounsilorDashboard;
