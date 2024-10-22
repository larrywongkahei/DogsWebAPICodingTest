import './App.css';
import { useState } from 'react';
import API_Request from './API_Request';

function App(): JSX.Element {

  const [errorMessage, setErrorMessage] = useState<string>("");
  async function get(){
    const data = await API_Request.GET(`${import.meta.env.VITE_BACKEND_ENDPOINT}`);
    if(!data.success){
      setErrorMessage(data.description);
    }
    console.log(data)
    
  }
  async function login(){
    const data = await API_Request.POST(`${import.meta.env.VITE_BACKEND_ENDPOINT}/account/login`,
        {
          username: "testing1232",
          password: "testingpassword"
        },
    )
    if(!data.success){
      setErrorMessage(data.description);
    }
    console.log(data);
  }
  async function register(){
    const data = await API_Request.POST(`${import.meta.env.VITE_BACKEND_ENDPOINT}/account/register`,
        {
          username: "testing1232",
          password: "testingpassword"
        },
    )
    if(!data.success){
      setErrorMessage(data.description);
    }
    console.log(data);
  }

  return (
    <>
      <p>
        {errorMessage}
      </p>
      <button onClick={login}>
        Click me to login
      </button>
      <button onClick={register}>
        Click me to register
      </button>
      <button onClick={get}>
        Click me to get
      </button>

    </>
  )
}

export default App
