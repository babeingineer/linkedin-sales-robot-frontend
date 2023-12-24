import Pagination from "../../base-components/Pagination";
import { FormSelect } from "../../base-components/Form";
import Lucide from "../../base-components/Lucide"

interface IPaginationProps {
    currentPage: number;
    setCurrentPage: (_: number) => void;
    pageCount: number;
    setPageCount: (_: number) => void;
    rowsPerPage: number;
    setRowsPerPage: (_: number) => void;
}

function Main({
    currentPage,
    setCurrentPage,
    pageCount,
    setPageCount,
    rowsPerPage,
    setRowsPerPage
}: IPaginationProps) {
    const getPages = () => {
        if (pageCount <= 3) {
            return [...Array(pageCount + 1).keys()].slice(1);
        } else if (currentPage === 1) {
            return [currentPage, currentPage + 1, currentPage + 2];
        } else if (currentPage === pageCount) {
            return [pageCount - 2, pageCount - 1, pageCount];
        }
        return [currentPage - 1, currentPage, currentPage + 1];
    }

    return <div className="flex flex-col-reverse flex-wrap items-center p-5 flex-reverse gap-y-2 sm:flex-row">
        <Pagination className="flex-1 w-full mr-auto sm:w-auto">
            <div onClick={() => setCurrentPage(1)}>
                <Pagination.Link>
                    <Lucide icon="ChevronsLeft" className="w-4 h-4" />
                </Pagination.Link>
            </div>
            <div onClick={() => setCurrentPage(currentPage ? currentPage - 1 : currentPage)}>
                <Pagination.Link>
                    <Lucide icon="ChevronLeft" className="w-4 h-4" />
                </Pagination.Link>
            </div>
            <Pagination.Link>...</Pagination.Link>
            {
                getPages().map(page => <div key={`page-${page}`} onClick={() => setCurrentPage(page)}><Pagination.Link active={page === currentPage}>
                    {page}
                </Pagination.Link>
                </div>)
            }
            <Pagination.Link>...</Pagination.Link>
            <div onClick={() => setCurrentPage(currentPage === pageCount ? pageCount : currentPage + 1)}>
                <Pagination.Link>
                    <Lucide icon="ChevronRight" className="w-4 h-4" />
                </Pagination.Link>
            </div>
            <div onClick={() => setCurrentPage(pageCount)}>
                <Pagination.Link>
                    <Lucide icon="ChevronsRight" className="w-4 h-4" />
                </Pagination.Link>
            </div>
        </Pagination>
        <FormSelect className="sm:w-20 rounded-[0.5rem]" value={rowsPerPage} onChange={(e: any) => setRowsPerPage(e.target.value)}>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={35}>35</option>
            <option value={50}>50</option>
        </FormSelect>
    </div>
}

export default Main;