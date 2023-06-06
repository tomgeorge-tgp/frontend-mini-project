import {useRef, useCallback} from 'react'


function useLocalStorage(key, data=null)
{ 
  const itemRef = useRef(data)
  if(data){
    localStorage.setItem(key, JSON.stringify(data));
    itemRef.current = data;
  } else {
    const item = JSON.parse(localStorage.getItem(key));
    if(item)
      itemRef.current = item;
  }
  return [itemRef, useCallback((data) => {localStorage.setItem(key, JSON.stringify(data)); itemRef.current = data}, [key]), useCallback(()=>{localStorage.removeItem(key); itemRef.current = null}, [key])];
}

export default useLocalStorage;