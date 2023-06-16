import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getCounsilorBooking} from "../api/api";
import { QueryClient,useQuery,useMutation,QueryCache } from "react-query";
import {bookingUrl} from "../url/url";
import api from "../api/api";
const Schedule = ({ counselorId }) => {
  const [response, setResponse] = useState();
  const queryClient=new QueryClient();
//   useEffect(() => {
//     const fetchSchedule = async () => {
//       const response = await axios.get(`/api/schedule?counselorId=${counselorId}`);
//       setSchedule(response.data);
//     };
//     fetchSchedule();
//   }, [counselorId]);

  const handleDelete = async (bookingId) => {
    try {
        console.log("url",`${bookingUrl}${bookingId}`)
        const response = await api.delete(`${bookingUrl}/${bookingId}`);
        console.log('Data deleted successfully:', response.data);
        queryClient.invalidateQueries("booking")
        setResponse(response.data)
        window.location.reload();
      } catch (error) {
          console.error('Error deleting data:', error);       
        } 
    
  };
const authData = JSON.parse(localStorage.getItem("auth"));
const {
    isLoading,
    isError,
    error,
    isFetching,
    data:booking,
  }=useQuery(['booking', authData.user._id], () => getCounsilorBooking(authData.user._id));
  if (isLoading) {
    return <div>Loading...</div>;
  }
else if(isFetching)
{
    return null;
}
 else if (isError) {
    return <div>Error: {error.message}</div>;
  }

 else{
  return (
    <div className="flex flex-col space-y-4">
    <p>{response}</p>
      {booking?.map(s => (
        <div key={s._id} className="bg-white rounded-lg shadow-md p-4">
          <div className="font-bold text-lg">{s.date}</div>
            <div key={s._id} className="flex items-center justify-between mt-2">
              <div>{s.from} - {s.to}</div>
              <button onClick={() => handleDelete(s._id,)} className="bg-red-500 hover:bg-red-600 text-white rounded-md px-2 py-1">Delete</button>
            </div>
        </div>
      ))}
    </div>
  );
}};

export default Schedule;
