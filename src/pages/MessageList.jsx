import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Footer from "../components/footer";
import Header from "../components/Header";
import { getProfileImage } from "../util/get-profile-image";
import "./css/MessageList.css";

const messages = [
  { id: 1, nickname: "User1", profile: getProfileImage(1) },
  { id: 2, nickname: "User2", profile: getProfileImage(2) },
  { id: 3, nickname: "User3", profile: getProfileImage(3) },
];

const MessageList = () => {
  const nav = useNavigate();
  return (
    <div>
      <Header />
      <div className="message-list-container">
        <h2 className="message-list-title">쪽지함</h2>
        <ul className="message-list">
          {messages.map((msg) => (
            <li key={msg.id} className="message-item">
              <img
                src={msg.profile}
                alt={msg.nickname}
                className="message-avatar"
              />
              <span className="message-nickname">{msg.nickname}</span>
              <Button
                className="message-button"
                text="쪽지 보기"
                onClick={() => nav("/MessageView")}
              />
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </div>
  );
};

export default MessageList;
