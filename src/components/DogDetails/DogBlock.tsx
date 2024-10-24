import { RxReload } from "react-icons/rx";

type Dog = {
    name: string;
    imagePath: string;
    sub_breed: any;
}

type Props = {
    dog: Dog;
    fetchAndUpdateImage: (name: string) => void

}

export default function DogBlock({ dog, fetchAndUpdateImage }: Props) {
    return (
        <div className="flex flex-col h-40 w-40 bg-cyan-300 rounded-md justify-center mx-auto">
            <div className="h-5/6 w-full overflow-hidden">
                <img src={dog.imagePath} className='object-cover h-full w-full rounded-md' />
            </div>
            <div className="relative">
                <p className="text-center">
                    {dog.name}
                </p>
                <div className="absolute right-2 bottom-1 hover:bg-slate-400 rounded-lg cursor-pointer" onClick={() => fetchAndUpdateImage(dog.name)} >
                    <RxReload />
                </div>
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