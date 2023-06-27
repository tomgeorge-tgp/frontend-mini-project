import { useState } from "react";
import Sidebar from "../component/SideBar";
import AdminDetail from "../component/AdminDetail";
import UserDetail from "../component/UserDetail";
import UserPost from "../component/UserPost";
import ReviewPost from "../component/ReviewPost";
function CoreDashboard() {
  const [email, setEmail] = useState("");


 
  const handleChange = (event) => {
    
  };

  const handleSubmit = (event) => {

  };
  const sidebarValues = ['Details', 'Review Post', 'Add Post','Add Events'];
  const [selectedButton, setSelectedButton] = useState(0);

  const handleSidebarButtonClick = (index) => {
    // console.log(index)
    setSelectedButton(index);
    // Perform any additional actions based on the selected button index
  };

  return (
    <div className="lg:px-32 py-8 md:px-8 md:py-8 ">
       <div className="flex justify-center">
    <h2 className="text-2xl font-bold">Core Dashboard</h2>
    </div>
    <div className="flex justify-center mt-8 mb-8">

   <Sidebar values={sidebarValues} onButtonClick={handleSidebarButtonClick}/>
    </div>
    

   <div  className="flex-1">
    {selectedButton==0 ? <UserDetail/>:""}
    {selectedButton==1 ? <ReviewPost/>:""}
    {selectedButton==2? <UserPost/>:""}
   </div>
    
    </div>
  );
}

export default  CoreDashboard;
