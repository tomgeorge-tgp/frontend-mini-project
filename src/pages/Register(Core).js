import React, { useState } from 'react';
import './SignUpForm.css';

const SignUpForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phno, setPhno] = useState('');
  const [department, setDepartment] = useState('');
  const [year, setYear] = useState('');
  const [role, setRole] = useState('');

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
        <label htmlFor="department">Department</label>
        <select
          id="department"
          value={department}
          onChange={(event) => setDepartment(event.target.value)}
          required
        >
          <option value="">Select your department</option>
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
          value={year}
          onChange={(event) => setYear(event.target.value)}
          required
        >
          <option value="">Select your year</option>
          <option value="First">First</option>
          <option value="Second">Second</option>
          <option value="Third">Third</option>
          <option value="Fourth">Fourth</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="role">Role</label>
        <select
          id="role"
          value={role}
          onChange={(event) => setRole(event.target.value)}
          required
        >
          <option value="">Select your role</option>
          <option value="Chair">Chair</option>
          <option value="Vice chair">Vice chair</option>
          <option value="Secretary">Secretary</option>
          <option value="Treasurer">Treasurer</option>
          <option value="Event coordinator">Event coordinator</option>
        </select>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default SignUpForm;
