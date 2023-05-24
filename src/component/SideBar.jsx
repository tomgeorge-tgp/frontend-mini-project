import React, { useState } from 'react';

const Sidebar = ({ values, onButtonClick }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleButtonClick = (index) => {
    setActiveIndex(index);
    onButtonClick(index);
  };

  return (
    <div className="flex bg-white border-b border-gray-300 shadow-md">
      {values.map((value, index) => (
        <button
          key={index}
          className={`flex items-center justify-center h-12 px-6 ${
            activeIndex === index ? 'bg-gray-300 text-white' : 'text-gray-600 hover:bg-gray-100'
          } border-r border-gray-300 focus:outline-none transition-all duration-200`}
          onClick={() => handleButtonClick(index)}
        >
          {value}
        </button>
      ))}
    </div>
  );
};

export default Sidebar;
