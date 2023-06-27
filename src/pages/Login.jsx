import { useState, useEffect } from "react";
import "./style/login.css";
import { loginUrl } from "../url/url";
import { login } from "../api/api";
import { useQuery, useMutation, useQueryClient } from "react-query";
import Spinner from "../component/Spinner";
import { Link, useNavigate } from 'react-router-dom';
import useAuth from "../hooks/useAuth";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import i1 from "../assets/gl.png";
import i2 from "../assets/fb.png";
import i3 from "../assets/ld.png";
function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const logInMutation = useMutation(login, {
    onSuccess: (userData) => {
      console.log("here");
      console.log(userData);
      queryClient.setQueryData("user", userData);
      console.log("LogIn successful!");
      const accessToken = userData?.token;
      const roles = [userData?.otherData?.type];
      const user = userData?.otherData;
      localStorage.setItem("auth", JSON.stringify({ user, roles, accessToken }));
      localStorage.setItem("user", JSON.stringify(user));
      setAuth({ user, roles, accessToken });
      if (roles.includes('Student')) {
        navigate('/dashboard/user');
      } else if (roles.includes('Counsilor')) {
        navigate('/dashboard/counsilor');
      } else if (roles.includes('Core')) {
        navigate('/dashboard/core');
      }
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Login Successful!',
        showConfirmButton: false,
        timer: 1500
      });
    },
    onError: (error) => {
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    let userInfo = {
      email: email,
      password: password
    };
    try {
      logInMutation.mutate(userInfo);
    } catch (err) {
      console.log(err);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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
        <div className="mt-2">
          <a className="login">Log in</a>
          </div>
          <div className="login-inputBox">
            <input type="text" required="required" onChange={handleEmailChange} />
            <span className="login-user">Email</span>
          </div>

          <div className="login-inputBox">
            <input
              type={showPassword ? "text" : "password"}
              required="required"
              value={password}
              onChange={handlePasswordChange}
            />
            <span>Password</span>
            <FontAwesomeIcon
              className="login-password-icon"
              icon={showPassword ? faEyeSlash : faEye}
              onClick={toggleShowPassword}
            />
          </div>

          {logInMutation.isError && (
            <span className="login-error">Incorrect username or password</span>
          )}

          <button className="login-enter" onClick={handleSubmit}>
            Enter
          </button>
          <div className="flex" >
          <img src={i2} className="p-3"/>
          <img src={i1} className="p-3"/>
          <img src={i3} className="p-3"/>
        </div>
          <Link to="/register" className="hover:cursor-pointer">
            Register
          </Link>
          <br />
        </div>
      )}
    </div>
  );
}

export default Login;
