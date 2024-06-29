import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { DiaryContext } from "../DiaryContext";
import { IoMdArrowRoundBack } from "react-icons/io";

const Page = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 16px;
`;

const FormContainer = styled.div`
  width: 90%;
  max-width: 600px;
  background-color: white;
  padding: 5px;
  margin: 5px;
`;

const InputStyle = styled.input`
  width: 100%;
  margin-bottom: 20px;
  margin-top: 10px;
  box-sizing: border-box;
  font-size: 16px;
  border: 1.5px solid #bababa;
  border-radius: 5px;
  padding: 10px;
`;

const TextStyle = styled.textarea`
  width: 100%;
  margin-bottom: 20px;
  margin-top: 10px;
  box-sizing: border-box;
  font-size: 16px;
  border: 1.5px solid #bababa;
  border-radius: 5px;
  resize: vertical;
  height: 150px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const BtnStyle = styled.button`
  width: 70px;
  background-color: white;
  border: 1.5px solid #bababa;
  color: #bababa;
  border-radius: 5px;
  margin: 5px;
  padding: 10px;
  font-weight: bold;
  cursor: pointer;
`;

const BackBtn = styled.button`
  margin: 10px;
  padding: auto;
  border: none;
  background: none;
  cursor: pointer;
  color: #aaa;
  font-size: 18px;
`;

const WritePage = () => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [emotion, setEmotion] = useState("");
  const [image, setImage] = useState(null);
  const { addEntry } = useContext(DiaryContext);
  const navigate = useNavigate();

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSave = (event) => {
    event.preventDefault();
    const newEntry = {
      id: Date.now(),
      title,
      emotion,
      content,
      image,
    };
    addEntry(newEntry);
    navigate("/");
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <>
      <BackBtn onClick={handleCancel}>
        <IoMdArrowRoundBack />
      </BackBtn>
      <Page>
        <FormContainer>
          <form>
            오늘의 사진 <br />
            <InputStyle type="file" onChange={handleImageChange} /> <br />
            오늘의 감정 <br />
            <InputStyle
              type="text"
              value={emotion}
              onChange={(e) => setEmotion(e.target.value)}
            />{" "}
            <br />
            오늘을 한 줄로? <br />
            <InputStyle
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />{" "}
            <br />
            오늘 나의 하루는? <br />
            <TextStyle
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />{" "}
            <br />
            <ButtonContainer>
              <BtnStyle type="reset" onClick={handleCancel}>
                취소
              </BtnStyle>
              <BtnStyle type="submit" onClick={handleSave}>
                등록
              </BtnStyle>{" "}
            </ButtonContainer>
          </form>
        </FormContainer>
      </Page>
    </>
  );
};

export default WritePage;
