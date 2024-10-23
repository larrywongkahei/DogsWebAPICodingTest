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
        <>
            <p>
                {dog.name}
            </p>
            <img src={dog.imagePath} className='h-1/5 w-1/5' onClick={() => fetchAndUpdateImage(dog.name)} />
            {dog.sub_breed.length > 0 ?
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
            }
        </>

    )

}