import React from "react";
import ReactPaginate from "react-paginate";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import styled from "styled-components";

const PaginateStyle = styled.div`
  display: flex;
  justify-content: center;
  margin: auto;

  .pagination {
    display: flex;
    list-style: none;
    padding: 0;
  }

  .pagination__link {
    margin: 0px 5px;
    padding: 5px 10px;
    border: 0px solid #bababa;
    border-radius: 100%;
    cursor: pointer;
  }

  .pagination__link__active {
    background-color: #bababa;
    font-weight: bold;
  }

  .pagination__link:hover {
    background-color: #f0f0f0;
  }
`;

const CommonTable = ({ pageCount, onPageChange, currentPage }) => {
  return (
    <PaginateStyle>
      <ReactPaginate
        previousLabel={<FiChevronLeft />}
        nextLabel={<FiChevronRight />}
        pageCount={pageCount}
        onPageChange={onPageChange}
        containerClassName={"pagination"}
        pageLinkClassName={"pagination__link"}
        activeLinkClassName={"pagination__link__active"}
        forcePage={currentPage}
      />
    </PaginateStyle>
  );
};

export default CommonTable;
