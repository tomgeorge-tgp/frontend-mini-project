import React, { useState } from 'react';
import Comment from './Comment';
import ThumbupB from "../assets/ThumbsUpCardB.svg";
import ThumbupR from "../assets/ThumbsUpCardR.svg";
import CommentImg from '../assets/comment.svg';
const Card = ({ title, content, likes, initialComments }) => {
  const [likeCount, setLikeCount] = useState(likes);
  const [isLiked, setIsLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState('');
  console.log(comments);
  const handleLikeClick = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };

  const handleCardClick = () => {
    setShowComments(!showComments);
  };
  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      setComments([...comments, { author: 'You', text: newComment }]);
      setNewComment('');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4" >
    <div className="cursor-pointer" onClick={handleCardClick}>

      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <p className="text-gray-700 mb-4">{content}</p>
    </div>
      <div className="flex justify-between text-gray-500">
        <button className="flex items-center" onClick={handleLikeClick}>
          <img className='' src={ isLiked ? ThumbupR:ThumbupB} alt="like"/>
          {likeCount} Likes
        </button>
        <span className="flex items-center cursor-pointer" onClick={handleCardClick}>
        <img className='' src={CommentImg} alt="comment"/>
          {comments.length} Comments
        </span>
      </div>
      {showComments && (
        <div className="mt-4 overflow-y-auto max-h-40">
          {comments.map((comment, index) => (
            <Comment key={index} author={comment.author} text={comment.text} />
          ))}
          <form onSubmit={handleCommentSubmit} className="mt-2">
            <input
              type="text"
              value={newComment}
              onChange={handleCommentChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Add a comment..."
            />
          </form>
        </div>
      )}
    </div>
  );
};

export default Card;
