import axios from "axios";
import API_Request from "../../API_Request";
import DogBlock from "./DogBlock";
import { TDog, TSubBreed } from "../../DogType";
import { useState } from "react";



type Props = {
    dogs: TDog[];
    pageIndex: number;
    updateDogsState: (dogs: TDog[]) => void;
}

export default function DogBlockList({ dogs, updateDogsState, pageIndex }: Props):JSX.Element {
    const [fetching, setFetching] = useState<boolean>(false);

    async function fetchAndUpdateImage(dogName: string) {
        setFetching(true);
        const formattedDogName = dogName.split("-");
        if (formattedDogName.length > 1) {
            const fName = formattedDogName[0];
            const bName = formattedDogName[1];

            try {
                const { data } = await axios.get(`https://dog.ceo/api/breed/${fName}/${bName}/images/random`)
                const { message: url } = data;

                const userDogs = [...dogs];
                const indexOfDog = userDogs.findIndex((dog: TDog) => dog.name === fName);

                const mainBreed = userDogs[indexOfDog];

                const sub_breedIndex: number = mainBreed.sub_breed.findIndex((dog: TSubBreed) => dog.name === bName);
                const dogToUpdate = mainBreed.sub_breed[sub_breedIndex];

                const shadow = { ...dogToUpdate, imagePath: url }
                mainBreed.sub_breed[sub_breedIndex] = shadow;

                updateDogsState(userDogs);

                await API_Request.PATCH<{ imagePath: string }>(`${import.meta.env.VITE_BACKEND_ENDPOINT}/api/image/${dogName}`, { imagePath: url })

            } catch (error) {
                console.log('error show in subbreed')
            }
            
        }

        try {
            const { data } = await axios.get(`https://dog.ceo/api/breed/${dogName}/images/random`)
            const { message: url } = data;

            const userDogs = [...dogs];
            const indexOfDog = userDogs.findIndex((dog:TDog) => dog.name === dogName);

            const dogToUpdate = userDogs[indexOfDog];

            const shadow = { ...dogToUpdate, imagePath: url }
            userDogs[indexOfDog] = shadow;

            updateDogsState(userDogs);

            await API_Request.PATCH<{ imagePath: string }>(`${import.meta.env.VITE_BACKEND_ENDPOINT}/api/image/${dogName}`, { imagePath: url })
        } catch (error) {
            console.log('error main breed')
        }
        return setFetching(false);

    }

    return (
        <div className="grid grid-cols-4 gap-3">
            {
                dogs?.slice((pageIndex - 1) * 16, pageIndex * 16).map((each: TDog, index: number) => {
                    return (
                        <DogBlock dog={each} fetchAndUpdateImage={fetchAndUpdateImage} key={index} fetching={fetching}/>
                    )
                })
            }

        </div>

    )
}