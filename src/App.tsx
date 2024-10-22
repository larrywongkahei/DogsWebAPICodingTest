import './App.css';
import axios from 'axios';
import { useState } from 'react';

function App(): JSX.Element {
  const [errorMessage, setErrorMessage] = useState<string>("");
  async function post(){
    try{
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_ENDPOINT}/account/login`,
        {
          username: "testing123",
          password: "testingpassword"
        }
      );
      setErrorMessage(response.data.description);
      console.log(response.data)
    }catch(error){
      setErrorMessage(error.response.data.description);
    }
    
  }

  return (
    <>
      <p>
        {errorMessage}
      </p>
      <button onClick={post}>
        Click me
      </button>

    </>
  )
}

export default App
