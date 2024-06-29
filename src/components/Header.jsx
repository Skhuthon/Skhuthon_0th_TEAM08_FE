import styled from "styled-components";
import { useNavigate } from "react-router-dom";
const HeaderStyle = styled.div`
  padding: auto;
  margin: auto;
  color: #aaa;
  font-size: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;

  div {
    font-size: 20px;
    padding: 10px;
    margin-right: auto;
    font-weight: bold;
    text-align: center;
    color: #414b6e;
    cursor: pointer;
  }

  p {
    margin: 0;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const Header = () => {
  const navigate = useNavigate();
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
        <div onClick={() => navigate("/")}>
          Romance <br /> Memo
        </div>
        <p>{todayData()}</p>
      </HeaderStyle>
      <hr />
    </>
  );
};

export default Header;
