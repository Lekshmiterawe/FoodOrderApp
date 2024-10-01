import { useCallback, useEffect, useState } from "react";

// Function to send an HTTP request
async function sendHttpRequest(url, config) {
    const response = await fetch(url, config);// here config the objec/body/content to be appended if its a POST request
    const resData = await response.json();
    if (!response.ok){
        throw new Error(
            resData.message || 'Something went wrong, failed to send request.'
        );
    }
    return resData;
}

// Custom React hook for handling HTTP requests
export default function useHttp(url, config, initialData){
    const [data, setData] = useState(initialData);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    
     // Function to reset the data back to initial data
    function clearData() {
        setData(initialData);
    }

// Memoized sendRequest function using useCallback to ensure it's not re-created unnecessarily on re-renders
  const sendRequest = useCallback(
    async function sendRequest(data){
    setIsLoading(true);//requests starts
    try{
      // Send the HTTP request 
       const resData = await sendHttpRequest(url, {...config, body: data});
       setData(resData);
     } catch(error){
       setError(error.message || 'Something went wrong');
     }
     setIsLoading(false);//request is complete
   }, [url, config]); //function renders only when url/config changes

   //useeffect will work first,even if its not called
   // Automatically sends a request when the component mounts if the config method is GET or not provided
   useEffect(() => {
   if(config && (config.method === 'GET' || !config.method) || !config) {
    sendRequest();
    }
   }, [sendRequest, config]);

   return{
    data,
    isLoading,
    error,
    sendRequest,
    clearData
   };
}