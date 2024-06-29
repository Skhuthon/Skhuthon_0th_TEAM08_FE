import React from "react";
import styled from "styled-components";

const HeaderStyle = styled.div`
  text-align: center;
  padding: auto;
  margin: auto;
  color: #aaa;
  font-size: 20px;
`;

const Header = () => {
  const todayData = () => {
    let now = new Date();
    let year = now.getFullYear();
    let todayMonth =
      now.getMonth() + 1 > 9 ? now.getMonth() + 1 : now.getMonth() + 1;
    let todayDate = now.getDate() > 9 ? now.getDate() : "0" + now.getDate();

    return year + "." + todayMonth + "." + todayDate;
  };

  return (
    <>
      <HeaderStyle>
        <p>{todayData()}</p>
      </HeaderStyle>
      <hr />
    </>
  );
};

export default Header;
