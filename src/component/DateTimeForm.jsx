import React, { useState } from 'react';
import Timeslot from './Timeslot';

const DateTimeForm = () => {
  const [date, setDate] = useState('');

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Date:', date);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="date">Date:</label>
      <input
        type="date"
        id="date"
        value={date}
        onChange={handleDateChange}
        required
      />

      <Timeslot/>

      <button type="submit">Submit</button>
      <button type="+">+</button>
    </form>
  );
};

export default DateTimeForm;