import { useState } from "react";
// import "./style/login.css";
import Sidebar from "../component/SideBar";

function CounsilorDashboard() {
  const [email, setEmail] = useState("");
  const sidebarValues = ['Details', 'Review Post', 'Add Post','Add Events'];

  
  const handleChange = (event) => {
    
  };
  const handleSidebarButtonClick = (index) => {
    console.log(index)
    setSelectedButton(index);
    // Perform any additional actions based on the selected button index
  };
  const handleSubmit = (event) => {

  };
  return (
    <div className="lg:px-32 py-8 md:px-8 md:py-8 ">
          <div className="flex justify-center">
    <h2 className="text-2xl font-bold">Counsilor Dashboard</h2>
    </div>
    <div className="flex justify-center mt-8">

   <Sidebar values={sidebarValues} onButtonClick={handleSidebarButtonClick}/>
    </div>
   
   
    </div>
  );
}

export default  CounsilorDashboard;
