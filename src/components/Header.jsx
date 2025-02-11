import "./Header.css";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import message from "../assets/message.png";

const Header = () => {
  const nav = useNavigate();
  return (
    <header className="Header">
      <div className="header_right">
        <h2 onClick={() => nav("/")}>LOGO</h2>
      </div>
      <div className="header_left">
        <Button onClick={() => nav("/Login")} text={"로그인"} />
        <Button onClick={() => nav("/Join")} text={"회원가입"} />
        <Button onClick={() => nav("/MyPage")} text={"마이페이지"} />
        <img
          src={message}
          className="messageImg"
          onClick={() => nav("/MessageList")}
        />
        <div className="notification-container">
          <span className="notification-icon">🔔</span>
          <span id="notification-badge" className="notification-badge">
            0
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
