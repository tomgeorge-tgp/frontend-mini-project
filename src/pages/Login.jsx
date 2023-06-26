import { useState } from "react";
import { useEffect } from "react";
import "./style/login.css";
import { loginUrl } from "../url/url";
import {login} from "../api/api";
import {useQuery,useMutation,useQueryClient} from "react-query";
import Spinner from "../component/Spinner";
//  import useLocalStorageRef from "../hooks/LocalStorage"
import { Link,useNavigate,useLocation } from 'react-router-dom';
import useAuth from "../hooks/useAuth";
function Login() {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //  const [ setUserData] = useLocalStorageRef("user")
  const queryClient=useQueryClient();
  const navigate = useNavigate();
  const {setAuth}=useAuth();
  const logInMutation = useMutation(login, {
    // Handle the success case
    onSuccess: (userData) => {
      console.log("here");
      // TODO: save the user in the state or local storage
      console.log(userData);
      queryClient.setQueryData("user", userData);
      console.log("LogIn successful!");
      const accessToken=userData?.token;
      // Since the comparison in the component is array based, roles is expected to be an array.
      // Currently in the database, role is saved as a string.
      const roles=[userData?.otherData?.type];
      const user=userData?.otherData;
      // Navigate to another page or show a success message
      localStorage.setItem("auth", JSON.stringify({user,roles,accessToken}))
      localStorage.setItem("user", JSON.stringify(user))
      setAuth({user,roles,accessToken})
      //  setUserData(user);
      if (roles.includes('User')) {
        navigate('/dashboard/user');
      } else if (roles.includes('Counsilor')) {
        navigate('/dashboard/counsilor');
      } else if (roles.includes('Core')) {
        navigate('/dashboard/admin');
      }
    
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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulating a delay of 2 seconds before setting isLoading to false
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="flex justify-center items-center h-screen">
    {isLoading ? (
        <Spinner />
      ) : (
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
        <a  className="hover:cursor-pointer" onClick={()=>{
               navigate('/register')
                }}>
         register</a>
        <br/>
      </div>
      )}
    </div>
  );
}

export default Login;
