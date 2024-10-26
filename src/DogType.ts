
export type TDog = {
    name: string;
    imagePath: string;
    description: string;
    sub_breed: TSubBreed[];
}

export type TSubBreed = {
    name: string;
    description: string;
    imagePath: string;
}