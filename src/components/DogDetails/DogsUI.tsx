import { useEffect, useState } from "react";
import Alphabets from "../Alphabets";
import SearchAndFilters from "../SearchAndFilters";
import DogBlockList from "./DogBlockList"
import Pagination from "../Pagination";
import FilterIndicator from "../FilterIndicators";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import API_Request from "../../API_Request";
import CreateModal from "../CreateModal";


type Dog = {
    name: string;
    imagePath: string;
    sub_breed: any;
}

export default function DogsUI() {

    const [pageIndex, setPageIndex] = useState<number>(1);
    const [filters, setFilters] = useState<string[]>([]);
    const [startWithFilter, setStartWithFilter] = useState<string>("");
    const [dogs, setDogs] = useState<Dog[]>([]);
    const [filteredDogs, setFilteredDogs] = useState<Dog[]>([]);
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    useEffect(() => {
        get()
    }, [])

    function toggleModal() {
        setModalOpen(!modalOpen);
    }

    async function get() {
        const data = await API_Request.GET(`${import.meta.env.VITE_BACKEND_ENDPOINT}/api`);
        if (!data.success) {
            toast.error(data.description);
        } else {
            setDogs(data.data);
            setFilteredDogs(data.data);
        }
    }

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

        let firstLayerFilteredList: Dog[] = [];

        if (filters.length > 0) {
            firstLayerFilteredList = shadowDogsList.filter((dog: Dog) => filters.every((filter: string) => dog.name.toLowerCase().includes(filter.toLowerCase())));
        } else {
            firstLayerFilteredList = [...dogs];
        }

        // If StartWithFilter not empty, apply
        if (initial !== "") {
            const secondLayerFilteredList = firstLayerFilteredList.filter((dog: Dog) => dog.name.toLowerCase().startsWith(initial.toLowerCase()));
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

    return (
        <div className=" w-screen h-screen flex flex-col">
            <ToastContainer
                autoClose={1500}
            />
            <SearchAndFilters addToFilters={addToFilters} toggleModal={toggleModal} />
            {modalOpen && <CreateModal cancel={toggleModal}/>}
            <FilterIndicator filters={filters} removeFilter={removeFilter} />
            <div className="my-3">
                <Alphabets updateFilterAlphabet={addToStartWithFilter} startWithFilterInitial={startWithFilter} />
            </div>
            <DogBlockList dogs={filteredDogs} updateDogsState={setFilteredDogs} pageIndex={pageIndex} />
            {filteredDogs.length > 0 &&
                <Pagination pageCount={Math.ceil(filteredDogs?.length / 16)} onPageChange={(value) => { setPageIndex(value + 1) }} />
            }
        </div>

    )
}