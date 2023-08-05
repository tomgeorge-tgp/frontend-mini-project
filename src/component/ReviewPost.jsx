import React, { useState } from "react";
import PostBar from "./AdminViewPostBar";
import Add from "../assets/add.svg"
import ReviewPostPopup from './ReviewPostPopup';
import { QueryClient,useQuery,useMutation,QueryCache } from "react-query";
import {reviewAllPosts,} from "../api/api"
import { getAllUserPost, deletePost,donePost } from "../api/api";
import useLocalStorageRef from "../hooks/LocalStorage";
function ReviewPost() {
  // const [email, setEmail] = useState("");

  const [postData, setPostData] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [allUserPosts,setAllUserPosts] = useState([])
  const [userData, setUserData, removeUserData] = useLocalStorageRef("user");
  const {
    isLoading,
    isError,
    error,
    data:reviewPosts,
  }=useQuery(['reviewPosts'] , async() => await reviewAllPosts());
console.log("posts loaded",reviewPosts);
  const queryClient=new QueryClient();


  const deletePostMutation = useMutation(deletePost, {
    onSuccess: () => {
      queryClient.invalidateQueries("userPosts");
    },
    onError: (error) => {
      console.log("Failed to add comment:", error);
    },
  });


  const donePostMutation = useMutation(donePost, {
    onSuccess: () => {
      queryClient.invalidateQueries("userPosts");
    },
    onError: (error) => {
      console.log("Failed to add comment:", error);
    },
  });



  const handleAddPost = (post) => {
    // Handle adding a new post
    // console.log('New post:', post);
    setIsPopupOpen(false);
    setAllUserPosts(post);
     window.location.reload();
  };

 
  const handleDeletePost = (postId) => {
    console.log("delete post", postId);
    deletePostMutation.mutate({ id: postId, userId: userData.current._id });
    setAllUserPosts(userPosts => userPosts.filter((post) => post._id !== postId));
     window.location.reload();
  };
  const handleDonePost = (postId) => {
    // console.log('Done post:', postId);
    donePostMutation.mutate({ id: postId, userId: userData.current._id });
    setAllUserPosts(userPosts => userPosts.filter((post) => post._id !== postId));
    // window.location.reload();
  };


  const handlePopupClose = () => {
    // console.log('Popup closed');
    setIsPopupOpen(false);
  };

  const handleChange = (event) => {
    // Handle input changes
  };

  const handleSubmit = (event) => {
    //
  };
 
  if (isLoading) {
    return <div>Loading...</div>;
  }

 else if (isError) {
    return <div>Error: {error.message}</div>;
  }
 else{

 
  return (
    <div className="relative">
      <br/>
      <br/> 
      <div className="h-0.5 bg-black mb-5 "></div>

    {/* {isPopupOpen && <ReviewPostPopup isOpen={isPopupOpen} data={postData} onClose={handlePopupClose} />} */}
      {reviewPosts.map((post,index) => (<>
        <div key={post.id} onClick={() => { setIsPopupOpen(true); setPostData(post) }}>
         
        <PostBar
           key={index}
           data={post}
           onDeleteClick={() => handleDeletePost(post._id)}
           onDoneClick={() => handleDonePost(post._id)}
          />
     
        </div>
        </>
      ))}
    </div>
  );
}
}
export default ReviewPost;
