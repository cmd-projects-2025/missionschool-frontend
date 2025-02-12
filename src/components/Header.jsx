import React, { useState } from "react";
import "./Header.css";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import message from "../assets/message.png";

const Header = () => {
  const [isSlideMenuActive, setIsSlideMenuActive] = useState(false);
  const nav = useNavigate();

  const toggleSlideMenu = () => {
    setIsSlideMenuActive(!isSlideMenuActive);
  };

  return (
    <header className="Header">
      <div className="header_right">
        <h2 onClick={() => nav("/")}>LOGO</h2>
      </div>
      <div className="header_left">
        <Button onClick={() => nav("/Login")} text={"로그인"} />
        <Button onClick={() => nav("/MyPage")} text={"마이페이지"} />
        <img
          src={message}
          className="messageImg"
          onClick={() => nav("/MessageList")}
        />
        <div className="notification-container">
          <span className="notification-icon" onClick={toggleSlideMenu}>
            🔔
          </span>
          <span id="notification-badge" className="notification-badge">
            0
          </span>
        </div>
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
