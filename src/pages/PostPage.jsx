import { useState } from "react";
// import "./style/login.css";
import Card from "../component/Card";
import { getAllPost } from "../api/api";
import { QueryClient,useQuery,useMutation,QueryCache } from "react-query";
import useLocalStorageRef from "../hooks/LocalStorage"


function PostPage() {
  const [email, setEmail] = useState("");

      
        const {
          isLoading,
          isError,
          error,
          data:posts,
        }=useQuery(['posts'] , () => getAllPost());
    console.log("posts loaded",posts);
        const queryClient=new QueryClient();

 
  const handleChange = (event) => {
    
  };

  const handleSubmit = (event) => {

  };
  if (isLoading) {
    return <div>Loading...</div>;
  }

 else if (isError) {
    return <div>Error: {error.message}</div>;
  }
 else{
  return (
    <div className="lg:px-32 py-8 md:px-8 md:py-8 ">
     {posts.map((post,index) => (
        <Card
          key={index}
          data={post}
        />
      ))}

    </div>
  );
}
}
export default  PostPage;
