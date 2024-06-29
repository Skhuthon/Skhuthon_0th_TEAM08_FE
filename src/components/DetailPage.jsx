import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

const ContentLabel = styled.div`
  font-weight: bold;
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

const DetailPage = () => {
  const { id } = useParams();
  const [memo, setMemo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState("");

  useEffect(() => {
    const fetchMemo = async () => {
      try {
        const response = await axios.get(`/memos/${id}`);
        console.log(response.data);
        setMemo(response.data);
        setLoading(false);
      } catch (error) {
        console.error("failed", error);
        setLoading(false);
      }
    };
    fetchMemo();
  }, [id]);

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    console.log("Comment submitted:", comment);
    setComment("");
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
        <div>메모가 없음.</div>
      </Page>
    );
  }
  return (
    <Page>
      <MemoContainer>
        <HeaderContainer>
          <Title>제목</Title>
          <ButtonsContainer>
            <BtnStyle>버튼1</BtnStyle>
            <BtnStyle>버튼2</BtnStyle>
          </ButtonsContainer>
        </HeaderContainer>

        <InfoContainer>
          <Name>익명</Name>
        </InfoContainer>

        <LikeDateContainer>
          <div>좋아요</div>
          <div>&nbsp;|&nbsp;</div>
          <div>날짜</div>
        </LikeDateContainer>

        <ContentSection>
          <ContentLabel>내용:</ContentLabel>
          <ContentText>{memo.content}</ContentText>
        </ContentSection>

        <ContentSection>
          <ContentLabel>사진:</ContentLabel>
          <ContentText>{memo.image}</ContentText>
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
          <div>댓글1</div>
        </CommentContainer>
      </MemoContainer>
    </Page>
  );
};

export default DetailPage;
