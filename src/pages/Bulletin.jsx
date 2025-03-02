import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axiosInstance";
import Button from "../components/Button";
import Footer from "../components/Footer";
import Header from "../components/Header";
import "./css/Bulletin.css";

// Utility function to manage profile images
import { getProfileImage } from "../util/get-profile-image";

const Bulletin = () => {
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
      setPosts(response.data.content); // 페이지에 해당하는 게시글 리스트
      setTotalPosts(response.data.totalElements); // 전체 게시글 수
    } catch (error) {
      console.error("게시글 불러오기 실패:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [currentPage, sortBy, search]); // currentPage, sortBy, search가 바뀔 때마다 호출

  // 페이징 계산
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  return (
    <div className="Bulletin">
      <Header />
      <div className="bulletin-container">
        <div className="bulletin-header">
          <input
            type="text"
            placeholder="검색"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button
            onClick={() => setSortBy(sortBy === "date" ? "price" : "date")}
            text={`정렬: ${sortBy === "date" ? "날짜" : "가격"}`}
          />
          <Button
            className="write-btn"
            text="+ 글쓰기"
            onClick={() => nav("/Write")}
            type="primary"
          />
        </div>

        <div className="post-list">
          {posts.map((post) => (
            <div
              key={post.id}
              className="post-card"
              onClick={() => nav(`/bulletin/view/${post.id}`)} // 상세 페이지로 이동
            >
              <div className="post-info">
                <img
                  src={getProfileImage(post.profileId)}
                  alt="프로필"
                  className="profile-image"
                />
                <div className="title">
                  {post.title}
                  <span className="price"> [{post.price}]</span>
                </div>
              </div>
              <div className="rating-container">
                <div className="rating">{post.rating || "★"}</div>
                <div className="date">
                  {new Date(post.createdAt).toLocaleDateString()}{" "}
                  {/* 날짜 포맷 */}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 페이지네이션 */}
        <div className="pagination">
          {[...Array(totalPages).keys()].map((number) => (
            <button
              key={number + 1}
              onClick={() => setCurrentPage(number + 1)}
              className={currentPage === number + 1 ? "active" : ""}
            >
              {number + 1}
            </button>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Bulletin;
