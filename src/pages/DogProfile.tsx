import { ReactElement, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useDogAPI from "../components/Hooks/useDogAPI";
import { TSubBreed } from "../DogType";
import { toast } from "react-toastify";

export default function DogProfile(): ReactElement {

  const location = useLocation();
  const { dogName, subBreed, imagePath, description } = location.state || {};
  const [newDescription, setNewDescription] = useState<string>(description);
    const navigator = useNavigate();

  const { Delete } = useDogAPI();

  function handleUpdateClick() {
    Delete(dogName);
  }

  async function handleDeleteClick() {
            const { success } = await Delete(dogName);
            if(success){
                return toast.success("Successfully Deleted! Redirecting to home page.", {
                    onClose: () => {navigator("/", {replace: true})}
                });
            }
            return toast.error("Deletion failed. Please report this problem.")
  }

  return (
    location.state ?
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md w-2/3">
          <h1 className="text-2xl font-bold text-center mb-4">{dogName}</h1>
          <img
            src={imagePath}
            alt={dogName}
            className="w-full h-64 object-cover rounded-md mb-4"
          />
          <textarea className="text-gray-700 mb-4 resize-none border rounded-md p-2 border-gray-300 w-full" placeholder="Description" rows={7} value={newDescription} onChange={(e) => { setNewDescription(e.target.value) }} />

          {subBreed.length > 0 && (
            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-2">Sub Breeds:</h2>
              <div className="grid grid-cols-2 gap-4">
                {subBreed.map((sub: TSubBreed) => (
                  <Link to={`/dog_profile/Sub_breedOf/${dogName}`} state={
                    {
                      dogName: sub.name,
                      subBreed: [], 
                      imagePath: sub.imagePath,
                      description: sub.description
                    }
                  } key={sub.name} className="border rounded-md p-2">
                    <h3 className="font-bold">{sub.name}</h3>
                    <img
                      src={sub.imagePath}
                      alt={sub.name}
                      className="w-full h-32 object-cover rounded-md"
                    />
                  </Link>
                ))}
              </div>
            </div>
          )}

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