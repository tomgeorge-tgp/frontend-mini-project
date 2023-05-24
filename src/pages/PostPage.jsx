import { useState } from "react";
// import "./style/login.css";
import Card from "../component/Card";
function PostPage() {
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

 
  const handleChange = (event) => {
    
  };

  const handleSubmit = (event) => {

  };
  return (
    <div className="lg:px-32 py-8 md:px-8 md:py-8 ">
     {posts.map((post) => (
        <Card
          key={post.id}
          title={post.title}
          content={post.content}
          likes={post.likes}
          initialComments={post.comments}
        />
      ))}

    </div>
  );
}

export default  PostPage;
