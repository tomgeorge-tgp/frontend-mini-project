import React, { useState } from "react";
import PostBar from "./PostBar";
import Add from "../assets/add.svg"
import ReviewPostPopup from './ReviewPostPopup';

function ReviewPost() {
  const [email, setEmail] = useState("");
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "My First Post",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      likes: 10,
      comments: [
        { id: 1, author: "John", text: "Nice post!" },
        { id: 2, author: "Jane", text: "I agree4,4rm4fm4gmklm4lmf2!" },
        { id: 3, author: "John", text: "Nice post!" },
        { id: 4, author: "Jane", text: "I agree4tgm4gm4lrmg4rm24lmglremg5j5efvhbwfehbwefbvdbvjhrgtigwbrbiqdbweb!" },
        { id: 5, author: "John", text: "Nice post!grnjbrwjbgfedvbnevbj4rbgjrbnefbvnnrfjrngb4jrgjrthgjrenennewkjnwkjrenkjerfnejfnrenfrvnjrbvwjkrbjwebiow" },
        { id: 6, author: "Jane", text: "I agree!" },
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
  const [postData, setPostData] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handlePopupClose = () => {
    console.log('Popup closed');
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
      <br/>
      <br/> 
      <div className="h-0.5 bg-black mb-5 "></div>

    {isPopupOpen && <ReviewPostPopup isOpen={isPopupOpen} data={postData} onClose={handlePopupClose} />}
      {posts.map((post) => (
        <div key={post.id} onClick={() => { setIsPopupOpen(true); setPostData(post) }}>

          <PostBar
            key={post.id}
            title={post.title}
            content={post.content}
            likes={post.likes}
            comments={post.comments.length}
          />
        </div>
      ))}
    </div>
  );
}

export default ReviewPost;
