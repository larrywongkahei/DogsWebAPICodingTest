import { MdOutlineCancel } from "react-icons/md";

type Props = {
    filters: string[];
    removeFilter: (filter: string) => void;
}

export default function FilterIndicator({ filters, removeFilter }: Props) {
    return (
        <div className="flex w-4/5 justify-center mt-3 gap-2">
            {
                filters.map((filter, index) => {
                    return (
                        <div className="pr-8 pl-3 py-1 bg-slate-400 rounded-full relative flex items-center hover:bg-slate-500" key={index}>
                            <p className="">
                                {filter}
                            </p>
                            <div className="cursor-pointer absolute right-1.5" onClick={() => { removeFilter(filter) }}>
                                <MdOutlineCancel />
                            </div>
                        </div>
                    )
                })
            }
        </div>

    )
}