import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import ModalButton from "./ModalButton";

type Props = {
  addToFilters: (filter: string) => void;
  toggleModal: () => void;
}

export default function SearchAndFilters({ addToFilters, toggleModal }: Props) {

  const [value, setValue] = useState<string>("");

  function handleSubmit(e: any) {
    e.preventDefault();
    addToFilters(value);
    setValue("");
  }

  function handleOnChange(e: any) {
    setValue(e.target.value);
  }

  return (
      <form onSubmit={handleSubmit} className="flex items-center w-4/5 mx-auto">
        <input
          type="text"
          value={value}
          onChange={handleOnChange}
          placeholder="Search..."
          className="border border-gray-300 rounded-l-md py-2.5 px-4 w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-r-md px-4 py-2.5 mr-4 hover:bg-blue-600 transition duration-200"
        >
          Search
        </button>
        <ModalButton toggleModal={toggleModal} bgColor="blue" buttonText={<FaPlus />} />
      </form>
  )
}