// axios

import axios from 'axios';
import Cookies from 'js-cookie';

import {
   signupUrl,
   loginUrl,
   userUrl,
   postUrl,
   allPosts,
   commentUrl,
   likeUrl, 
   reviewPosts,
   userAllPostsUrl,
   postDeleteUrl,
   postDoneUrl,
   scheduleUrl,
   bookingUrl,
 } from '../url/url';

 
 const api = axios.create({
   baseURL: 'https://mini-pxft.onrender.com/', // Replace with your backend server URL
  //  headers: {
  //    'Content-Type': 'application/json',
  //    'Accept': '*/*'
  //   },
  //   withCredentials: true,
    // crossDomain: true
  });
  
// api.defaults.withCredentials = true;

// api.interceptors.response.use((response) => {
//   // Check if there's a 'Set-Cookie' header in the response
//   console.log(response.headers);
//   const setCookieHeader = response.headers['Set-Cookie'];
//   if (setCookieHeader) {
//     // Extract the cookie name and value
//     const [cookieName, cookieValue] = setCookieHeader.split('=');
//     // Set the cookie using js-cookie
//     Cookies.set(cookieName, cookieValue);
//   }

//   return response;
// });

export const signup =async (userData)=>{
  
  console.log("here before signup",userData);
  try{
  const response =await api.post(signupUrl,userData)
  console.log("response",response)
  const token = response.data.token;
  Cookies.set('access_token', token, { expires: 7, path: '/' });
  return response.data;
} catch (error) {
  throw new Error(error.response.data.message);
}
} 


export const login =async (userData)=>{
  
  console.log("here before login",userData);
  try{
    const response = await api.post(loginUrl,userData);
    console.log("response",response.data)
    console.log("response headers",response.headers)
    // Check if there's a 'Set-Cookie' header in the response
    // const setCookieHeader = response.headers.get('Set-Cookie');
    // if (setCookieHeader) {
    //   // Extract the cookie name and value
    //   const [cookieName, cookieValue] = setCookieHeader.split('=');
    //   // Set the cookie using js-cookie
    //   Cookies.set(cookieName, cookieValue);
    // }
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export const getUser = async (userData)=>{
  console.log("user",userData);
  try{
    const response = await api.get(`${userUrl}/${userData}`);
    return response.data;
  }
  catch (error) {
    throw new Error(error.response.data.message);
    
  }
  
}

export const updateUser = async (user)=>{
  console.log("user",user);
  try{
    return await api.put(`${userUrl}/${user._id}`,user);
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export const deleteUser = async({id})=>{
  try{
    return await api.delete(`${userUrl}/${id}`);
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export const addPost =async (postData)=>{
  
  // console.log("here before signup",postData);
  try{
  const response =await api.post(postUrl,postData)
  console.log("response",response)
  return response.data;
} catch (error) {
  throw new Error(error.response.data.message);
}
} 
export const reviewAllPosts = async ()=>{
  console.log("allpost",reviewPosts);
  try{
    const response = await api.get(reviewPosts);
     console.log("reviewPosts",response.data);
    return response.data;
  }
  catch (error) {
    throw new Error(error.response.data.message);
    
  }
  
}
export const getAllPost = async ()=>{
  // console.log("allpost",allPostsData);
  try{
    const response = await api.get(allPosts);
     console.log("allpost",response.data);
    return response.data;
  }
  catch (error) {
    throw new Error(error.response.data.message);
    
  }
  
}
export const getAllUserPost = async (id)=>{
  // console.log("allpost id",id);
  try{
    const response = await api.get(`${userAllPostsUrl}${id}`);
     console.log("allUserPost",response.data);
    return response.data;
  }
  catch (error) {
    throw new Error(error.response.data.message);
    
  }
  
}
export const addComment =async (comment)=>{
  
  // console.log("here before comment",comment);
  try{
  const response =await api.post(`${postUrl}${comment.postId}/comment`,comment)
  console.log("response",response)
  return response.data.comment;
} catch (error) {
  throw new Error(error.response.data.message);
}
} 
export const addLike =async (likeData)=>{
  
   console.log("here before like",likeData);
  try{
  const response =await api.post(`${postUrl}/${likeData.postId}/like`,likeData)
  console.log("response",response)
  return response.data;
} catch (error) {
  throw new Error(error.response.data.message);
}
}

export const deletePost = async(post)=>{
  // console.log("here before delete post",post);
  try{
    const response = await api.delete(`${postDeleteUrl}/`,{
      params: {
        postId: post.id,
        currentId: post.userId,
      }
    });
    console.log("response",response.data)
  return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export const donePost = async(post)=>{
  // console.log("here before done post",post);
  try{
    const response = await api.put(`${postDoneUrl}/`,{
      params: {
        postId: post.id,
        currentId: post.userId,
      }
    });
    console.log("response",response.data)
  return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export const addSchedule =async (scheduleData)=>{
  
  //  console.log("here before schedule",scheduleData);
  try{
  const response =await api.post(`${scheduleUrl}`,scheduleData)
  console.log("response",response)
  return response.data;
} catch (error) {
  throw new Error(error.response.data.message);
}
}

export const getSchedule =async ()=>{
  
  // console.log("here before schedule");
 try{
 const response =await api.get(`${scheduleUrl}`)
 console.log("response",response.data)
 return response.data;
} catch (error) {
 throw new Error(error.response.data.message);
}
}



export const getCounsilorSchedule=async (userId)=>{
  
  // console.log("here before schedule",userId);
 try{
 const response =await api.get(`${scheduleUrl}${userId}`)
 console.log("response",response.data)
 return response.data;
} catch (error) {
 throw new Error(error.response.data.message);
}
}


export const addBooking =async (bookingData)=>{
  
  console.log("here before booking",bookingData);
 try{
 const response =await api.post(`${bookingUrl}`,bookingData)
 console.log("response",response)
 return response.data;
} catch (error) {
 throw new Error(error.response.data.message);
}
}

export const getCounsilorBooking=async (userId)=>{
  
  // console.log("here before schedule",userId);
 try{
 const response =await api.get(`${bookingUrl}${userId}`)
 console.log("response",response.data)
 return response.data;
} catch (error) {
 throw new Error(error.response.data.message);
}
}


export default api;