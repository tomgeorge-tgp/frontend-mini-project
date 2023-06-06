import React, { useState, useEffect } from "react";
import PostBar from "./UserViewPostBar";
import Add from "../assets/add.svg";
import AddPostPopup from "./AddPostPopup";
import { getAllUserPost, deletePost } from "../api/api";
import { QueryClient, useQuery, useMutation, QueryCache } from "react-query";
import useLocalStorageRef from "../hooks/LocalStorage";

function UserPost() {
  const [email, setEmail] = useState("");

  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [editPostTitle, setEditPostTitle] = useState("");
  const [editPostContent, setEditPostContent] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [userData, setUserData, removeUserData] = useLocalStorageRef("user");
  const [userAllPosts, setAllUserPosts] = useState([]);
  const queryClient = new QueryClient();

  const deletePostMutation = useMutation(deletePost, {
    onSuccess: () => {
      queryClient.invalidateQueries("userPosts");
    },
    onError: (error) => {
      console.log("Failed to add comment:", error);
    },
  });

  // const { isLoading, isError, error, data:userPosts, } = useQuery("userPosts", getAllUserPost);
    const {
    isLoading,
    isError,
    error,
    data:userPosts,
  } = useQuery(['userPosts', userData.current._id], () => getAllUserPost(userData.current._id));
 // setAllUserPosts(userPosts);
   console.log("User posts", userPosts);
  const handleAddPost = (post) => {
    // Handle adding a new post
    console.log('New post:', post);
    setIsPopupOpen(false);
    setAllUserPosts(post);
    window.location.reload();
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

  const handleDeletePost = (postId) => {
    deletePostMutation.mutate({ id: postId, userId: userData.current._id });
    setAllUserPosts(userPosts => userPosts.filter((post) => post._id !== postId));
    window.location.reload();
  };

  if (isLoading) {
    return <div>Loading...</div>;
  } else if (isError) {
    return <div>Error: {error.message}</div>;
  } else {
    return (
      <div className="relative">
        <button
          className="absolute top-0 right-0 bg-white rounded-full w-10 h-10 flex items-center justify-center"
          onClick={() => setIsPopupOpen(true)}
        >
          <img src={Add} alt="Add" className="w-6 h-6" />
        </button>
        <br/>
        <br/> 
        <div className="h-0.5 bg-black mb-5 "></div>
        <AddPostPopup isOpen={isPopupOpen} onClose={handlePopupClose} onAdd={handleAddPost} />

        {userPosts ?.map((post) => (
          <PostBar
            data={post}
            onDeleteClick={() => handleDeletePost(post._id)}
          />
        ))}
      </div>
    );
  }
}

export default UserPost;





















// import React, { useState,useEffect } from "react";
// import PostBar from "./UserViewPostBar";
// import Add from "../assets/add.svg"
// import AddPostPopup from './AddPostPopup';
// import {getAllUserPost,deletePost} from "../api/api";
// import { QueryClient,useQuery,useMutation,QueryCache } from "react-query";
// import useLocalStorageRef from "../hooks/LocalStorage"

// function UserPost() {
//   const [email, setEmail] = useState("");
 
//   const [newPostTitle, setNewPostTitle] = useState("");
//   const [newPostContent, setNewPostContent] = useState("");
//   const [editPostTitle, setEditPostTitle] = useState("");
//   const [editPostContent, setEditPostContent] = useState("");
//   const [isPopupOpen, setIsPopupOpen] = useState(false);
//   const [userData, setUserData, removeUserData] = useLocalStorageRef("user")
//   const [userAllPosts, setAllUserPosts] = useState([]);
//   const [rerender, setRerender] = useState(false);
//   const queryClient=new QueryClient();

//   const deletePostMutation = useMutation(deletePost,
//     {
//     onSuccess: () => {
//         queryClient.invalidateQueries("posts");
//         //  setRerender(!rerender);
//     },
//     onError: (error) => {
//         console.log("Failed to add comment:", error);
//     },
//     }
//     );

//   const { isLoading, isError, error, userPosts } = getUserPosts(userData.current._id);
  
//   const handleAddPost = (post) => {
//     // Handle adding a new post
//     console.log('New post:', post);
//     queryClient.invalidateQueries("Posts");

//     setIsPopupOpen(false);
//     // setAllUserPosts(post);
//   };
  
// // useEffect(() => {
// //   // This code will run whenever the 'rerender' state variable changes
// //   console.log("Rerendering...");
// // }, [rerender]);


//   const handlePopupClose = () => {
//     setIsPopupOpen(false);
//   };

//   const handleDeletePost = (postId) => {
//     deletePostMutation.mutate({ id: postId ,userId: userData.current._id });
//     // window.location.reload();
//   // setRerender(!rerender);
//     // setAllUserPosts(posts => posts.filter((post) => post._id !== postId));
//   };

//   if (isLoading) {
//     return <div>Loading...</div>;
//   } else if (isError) {
//     return <div>Error: {error.message}</div>;
//   } else {
//     return (
//       <div className="relative">
//         <button
//           className="absolute top-0 right-0 bg-white rounded-full w-10 h-10 flex items-center justify-center"
//           onClick={() => setIsPopupOpen(true)}
//         >
//           <img src={Add} alt="Add" className="w-6 h-6" />
//         </button>
//         <br/>
//         <br/> 
//         <div className="h-0.5 bg-black mb-5 "></div>
//         <AddPostPopup isOpen={isPopupOpen} onClose={handlePopupClose} onAdd={handleAddPost} />

//         {userPosts.map((post) => (
//           <PostBar
//             data={post}
//             onDeleteClick={() => handleDeletePost(post._id)}
//           />
//         ))}
//       </div>
//     );
//   }
// }

// const getUserPosts = (userId) => {
//   const {
//     isLoading,
//     isError,
//     error,
//     data:userPosts,
//   } = useQuery(['userPosts', userId], () => getAllUserPost(userId));

//   return { isLoading, isError, error, userPosts };
// }

// export default UserPost;
