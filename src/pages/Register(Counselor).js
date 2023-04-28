import React, { useState } from 'react';
import './CounselorSignUpForm.css';

const CounselorSignUpForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phno, setPhno] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
  };

  return (
    <form onSubmit={handleSubmit} className="counselor-sign-up-form">
      <h2>Counselor Sign Up</h2>

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
          pattern="(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*]).{8,}"
          title="Password must contain at least 8 characters, including at least 1 number, 1 uppercase letter, 1 lowercase letter, and 1 special character (!@#$%^&*)"
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

      <button type="submit">Submit</button>
    </form>
  );
};

export default CounselorSignUpForm;
