import { useCallback, useEffect, useState } from "react";
// Function to send an HTTP request
async function sendHttpRequest(url, config) {
    const response = await fetch(url, config);// here config the objec/body/content to be appended if its a POST request
    const parsedResult = await response.json();

    if (!response.ok){
      throw new Error(
          resData.message || 'Something went wrong, failed to send request.'
      );
    }
    
      return parsedResult;
    
}

// Custom React hook for handling HTTP requests
export default function useHttp(url, config, initialData){
  const [ data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
    
     // Function to reset the data back to initial data
  function clearData() {
      setData(initialData);
  }

// Memoized sendRequest function using useCallback to ensure it's not re-created unnecessarily on re-renders
  const sendRequestCB = useCallback(
    //useCallback is used to render the component only when prop(data) changes
    async function sendRequest(data){
    setIsLoading(true);//requests starts
    try{
      // Send the HTTP request 
      //spread operator works as a join where data includes the customerdata and cartitems
       const resData = await sendHttpRequest(url, {...config, body: data}); //const requestConfig = { method: 'POST', headers: {'Content-Type': 'application/json' } body: data };
       setData(resData);
     } catch(error){
       setError(error.message || 'Something went wrong');
     }
     setIsLoading(false);//request is complete
   }, [url, config]); // here url/config not needed

   //useeffect will work first,even if its not called
   // Automatically sends a request when the component mounts if the config method is GET or not provided
   useEffect(() => {
  
    
   if(config && (config.method === 'GET' || !config.method) || !config) {
    sendRequestCB();
    }
   }, [sendRequestCB, config]);

   return{
    data,
    isLoading,
    error,
    sendRequestCB,
    clearData
   };
}