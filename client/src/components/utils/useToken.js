import {useState} from 'react';

export default function useToken(){

      // easier to read when top-level functions are standard 
    //and internal functions are arrow functions
    // const getToken = () => {
    //     const tokenString = localStorage.getItem('token');
    //     const userToken = tokenString ? JSON.parse(tokenString) : null;
        // ?. (optional chaining operator) when accessing the token property
  //becoz when you first acess the application , the value of sessionStorage.getItem('token') will be undefined. If you try to access a property, you will generate an error.
    //     return userToken?.token
    // };

    const getToken = () => {
        const tokenString = localStorage.getItem('token');
        try {
          const userToken = JSON.parse(tokenString);
          return userToken.token;
        } catch (error) {
          return null;
        }
    }


    const [token,setToken] = useState(getToken());

    const saveToken = userToken => {
        localStorage.setItem('token',JSON.stringify(userToken));
        setToken(userToken.token);
    };

    //logout
    const clearToken = () => {
        localStorage.removeItem('token');
        setToken(null);
    };


    // Finally, return an object that contains the token and saveToken set to the setToken property name. This will give the component the same interface. 
    //You can also return the values as an array, but an 
    // object will give users a chance to destructure only the values they want if you reuse this in another component.

    return {
        setToken:saveToken,
        clearToken:clearToken,
        token
    }
}



