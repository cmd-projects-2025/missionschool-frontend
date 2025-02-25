import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axiosInstance";
import message from "../assets/message.png";
import { getProfileImage } from "../util/get-profile-image";
import Button from "./Button";
import "./Header.css";

const Header = () => {
  const [isSlideMenuActive, setIsSlideMenuActive] = useState(false);
  const [profileId, setProfileId] = useState(1);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    // JWT 기반 로그인 상태 확인
    const checkLoginStatus = async () => {
      const token = localStorage.getItem("jwt") || sessionStorage.getItem("jwt");
      if (token) {
        try {
          const response = await axios.get("/api/user/status"); // JWT를 헤더에 자동 포함 (axiosInstance 설정)
          if (response.status === 200) {
            setIsLoggedIn(true);
          }
        } catch (error) {
          setIsLoggedIn(false);
          localStorage.removeItem("jwt");
          sessionStorage.removeItem("jwt");
        }
      } else {
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("/api/user/logout"); // 서버 로그아웃 API 호출 (선택적)
      localStorage.removeItem("jwt");
      sessionStorage.removeItem("jwt");
      setIsLoggedIn(false);
      alert("로그아웃 되었습니다.");
      nav("/");
    } catch (error) {
      alert("로그아웃 실패");
    }
  };

  const toggleSlideMenu = () => {
    setIsSlideMenuActive(!isSlideMenuActive);
  };

  return (
    <header className="Header">
      <div className="header_right">
        <h2 onClick={() => nav("/")}>LOGO</h2>
      </div>
      <div className="header_left">
        {isLoggedIn ? (
          <Button onClick={handleLogout} text={"로그아웃"} />
        ) : (
          <Button onClick={() => nav("/Login")} text={"로그인"} />
        )}
        <img
          src={getProfileImage(profileId)}
          alt="프로필"
          className="profile-image"
          title="프로필"
          onClick={() => nav("/MyPage")}
        />
        <img
          src={message}
          className="messageImg"
          onClick={() => nav("/MessageList")}
          alt="메시지"
        />
      </div>

      {/* 슬라이드 메뉴 */}
      <div className={`slide-menu ${isSlideMenuActive ? "active" : ""}`}>
        <ul>
          <li>
            <strong>보낸 사람:</strong> 내용 1
          </li>
          <li>
            <strong>보낸 사람:</strong> 내용 2
          </li>
          <li>
            <strong>보낸 사람:</strong> 내용 3
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;