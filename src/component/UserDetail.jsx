import { useState } from "react";
import Edit from "../assets/edit.svg"
import { getUser,updateUser } from "../api/api";
import { QueryClient,useQuery,useMutation,QueryCache } from "react-query";
import useLocalStorageRef from "../hooks/LocalStorage"


function UserDetail() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [dep, setDep] = useState("");
  const [year, setYear] = useState("");
  const [role, setRole] = useState("");
  
  const [description, setDescription] = useState("");
  const [editMode, setEditMode] = useState("Edit profile");
  const [userDetails, setUserDetails] = useState();
  const [userData, setUserData, removeUserData] = useLocalStorageRef("user")
  const queryClient=new QueryClient();
    // Access the user details from the query cache
  // setUserData( queryClient.getQueryData("user"));
  // console.log("cachedUser", userData.current);
  const {
    isLoading,
    isError,
    error,
    data:user,
  }=useQuery(['user', userData.current], () => getUser(userData.current));

  const updateUserMutation = useMutation(updateUser, {
    onSuccess: () => {
        // Invalidates cache and refetch 
        queryClient.invalidateQueries("user")

        setUserData(queryClient.getQueryData("user"));
    }
})

//  setUserDetails(user)
  const handleChange = (event) => {
    
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedUserData = {
      ...user,
      phone: phone || user.phone,
      year: year || user.year,
      dept: dep || user.dept,
      desc: description || user.desc,
    };
    setEditMode("Edit profile");
    setPhone("");
    setYear("");
    setDep("");
    setDescription("");
    // setUserDetails(updatedUserData);
    // console.log("updatedUserData",updatedUserData);
    updateUserMutation.mutate(user._id,updatedUserData)
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

 else if (isError) {
    return <div>Error: {error.message}</div>;
  }

 else{
  return (
    <div className="bg-zinc-50 px-8 py-8 relative ">
   
      <div className="">
         <p className="block text-xl font-bold text-gray-700">{user.fullname}</p>   
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
  readOnly={editMode==="Edit profile"? true: false}
  placeholder={user.phone}
  onChange={(e) => setPhone(e.target.value)}
  className={editMode!="Edit profile" ? " mt-4 border   border-gray-300 rounded-md p-2 max-w-lg min-w-32" : " mt-4 max-w-lg text-gray-700 min-w-32 bg-transparent font-semibold border-none outline-none::placeholder text-gray-600"}
/>
          </div>

          {user.type ==="Core" || "Student"? 
          <div className="flex flex-wrap gap-x-4">
          <div className="select-container mb-2">
        <select
          id="year"
          value={year}
          className={` sm:w-18 w-32 h-10  bg-transparent font-semibold::placeholder border-none  outline-none ${editMode !== "Edit profile" ? "" : "opacity-50 sm:w-18 pointer-events-none appearance-none"}`}
          onChange={(event) => setYear(event.target.value)}
          required
          disabled={editMode === "Edit profile" ? true : false}
        >
          <option value="">{user.year + " Year"}</option>
          <option value="First">First</option>
          <option value="Second">Second</option>
          <option value="Third">Third</option>
          <option value="Fourth">Fourth</option>
        </select>
</div>

  
          <div className="mb-2">
          <select
          id="class"
          className={`w-32 h-10 sm:w-18 bg-transparent font-semibold::placeholder border-none outline-none ${editMode!="Edit profile" ? '' : 'opacity-50 sm:w-18 pointer-events-none appearance-none'}`}
          value={dep}
          
          disabled={editMode==="Edit profile"? true: false}
          onChange={(event) => setDep(event.target.value)}
          required
        >
          <option value="">{user.department}</option>
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
          {user.type ==="Core"?   <div className="form-group">
        {/* <label htmlFor="role">Role</label> */}
        <select
          id="role"
          value={role}
          onChange={(event) => setRole(event.target.value)}
          className={`w-32 h-10 sm:w-18 bg-transparent font-semibold::placeholder border-none outline-none ${editMode!="Edit profile" ? '' : 'opacity-50 sm:w-18 pointer-events-none appearance-none'}`}
          required
        >
          <option value="">{user.role}</option>
          <option value="Chair">Chair</option>
          <option value="Vice chair">Vice chair</option>
          <option value="Secretary">Secretary</option>
          <option value="Treasurer">Treasurer</option>
          <option value="Event coordinator">Event coordinator</option>
        </select>
      </div>
       : "" }
          </div>


        :" "}   
          <div className="mb-4 ml-2">
  <p>
    <span className="font-bold mr-1 ">3</span>
    <span className="text-gray-400">posts</span>
  </p>
</div>
          <div className="mb-4">
            {/* <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label> */}
            <textarea
              id="description"
              rows="2"
              placeholder={userData.desc}
              className={editMode!="Edit profile" ? "border border-gray-300 rounded-md p-2 w-full" : "bg-transparent font-semibold::placeholder border-none outline-none w-full"}
              readOnly={editMode==="Edit profile"? true: false}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
        </form>
        <button
  className="absolute top-8 right-8 md:top-8 md:right-32 bg-white text-black py-2 px-2 rounded border border-black hover:bg-gray-200"
  onClick={(e) => {
    editMode === "Edit profile" ? setEditMode("Save") : handleSubmit(e);
  }}
>
  {editMode}
</button>

      </div>
  );
}
}
export default  UserDetail;

