import './App.css';
import { useState } from 'react';
import API_Request from './API_Request';
import axios from 'axios';

function App(): JSX.Element {

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [file, setFiles] = useState();
  const [dogs, setDogs] = useState();


  async function fileupload(e:any){
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', file);

    const response = await axios.post(`${import.meta.env.VITE_BACKEND_ENDPOINT}/api/fileUpload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      withCredentials: true
    })
    console.log(response.data);


  }

  async function get(){
    const data = await API_Request.GET(`${import.meta.env.VITE_BACKEND_ENDPOINT}/api`);
    if(!data.success){
      setErrorMessage(data.description);
    }
    console.log(data);
    setDogs(data.data);
    
  }
  async function login(){
    const data = await API_Request.POST(`${import.meta.env.VITE_BACKEND_ENDPOINT}/account/login`,
        {
          username: "testing123",
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
          username: "testing123",
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
      <form onSubmit={fileupload}>
        <input type='file' onChange={(e) => {
        setFiles(e.target.files[0]);
        }}/>
        <button type='submit'>
          submit
        </button>
        

      </form>
      {dogs?.map((each, index) => {
        return (
          <div key={index}>
            <p>
              {each.name}
            </p>
            <img src={each.imagePath} onClick={async () => {
              const response = await axios.patch(`${import.meta.env.VITE_BACKEND_ENDPOINT}/api/image/${each.name}`, {},{withCredentials:true});
              console.log(response.data);
            }}/>
            {each.sub_breed.length > 0 ? 
            <div>
              {each.sub_breed.map((sub, subindex) => {
                return(
          <div key={subindex}>
            <p>
              {each.name}
            </p>
            <img src={each.imagePath} onClick={async () => {
              const response = await axios.patch(`${import.meta.env.VITE_BACKEND_ENDPOINT}/api/image/${each.name}`, {},{withCredentials:true});
              console.log(response.data);
            }}/>
            </div>
                  
                )
              })}
            </div>: <p>No sub breed</p>
            }
          </div>
        )
      })}

    </>
  )
}

export default App
