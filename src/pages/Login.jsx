import { useState } from "react";
import "./style/login.css";
import { loginUrl } from "../url/url";
import {login} from "../api/api";
import {useQuery,useMutation,useQueryClient} from "react-query";
import useLocalStorageRef from "../hooks/LocalStorage"

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData, removeUserData] = useLocalStorageRef("user")
  const queryClient=useQueryClient();
  
  const logInMutation = useMutation(login, {
    // Handle the success case
    onSuccess: (userData) => {
      console.log("here");
      // TODO: save the user in the state or local storage
      console.log(userData);
      queryClient.setQueryData("user", userData);
      console.log("LogIn successful!");
      // Navigate to another page or show a success message
      setUserData(userData);
    },
    // Handle the error case
    onError: (error) => {
      // Show an error message or toast
      console.log("LogIn failed. Please try again.");
      console.log(error);
    },
  });

    
  
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
    let userInfo={
      email:email,
      password:password
    }
    // const res=await api.post(loginUrl,{email: email, password: password})
    // console.log("response:", res.data);
    try{
      logInMutation.mutate(userInfo);  
    }catch(err)
    {
      console.log(err);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="login-card">
        <a className="login">Log in</a>
        <div className="login-inputBox">
          <input type="text" required="required"   onChange={handleEmailChange} />
          <span className="login-user">Email</span>
        </div>

        <div className="login-inputBox">
          <input type="password" required="required"  onChange={handlePasswordChange} />
          <span>Password</span>
        </div>

        <button className="login-enter" onClick={handleSubmit}>
          Enter
        </button>
      </div>
    </div>
  );
}

export default Login;
