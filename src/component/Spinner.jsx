import React from 'react';
import loading from './loading.gif';
import './Spinner.css'; // Add a corresponding CSS file for custom styles

const Spinner = () => {
  return (
    <div className='spinner-container'>
      <img src={loading} alt="loading" className="spinner" />
    </div>
  );
}

export default Spinner;
