import React from "react";
import "./Board.css";
import { useNavigate } from "react-router-dom";

const Board = () => {
  const posts = [
    {
      id: 5,
      title: "다섯 번째 게시글",
      author: "유지현",
      price: 2000,
    },

    {
      id: 4,
      title: "네 번째 게시글",
      author: "유지현",
      price: 2000,
    },
    {
      id: 3,
      title: "세 번째 게시글",
      author: "홍길동",
      price: 2000,
    },
    {
      id: 2,
      title: "두 번째 게시글",
      author: "관리자",
      price: 1000,
    },
    {
      id: 1,
      title: "첫 번째 게시글",
      author: "유지현",
      price: 2000,
    },
  ];
  const nav = useNavigate();
  return (
    <div className="board-container" onClick={() => nav("/Bulletin")}>
      <h2>게시판</h2>
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
          {posts.map((post) => (
            <tr key={post.id}>
              <td>{post.id}</td>
              <td>{post.title}</td>
              <td>{post.author}</td>
              <td>{post.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Board;
