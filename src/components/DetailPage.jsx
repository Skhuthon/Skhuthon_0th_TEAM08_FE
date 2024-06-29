import React, { useEffect, useState } from "react";
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
  width: 90%;
  max-width: 600px;
  background-color: white;
  padding: 20px;
  margin: 20px;
`;

const Title = styled.p`
  font-size: 24px;
  margin-bottom: 10px;
`;


const Content = styled.p`
  font-size: 16px;
  line-height: 1.5;
`;

const DetailPage = () => {
  const { id } = useParams();
  const [memo, setMemo] = useState(null);
  const [loading, setLoading] = useState(true);

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
        <Title>{memo.title}1</Title>
      </MemoContainer>
    </Page>
  );
};

export default DetailPage;
