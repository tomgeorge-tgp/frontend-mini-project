import React, { useState } from "react";
import PostBar from "./PostBar";
import Add from "../assets/add.svg"
import AddPostPopup from './AddPostPopup';
function UserPost() {
  const [email, setEmail] = useState("");
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "My First Post",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      likes: 10,
      comments: [
        { id: 1, author: "John", text: "Nice post!" },
        { id: 2, author: "Jane", text: "I agree!" },
      ],
    },
    {
      id: 2,
      title: "My Second Post",
      content:
        "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
      likes: 5,
      comments: [
        { id: 1, author: "Bob", text: "Interesting..." },
        { id: 2, author: "Alice", text: "I learned something new!" },
      ],
    },
  ]);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [editPostTitle, setEditPostTitle] = useState("");
  const [editPostContent, setEditPostContent] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleAddPost = (post) => {
    // Handle adding a new post
    console.log('New post:', post);
    setIsPopupOpen(false);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };


  const handleChange = (event) => {
    // Handle input changes
  };

  const handleSubmit = (event) => {
    // Handle form submission
  };



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

      {posts.map((post) => (
        <PostBar
          key={post.id}
          title={post.title}
          content={post.content}
          likes={post.likes}
          comments={post.comments.length}
        />
      ))}
    </div>
  );
}

export default UserPost;
