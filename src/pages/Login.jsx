import { useState } from "react";
import "./style/login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
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
