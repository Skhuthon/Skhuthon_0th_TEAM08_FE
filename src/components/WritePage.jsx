import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { IoMdArrowRoundBack } from "react-icons/io";
import axios from "axios";

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
  const { postId } = useParams();
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [existingImage, setExistingImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (postId) {
      // Fetch the post data if it exists
      const fetchPost = async () => {
        try {
          const response = await axios.get(
            `https://handmark.shop/post/${postId}`
          );
          const postData = response.data.data; // Adjust according to your response data structure
          setTitle(postData.title);
          setContent(postData.content);
          setExistingImage(postData.imageUrl);
        } catch (error) {
          console.error("Failed to fetch post:", error);
        }
      };
      fetchPost();
    }
  }, [postId]);

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSave = async (event) => {
    event.preventDefault();

    const postData = {
      title,
      content,
      view: 0,
      likes: 0,
      postDate: new Date().toISOString(),
    };

    const formData = new FormData();
    const jsonBlob = new Blob([JSON.stringify(postData)], {
      type: "application/json",
    });
    formData.append("post", jsonBlob);
    if (image) {
      formData.append("file", image);
    }

    try {
      let response;
      if (postId) {
        response = await axios.patch(
          `https://handmark.shop/post/${postId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("Post updated:", response.data);
      } else {
        response = await axios.post("https://handmark.shop/post", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log("Post created:", response.data);
      }
      navigate("/");
    } catch (error) {
      console.error("Failed to save post:", error);
    }
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
          <form onSubmit={handleSave}>
            <label htmlFor="imageUpload">오늘의 사진</label>
            <InputStyle
              id="imageUpload"
              type="file"
              onChange={handleImageChange}
            />
            {existingImage && !image && (
              <img
                src={existingImage}
                alt="기존 이미지"
                style={{ width: "100%", marginTop: "10px" }}
              />
            )}
            <br />
            <label htmlFor="titleInput">오늘을 한 줄로?</label>
            <InputStyle
              id="titleInput"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <br />
            <label htmlFor="contentTextarea">오늘 나의 하루는?</label>
            <TextStyle
              id="contentTextarea"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <br />
            <ButtonContainer>
              <BtnStyle type="button" onClick={handleCancel}>
                취소
              </BtnStyle>
              <BtnStyle type="submit">{postId ? "수정" : "등록"}</BtnStyle>
            </ButtonContainer>
          </form>
        </FormContainer>
      </Page>
    </>
  );
};

export default WritePage;
