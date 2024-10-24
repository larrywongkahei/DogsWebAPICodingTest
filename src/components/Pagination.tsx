import ReactPaginate from "react-paginate";

type Props = {
    pageCount: number
    onPageChange: (newPageIndex: number) => void;
}

export default function Pagination({ pageCount, onPageChange }: Props) {
    function handlePageClick(event:any){
        console.log(event.selected);
        onPageChange(event.selected)
    }
    return (
        <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={9}
            pageCount={pageCount}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
            className="flex w-full justify-center gap-4 mt-10"
        />
    )
}