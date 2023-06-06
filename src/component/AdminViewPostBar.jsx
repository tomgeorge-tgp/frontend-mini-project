import React, { useState } from 'react';
import Comment from './Comment';
import ThumbupB from "../assets/ThumbsUpCardB.svg";
import ThumbupR from "../assets/ThumbsUpCardR.svg";
import CommentImg from '../assets/comment.svg';
import Done from "../assets/Done.svg";
import useLocalStorageRef from "../hooks/LocalStorage"

import Delete from "../assets/Delete.svg";




const PostBar = (data ) => {
  console.log("data", data);
  const [likeCount, setLikeCount] = useState(data.data.likes);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState(data.data.comments);
  const [newComment, setNewComment] = useState('');
  const [userData, setUserData, removeUserData] = useLocalStorageRef("user")

  // const [isLiked, setIsLiked] = useState(likeCount.includes(userData.current._id));
  const [isLiked, setIsLiked] = useState(Array.isArray(likeCount) && likeCount.includes(userData.current._id));

  
//   console.log("userData: ", userData);

 


const handleDeleteClick = () => {
    
  };




  const handleCardClick = () => {
   
  };



  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="cursor-pointer" onClick={handleCardClick}>
      <div className='flex justify-between'>

        <h2 className="text-lg font-semibold mb-2">{data.data.title}</h2>
        <div className="flex items- center space-x-4">

        <button className="flex items-center space-x-2 bg-white text-green-500 font-semibold rounded-lg px-3 py-2 shadow-sm hover:bg-green-500 hover:text-white" onClick={data.onDoneClick}>
        <img className='mx-2' src={Done} alt="delete" />
      
    </button>
        <button className="flex items-center space-x-2 bg-white text-red-500 font-semibold rounded-lg px-3 py-2 shadow-sm hover:bg-red-500 hover:text-white" onClick={data.onDeleteClick}>
        <img className='mx-2' src={Delete} alt="delete" />
     
    </button>
        </div>
      </div>

        <p className="text-gray-700 mb-4">{data.data.content}</p>
      </div>
      <div className="flex justify-between text-gray-500">
        <button className="flex items-center" >
          <img className='mx-2' src={isLiked ? ThumbupR : ThumbupB} alt="like" />
          {likeCount.length} Likes
        </button>
        <span className="flex items-center cursor-pointer" onClick={handleCardClick}>
          <div>
            <img className='mx-2' src={CommentImg} alt="comment" />
          </div>
          {comments.length} Comments
        </span>
      </div>
      {showComments && (
        <div className="mt-4 overflow-y-auto max-h-40">
          {comments.map((comment, index) => {
            return (<Comment key={index} text={comment} />)
          })}
       
        </div>
      )}
    </div>
  );
};

export default PostBar;



