import React, { useState } from 'react';

import { addBooking,getSchedule } from "../api/api";
import { QueryClient, useQuery, useMutation, QueryCache } from "react-query";
import useLocalStorageRef from "../hooks/LocalStorage";
const BookingPage = () => {
  const { isLoading, isError, error, data: schedulesData } = useQuery(['schedulesData'], () => getSchedule());

  const [userData, setUserData, removeUserData] = useLocalStorageRef("user");
  //   const [userAllPosts, setAllUserPosts] = useState([]);
    const queryClient = new QueryClient();
  
    // console.log("schedule",schedule);
  
  
  
        // Use useMutation to create a signUpMutation object
        const bookingMutation = useMutation(addBooking, {
          // Handle the success case
          onSuccess: (bookingData) => {
            console.log("here");
            // TODO: save the user in the state or local storage
            console.log(bookingData);
            queryClient.setQueryData("booking", bookingData);
            console.log("Booking ADD!");
            // Navigate to another page or show a success message
          //   setUserData(userData);
          },
          // Handle the error case
          onError: (error) => {
            // Show an error message or toast
            console.log("Booking failed. Please try again.");
            console.log(error);
          },
        });
  






  const generateHourlySlots = (dates) => {
    const hourlySlots = dates.map((dateObj) => {
        
         //console.log("datesobj",dateObj)
      const { date, times,_id, } = dateObj;
      const slots = [];
      times.forEach((time) => {
        const start = new Date(`${date} ${time.from}`);
        const end = new Date(`${date} ${time.to}`);
        
        while (start < end) {
          const slotStart = new Date(start);
          const slotEnd = new Date(start.setHours(start.getHours() + 1));
        //    console.log("SlotStart", slotStart);
          slots.push({ start: slotStart, end: slotEnd,_idTime:time._id });
        }
      });

      return { date, slots,_id };
    });

    return hourlySlots;
  };

  
  const book = (date, time,_id,) => {
    console.log(`Booking for ${date} at ${time.start}-${time.end}`);
    let bookingInfo = {
        userId:userData.current._id,
        _scheduleId:_id,
        _scheduleTimeId:time._idTime,
        date:date,
        from:time.start.toLocaleTimeString(),
        to:time.end.toLocaleTimeString(),
      };
      console.log("booking",bookingInfo);
    try{
      bookingMutation.mutate(bookingInfo); 

    }catch(err)
    {
      console.log(err);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  } else if (isError) {
    return <div>Error: {error.message}</div>;
  } else {
    const hourlySlots = generateHourlySlots(schedulesData);

    return (
      <div className="container mx-auto">
        {hourlySlots.map((dateObj) => (
          <div key={dateObj.date} className="mb-4">
          {/* {console.log("dateObj", dateObj)} */}
            <h2 className="text-xl font-bold mb-2">{dateObj.date}</h2>
            <div className="flex flex-wrap">
              {dateObj.slots.map((time, index) => (
                <div
                  key={index}
                  className="bg-blue-500 text-white p-4 m-2 rounded cursor-pointer"
                  onClick={() => book(dateObj.date, time, dateObj._id)}
                >
                  {time.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {time.end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }
};

export default BookingPage;
