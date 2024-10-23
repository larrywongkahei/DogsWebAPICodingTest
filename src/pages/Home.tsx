import { useState } from 'react';
import API_Request from '../API_Request';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

type Dog = {
    name: string;
    imagePath: string;
    sub_breed: any;
}
export default function Home(){

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [file, setFiles] = useState();
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [sortedDogs, setSortedDogs] = useState<{string:Dog[]}>({});

  function sortedDogsNode(){
    return(
        Object.keys(sortedDogs).map((initial, index) => (
            <div key={index}>
                <p>{initial}</p>
                <Swiper>
                    {sortedDogs[initial].map((each) => {
                        return(
                            <SwiperSlide>
                                {each.name}
                            </SwiperSlide>

                        )

                    })}
                </Swiper>
            </div>
        ))
    )
    }


  async function fetchAndUpdateImage(dogName:string){
    const formattedDogName = dogName.split("-");
    if(formattedDogName.length > 1){
        const fName = formattedDogName[0];
        const bName = formattedDogName[1];

        try{
            const {data} = await axios.get(`https://dog.ceo/api/breed/${fName}/${bName}/images/random`)
            const { message:url } = data;

            const userDogs = [...dogs];
            const indexOfDog = userDogs.findIndex((dog:Dog) => dog.name === fName);

            const mainBreed = userDogs[indexOfDog];

            const sub_breedIndex = mainBreed.sub_breed.findIndex((dog:Dog) => dog.name === bName);
            const dogToUpdate = mainBreed.sub_breed[sub_breedIndex];

            const shadow = {...dogToUpdate, imagePath: url}
            mainBreed.sub_breed[sub_breedIndex] = shadow;

            setDogs(userDogs);

            await API_Request.PATCH<{imagePath: string}>(`${import.meta.env.VITE_BACKEND_ENDPOINT}/api/image/${dogName}`, {imagePath:url} )

        }catch(error){
            console.log('error show in subbreed')
        }
        return;
    }

    try{
        const {data} = await axios.get(`https://dog.ceo/api/breed/${dogName}/images/random`)
        const { message:url } = data;
        console.log(url);


        const userDogs = [...dogs];
        const indexOfDog = userDogs.findIndex((dog) => dog.name === dogName);

        const dogToUpdate = userDogs[indexOfDog];

        const shadow = {...dogToUpdate, imagePath: url}
        userDogs[indexOfDog] = shadow;

        setDogs(userDogs);

        await API_Request.PATCH<{imagePath: string}>(`${import.meta.env.VITE_BACKEND_ENDPOINT}/api/image/${dogName}`, {imagePath:url} )
    }catch(error){
        console.log('error main breed')
    }
    return;

  }


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
  }

  async function get(){
    const data = await API_Request.GET(`${import.meta.env.VITE_BACKEND_ENDPOINT}/api`);
    if(!data.success){
      setErrorMessage(data.description);
    }
    setDogs(data.data);
    const resultDict:any = {}
    data.data?.forEach((each:Dog) => {
        const initial:string = each.name.charAt(0).toUpperCase();

        if(!resultDict[initial]){
            resultDict[initial] = [];
        }

        resultDict[initial].push(each)
    })
    setSortedDogs(resultDict);
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
        {Object.keys(sortedDogs).length > 0 ? Object.keys(sortedDogs).map((initial, index) => (
            <div key={index} className='w-1/2 mx-auto'>
                <p>{initial}</p>
                <Swiper
                spaceBetween={10}
                slidesPerView={3}
                
                >
                    {sortedDogs[initial].map((each) => {
                        return(
                            <SwiperSlide className='flex flex-col justify-center items-center h-full w-full'>
                                <img src={each.imagePath} className='h-1/2 w-1/2'/>
                                <p>
                                    {each.name}
                                </p>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            </div>
        )) : <></>}
        
        {dogs?.map((each:Dog, index:number) => {
          return (
            <div key={index}>
              <p>
                {each.name}
              </p>
              <img src={each.imagePath} className='h-1/5 w-1/5' onClick={() => fetchAndUpdateImage(each.name)}/>
              {each.sub_breed.length > 0 ? 
              <div>
                {each.sub_breed.map((sub:Dog, subindex:number) => {
                  return(
            <div key={subindex}>
              <p>
                {sub.name}-{each.name}
              </p>
              <img src={sub.imagePath} className='h-1/5 w-1/5' onClick={() => fetchAndUpdateImage(each.name + "-" + sub.name)}/>
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