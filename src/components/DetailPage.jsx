import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";

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
    return <ClipLoader loading={loading} />;
  }
  if (!memo) {
    return <div>메모가 없음.</div>;
  }
  return (
    <div>
      <h2>{memo.title}</h2>
      <p>{memo.emotion}</p>
      <p>{memo.content}</p>
    </div>
  );
};
export default DetailPage;
