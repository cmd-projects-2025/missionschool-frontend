import React, { useState } from "react";
import "./css/MessageWrite.css";
import Header from "../components/Header";
import Button from "../components/Button";
import { getProfileImage } from "../util/get-profile-image";
import { useNavigate } from "react-router-dom";
import Footer from "../components/footer";

const MessageWrite = () => {
  const nav = useNavigate();
  return (
    <div>
      <Header />
      <div className="MessageWrite-container">
        {/* 프로필 */}
        <div className="profile">
          <img src={getProfileImage(1)} alt="Profile" className="profile-img" />
          <p>닉네임</p>
        </div>

        <div className="MessageWriteInner">
          {/* 글 제목 */}
          <div className="MessageWrite-title">
            <h2>글 제목</h2>
          </div>

          {/* 글 내용 */}
          <div className="MessageWrite-content">
            <p>글 내용</p>
          </div>

          {/* 쪽지 내용 입력 */}
          <div className="note-section">
            <textarea
              className="note-input"
              placeholder="쪽지 내용을 입력하세요"
            ></textarea>
          </div>

          {/* 쪽지 보내기 버튼 */}
          <div className="send-button">
            <Button
              text="쪽지 보내기"
              type="success"
              onClick={() => {
                alert("쪽지가 전송되었습니다!");
                nav("/MessageView");
              }}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MessageWrite;
