import React,{useEffect} from 'react';
import {useState} from 'react'
import { Link } from 'react-router-dom';
import './style/home.css'; // Add corresponding CSS file
import Spinner from '../component/Spinner';
// import { BeatLoader } from 'react-spinners';
import {Slider} from "../component/sliderfolder/Slider"
import {slides} from "../component/sliderfolder/slider.json"

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulating a delay of 2 seconds before setting isLoading to false
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="landing-page">
      {isLoading ? (
        <Spinner />
      ) : (
        <>
      <div className="flex items-center aka justify-center h-screen bg-gray-100">
      <div className="slidermain"><Slider data={slides}/>
      </div>
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-gray-800">MindBoosters</h1>
          <p className="text-lg text-gray-600">Empowering Minds, Inspiring Growth</p>
        </div>
      </div>
      <div className="section-wrapper">
        <section className="post-section bg-gray-200 py-8">
          <div className="container mx-auto flex flex-col md:flex-row items-center">
            <div className="md:w-1/2">
              <img src="post-image.png" alt="Post Image" className="max-w-full" />
            </div>
            <div className="md:w-1/2 px-4">
              <h2 className="text-2xl font-bold mb-4">Posts</h2>
              <p>Welcome to MindBoosters! Express yourself freely and connect with a community that understands you. Share your thoughts and feelings anonymously or with your name. Engage with others through likes and comments, fostering a supportive environment. Join MindBoosters, where your voice matters and personal growth thrives. Start sharing, supporting, and growing in just a few clicks. Boost your mind and be a part of our inclusive community. Together, we can make a difference.</p>
              <Link to="/posts" className="bg-black text-white px-4 py-2 mt-4">Read More</Link>
            </div>
          </div>
        </section>
      </div>
      <div className="section-wrapper">
        <section className="counseling-section bg-gray-300 py-8">
          <div className="container mx-auto flex flex-col md:flex-row items-center">
            <div className="md:w-1/2">
              <img src="counseling-image.png" alt="Counseling Image" className="max-w-full" />
            </div>
            <div className="md:w-1/2 px-4">
              <h2 className="text-2xl font-bold mb-4">Counseling</h2>
              <p>Seeking support? MindBoosters offers counseling services exclusively for students. With our secure login system, you can easily book counseling sessions tailored to your needs. Our experienced counselors provide a compassionate and confidential space to address academic stress, relationships, and mental health concerns. We believe in empowering students on their journey to personal well-being. Take a step towards a brighter future and access professional guidance. Register, login, and embark on a transformative counseling experience. Your mental health matters, and we're here to support you every step of the way.</p>
              <Link to="/counseling" className="bg-black text-white px-4 py-2 mt-4">Book Now</Link>
            </div>
          </div>
        </section>
      </div>
      <footer className="bg-black text-white py-4">
        <div className="flex justify-center items-center">
          {/* Add your footer icons here */}
        </div>
      </footer>
      </>
      )}
    </div>
  );
};

export default Home;



















// import React from 'react';
// import './style/home.css'; // Add corresponding CSS file

// const Home = () => {
//   return (
//     <div className="landing-page">
//     <div className="flex items-center justify-center h-screen bg-gray-100">
//       <div className="text-center">
//         <h1 className="text-4xl font-bold mb-4 text-gray-800">MindBoosters</h1>
//         <p className="text-lg text-gray-600">Empowering Minds, Inspiring Growth</p>
//       </div>
//     </div>

//       <section className="post-section bg-gray-200 py-8">
//         <div className="container mx-auto flex flex-col md:flex-row items-center">
//           <div className="md:w-1/2">
//             <img src="post-image.png" alt="Post Image" className="max-w-full" />
//           </div>
//           <div className="md:w-1/2 px-4">
//             <h2 className="text-2xl font-bold mb-4">Posts</h2>
//             <p>Welcome to MindBoosters! Express yourself freely and connect with a community that understands you. Share your thoughts and feelings anonymously or with your name. Engage with others through likes and comments, fostering a supportive environment. Join MindBoosters, where your voice matters and personal growth thrives. Start sharing, supporting, and growing in just a few clicks. Boost your mind and be a part of our inclusive community. Together, we can make a difference.</p>
//             <button className="bg-black text-white px-4 py-2 mt-4">Read More</button>
//           </div>
//         </div>
//       </section>

//       <section className="counseling-section bg-gray-300 py-8">
//         <div className="container mx-auto flex flex-col md:flex-row items-center">
//           <div className="md:w-1/2">
//             <img src="counseling-image.png" alt="Counseling Image" className="max-w-full" />
//           </div>
//           <div className="md:w-1/2 px-4">
//             <h2 className="text-2xl font-bold mb-4">Counseling</h2>
//             <p>Seeking support? MindBoosters offers counseling services exclusively for students. With our secure login system, you can easily book counseling sessions tailored to your needs. Our experienced counselors provide a compassionate and confidential space to address academic stress, relationships, and mental health concerns. We believe in empowering students on their journey to personal well-being. Take a step towards a brighter future and access professional guidance. Register, login, and embark on a transformative counseling experience. Your mental health matters, and we're here to support you every step of the way.</p>
//             <button className="bg-black text-white px-4 py-2 mt-4">Book Now</button>
//           </div>
//         </div>
//       </section>

//       <footer className="bg-black text-white py-4">
//         <div className="flex justify-center items-center">
//           {/* Add your footer icons here */}
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default  Home;
