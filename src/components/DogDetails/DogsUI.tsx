import { useEffect, useState } from "react";
import Alphabets from "../Alphabets";
import SearchAndFilters from "../SearchAndFilters";
import DogBlockList from "./DogBlockList"
import Pagination from "../Pagination";
import FilterIndicator from "../FilterIndicators";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import API_Request from "../../API_Request";


type Dog = {
    name: string;
    imagePath: string;
    sub_breed: any;
}

export default function DogsUI() {

    const [pageIndex, setPageIndex] = useState<number>(1);
    const [filters, setFilters] = useState<string[]>([]);
    const [dogs, setDogs] = useState<Dog[]>([]);
    const [filteredDogs, setFilteredDogs] = useState<Dog[]>([]);

    useEffect(() => {
        get()
    }, [])

    async function get() {
        const data = await API_Request.GET(`${import.meta.env.VITE_BACKEND_ENDPOINT}/api`);
        if (!data.success) {
            toast.error(data.description);
        }
        setDogs(data.data);
        setFilteredDogs(data.data);
    }

    function filterDogs(filters: string[]){
        if(filters.length == 0){
            setFilteredDogs([...dogs]);
            return;
        }
        const shadowDogsList = [...dogs];
        const filteredDogList = shadowDogsList.filter((dog:Dog) => filters.some((filter: string) => dog.name.toLowerCase().includes(filter.toLowerCase())));
        setFilteredDogs(filteredDogList);
    }

    function addToFilters(newFilter: string){
        const shadowFilters = [...filters];
        shadowFilters.push(newFilter);
        setFilters(shadowFilters);
        setPageIndex(1);
        filterDogs(shadowFilters);
    }

    function removeFilter(filterToRemove: string){
        const shadowFilters = [...filters];
        const itemIndex = shadowFilters.findIndex((value: string) => filterToRemove === value);

        if(itemIndex === -1){
            toast.error("Remove filter error, Please try again.")
            return;
        }

        shadowFilters.splice(itemIndex, 1);
        setFilters(shadowFilters);
        filterDogs(shadowFilters);
        setPageIndex(1);

        toast.success(`Successfully removed ${filterToRemove} .`)
    }

    return (
        <div className=" w-screen h-screen">
                <ToastContainer 
                    autoClose={1500}
                />
                <SearchAndFilters addToFilters={addToFilters}/>
                <FilterIndicator filters={filters} removeFilter={removeFilter}/>
                <div className="my-3">
                    <Alphabets updateFilterAlphabet={addToFilters} />
                </div>
                <DogBlockList dogs={filteredDogs} updateDogsState={setDogs} pageIndex={pageIndex} />
                <Pagination pageCount={Math.ceil(filteredDogs?.length / 16)} onPageChange={(value) => {setPageIndex(value + 1)}}/>
        </div>

    )
}