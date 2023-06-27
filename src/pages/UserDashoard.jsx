import React, { useState } from 'react';
import Modal from "react-modal";
import Navbar from "../component/NavBar"
import UserDetails from "../component/UserDetail";
import UserPost from '../component/UserPost';


function UserDashboard(){

  const [activeComponent, setActiveComponent] = useState('post');

  const renderComponent = (component) => {
    setActiveComponent(component);
  };

  
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


  return (<>
    <div className="lg:px-32 py-8 md:px-8 md:py-8">
    
    <div className="flex justify-center">
    <h2 className="text-2xl font-bold">User Dashboard</h2>
    </div>
     <UserDetails/>
     <div className="bg-gray-100 py-1">
      <div className="flex justify-center mt-8 ">
        <button
          className={` text-white px-4 py-0 rounded-l ${
            activeComponent === 'post' ? 'bg-black' : 'bg-gray-400'
          }`}
          onClick={() => renderComponent('post')}
        >
          Post
        </button>
        <button
          className={` text-white px-4 py-2 rounded-r ${
            activeComponent === 'booking' ? 'bg-black' : 'bg-gray-400'
          }`}
          onClick={() => renderComponent('booking')}
        >
          Booking
        </button>
      </div>

      <div className="mt-4 p-4 bg-gray-100">
        {activeComponent === 'post' && (
          <div>
            {/* <h2>Post Component</h2> */}
            <UserPost/>
          </div>
        )}
        {activeComponent === 'booking' && (
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
};

export default UserDashboard;
