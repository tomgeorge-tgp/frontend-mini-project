import React, { useState } from 'react';
import Modal from "react-modal";
import Navbar from "../component/NavBar"
import UserDetails from "../component/UserDetail";
import Scheduling from '../component/Scheduling';

import { addSchedule,getCounsilorSchedule } from "../api/api";
import { QueryClient, useQuery, useMutation, QueryCache } from "react-query";
import useLocalStorageRef from "../hooks/LocalStorage";



function CounsilorDashboard(){

  const [activeComponent, setActiveComponent] = useState('scheduling');
  const [userData, setUserData, removeUserData] = useLocalStorageRef("user");
  const renderComponent = (component) => {
    setActiveComponent(component);
  };

    const {
    isLoading,
    isError,
    error,
    data:scheduleData,
  }=useQuery(['scheduleData', userData.current], () => getCounsilorSchedule(userData.current._id));

  
  // // const [newPost, setNewPost] = useState('');
  // const [showAddPostModal, setShowAddPostModal] = useState(false);
  // const [showEditPostModal, setShowEditPostModal] = useState(false);
  // const [selectedPost, setSelectedPost] = useState(null);

  // const handleAddPost = () => {
  //   const newPost = {
  //     id: Math.floor(Math.random() * 1000) + 1,
  //     title: newPostTitle,
  //     content: newPostContent,
  //     likes: 0,
  //     comments: [],
  //   };
  //   setPosts([...posts, newPost]);
  //   setNewPostTitle("");
  //   setNewPostContent("");
  //   setShowAddPostModal(false);
  // };



  // const handleEditPost = () => {
  //   const updatedPost = {
  //     ...selectedPost,
  //     title: editPostTitle,
  //     content: editPostContent,
  //   };
  //   const updatedPosts = posts.map((post) =>
  //     post.id === selectedPost.id ? updatedPost : post
  //   );
  //   setPosts(updatedPosts);
  //   setEditPostTitle("");
  //   setEditPostContent("");
  //   setShowEditPostModal(false);
  // };
  // const handleDeletePost = (id) => {
  //   const filteredPosts = posts.filter((post) => post.id !== id);
  //   setPosts(filteredPosts);
  // };
  // const handleAddComment = (id, author, text) => {
  //   const updatedPost = {
  //     ...selectedPost,
  //     comments: [
  //       ...selectedPost.comments,
  //       { id: Math.floor(Math.random() * 1000) + 1, author, text },
  //     ],
  //   };
  //   const updatedPosts = posts.map((post) =>
  //     post.id === selectedPost.id ? updatedPost : post
  //   );
  //   setPosts(updatedPosts);
  // };

  if (isLoading) {
    return <div>Loading...</div>;
  }

 else if (isError) {
    return <div>Error: {error.message}</div>;
  }

 else{
  return (<>
    <div className="lg:px-32 py-8 md:px-8 md:py-8">
    
    <div className="flex justify-center">
    <h2 className="text-2xl font-bold">Counsilor Dashboard</h2>
    </div>
     <UserDetails/>
     <div className="bg-gray-100 py-1">
      <div className="flex justify-center mt-8 ">
        <button
          className={` text-white px-4 py-0 rounded-l ${
            activeComponent === 'scheduling' ? 'bg-black' : 'bg-gray-400'
          }`}
          onClick={() => renderComponent('scheduling')}
        >
          Scheduling
        </button>
        <button
          className={` text-white px-4 py-2 rounded-r ${
            activeComponent === 'booked' ? 'bg-black' : 'bg-gray-400'
          }`}
          onClick={() => renderComponent('booked')}
        >
          Booked List
        </button>
      </div>

      <div className="mt-4 p-4 bg-gray-100">
        {activeComponent === 'scheduling' && (
          <div>
            {/* <h2>Post Component</h2> */}
            <Scheduling data={scheduleData}/>
          </div>
        )}
        {activeComponent === 'booked' && (
          <div>
            <h2>Booking Component</h2>
            {/* Add your booking component content here */}
          </div>
        )}
      </div>
    </div>
    </div>
  </>
  )
}
};

export default CounsilorDashboard;
