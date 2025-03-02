import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axiosInstance";
import "./Board.css";

const Board = () => {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const postsPerPage = 5;

  const nav = useNavigate();

  // 백엔드 API 호출 함수
  const fetchPosts = async () => {
    try {
      const response = await axios.get("/api/bulletin", {
        params: {
          page: currentPage - 1, // Spring은 페이지가 0부터 시작
          size: postsPerPage,
          sort: sortBy === "date" ? "createdAt,desc" : "price,desc", // 백엔드 정렬 기준
          search: search || undefined,
        },
      });
      setPosts(response.data.content.slice(0, 5)); // 최대 5개 게시글만 표시
      setTotalPosts(response.data.totalElements); // 전체 게시글 수
    } catch (error) {
      console.error("게시글 불러오기 실패:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [currentPage, sortBy, search]);

  return (
    <div className="board-container">
      <h2 onClick={() => nav("/Bulletin")}>게시판</h2>
      <table className="board-table">
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>가격</th>
          </tr>
        </thead>
        <tbody>
          {posts.slice(0, 5).map((post) => (
            <tr key={post.id} onClick={() => nav(`/bulletin/view/${post.id}`)}>
              <td>{post.id}</td>
              <td>{post.title}</td>
              {/* @ 작성자 */}
              <td>{post.nickname}</td>
              <td>{post.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Board;
