import "./css/MessageView.css";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { getProfileImage } from "../util/get-profile-image";

const MessageView = () => {
  const nav = useNavigate();
  return (
    <div>
      <Header />
      <div className="message-container">
        <h2 className="message-title">쪽지함</h2>
        <div className="message-view">
          <p>글제목</p>
          <p>글 내용</p>
        </div>
        <div className="message-content">
          <div className="message-box">
            <div className="message-info">
              <p>보낸 사람: 제가 하겠습니다. </p>
              <p>받은 사람: 감사합니다.</p>
            </div>
            <div className="message-actions">
              <Button text="쪽지함 가기" onClick={() => nav("/MessageList")} />
              <Button text="쪽지 쓰기" onClick={() => nav("/MessageWrite")} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageView;
