import axios from "axios";
import API_Request from "../../API_Request";
import DogBlock from "./DogBlock";
import { TDog, TSubBreed } from "../../DogType";
import { useState } from "react";
import { toast } from "react-toastify";
import useFetchImage from "../Hooks/useFetchImage";
import { updateImagePath } from "../helper";
import { useNavigate } from "react-router-dom";




type Props = {
    dogs: TDog[];
    pageIndex: number;
    updateDogsState: (dogs: TDog[]) => void;
}

export default function DogBlockList({ dogs, updateDogsState, pageIndex }: Props): JSX.Element {
    const [fetching, setFetching] = useState<boolean>(false);
    const { fetchRandomImage } = useFetchImage();
    const navigator = useNavigate();

    async function fetchAndUpdateImage(dogName: string){
        const newImagePath = await fetchRandomImage(dogName);
        const data = updateImagePath(dogs, newImagePath, dogName);
        updateDogsState(data.data)
        const { success, description, status } = await API_Request.PATCH(`${import.meta.env.VITE_BACKEND_ENDPOINT}/api/image/${dogName}`, { imagePath:newImagePath});

        if (status === 401) {
            return toast.error("Token Expired, Please login again. redirecting...", {
                autoClose: 1000,
                onClose: () => { navigator("/Login", { replace: true }) },
            })
        }

        if (!success) {
            return toast.error(description);
        }

        return toast.success("Successfully updated!", {
            autoClose: 1000,
        }
        )
    }

    // async function fetchAndUpdateImage(dogName: string) {
    //     setFetching(true);
    //     const formattedDogName = dogName.split("-");
    //     if (formattedDogName.length > 1) {
    //         const fName = formattedDogName[0];
    //         const bName = formattedDogName[1];

    //         try {
    //             const { data } = await axios.get(`https://dog.ceo/api/breed/${fName}/${bName}/images/random`)
    //             const { message: url } = data;

    //             const userDogs = [...dogs];
    //             const indexOfDog = userDogs.findIndex((dog: TDog) => dog.name === fName);

    //             const mainBreed = userDogs[indexOfDog];

    //             const sub_breedIndex: number = mainBreed.sub_breed.findIndex((dog: TSubBreed) => dog.name === bName);
    //             const dogToUpdate = mainBreed.sub_breed[sub_breedIndex];

    //             const shadow = { ...dogToUpdate, imagePath: url }
    //             mainBreed.sub_breed[sub_breedIndex] = shadow;

    //             updateDogsState(userDogs);

    //             await API_Request.PATCH<{ imagePath: string }>(`${import.meta.env.VITE_BACKEND_ENDPOINT}/api/image/${dogName}`, { imagePath: url })
    //             toast.success("Successfully changed image")

    //         } catch (error) {
    //             toast.error("Failed fetching random image, Please report this problem.")
    //         }

    //     }

    //     try {
    //         const { data } = await axios.get(`https://dog.ceo/api/breed/${dogName}/images/random`)
    //         const { message: url } = data;

    //         const userDogs = [...dogs];
    //         const indexOfDog = userDogs.findIndex((dog: TDog) => dog.name === dogName);

    //         const dogToUpdate = userDogs[indexOfDog];

    //         const shadow = { ...dogToUpdate, imagePath: url }
    //         userDogs[indexOfDog] = shadow;

    //         updateDogsState(userDogs);

    //         await API_Request.PATCH<{ imagePath: string }>(`${import.meta.env.VITE_BACKEND_ENDPOINT}/api/image/${dogName}`, { imagePath: url })
    //         toast.success("Successfully changed image")
    //     } catch (error) {
    //         toast.error("Failed fetching random image, Please report this problem.")
    //     }
    //     return setFetching(false);

    // }
    return (
        <>
            <div className="grid grid-cols-4 gap-3">
                {
                    dogs?.slice((pageIndex - 1) * 16, pageIndex * 16).map((each: TDog, index: number) => {
                        return (
                            <DogBlock dog={each} fetchAndUpdateImage={fetchAndUpdateImage} key={index} fetching={fetching} />
                        )
                    })
                }

            </div>
        </>

    )
}