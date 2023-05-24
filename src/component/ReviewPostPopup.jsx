import { useState } from 'react';
import Close from "../assets/close.svg";
import ThumbUp from "../assets/thumb_up.svg";
import Comment from "../assets/comment.svg";

function ReviewPostPopup({ isOpen, onClose, data }) {
  const [comments, setComments] = useState(data.comments);

  const handleRemovePost = () => {
    // Handle remove post
  };

  const handlePopupClose = () => {
    console.log('Popup closed');
    onClose();
  };

  const handleDeleteComment = (commentId) => {
    // Handle deleting a comment
    const updatedComments = comments.filter((comment) => comment.id !== commentId);
    setComments(updatedComments);
  };

  return (
    <div className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 ${isOpen ? '' : 'hidden'}`}>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg w-70vmin h-70vmin sm:w-128 sm:h-160 overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg sm:text-xl font-medium text-gray-800">{data.title}</h2>
          <button className="text-gray-600 hover:text-gray-800" onClick={handlePopupClose}>
            <img src={Close} alt="Close" /> 
          </button>
        </div>
        <div className="p-4 overflow-y-scroll">
          <div className="mb-4">
            <p className="text-gray-600">{data.content}</p>
          </div>
          <div className="flex justify-end">
            <p className="text-sm text-gray-600 flex item-center">
              <img src={ThumbUp} className="w-4 h-4 inline mr-1" alt="Thumb Up" />
              <span className="text-base sm:text-lg font-bold">{data.likes}</span>
            </p>
            <p className="text-sm text-gray-600 flex item-center ml-4">
              <img src={Comment} className="w-4 h-4 inline mr-1" alt="Comment" />
              <span className="text-base sm:text-lg font-bold">{data.comments.length}</span>
            </p>
          </div>
          <div className="mt-4">
            <h3 className="text-lg sm:text-xl font-medium mb-2">Comments</h3>
            <div className="comment-container mb-12">
  {comments.map((comment) => (
    <div key={comment.id} className="flex items-center border-b border-gray-300 py-2">
      <img src={Comment} className="w-4 h-4 mr-2" alt="Comment" />
      <div className="flex-grow">
        <div className="flex items-center justify-between">
          <p className="text-gray-600 mb-1">{comment.author}</p>
          <button
            className="text-red-500 hover:text-red-600"
            onClick={() => handleDeleteComment(comment.id)}
          >
            Delete
          </button>
        </div>
        <p>{comment.text}</p>
      </div>
    </div>
  ))}
</div>
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded absolute right-4 bottom-4 mx-8"
          onClick={handleRemovePost}
        >
          Remove
        </button>
      </div>
    </div>
  );
}

export default ReviewPostPopup;
