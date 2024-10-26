import { TDog } from "../DogType";

export function updateImagePath(originalData: TDog[], newImagePath: string, main: string, sub: string=""){

    const dataToReturn :{
        success: boolean;
        description: string;
        data: TDog[];
    } = {
        success: false,
        description: "",
        data: []
    }

    const isMainBreed = sub.length === 0;
    const shadowDogs = [...originalData];

    const mainIndex = shadowDogs.findIndex((dog:TDog) => dog.name === main);

    if(mainIndex === -1){
        dataToReturn.description = "Failed to update Image, Main breed not found";
        return dataToReturn;
    }

    if(isMainBreed){
        shadowDogs[mainIndex]['imagePath'] = newImagePath;
        dataToReturn.success = true;
        dataToReturn.description = "Updated";
        dataToReturn.data = shadowDogs;
        return dataToReturn;
    }

    const subIndex: number = shadowDogs[mainIndex]['sub_breed']!.findIndex((dog) => dog.name === sub);

    if(subIndex === -1){
        dataToReturn.description = "Failed to update Image, Sub breed not found";
        return dataToReturn;
    }

    shadowDogs[mainIndex]['sub_breed']![subIndex]['imagePath'] = newImagePath;

    dataToReturn.success = true;
    dataToReturn.description = "Updated";
    dataToReturn.data = shadowDogs;
    return dataToReturn;
}