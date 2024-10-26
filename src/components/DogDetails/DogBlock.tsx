import { RxReload } from "react-icons/rx";
import { TDog } from "../../DogType";
import { Link } from "react-router-dom";


type Props = {
    dog: TDog;
    fetchAndUpdateImage: (name: string) => void
    fetching: boolean

}

export default function DogBlock({ dog, fetchAndUpdateImage, fetching }: Props): JSX.Element {

    return (
        <div className="flex flex-col h-48 w-48 bg-gradient-to-b from-cyan-300 to-blue-400 rounded-lg shadow-lg justify-center mx-auto hover:scale-105 transition-transform duration-200">
            <Link to={"/dog_profile"} state={{
                name: dog.name,
                sub_breed: dog.sub_breed,
                imagePath: dog.imagePath,
                description: dog.description
            }} className="h-5/6 w-full overflow-hidden rounded-t-lg">
                <img src={dog.imagePath} className='object-cover h-full w-full rounded-t-lg transition-transform duration-300 hover:scale-110' />
            </Link>
            <div className="relative bg-white rounded-b-lg flex items-center justify-between p-2">
                <p className="text-center text-gray-700 font-semibold">
                    {dog.name}
                </p>
                <button
                    disabled={fetching}
                    className="text-cyan-600 hover:text-cyan-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => fetchAndUpdateImage(dog.name)}
                    title="Reload Image"
                >
                    <RxReload size={20} />
                </button>
            </div>
        </div>

    )

}