import { RxReload } from "react-icons/rx";
import { TDog } from "../../DogType";
import { Link } from "react-router-dom";


type Props = {
    dog: TDog;
    fetchAndUpdateImage: (name: string) => void
    fetching: boolean

}

export default function DogBlock({ dog, fetchAndUpdateImage, fetching }: Props):JSX.Element {

    return (
        <div className="flex flex-col h-40 w-40 bg-cyan-300 rounded-md justify-center mx-auto">
            <Link to={"/dog_profile"} state={{
                dogName: dog.name,
                subBreed: dog.sub_breed,
                imagePath: dog.imagePath,
                description: dog.description
                }} className="h-5/6 w-full overflow-hidden">
                <img src={dog.imagePath} className='object-cover h-full w-full rounded-md' />
            </Link>
            <div className="relative">
                <p className="text-center">
                    {dog.name}
                </p>
                <button disabled={fetching} className="absolute right-2 bottom-1 rounded-lg cursor-pointer" onClick={() => fetchAndUpdateImage(dog.name)} >
                    <RxReload />
                </button>
            </div>
            {/* {dog.sub_breed.length > 0 ?
                <div>
                    {dog.sub_breed.map((sub: Dog, subindex: number) => {
                        return (
                            <div key={subindex}>
                                <p>
                                    {sub.name}-{dog.name}
                                </p>
                                <img src={sub.imagePath} className='h-1/5 w-1/5' onClick={() => fetchAndUpdateImage(dog.name + "-" + sub.name)} />
                            </div>

                        )
                    })}
                </div> : <p>No sub breed</p>
            } */}
        </div>

    )

}