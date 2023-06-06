import React from 'react';

const Comment = ({ author, text }) => {
  // console.log("text", text);
  return (
    <>
      <div className="flex items-start mb-2">
        <div className="font-semibold mr-2"></div>
        <div className="text-gray-700">{text}</div>
      </div>
    </>
  );
};

export default Comment;
