import { useState } from 'react';
import API_Request from '../API_Request';
import axios from 'axios';
import DogsUI from '../components/DogDetails/DogsUI';
import CreateModal from '../components/CreateModal';

type Dog = {
    name: string;
    imagePath: string;
    sub_breed: any;
}
export default function Home() {

    const [file, setFiles] = useState();
    const [showModal, setShowModal] = useState(false);


    async function fileupload(e: any) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', file);

        const response = await axios.post(`${import.meta.env.VITE_BACKEND_ENDPOINT}/api/fileUpload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            withCredentials: true
        })
    }


    async function login() {
        const data = await API_Request.POST(`${import.meta.env.VITE_BACKEND_ENDPOINT}/account/login`,
            {
                username: "testing123",
                password: "testingpassword"
            },
        )
        if (!data.success) {
        }
    }
    async function register() {
        const data = await API_Request.POST(`${import.meta.env.VITE_BACKEND_ENDPOINT}/account/register`,
            {
                username: "testing123",
                password: "testingpassword"
            },
        )
        if (!data.success) {
        }
    }

    return (
        <div className='h-screen'>
            <button onClick={login}>
                Click me to login
            </button>
            <button onClick={register}>
                Click me to register
            </button>

            {/* <form onSubmit={fileupload}>
          <input type='file' onChange={(e) => {
          setFiles(e.target.files[0]);
          }}/>
          <button type='submit'>
            submit
          </button>
        </form> */}

            <div className='w-full'>
                <DogsUI />
            </div>
        </div>

    )
}