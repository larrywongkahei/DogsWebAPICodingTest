import { useState } from 'react';
import axios from 'axios';
import DogsUI from '../components/DogDetails/DogsUI';

export default function Home():JSX.Element {

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



    return (
        <div className='h-screen'>
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