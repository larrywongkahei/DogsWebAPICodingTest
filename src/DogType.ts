
export type TDog = {
    name: string;
    imagePath: string;
    description: string;
    sub_breed?: TSubBreed[];
    main_breed?: string;
}

export type TSubBreed = {
    name: string;
    description: string;
    imagePath: string;
}