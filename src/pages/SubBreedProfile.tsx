import { ReactElement, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import useDogAPI from "../components/Hooks/useDogAPI";

export default function SubBreedProfile(): ReactElement {

    const location = useLocation();
    const { main_breed } = useParams();

    const { name, imagePath, description } = location.state || {};
    const [newDescription, setNewDescription] = useState<string>(description);

    const { Delete, Update } = useDogAPI();

    async function handleUpdateClick() {
        await Update({
        name,
        main_breed,
        imagePath,
        description: newDescription,
        })
    }

    async function handleDeleteClick() {
        await Delete(main_breed!, name);
    }

    return (
        (location.state && main_breed) ?
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md w-2/3">
                    <h1 className="text-2xl font-bold text-center mb-4">{name}</h1>
                    <img
                        src={imagePath}
                        alt={name}
                        className="w-full h-64 object-cover rounded-md mb-4"
                    />
                    <textarea className="text-gray-700 mb-4 resize-none border rounded-md p-2 border-gray-300 w-full" placeholder="Description" rows={7} value={newDescription} onChange={(e) => { setNewDescription(e.target.value) }} />

                    <div className="flex justify-between mt-6">
                        <button
                            onClick={handleDeleteClick}
                            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                        >
                            Delete
                        </button>
                        <button
                            onClick={handleUpdateClick}
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        >
                            Update
                        </button>
                    </div>
                </div>
            </div> : <div>
                Page not found.
            </div>
    );
};