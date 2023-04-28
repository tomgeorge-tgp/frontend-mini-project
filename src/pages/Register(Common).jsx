import React, { useState } from 'react';
import './SignUpForm.css';

const SignUpForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phno, setPhno] = useState('');
  const [classValue, setClassValue] = useState('');
  const [yearValue, setYearValue] = useState('');
  const [aboutYou, setAboutYou] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
  };

  return (
    <form onSubmit={handleSubmit} className="sign-up-form">
      <h2>Sign Up</h2>

      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}"
          title="Password must contain at least 8 characters, including at least 1 number, 1 lowercase letter, 1 uppercase letter, and 1 special character (!@#$%^&*)"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="phno">Phone Number</label>
        <input
          type="tel"
          id="phno"
          value={phno}
          onChange={(event) => setPhno(event.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="class">Class</label>
        <select
          id="class"
          value={classValue}
          onChange={(event) => setClassValue(event.target.value)}
          required
        >
          <option value="">Select your class</option>
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

      <div className="form-group">
        <label htmlFor="year">Year</label>
        <select
          id="year"
          value={yearValue}
          onChange={(event) => setYearValue(event.target.value)}
          required
        >
          <option value="">Select your year</option>
          <option value="1">1st</option>
          <option value="2">2nd</option>
          <option value="3">3rd</option>
          <option value="4">4th</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="aboutYou">About You</label>
        <textarea
          id="aboutYou"
          value={aboutYou}
          onChange={(event) => setAboutYou(event.target.value)}
        />
      </div>

      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUpForm;
