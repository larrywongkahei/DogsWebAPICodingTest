import axios from "axios";
import API_Request from "../API_Request";
import DogBlock from "./DogBlock";

type Dog = {
    name: string;
    imagePath: string;
    sub_breed: any;
}

type Props = {
    dogs: Dog[];
    updateDogsState: (dogs:Dog[]) => void;
}

export default function DogBlockList({dogs, updateDogsState}:Props){
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

            updateDogsState(userDogs);

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

        updateDogsState(userDogs);

        await API_Request.PATCH<{imagePath: string}>(`${import.meta.env.VITE_BACKEND_ENDPOINT}/api/image/${dogName}`, {imagePath:url} )
    }catch(error){
        console.log('error main breed')
    }
    return;

  }

    return (
        dogs?.map((each:Dog, index:number) => {
          return (
            <DogBlock dog={each} fetchAndUpdateImage={fetchAndUpdateImage} key={index}/>
          )
        })

    )
}