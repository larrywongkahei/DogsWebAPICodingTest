import { ReactElement, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useDogAPI from "../components/Hooks/useDogAPI";
import { TSubBreed } from "../DogType";
import { RxReload } from "react-icons/rx";
import useFetchImage from "../components/Hooks/useFetchImage";
import { toast } from "react-toastify";

export default function DogProfile(): ReactElement {
  let { main_breed_name } = useParams<{main_breed_name:string}>();
  if(!main_breed_name){
    return (
      <h1>
          Loading
      </h1>
    )
  }
  
  const { Delete, Update, main_breed, handleUpdateImage } = useDogAPI({ main_breed_name });

  const [newDescription, setNewDescription] = useState<string>(main_breed?.description || "");
  const { fetchRandomImage } = useFetchImage();


  async function handleUpdateImageButtonClick (sub_breed_name: string) {
    if(!main_breed_name){
      return toast.error("Something is wrong, please report this problem and try again later.")
    }
    const newImagePath = await fetchRandomImage(main_breed_name, sub_breed_name);
    await handleUpdateImage(sub_breed_name, newImagePath);

  }

  async function handleUpdateClick() {
    await Update({
      name: main_breed.name,
      sub_breed: main_breed.sub_breed,
      imagePath: main_breed.imagePath,
      description: newDescription
    })
  }

  async function handleDeleteClick() {
    await Delete(main_breed.name);
  }

  return (
    main_breed ?
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md w-2/3">
          <h1 className="text-2xl font-bold text-center mb-4">{main_breed.name}</h1>
          <img
            src={main_breed.imagePath}
            alt={main_breed.name}
            className="w-full h-72 object-cover rounded-md mb-4"
          />
          <textarea className="text-gray-700 mb-4 resize-none border rounded-md p-2 border-gray-300 w-full" placeholder="Description" rows={7} value={newDescription} defaultValue={main_breed.description} onChange={(e) => { setNewDescription(e.target.value) }} />

          {main_breed.sub_breed && main_breed.sub_breed?.length > 0 && (
            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-2">Sub Breeds:</h2>
              <div className="grid grid-cols-2 gap-4">
                {main_breed.sub_breed!.map((sub: TSubBreed) => (
                  <div key={sub.name} className="border rounded-md p-2 relative">
                    <Link to={`/dog_profile/Sub_breedOf/${main_breed.name}`} state={
                      {
                        name: sub.name,
                        imagePath: sub.imagePath,
                        description: sub.description
                      }
                    } key={sub.name} className="border rounded-md p-2">
                      <h3 className="font-bold">{sub.name}</h3>
                      <img
                        src={sub.imagePath}
                        alt={sub.name}
                        className="w-full h-32 object-fill rounded-md"
                      />
                    </Link>
                    <button
                      onClick={() => { handleUpdateImageButtonClick(sub.name) }}
                      className="absolute top-2 right-2 text-blue-500 hover:text-blue-700"
                      title="Reload Image"
                    >
                      <RxReload size={24} />
                    </button>
                  </div>
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