import { useState } from "react";
import API_Request from "../../API_Request";
import { TDog } from "../../DogType";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function useDogAPI() {

    const [dogs, setDogs] = useState<TDog[]>([]);
    const [error, setError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const navigator = useNavigate();

    // async function get() {
    //     let dataToReturn = {
    //     }
    //     const data = await API_Request.GET(`${import.meta.env.VITE_BACKEND_ENDPOINT}/api`);
    //     if (!data.success) {
    //         toast.error(data.description);
    //         toast.error("Redirecting to login page...", {
    //             onClose: () => navigator("/Login", {replace: true})
    //         });
    //     } else {
    //         setDogs(data.data);
    //         setFilteredDogs(data.data);
    //     }
    // }

    async function Update(dog: TDog) {

        const { success, data, description, status } = await API_Request.PATCH(`${import.meta.env.VITE_BACKEND_ENDPOINT}/api/update`, dog);

        if (status === 401) {
            toast.error("Token Expired, Please login again. redirecting...", {
                autoClose: 1000,
                onClose: () => { navigator("/Login", { replace: true }) },
            })
        }

        if (!success) {
            // setError(true);
            // setErrorMessage(description);        
            return toast.error(description);
        }

        setDogs(data);
        return toast.success("Successfully updated!", {
            autoClose: 1000,
            onClose: () => {
                navigator("/", { replace: true })
            }
        }
        )
        // return {
        //     success: success
        // }


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
            toast.error("Token Expired, Please login again. redirecting...", {
            autoClose: 1000,
                onClose: () => { navigator("/Login", { replace: true }) }
            })
        }

        if (!success) {
            // setError(true);
            // setErrorMessage(description);        
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

    return { dogs, error, errorMessage, Delete, Update }
}

