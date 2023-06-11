 // eslint-disable-next-line
import React from 'react';
import { useState } from 'react';
// import { Picker } from 'react-scrollable-picker';

const Timeslot = () => {
    const [timeSlotS, setTimeSlotS] = useState('')
    const [timeSlotE, setTimeSlotE] = useState('')
    const hour=["0","1","2","3","4","5","6"]
    const [range, setRange] = React.useState({ title: "0" });
    const optionGroups = {
      title: hour.map((i) => ({ value: i, label: i }))
    };

    const handleChange1 = (name, value) => {
     setRange({
       ...range,
       [name]: value
     });
   };
   const handleChange2 = (name, value) => {
    setRange({
      ...range,
      [name]: value
    });
  };

    // for i in ()

    // const handleTime1 = (e) => {
    //     setTimeSlotS(e.target.value);
    //   };

    // const handleTime2 = (e) => {
    //     setTimeSlotE(e.target.value);
    //   }; 

    const handleSubmit0 = (e) => {
        e.preventDefault();
        console.log('Start Time:', timeSlotS);
        console.log('End Time:',timeSlotE)
      };  
  return (
    <form onSubmit={handleSubmit0}>
        <label htmlFor="timeSlotS">Start:</label>
        <select id="timeSlotS" value={timeSlotS} onChange={handleTime1} required>
        {/* <Picker
        optionGroups={optionGroups}
        valueGroups={range}
        onChange={handleChange1}
        /> */}
      </select>
      <label htmlFor="timeSlotE">End:</label>
        <select id="timeSlotE" value={timeSlotS} onChange={handleTime2} required>
        {/* <Picker
        optionGroups={optionGroups}
        valueGroups={range}
        onChange={handleChange2}
        /> */}
      </select> 
       {/* <Picker
         optionGroups={optionGroups}
         valueGroups={range}
         onChange={handleChange}
       /> */}
    </form>
  )
}

export default Timeslot;