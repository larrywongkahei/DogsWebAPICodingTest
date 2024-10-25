import { ReactElement } from "react";
import { IconBaseProps } from "react-icons";

type Props = {
    toggleModal: () => void;
    buttonText: string | ReactElement<IconBaseProps>;
    bgColor: "blue" | "red" | "green";
}

export default function ModalButton({ toggleModal, buttonText, bgColor="blue" }: Props) {
    const colorStyles = {
        blue: 'bg-blue-500 hover:bg-blue-700 text-white',
        red: 'bg-red-500 hover:bg-red-700 text-white',
        green: 'bg-green-500 hover:bg-green-700 text-white',
    };

    return (
        <div className={`cursor-pointer px-4 py-2 font-semibold rounded-lg shadow-md focus:outline-none ${colorStyles[bgColor]}`} onClick={toggleModal}>
            {buttonText}
        </div>
    );
};