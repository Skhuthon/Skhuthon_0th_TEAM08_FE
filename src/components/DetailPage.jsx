import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import styled from "styled-components";
import { FaThumbsUp, FaEye } from "react-icons/fa";

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
  text-align: center;
  margin-top: 10px;
  color: #aaa;
`;

const ContentSection = styled.div`
  margin-top: 20px;
`;

const ContentText = styled.div`
  margin-top: 10px;
`;

const ImageStyle = styled.img`
  max-width: 300px;
  max-height: 300px;
  width: auto;
  height: auto;
  display: block;
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
  height: 300px;
  overflow-y: auto;
  border: 1px solid #bababa;
  border-radius: 5px;
  padding: 10px;
  margin-top: 10px;
  color: #444;
`;

const CommentItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #eee;
  color: #444;
`;

const CommentText = styled.div`
  flex: 1;
`;

const DeleteButton = styled.button`
  background-color: white;
  border: 1px solid #bababa;
  color: #bababa;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
`;

const EditButton = styled.button`
  background-color: white;
  border: 1px solid #bababa;
  margin-right: 10px;
  color: #bababa;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
`;

const DetailPage = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [memo, setMemo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingCommentContent, setEditingCommentContent] = useState("");

  useEffect(() => {
    const fetchMemo = async () => {
      try {
        const response = await axios.get(
          `https://handmark.shop/post/${postId}`
        );
        setMemo(response.data.data); // 응답 데이터 형식에 따라 수정
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch memo:", error);
        setLoading(false);
      }
    };

    fetchMemo();
  }, [postId]);

  const handleCommentSubmit = async () => {
    try {
      const response = await axios.post("https://handmark.shop/comments", {
        content: comment,
        postId: postId,
      });
      if (response.status === 201) {
        setMemo((prevMemo) => ({
          ...prevMemo,
          comments: [
            ...prevMemo.comments,
            { commentId: Date.now(), content: comment },
          ],
        }));
        setComment("");
        window.location.reload();
      }
    } catch (error) {
      console.error("Failed to submit comment:", error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(`https://handmark.shop/comments/${commentId}`);
      setMemo((prevMemo) => ({
        ...prevMemo,
        comments: prevMemo.comments.filter((c) => c.commentId !== commentId),
      }));
    } catch (error) {
      console.error("Failed to delete comment:", error);
    }
  };

  const handleEditComment = async () => {
    try {
      await axios.patch(`https://handmark.shop/comments/${editingCommentId}`, {
        content: editingCommentContent,
      });
      setMemo((prevMemo) => ({
        ...prevMemo,
        comments: prevMemo.comments.map((c) =>
          c.commentId === editingCommentId
            ? { ...c, content: editingCommentContent }
            : c
        ),
      }));
      setEditingCommentId(null);
      setEditingCommentContent("");
    } catch (error) {
      console.error("Failed to edit comment:", error);
    }
  };

  const handleEdit = () => {
    navigate(`/edit/${postId}`);
  };

  const handleDeletePost = async () => {
    try {
      await axios.delete(`https://handmark.shop/post/${postId}`);
      navigate("/");
    } catch (error) {
      console.error("Failed to delete memo:", error);
    }
  };

  const handleLike = async () => {
    try {
      const response = await axios.post(
        `https://handmark.shop/post/${postId}/like`
      );
      if (response.status === 200) {
        setMemo((prevMemo) => ({
          ...prevMemo,
          likes: prevMemo.likes + 1,
        }));
      }
    } catch (error) {
      console.error("Failed to like post:", error);
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
          <Title>{memo.title || "제목없음"}</Title>
          <ButtonsContainer>
            <BtnStyle onClick={handleEdit}>수정</BtnStyle>
            <BtnStyle onClick={handleDeletePost}>삭제</BtnStyle>
            <BtnStyle onClick={handleLike}>
              <FaThumbsUp /> {memo.likes}
            </BtnStyle>
          </ButtonsContainer>
        </HeaderContainer>

        <InfoContainer>
          <Name>익명</Name>
        </InfoContainer>

        <LikeDateContainer>
          <div>
            <FaEye /> {memo.view}
          </div>
          <div>&nbsp;|&nbsp;</div>
          <div>{formattedDate}</div>
        </LikeDateContainer>

        <ContentSection>
          <ContentText>{memo.content || "제목없음"}</ContentText>
          {memo.imageUrl && (
            <ImageStyle src={memo.imageUrl} alt="오늘의 사진" />
          )}
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
              memo.comments.map((c) => (
                <CommentItem key={c.commentId}>
                  {editingCommentId === c.commentId ? (
                    <form onSubmit={handleEditComment}>
                      <InputStyle
                        type="text"
                        value={editingCommentContent}
                        onChange={(e) =>
                          setEditingCommentContent(e.target.value)
                        }
                      />
                      <SubmitButton type="submit">수정 완료</SubmitButton>
                      <BtnStyle onClick={() => setEditingCommentId(null)}>
                        취소
                      </BtnStyle>
                    </form>
                  ) : (
                    <>
                      <CommentText>{c.content}</CommentText>
                      <EditButton
                        onClick={() => {
                          setEditingCommentId(c.commentId);
                          setEditingCommentContent(c.content);
                        }}
                      >
                        수정
                      </EditButton>
                      <DeleteButton
                        onClick={() => handleDeleteComment(c.commentId)}
                      >
                        삭제
                      </DeleteButton>
                    </>
                  )}
                </CommentItem>
              ))}
          </CommentList>
        </CommentContainer>
      </MemoContainer>
    </Page>
  );
};

export default DetailPage;
