import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { RxReload } from "react-icons/rx";

type Props = {
    cancel: () => void;
}

export default function CreateModal({ cancel }: Props) {
    const [mainBreed, setMainBreed] = useState<string>('');
    const [subBreed, setSubBreed] = useState<string>('');
    const [verified, setVerified] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [imagePath, setimagePath] = useState<string>('');
    const [fetching, setFetching] = useState<boolean>(false);

    async function handleVerify() {
        setFetching(true);
        let url = "";
        if (subBreed.length < 1) {
            url = `https://dog.ceo/api/breed/${mainBreed.toLowerCase()}/images/random`
        } else {
            url = `https://dog.ceo/api/breed/${mainBreed.toLowerCase()}/${subBreed.toLowerCase()}/images/random`
        }
        try {
            const { data } = await axios.get(url);
            const { message } = data;
            setimagePath(message);
            toast.success("Successfully verified!");
            setErrorMessage("");
            setVerified(true);
        } catch (error) {
            toast.error("Failed verification, Please check your input");
        }
        setFetching(false);
    }

    async function getRandomImage() {
        setFetching(true);
        await toast.promise(
            new Promise(async (resolve, reject) => {
                let url = "";
                if (subBreed.length < 1) {
                    url = `https://dog.ceo/api/breed/${mainBreed.toLowerCase()}/images/random`
                } else {
                    url = `https://dog.ceo/api/breed/${mainBreed.toLowerCase()}/${subBreed.toLowerCase()}/images/random`
                }
                try {
                    const { data } = await axios.get(url);
                    const { message } = data;
                    setimagePath(message);
                    resolve("success");
                } catch (error) {
                    reject(error);
                }
                setFetching(false);
            }
            ),
            {
                pending: "Getting random image",
                success: "Image fetched successfully",
                error: "Something is wrong, please try again later"
            }
        )
    }

    function handleConfirm() {
        if (!verified) {
            setErrorMessage("Please verify dog breed.");
        }
        // Your logic for confirming
        console.log("Confirmed with Main Breed:", mainBreed, "Sub Breed:", subBreed);
        //   setShowModal(false);
    };

    return (
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                <div className={`bg-white rounded-lg shadow-lg ${(verified && imagePath) ? "w-1/3 h-2/3" : "w-96"} p-6 relative`}>
                    {/* Modal Header */}
                    <h2 className="text-2xl font-semibold mb-4">Select Dog Breed</h2>

                    {/* Main Breed Section */}
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Main Breed</label>
                        <input
                            type="text"
                            value={mainBreed}
                            onChange={(e) => setMainBreed(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter main breed"
                            disabled={verified}
                        />
                    </div>

                    {/* Sub Breed Section */}
                    <div className="mb-6">
                        <label className="block text-gray-700 mb-2">Sub Breed</label>
                        <input
                            type="text"
                            value={subBreed}
                            onChange={(e) => setSubBreed(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter sub breed"
                            disabled={verified}
                        />
                    </div>

                    {/* Error message container */}
                    {!verified &&
                        <div className="h-12 w-full">
                            <p className="text-red-500 text-lg font-mono text-center">
                                {errorMessage}
                            </p>
                        </div>
                    }
                    {(verified && imagePath) &&
                        <div className="my-6">
                            <label className="block text-gray-700 mb-2 text-center">Image</label>
                            <div className="mb-6 h-48 border border-gray-300 w-3/5 mx-auto relative">
                                <img src={imagePath} className="object-fill w-full h-full" />
                            </div>

                        </div>
                    }

                    {/* Buttons at the bottom */}
                    <div className="flex justify-center space-x-2 mt-6">
                        <button
                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                            onClick={cancel}
                        >
                            Cancel
                        </button>
                        {!verified ?
                            <button
                                className="px-4 py-2 bg-blue-400 text-white rounded-md hover:bg-blue-500"
                                onClick={handleVerify}
                            >
                                Verify
                            </button> :
                            <button
                                className="px-4 py-2 bg-blue-400 text-white rounded-md hover:bg-blue-500"
                                onClick={getRandomImage}
                                disabled={fetching}
                            >
                                <RxReload />
                            </button>
                        }
                        <button
                            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                            onClick={handleConfirm}
                        >
                            Confirm
                        </button>
                    </div>

                </div>
            </div>
        </>
    );
};
