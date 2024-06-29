import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { DiaryContext } from "../DiaryContext";
import styled from "styled-components";
import CommonTable from "../table/CommonTable";

const ListStyle = styled.div`
  padding: 0px 5px;
  margin: 0px 5px;
`;

const LinkStyle = styled(Link)`
  margin: 10px;
  text-decoration: none;
  color: black;
  font-size: 15px;
`;

const Ex = styled.p`
  padding: auto;
  margin: 10px;
  font-size: 10px;
`;

const HrStyle = styled.hr`
  border: 1px solid #bababa;
`;

const List = () => {
  const { entries } = useContext(DiaryContext);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;
  const pageCount = Math.ceil(entries.length / itemsPerPage);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
    window.scrollTo(0, 320);
  };

  const startIndex = currentPage * itemsPerPage;
  const selectedEntries = entries.slice(startIndex, startIndex + itemsPerPage);

  return (
    <ListStyle>
      {selectedEntries.map((entry) => (
        <div key={entry.id}>
          <LinkStyle to={`/detail/${entry.id}`}>
            {entry.title}
            <Ex>조회수, 댓글</Ex>
            <HrStyle />
          </LinkStyle>
        </div>
      ))}
      {pageCount > 1 && (
        <CommonTable
          pageCount={pageCount}
          onPageChange={handlePageChange}
          currentPage={currentPage}
        />
      )}
    </ListStyle>
  );
};

export default List;
