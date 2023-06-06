import { useState } from 'react';
import {useQuery,useMutation,useQueryClient} from "react-query";
import Close from "../assets/close.svg";
import { addPost  } from '../api/api';
import useLocalStorageRef from "../hooks/LocalStorage"


function AddPostPopup({ isOpen, onClose, onAdd }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const queryClient=useQueryClient();
  const [postData,setPostData] = useState('');
  const [userData, setUserData, removeUserData] = useLocalStorageRef("user")
  // Use useMutation to create a signUpMutation object
  const postAddMutation = useMutation(addPost, {
    // Handle the success case
    onSuccess: (postData) => {
      console.log("here");
      // TODO: save the user in the state or local storage
      console.log(postData);
      queryClient.invalidateQueries("posts");
      // queryClient.setQueryData("post", postData);
      console.log("Add post successful!");
      
      setPostData(postData);
    },
    // Handle the error case
    onError: (error) => {
      // Show an error message or toast
      console.log("Add post failed. Please try again.");
      console.log(error);
    },
  });

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };
  const handleAnonymousChange = (e) => {
    setIsAnonymous(e.target.value === 'anonymous');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    let postInfo = {
      userId:userData.current._id,
      title: title,
      anonymous:isAnonymous,
      content,
    };
    
    postAddMutation.mutate(postInfo);  
    onAdd(postInfo);
    setTitle('');
    setContent('');
    setIsAnonymous(false);

  };

  return (
    <div className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 ${isOpen ? '' : 'hidden'}`}>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg w-96 h-96">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-800">Add New Post</h2>
          <button className="text-gray-600 hover:text-gray-800" onClick={onClose}>
            <img src={Close} alt="Close" /> 
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-4">
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 font-medium mb-2">Title</label>
            <input type="text" id="title" value={title} onChange={handleTitleChange} className="border border-gray-400 rounded px-4 py-2 w-full" />
          </div>
          <div className="mb-4">
            <label htmlFor="content" className="block text-gray-700 font-medium mb-2">Content</label>
            <textarea id="content" value={content} onChange={handleContentChange} className="border border-gray-400 rounded px-4 py-2 w-full h-24 resize-none"></textarea>
          </div>
          <div className="flex items-center">
              <input type="radio" id="nonAnonymous" name="postType" value="nonAnonymous" checked={!isAnonymous} onChange={handleAnonymousChange} className="mr-2" />
              <label htmlFor="nonAnonymous" className="mr-4">Non-anonymous</label>
              <input type="radio" id="anonymous" name="postType" value="anonymous" checked={isAnonymous} onChange={handleAnonymousChange} className="mr-2" />
              <label htmlFor="anonymous">Anonymous</label>
            </div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded absolute right-4 bottom-4">
            Add
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddPostPopup;
