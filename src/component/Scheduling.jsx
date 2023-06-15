import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "rc-time-picker";
import "rc-time-picker/assets/index.css";
import moment from "moment";
import { addSchedule,getSchedule } from "../api/api";
import { QueryClient, useQuery, useMutation, QueryCache } from "react-query";
import useLocalStorageRef from "../hooks/LocalStorage";

const Scheduling = (data) => {
  const [date, setDate] = useState(new Date());
  const [fromTime, setFromTime] = useState(moment());
  const [toTime, setToTime] = useState(moment());
  const scheduleData = data?.data?.reduce((accumulator, currentObject) => {
    accumulator[currentObject.date] = currentObject.times;
    return accumulator;
  }, {});
  const [schedule, setSchedule] = useState(scheduleData);
  const [userData, setUserData, removeUserData] = useLocalStorageRef("user");
//   const [userAllPosts, setAllUserPosts] = useState([]);
  const queryClient = new QueryClient();

//   console.log("schedule",schedule);



      // Use useMutation to create a signUpMutation object
      const scheduleMutation = useMutation(addSchedule, {
        // Handle the success case
        onSuccess: (scheduleData) => {
          console.log("here");
          // TODO: save the user in the state or local storage
          console.log(scheduleData);
          queryClient.setQueryData("schedule", scheduleData);
          console.log("Schedule ADD!");
          // Navigate to another page or show a success message
        //   setUserData(userData);
        },
        // Handle the error case
        onError: (error) => {
          // Show an error message or toast
          console.log("Schedule failed. Please try again.");
          console.log(error);
        },
      });



  const handleDateChange = (date) => {
    setDate(date);
    const dateStr = moment(date).format("YYYY-MM-DD");
    if (!schedule[dateStr]) {
      setSchedule({ ...schedule, [dateStr]: [] });
    }
  };

  const handleFromTimeChange = (fromTime) => {
    setFromTime(fromTime);
  };

  const handleToTimeChange = (toTime) => {
    setToTime(toTime);
  };

  const handleAddButtonClick = () => {
    const dateStr = moment(date).format("YYYY-MM-DD");
    const timeRange = { from: fromTime.format("h:mm a"), to: toTime.format("h:mm a") };
    const updatedSchedule = { ...schedule };
    if (!updatedSchedule[dateStr]) {
      updatedSchedule[dateStr] = [];
    }
    updatedSchedule[dateStr].unshift(timeRange);
    setSchedule(updatedSchedule);
  };

  const handleRemoveTimeClick = (dateStr, index) => {
    const updatedSchedule = { ...schedule };
    updatedSchedule[dateStr].splice(index, 1);
    if (updatedSchedule[dateStr].length === 0) {
      delete updatedSchedule[dateStr];
    }
    setSchedule(updatedSchedule);
  };

  const handleRemoveDateClick = (dateStr) => {
    const updatedSchedule = { ...schedule };
    delete updatedSchedule[dateStr];
    setSchedule(updatedSchedule);
  };

  const handleSaveButtonClick = () => {
      let scheduleInfo = {
          userId:userData.current._id,
          schedule
        };
        console.log("schedule",scheduleInfo);
      try{
        scheduleMutation.mutate(scheduleInfo); 

      }catch(err)
      {
        console.log(err);
      }
  
 

    // addSchedule(schedule);
  };
//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//  else if (isError) {
//     return <div>Error: {error.message}</div>;
//   }

//  else{

  return (
    <div className="container mx-auto px-4">
            <div className="mt-1  flex justify-end">
          <button
            onClick={handleSaveButtonClick}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-24"
          >
            Save
          </button>
        </div>
      <div className="flex flex-col md:flex-col gap-2">
        <div className="w-full md:w-2/5 mb-2 md:mb-0">
          <div className="flex items-center">
            <button
              onClick={handleAddButtonClick}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
              +
            </button>
            <DatePicker
              selected={date}
              onChange={handleDateChange}
              minDate={new Date()}
              className="border p-2 rounded w-full"
            />
          </div>
        </div>
        <div className="w-full md:full flex  flex-col md:flex-row gap-2 mt-2">
        <div className="w-24 l-10 md:w-1/5 mt-2 md:mt-0 ml-10">
            <button
              onClick={handleAddButtonClick}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-1 rounded w-12"
            >
              +
            </button>
          </div>
          <div className="flex item-center gap-2">
            <div className="flex items-center">
              <label className="mr-2">From:</label>
              <TimePicker
                value={fromTime}
                onChange={handleFromTimeChange}
                className="border p-2 rounded"
                use12Hours
                format="h:mm a"
              />
            </div>
            <div className="flex items-center">
              <label className="mx-2">To:</label>
              <TimePicker
                value={toTime}
                onChange={handleToTimeChange}
                className="border p-2 rounded"
                use12Hours
                format="h:mm a"
              />
            </div>
          </div>

        </div>
        <div className="mt-4">
          {Object.keys(schedule)
            .sort((a, b) => moment(b).diff(moment(a)))
            .map((dateStr) => (
              <div key={dateStr} className="mb-4">
                {console.log("dateStr", dateStr)}
                <div className="flex  items-center">
                  <button
                    onClick={() => handleRemoveDateClick(dateStr)}
                    className="bg-white hover:bg-red-700 text-black font-bold py-0 px-2 rounded"
                  >-
                  </button>
                  <div className="font-bold ml-2">{moment(dateStr).format("dddd, MMMM D, YYYY")}</div>
                </div>
                {schedule[dateStr] && schedule[dateStr].length > 0 && schedule[dateStr].map((timeRange, index) => (
                  <div key={index} className="ml-8 flex items-center">
                    <button
                      onClick={() => handleRemoveTimeClick(dateStr, index)}
                      className="bg-white hover:bg-red-700 text-black font-bold mr-4 py-0 px-2 rounded"
                    >
                      -
                    </button>
                    <div>
                      {timeRange.from} - {timeRange.to}
                    </div>
                  </div>
                ))}
              </div>
            ))}
        </div>

      </div>
    </div>
  );
      }
// };

export default Scheduling;
