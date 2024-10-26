import { useState } from "react";
import Alphabets from "../Alphabets";
import SearchAndFilters from "../SearchAndFilters";
import DogBlockList from "./DogBlockList"
import Pagination from "../Pagination";
import FilterIndicator from "../FilterIndicators";
import 'react-toastify/dist/ReactToastify.css';
import CreateModal from "../CreateModal";
import useDogFilter from "../Hooks/useDogFilter";

export default function DogsUI(): JSX.Element {

    const {
        filters,
        pageIndex,
        filteredDogs,
        startWithFilter,
        setPageIndex,
        setFilteredDogs,
        addToFilters,
        addToStartWithFilter,
        removeFilter
    } = useDogFilter();

    const [modalOpen, setModalOpen] = useState<boolean>(false);

    function toggleModal() {
        setModalOpen(!modalOpen);
    }


    return (
        <div className=" w-screen h-screen flex flex-col">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center my-4">Welcome to DogSite</h1>
            <SearchAndFilters addToFilters={addToFilters} toggleModal={toggleModal} />
            {modalOpen && <CreateModal cancel={toggleModal} />}
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