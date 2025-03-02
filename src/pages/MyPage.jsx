import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axiosInstance";
import Button from "../components/Button";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useAuth } from "../hooks/useAuth";
import { getProfileImage } from "../util/get-profile-image";
import "./css/MyPage.css";

const MyPage = () => {
  const nav = useNavigate();
  const { isLoggedIn, logout } = useAuth();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (!isLoggedIn) {
      nav("/login");
      return;
    }

    const fetchUserData = async () => {
      try {
        const token =
          localStorage.getItem("jwt") || sessionStorage.getItem("jwt");
        const response = await axios.get("/api/user/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(response.data);
      } catch (error) {
        console.error(
          "사용자 정보 가져오기 실패:",
          error.response?.status,
          error.message
        );
        nav("/login");
      }
    };

    fetchUserData();
  }, [isLoggedIn, nav]);

  const handleDeleteAccount = async () => {
    if (window.confirm("정말 탈퇴하시겠습니까?")) {
      try {
        const token =
          localStorage.getItem("jwt") || sessionStorage.getItem("jwt");
        const response = await axios.delete("/api/user/delete", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        alert(response.data);
        logout();
      } catch (error) {
        console.error("회원 탈퇴 실패:", error);
        alert("회원 탈퇴에 실패했습니다.");
      }
    }
  };

  if (!userData) {
    return <div>로딩 중...</div>;
  }

  return (
    <div>
      <Header />
      <div className="mypage-container">
        <div className="profile-section">
          <div className="profile-info">
            <div className="profile-image">
              <img
                src={getProfileImage(1)}
                alt="프로필"
                className="profile-image"
              />
            </div>
            <p className="nickname">{userData.nickname || "닉네임 없음"}</p>
          </div>
          <Button text="회원정보 수정" onClick={() => nav("/EditProfile")} />
        </div>
        <div className="posts-section">
          <h3>내가 쓴 글</h3>
          <ul className="post-list">
            <li onClick={() => nav(`/bulletin/view/${post.id}`)}>글 제목 1</li>
          </ul>
        </div>
      </div>
      <div className="posts-section buttonSection">
        <div></div>
        <Button
          text="회원 탈퇴"
          onClick={handleDeleteAccount}
          className="delete-btn"
          type="danger"
        />
      </div>
      <Footer />
    </div>
  );
};

export default MyPage;
