import React from 'react';
import ThumbUp from "../assets/thumb_up.svg"
import Comment from "../assets/comment.svg"
function PostBar({ title, content, likes, comments }) {
  // Function to truncate the content to 50 words
  const truncateContent = (text) => {
    const words = text.split(' ');

    if (words.length > 25) {
      return words.slice(0, 25).join(' ') + '...';
    }

    return text;
  };

  return (
    <div className="bg-white p-4 mb-4 shadow-sm border border-black mb-4">
      <h2 className="text-lg font-bold mb-2">{title}</h2>
      <p className="text-gray-700 mb-4">{truncateContent(content)}</p>
      <div className="flex justify-end">
        <p className="text-sm text-gray-600 flex item-center">
        <img src={ThumbUp} className='inline'/><span className='text-lg font-bold'>:{likes}</span>
        </p>
        <p className="text-sm text-gray-600 flex item-center">
        <img src={Comment} className='inline ml-4'/><span className='text-lg font-bold'>:{comments}</span>
        </p>
      </div>
    </div>
  );
}

export default PostBar;
