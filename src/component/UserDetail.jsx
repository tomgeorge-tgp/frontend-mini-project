import { useState } from "react";
import Edit from "../assets/edit.svg"

function UserDetail() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [dep, setDep] = useState("");
  const [year, setYear] = useState("");
  const [description, setDescription] = useState("");
  const [editMode, setEditMode] = useState("Edit");
  const [userData, setUserData] = useState({
    name: "Tom George",
    dept: "csb",
    phone: "9526104187",
    year: "Third",
    desc: "Lorem ipsum dolor sit amet   consectetur Lorem ipsum dolor sit amet   consectetur Lorem ipsum dolor sit amet   consectetur  ",
  });
  

 
  const handleChange = (event) => {
    
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedUserData = {
      ...userData,
      phone: phone || userData.phone,
      year: year || userData.year,
      dept: dep || userData.dept,
      desc: description || userData.desc,
    };
    setEditMode("Edit");
    setPhone("");
    setYear("");
    setDep("");
    setDescription("");
    setUserData(updatedUserData);
    console.log(updatedUserData);
  };
  
  return (
    <div className="bg-zinc-300 px-8 py-8 relative ">
   
      <div className="">
         <p className="block text-xl font-bold text-gray-700">{userData.name}</p>   
      </div>
     <form>
     <div className="mb-4">
            {/* <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone
            </label> */}
            <input
              type="text"
              id="phone"
              value={phone}
              readOnly={editMode==="Edit"? true: false}
              placeholder={userData.phone}
              onChange={(e) => setPhone(e.target.value)}
              className={editMode!="Edit" ? " mt-4 border border-gray-300 rounded-md p-2 max-w-lg min-w-32" : " mt-4 max-w-lg min-w-32 bg-transparent font-semibold::placeholder border-none outline-none"}
            />
          </div>
          <div className="flex flex-wrap gap-x-4">
          <div className="mb-4">
          <select
          id="year"
          value={year}
          className={` max-w-xs min-w-24 bg-transparent font-semibold::placeholder border-none outline-none ${editMode!="Edit" ? '' : 'opacity-50 pointer-events-none'}`}
          onChange={(event) => setYear(event.target.value)}
          required
          disabled={editMode==="Edit"? true: false}
        >
          <option value="">{userData.year+" Year"}</option>
          <option value="First">First</option>
          <option value="Second">Second</option>
          <option value="Third">Third</option>
          <option value="Fourth">Fourth</option>
        </select>
          </div>
          <div className="mb-4">
          <select
          id="class"
          className={`max-w-xs min-w-24 bg-transparent font-semibold::placeholder border-none outline-none ${editMode!="Edit" ? '' : 'opacity-50 pointer-events-none'}`}
          value={dep}
          
          disabled={editMode==="Edit"? true: false}
          onChange={(event) => setDep(event.target.value)}
          required
        >
          <option value="">{userData.dept}</option>
          <option value="CSA">CSA</option>
          <option value="CSB">CSB</option>
          <option value="CSC">CSC</option>
          <option value="CSBS">CSBS</option>
          <option value="ECA">ECA</option>
          <option value="ECB">ECB</option>
          <option value="EB">EB</option>
          <option value="ME">ME</option>
          <option value="EEE">EEE</option>
        </select>
          </div>
          </div>
         
          <div className="mb-4">
            {/* <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label> */}
            <textarea
              id="description"
              rows="2"
              placeholder={userData.desc}
              className={editMode!="Edit" ? "border border-gray-300 rounded-md p-2 w-full" : "bg-transparent font-semibold::placeholder border-none outline-none w-full"}
              readOnly={editMode==="Edit"? true: false}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
        </form>
        <button className="absolute top-8 right-8 md:top-8 md:right-32 bg-white text-black py-1 px-2 rounded" onClick={(e)=>{
            editMode === "Edit" ? setEditMode("Save") : handleSubmit(e);
        }}>
         {editMode}
      </button>

      </div>
  );
}

export default  UserDetail;

