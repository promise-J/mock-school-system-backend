import React from "react";
import { useLocation, useHistory } from "react-router-dom";
import queryString from "query-string";

const range = (start, end) => {
  let length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

function Pagination({ pagesCount, total, page, limit, sibsCount = 1 }) {
  const { search, pathname } = useLocation();
  const history = useHistory();

  const isfirstPage = page * limit <= limit;
  const isLastPage = page * limit >= total;
  const queryParams = React.useMemo(() => queryString.parse(search), [search]);

  function paginate(pageNo) {
    const pageurlWithQuery = queryString.stringify({
      ...queryParams,
      page: pageNo,
    });
    history.push({ pathname, search: pageurlWithQuery });
  }

  const prevPageNo = Math.max(page - 1, 1);
  const nextPageNo = Math.min(page + 1, pagesCount);

  const pagesNoList = React.useMemo(() => {
    const pagesLeft = pagesCount - page;
    const pagesRight = pagesCount - 1 - pagesLeft;

    const rightSibsCount = sibsCount > pagesLeft ? pagesLeft : sibsCount;
    const leftSibsCount = sibsCount > pagesRight ? pagesRight : sibsCount;

    return [
      ...range(page - leftSibsCount, page - 1),
      ...range(page, page + rightSibsCount),
    ];
  }, [page, pagesCount, sibsCount]);

  return (
    <div>
      <div className="page-div">
        <button
          disabled={isfirstPage}
          onClick={() => paginate(prevPageNo)}
          className="page-button"
        >
          Prev
        </button>
        {pagesNoList.map((pageIndex) => (
          <button
            onClick={() => paginate(pageIndex)}
            className="page-button"
            key={pageIndex}
            // style={{ backgroundColor: page === pageIndex ? "red" : "" }}
          >
            {pageIndex}
          </button>
        ))}

        <button
          disabled={isLastPage}
          onClick={() => paginate(nextPageNo)}
          className="page-button"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Pagination;
