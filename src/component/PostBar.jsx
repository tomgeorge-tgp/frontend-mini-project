import React, { useState } from 'react';
import Comment from './Comment';
import ThumbupB from "../assets/ThumbsUpCardB.svg";
import ThumbupR from "../assets/ThumbsUpCardR.svg";
import CommentImg from '../assets/comment.svg';
import { useQuery, useMutation, useQueryClient } from "react-query";
import useLocalStorageRef from "../hooks/LocalStorage"
import { addComment, addLike } from "../api/api"

const PostBar = (data) => {
  console.log("data", data);
  const [likeCount, setLikeCount] = useState(data.data.likes);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState(data.data.comments);
  const [newComment, setNewComment] = useState('');
  const [userData, setUserData, removeUserData] = useLocalStorageRef("user")
  const queryClient = useQueryClient();
  // const [isLiked, setIsLiked] = useState(likeCount.includes(userData.current._id));
  const [isLiked, setIsLiked] = useState(Array.isArray(likeCount) && likeCount.includes(userData.current._id));

  
  // console.log("userData: ", userData);


  const addCommentMutation = useMutation(addComment, {
    onSuccess: (comment) => {
      setComments([...comments, comment]);
      queryClient.setQueryData("post", (oldData) => {
        return {
          ...oldData,
          comments: [...oldData.comments, comment]
        }
      });
    },
    onError: (error) => {
      console.log("Failed to add comment:", error);
    },
  });

  const addLikeMutation = useMutation(addLike, {
    onSuccess: (like) => {
      // const setLikeCount = () => {
        setLikeCount((prevCount) => {
          if (prevCount.includes(like.userId)) {
            setIsLiked(false);
            
            return prevCount.filter((userId) => userId !== like.userId);
          } else {
            setIsLiked(true);
            return [...prevCount, like.userId];
          }
        });
      // };
      queryClient.setQueryData("post", (oldData) => {
        let likes = oldData.likes;
        if (likes.includes(like.userId)) {
          likes = likes.filter((userId) => userId !== like.userId);
        } else {
          likes = [...likes, like.userId];
        }
        return {
          ...oldData,
          likes: likes
        }
      });
    },
    onError: (error) => {
      console.log("Failed to add like:", error);
    },
  });

  const handleLikeClick = () => {
    // setIsLiked(!isLiked);
    // setLikeCount(isLiked ? likeCount :);
    addLikeMutation.mutate({ postId: data.data._id, userId:userData.current._id }); // replace "user123" with the actual user ID
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
      addCommentMutation.mutate({ postId: data.data._id, comment: newComment });
      setNewComment('');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="cursor-pointer" onClick={handleCardClick}>
        <h2 className="text-lg font-semibold mb-2">{data.data.title}</h2>
        <p className="text-gray-700 mb-4">{data.data.content}</p>
      </div>
      <div className="flex justify-between text-gray-500">
        <button className="flex items-center" onClick={handleLikeClick}>
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

export default PostBar;













// import React, { useState } from 'react';
// import Comment from './Comment';
// import ThumbupB from "../assets/ThumbsUpCardB.svg";
// import ThumbupR from "../assets/ThumbsUpCardR.svg";
// import CommentImg from '../assets/comment.svg';
// import { useQuery, useMutation, useQueryClient } from "react-query";

// import { addComment,addLike } from "../api/api"

// const Card = (data) => {
//   console.log("data",data);
//   const [likeCount, setLikeCount] = useState(data.data.likes);
//   const [isLiked, setIsLiked] = useState(false);
//   const [showComments, setShowComments] = useState(false);
//   const [comments, setComments] = useState(data.data.comments);
//   const [newComment, setNewComment] = useState('');
//   const queryClient = useQueryClient();

//   const addCommentMutation = useMutation(addComment, {
//     onSuccess: (comment) => {
//       setComments([...comments, comment]);
//       queryClient.setQueryData("post", (oldData) => {
//         return {
//           ...oldData,
//           comments: [...oldData.comments, comment]
//         }
//       });
//     },
//     onError: (error) => {
//       console.log("Failed to add comment:", error);
//     },
//   });

//   const addLikeMutation = useMutation(addLike, {
//     onSuccess: (like) => {
//       setComments([...likeCount, like]);
//       queryClient.setQueryData("post", (oldData) => {
//         return {
//           ...oldData,
//           likes: [...oldData.likes, like]
//         }
//       });
//     },
//     onError: (error) => {
//       console.log("Failed to add comment:", error);
//     },
//   });

//   const handleLikeClick = () => {
//     setIsLiked(!isLiked);
//     setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);

//   };

//   const handleCardClick = () => {
//     setShowComments(!showComments);
//   };

//   const handleCommentChange = (e) => {
//     setNewComment(e.target.value);
//   };

//   const handleCommentSubmit = (e) => {
//     e.preventDefault();
//     if (newComment.trim()) {
//       addCommentMutation.mutate({ postId: data.data._id, comment: newComment });
//       setNewComment('');
//     }
//   };

//   return (
//     <div className="bg-white rounded-lg shadow-md p-4 mb-4">
//       <div className="cursor-pointer" onClick={handleCardClick}>
//         <h2 className="text-lg font-semibold mb-2">{data.data.title}</h2>
//         <p className="text-gray-700 mb-4">{data.data.content}</p>
//       </div>
//       <div className="flex justify-between text-gray-500">
//         <button className="flex items-center" onClick={handleLikeClick}>
//           <img className='mx-2' src={isLiked ? ThumbupR : ThumbupB} alt="like" />
//           {likeCount} Likes
//         </button>
//         <span className="flex items-center cursor-pointer" onClick={handleCardClick}>
//           <div>
//             <img className='mx-2' src={CommentImg} alt="comment" />
//           </div>
//           {comments.length } Comments
//         </span>
//       </div>
//       {showComments && (
//         <div className="mt-4 overflow-y-auto max-h-40">
//           {comments.map((comment, index) => {
//             return (<Comment key={index}  text={comment} />)
//           })}
//           <form onSubmit={handleCommentSubmit} className="mt-2">
//             <input
//               type="text"
//               value={newComment}
//               onChange={handleCommentChange}
//               className="w-full p-2 border border-gray-300 rounded"
//               placeholder="Add a comment..."
//             />
//           </form>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Card;




















// import React from 'react';
// import ThumbUp from "../assets/thumb_up.svg"
// import Comment from "../assets/comment.svg"
// function PostBar({ title, content, likes, comments }) {
//   // Function to truncate the content to 50 words
//   const truncateContent = (text) => {
//     const words = text.split(' ');

//     if (words.length > 25) {
//       return words.slice(0, 25).join(' ') + '...';
//     }

//     return text;
//   };

//   return (
//     <div className="bg-white p-4 mb-4 shadow-sm border border-black mb-4">
//       <h2 className="text-lg font-bold mb-2">{title}</h2>
//       <p className="text-gray-700 mb-4">{truncateContent(content)}</p>
//       <div className="flex justify-end">
//         <p className="text-sm text-gray-600 flex item-center">
//         <img src={ThumbUp} className='inline'/><span className='text-lg font-bold'>:{likes}</span>
//         </p>
//         <p className="text-sm text-gray-600 flex item-center">
//         <img src={Comment} className='inline ml-4'/><span className='text-lg font-bold'>:{comments}</span>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default PostBar;
