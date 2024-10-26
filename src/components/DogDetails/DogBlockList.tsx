import API_Request from "../../API_Request";
import DogBlock from "./DogBlock";
import { TDog } from "../../DogType";
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

    async function fetchAndUpdateImage(dogName: string) {
        setFetching(true);

        const newImagePath = await fetchRandomImage(dogName);
        const data = updateImagePath(dogs, newImagePath, dogName);
        updateDogsState(data.data)
        const { success, description, status } = await API_Request.PATCH(`${import.meta.env.VITE_BACKEND_ENDPOINT}/api/image/${dogName}`, { imagePath: newImagePath });

        setFetching(false);

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