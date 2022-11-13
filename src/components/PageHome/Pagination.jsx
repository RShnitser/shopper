import React from "react";

const Pagination = ({totalPages, currentPage, changePage}) => {

    const Range = (start, end) => {
        
        const result = [];

        for(let i = start; i <= end; i++) {
            result.push(i);
        }
        
        return result;
    }

    let pages = [];
    const siblingCount = 1;
    const pagesShown = 2 * siblingCount + 5;

    const DOTS = {
        DOTS_NONE: 0,
        DOTS_LEFT: 1,
        DOTS_RIGHT: 2,
        DOTS_BOTH: 3,
    }

    let dotType = DOTS.DOTS_NONE;

    const leftSibling = Math.max(currentPage - siblingCount, 1);
    const rightSibling = Math.min(currentPage + siblingCount, totalPages);

    const isLeftDot = leftSibling > 3;
    const isRightDot = rightSibling < totalPages - 2;

    if(pagesShown >= totalPages) {
        dotType = DOTS.DOTS_NONE;  
    }
    else if(!isLeftDot && isRightDot) {
        dotType = DOTS.DOTS_RIGHT;
    }
    else if(isLeftDot && !isRightDot) {
        dotType = DOTS.DOTS_LEFT;
    }
    else {
        dotType = DOTS.DOTS_BOTH;
    }

    switch(dotType) {
        case DOTS.DOTS_NONE:
            pages = Range(1, totalPages);
        break;
        case DOTS.DOTS_RIGHT:
            let leftItemCount = 3 + 2 * siblingCount;
            pages = [...Range(1, leftItemCount), -1, totalPages]
        break;
        case DOTS.DOTS_LEFT:
            let rightItemCount = 3 + 2 * siblingCount;
            pages = [1, -2, ...Range(totalPages - rightItemCount + 1, totalPages)]
        break;
        case DOTS.DOTS_BOTH:
            pages = [1, -2, ...Range(leftSibling, rightSibling), -1, totalPages];
        break;
        default:
        break;
    }

   
    const pageButtons = pages.length && pages.map((page) => {
        
        let button = null;
        if(page > 0) {
            button =  <li key={`page_${page}`}>
                    <PageButton 
                        className={page === currentPage ? "page-button page-button-selected" : "page-button"}
                        label={page}
                        page={page} 
                        changePage={changePage}
                    />
            </li>
        }
        else {
            button = 
            <li key={`page_D${-page}`}>
                &#8230;
            </li>
        }

            return (button);
    
    });
    
    const result = <nav >
        <ul  className="page-container display-flex">
            <li>
                <PageButton
                    // label={"<"}
                    className="page-button"
                    label={<i className="fa-solid fa-chevron-left"></i>}
                    page={currentPage - 1} 
                    changePage={changePage}
                    disabled={currentPage === 1}
                />
            </li>
            {pageButtons}
            <li>
                <PageButton 
                    className="page-button"
                    label={<i className="fa-solid fa-chevron-right"></i>}
                    page={currentPage + 1} 
                    changePage={changePage}
                    disabled={currentPage === totalPages}
                />
            </li>
        </ul>
    </nav>
        
    return(result);
}

const PageButton = ({label, page, changePage, ...props}) => {

    const result = <button
        type="button"
        onClick={() => {changePage(page)}}
        {...props}
    >
        {label}
    </button>

    return(result);
}

export default Pagination;