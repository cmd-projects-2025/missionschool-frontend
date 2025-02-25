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
    const checkLoginStatus = async () => {
      const token = localStorage.getItem("jwt") || sessionStorage.getItem("jwt");
      if (token) {
        try {
          const response = await axios.get("/api/user/status");
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
      // 서버 요청은 선택적이므로 주석 처리 가능
      await axios.put("/api/user/logout");
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