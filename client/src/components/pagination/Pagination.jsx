import React from "react";

function Pagination({
  pageNumber,
  noOfPages,
  setPageNumber,
  prevPage,
  pages,
  nextPage,
}) {
  return (
    <div>
      <div className="page-div">
        <button
          disabled={pageNumber === 0}
          onClick={prevPage}
          className="page-button"
        >
          Prev
        </button>
        {pages.map((pageIndex) => (
          <button
            onClick={() => setPageNumber(pageIndex)}
            className="page-button"
            key={pageIndex}
          >
            {pageIndex + 1}
          </button>
        ))}
        <button
          disabled={pageNumber >= noOfPages - 1}
          onClick={nextPage}
          className="page-button"
        >
          Next
        </button>
      </div>
      <h3 className="page-info">
        Page {pageNumber + 1} out of{" "}
        {noOfPages === 0 ? noOfPages + 1 : noOfPages}
      </h3>
    </div>
  );
}

export default Pagination;
