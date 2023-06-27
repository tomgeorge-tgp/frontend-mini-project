import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
// import useAuth from "../hooks/useAuth";
import LO from "../assets/lo2.png";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };
  const navigate = useNavigate();
  // const {auth}=useAuth();

  const handleLogout = () => {
    localStorage.removeItem("auth"); // Remove the "auth" item from the local storage
    navigate('/login'); // Redirect to the login page after logout
  };



  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">

            <img style={{width:"100%",height:"100%"}} src={LO} alt="logo" />
          </div>
          <div className="hidden sm:block">
            <div className="ml-4 flex items-center mt-3 space-x-4">
              <a
                // href="#"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" onClick={()=>{
               navigate('/');

                }}
              >
                Home
              </a>
              <a
                // href="#"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                onClick={()=>{
               navigate('/posts');

                }}
              >
                Post
              </a>
              <a
                // href="#"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" 
                onClick={()=>{
                  if (auth.roles.includes('User')) {
        navigate('/dashboard/user');
      } else if (auth.roles.includes('Counsilor')) {
        navigate('/dashboard/counsilor');
      } else if (auth.roles.includes('Core')) {
        navigate('/dashboard/admin');
      }
    

                }}
              >
                Dashboard
              </a>
              <a
              // href="#"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium" onClick={()=>{
               navigate('/counsiling');

                }}
            >
              Counsiling
            </a>
              <a
                // href="#"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" onClick={()=>{
               navigate('/about');

                }}
              >
                About
              </a>
              <div className="ml-4 flex items-center  space-x-4">
        {/* Rest of the menu items */}
        {localStorage.getItem("auth") ? (
          <button
            className="relative bg-white text-gray-800 py-0 px-4 rounded-full overflow-hidden transition-colors hover:bg-gray-800 hover:text-white hove:border hover:border-white"
            onClick={handleLogout}
          >
            Logout
            <span className="absolute inset-0 bg-black opacity-50 transform scale-0 transition-transform hover:scale-100"></span>
          </button>
        ) : (
          <button
            className="relative bg-white text-gray-800 py-2 px-4 rounded-full overflow-hidden transition-colors hover:bg-gray-800 hover:text-white hove:border hover:border-white"
            onClick={() => {
              navigate('/login');
            }}
          >
            Login
            <span className="absolute inset-0 bg-black opacity-50 transform scale-0 transition-transform hover:scale-100"></span>
          </button>
        )}
      </div>
              {/* <button className="relative bg-white text-gray-800 py-2 px-4 rounded-full overflow-hidden transition-colors hover:bg-gray-800 hover:text-white hove:border hover:border-white" 
              onClick={()=>{
                navigate('/login');
              }}>
            Login
          <span className="absolute inset-0 bg-black opacity-50 transform scale-0 transition-transform hover:scale-100"></span>
        </button> */}
    
            </div>
          </div>
          <div className="-mr-2 flex sm:hidden">
            <button
              onClick={toggleNavbar}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="sm:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a
              href="#"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Home
            </a>
            <a
              href="#"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Post
            </a>
            <a
              href="#"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Dashboard
            </a>
            <a
              href="#"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Counsiling
            </a>
            <a
              href="#"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              About
            </a>
            <div className="ml-4 flex items-center mt-3 space-x-4">
        {/* Rest of the menu items */}
        {localStorage.getItem("auth") ? (
          <button
            className="relative bg-white text-gray-800 py-2 px-4 rounded-full overflow-hidden transition-colors hover:bg-gray-800 hover:text-white hove:border hover:border-white"
            onClick={handleLogout}
          >
            Logout
            <span className="absolute inset-0 bg-black opacity-50 transform scale-0 transition-transform hover:scale-100"></span>
          </button>
        ) : (
          <button
            className="relative bg-white text-gray-800 py-2 px-4 rounded-full overflow-hidden transition-colors hover:bg-gray-800 hover:text-white hove:border hover:border-white"
            onClick={() => {
              navigate('/login');
            }}
          >
            Login
            <span className="absolute inset-0 bg-black opacity-50 transform scale-0 transition-transform hover:scale-100"></span>
          </button>
        )}
      </div>




{/*             
        <button className="relative bg-transparent text-white py-2 px-4 rounded-full overflow-hidden transition-colors hover:bg-gray-800" onClick={()=>{
                navigate('/login');
              }}>
          Login
          <span className="absolute inset-0 bg-black opacity-50 transform scale-0 transition-transform hover:scale-100"></span>
        </button> */}
    

          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
