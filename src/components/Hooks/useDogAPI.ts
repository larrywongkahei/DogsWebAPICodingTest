import { useEffect, useState } from "react";
import API_Request from "../../API_Request";
import { TDog } from "../../DogType";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function useDogAPI({ main_breed_name }: { main_breed_name: string }) {

    const [dogs, setDogs] = useState<TDog[]>([]);
    const [main_breed, setMain_breed] = useState<TDog>({} as TDog);
    const navigator = useNavigate();

    useEffect(() => {
        GetMainBreedByName(main_breed_name)

    }, [])

    async function handleUpdateImage(sub_breed_name: string, newImagePath: string) {
        try {

            const shadowSubBreeds = [...main_breed?.sub_breed!];
            const index: number | undefined = main_breed?.sub_breed!.findIndex((dog) => dog.name === sub_breed_name);
            if (index === -1) {
                return;
            }
            shadowSubBreeds[index!]['imagePath'] = newImagePath;
            const { status, success, description } = await API_Request.PATCH<{ imagePath: string }>(`${import.meta.env.VITE_BACKEND_ENDPOINT}/api/image/${main_breed_name}/${sub_breed_name}`, { imagePath: newImagePath })
            if (status === 401) {
                return toast.error("Token Expired, Please login again. redirecting...", {
                    autoClose: 1000,
                    onClose: () => { navigator("/Login", { replace: true }) },
                })
            }

            if (!success) {
                return toast.error(description);
            }

            await GetMainBreedByName(main_breed_name);

            return toast.success("Successfully updated!", {
                autoClose: 1000,
                onClose: () => {
                }
            }
            )

        } catch (error) {
            toast.error("Something is wrong, please try again later and report this problem.")
        }
    }

    async function GetMainBreedByName(main_breed_name: string) {
        const { success, description, status, data } = await API_Request.GET(`${import.meta.env.VITE_BACKEND_ENDPOINT}/api/main_breed/${main_breed_name}`);
        if (status === 401) {
            return toast.error("Token Expired, Please login again. redirecting...", {
                autoClose: 1000,
                onClose: () => { navigator("/Login", { replace: true }) },
            })
        }

        if (!success) {
            return toast.error(description);
        }
        console.log(data);

        setMain_breed(data);
    }

    async function Update(dog: TDog) {

        const { success, data, description, status } = await API_Request.PATCH(`${import.meta.env.VITE_BACKEND_ENDPOINT}/api/update`, dog);

        if (status === 401) {
            return toast.error("Token Expired, Please login again. redirecting...", {
                autoClose: 1000,
                onClose: () => { navigator("/Login", { replace: true }) },
            })
        }

        if (!success) {
            return toast.error(description);
        }

        setDogs(data);
        return toast.success("Successfully updated!", {
            autoClose: 1000,
        }
        )
    }

    async function Delete(mainBreed: string, subBreed: string = "") {
        let urlPath = "";

        if (subBreed.length < 1) {
            urlPath = `${mainBreed.toLowerCase()}`
        } else {
            urlPath = `${mainBreed.toLowerCase()}/${subBreed.toLowerCase()}`
        }

        const { success, data, description, status } = await API_Request.DELETE(`${import.meta.env.VITE_BACKEND_ENDPOINT}/api/delete/${urlPath}`);

        if (status === 401) {
            return toast.error("Token Expired, Please login again. redirecting...", {
                autoClose: 1000,
                onClose: () => { navigator("/Login", { replace: true }) }
            })
        }

        if (!success) {
            return toast.error(description);
        }

        setDogs(data);

        return toast.success("Successfully Deleted! Redirecting to home page.", {
            autoClose: 1000,
            onClose: () => {
                navigator("/", { replace: true })
            }
        });
    }

    return { dogs, Delete, Update, GetMainBreedByName, main_breed, setMain_breed, handleUpdateImage }
}

