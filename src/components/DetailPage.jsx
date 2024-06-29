import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import styled from "styled-components";

const Page = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 16px;
`;

const MemoContainer = styled.div`
  width: 100%;
  max-width: 600px;
  background-color: white;
  margin: 0 auto;
  padding: 20px;
  margin: 20px;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const Title = styled.div`
  font-size: 32px;
  font-weight: bold;
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 10px;
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

const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

const Name = styled.div`
  margin-right: 10px;
  font-weight: bold;
  font-size: 20px;
`;

const LikeDateContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  color: #aaa;
`;

const ContentSection = styled.div`
  margin-top: 20px;
`;

const ContentText = styled.div`
  margin-top: 10px;
`;

const CommentContainer = styled.div`
  margin-top: 40px;
`;

const InputStyle = styled.input`
  width: 85%;
  margin-bottom: 10px;
  margin-right: 10px;
  box-sizing: border-box;
  font-size: 16px;
  border: 1.5px solid #bababa;
  border-radius: 5px;
  padding: 10px;
`;

const SubCommentContainer = styled.div`
  justify-content: space-between;
  align-items: center;
`;

const SubmitButton = styled.button`
  background-color: white;
  border: 1px solid #bababa;
  color: #bababa;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
`;

const CommentList = styled.div`
  margin-top: 20px;
`;

const CommentItem = styled.div`
  padding: 10px;
  border-bottom: 1px solid #eee;
  color: #444;
  &:last-child {
    border-bottom: none;
  }
`;

const DetailPage = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [memo, setMemo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState("");

  useEffect(() => {
    const fetchMemo = async () => {
      try {
        const response = await axios.get(
          `https://handmark.shop/post/${postId}`
        );
        setMemo(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch memo:", error);
        setLoading(false);
      }
    };

    fetchMemo();
  }, [postId]);

  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("https://handmark.shop/comments", {
        content: comment,
        postId: postId,
      });
      if (response.status === 201) {
        setMemo((prevMemo) => ({
          ...prevMemo,
          comments: [...prevMemo.comments, comment],
        }));
        setComment("");
      }
    } catch (error) {
      console.error("Failed to submit comment:", error);
    }
  };

  const handleEdit = () => {
    navigate(`/edit/${postId}`);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`https://handmark.shop/post/${postId}`);
      navigate("/");
    } catch (error) {
      console.error("Failed to delete memo:", error);
    }
  };

  if (loading) {
    return (
      <Page>
        <ClipLoader loading={loading} />
      </Page>
    );
  }

  if (!memo) {
    return (
      <Page>
        <div>메모를 찾을 수 없습니다.</div>
      </Page>
    );
  }

  const formattedDate = new Date(memo.postDate).toLocaleDateString();

  return (
    <Page>
      <MemoContainer>
        <HeaderContainer>
          <Title>{memo.title}</Title>
          <ButtonsContainer>
            <BtnStyle onClick={handleEdit}>수정</BtnStyle>
            <BtnStyle onClick={handleDelete}>삭제</BtnStyle>
          </ButtonsContainer>
        </HeaderContainer>

        <InfoContainer>
          <Name>익명</Name>
        </InfoContainer>

        <LikeDateContainer>
          <div>좋아요 {memo.likes}</div>
          <div>&nbsp;|&nbsp;</div>
          <div>조회수 {memo.view}</div>
          <div>&nbsp;|&nbsp;</div>
          <div>{formattedDate}</div>
        </LikeDateContainer>

        <ContentSection>
          <ContentText>{memo.content}</ContentText>
          {memo.imageUrl && <img src={memo.imageUrl} alt="오늘의 사진" />}
        </ContentSection>

        <hr />

        <CommentContainer>
          <SubCommentContainer>
            <form onSubmit={handleCommentSubmit}>
              <InputStyle
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="댓글을 입력하세요"
              />
              <SubmitButton type="submit">등록</SubmitButton>
            </form>
          </SubCommentContainer>
          <div>댓글 목록</div>
          <hr />
          <CommentList>
            {memo.comments &&
              memo.comments.map((c, index) => (
                <CommentItem key={index}>{c}</CommentItem>
              ))}
          </CommentList>
        </CommentContainer>
      </MemoContainer>
    </Page>
  );
};

export default DetailPage;
