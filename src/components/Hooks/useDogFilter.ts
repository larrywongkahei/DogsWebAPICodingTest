import { useState } from "react";
import { TDog } from "../../DogType";
import { toast } from "react-toastify";

export default function useDogFilter(dogs:TDog[]){
    const [pageIndex, setPageIndex] = useState<number>(1);
    const [filters, setFilters] = useState<string[]>([]);
    const [startWithFilter, setStartWithFilter] = useState<string>("");
    const [filteredDogs, setFilteredDogs] = useState<TDog[]>([]);

    function addToFilters(newFilter: string) {
        const shadowFilters = [...filters];
        shadowFilters.push(newFilter);
        setFilters(shadowFilters);
        setPageIndex(1);
        applyFilters(startWithFilter, shadowFilters);
    }

    function addToStartWithFilter(initial: string) {
        let processedData = "";

        if (startWithFilter !== initial) {
            processedData = initial;
        }

        applyFilters(processedData, filters);
        setStartWithFilter(processedData);
    }


    function applyFilters(initial: string, filters: string[]) {
        const shadowDogsList = [...dogs];

        let firstLayerFilteredList: TDog[] = [];

        if (filters.length > 0) {
            firstLayerFilteredList = shadowDogsList.filter((dog: TDog) => filters.every((filter: string) => dog.name.toLowerCase().includes(filter.toLowerCase())));
        } else {
            firstLayerFilteredList = [...dogs];
        }

        // If StartWithFilter not empty, apply
        if (initial !== "") {
            const secondLayerFilteredList = firstLayerFilteredList.filter((dog: TDog) => dog.name.toLowerCase().startsWith(initial.toLowerCase()));
            setFilteredDogs(secondLayerFilteredList);
            return;
        }
        // Else only apply first layer
        setFilteredDogs(firstLayerFilteredList);
    }


    function removeFilter(filterToRemove: string) {
        const shadowFilters = [...filters];
        const itemIndex = shadowFilters.findIndex((value: string) => filterToRemove === value);

        if (itemIndex === -1) {
            toast.error("Remove filter error, Please try again.")
            return;
        }

        shadowFilters.splice(itemIndex, 1);
        setFilters(shadowFilters);
        applyFilters(startWithFilter, shadowFilters);
        setPageIndex(1);

        toast.success(`Successfully removed ${filterToRemove} .`)
    }

    return {
        
        filters,
        pageIndex,
        filteredDogs,
        startWithFilter,
        setPageIndex,
        setFilters,
        addToFilters,
        removeFilter,
        setFilteredDogs,
        addToStartWithFilter,
        



    }

}