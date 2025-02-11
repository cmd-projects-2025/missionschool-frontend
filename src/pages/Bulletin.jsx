import React, { useState } from "react";
import "./css/Bulletin.css";
import Header from "../components/Header";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

// Utility function to manage profile images
import { getProfileImage } from "../util/get-profile-image";

const Bulletin = () => {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 2;

  const posts = [
    {
      id: 1,
      profileId: 1,
      rating: "★★★",
      title: "글",
      date: "11.09",
      price: "3,900원",
    },
    {
      id: 2,
      profileId: 2,
      rating: "★★",
      title: "글",
      date: "11.08",
      price: "10,000원",
    },
    {
      id: 3,
      profileId: 3,
      rating: "★★★★",
      title: "글",
      date: "10.09",
      price: "-",
    },
    {
      id: 4,
      profileId: 4,
      rating: "★",
      title: "글",
      date: "9.23",
      price: "-",
    },
  ];

  const sortedPosts = [...posts].sort((a, b) => {
    if (sortBy === "price") {
      const priceA = parseInt(a.price.replace(",", "").replace("원", "")) || 0;
      const priceB = parseInt(b.price.replace(",", "").replace("원", "")) || 0;
      return priceB - priceA;
    }
    return new Date(b.date) - new Date(a.date);
  });

  const filteredPosts = sortedPosts.filter((post) =>
    post.title.includes(search)
  );

  // 페이징 처리
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const nav = useNavigate();
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
          />
        </div>

        <div className="post-list">
          {currentPosts.map((post) => (
            <div
              key={post.id}
              className="post-card"
              onClick={() => nav("/View")}
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
                <div className="rating">{post.rating}</div>
                <div className="date">{post.date}</div>
              </div>
            </div>
          ))}
        </div>

        {/* 페이지네이션 */}
        <div className="pagination">
          {[
            ...Array(Math.ceil(filteredPosts.length / postsPerPage)).keys(),
          ].map((number) => (
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
    </div>
  );
};

export default Bulletin;
