import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
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
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await axios.get("https://handmark.shop/post");
        setEntries(response.data.posts);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch entries:", error);
        setLoading(false);
      }
    };

    fetchEntries();
  }, []);

  const pageCount = Math.ceil(entries.length / itemsPerPage);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
    window.scrollTo(0, 320);
  };

  const startIndex = currentPage * itemsPerPage;
  const selectedEntries = entries.slice(startIndex, startIndex + itemsPerPage);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ListStyle>
      {selectedEntries.map((entry) => (
        <div key={entry.postId}>
          <LinkStyle to={`/detail/${entry.postId}`}>
            {entry.title || "제목없음"}
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
