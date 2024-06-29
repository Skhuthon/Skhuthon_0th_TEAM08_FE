import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Cover = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px 10px;
  margin: 0px;
`;

const BtnStyle = styled.button`
  background-color: white;
  border: 1px solid #bababa;
  color: #bababa;
  border-radius: 5px;
  margin: 5px;
  padding: 10px;
  cursor: pointer;
`;

const Btn = () => {
  return (
    <Cover>
      <BtnStyle>오늘의 일기</BtnStyle>
      <Link to="/write">
        <BtnStyle>글 쓰러 가기</BtnStyle>
      </Link>
    </Cover>
  );
};
export default Btn;
