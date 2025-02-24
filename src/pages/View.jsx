import React, { useState } from "react";
import "./css/View.css";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Footer from "../components/footer";

import { getProfileImage } from "../util/get-profile-image";
import { div } from "framer-motion/client";

const View = () => {
  const [title, setTitle] = useState("게시글 제목");
  const [profileId, setProfileId] = useState(1);
  const [rating, setRating] = useState(3);
  const [reportReason, setReportReason] = useState("");
  const [content, setContent] = useState(
    "게시글 내용: 여기에 글 내용이 들어갑니다."
  );
  const [showProfileModal, setShowProfileModal] = useState(false); // 프로필 모달 상태

  const reportOptions = [
    "낚시/놀람/도배",
    "정당/정치인 비하 및 선거운동",
    "게시판 성격에 부적절함",
    "상업적 광고 및 판매",
    "유출/사칭/사기",
    "음란물/불건전한 만남 및 대화",
    "욕설/비하",
    "불법촬영물 등의 유통",
  ];

  const nav = useNavigate();

  const handleProfileClick = () => {
    setShowProfileModal(true); // 프로필 클릭 시 모달을 열기
  };

  const handleRatingClick = (rating) => {
    setRating(rating); // 별점 클릭 시 평점 변경
  };

  const handleReportSubmit = () => {
    console.log("신고 사유:", reportReason);
    setShowProfileModal(false); // 신고 후 모달 닫기
  };

  return (
    <div className="View">
      <Header />
      <div className="View-container">
        <div className="post-header">
          <h2>{title}</h2>
          <div className="profile-section" onClick={handleProfileClick}>
            <img
              src={getProfileImage(profileId)}
              alt="프로필"
              className="profile-image"
            />
          </div>
        </div>

        <div className="content-section">
          <p>{content}</p>
        </div>

        <div className="buttons">
          <Button
            className="back-button"
            onClick={() => nav(-1)}
            text="뒤로가기"
          />

          <Button
            className="send-button"
            text="쪽지 보내기"
            onClick={() => nav("/MessageWrite")}
            type="success"
          />
          {/* <Button
            className="send-button"
            text="수정하기"
            onClick={() => nav("/Write")}
            type="success"
          /> */}
        </div>

        {/* 프로필 모달 */}
        {showProfileModal && (
          <div className="profile-modal">
            <div className="modal-content">
              <h3>프로필</h3>
              <img
                src={getProfileImage(profileId)}
                alt="프로필"
                className="profile-modal-image"
              />

              <div className="modal_wrap">
                <div className="rating">
                  <h4>별점</h4>
                  {Array.from({ length: 5 }, (_, index) => (
                    <span
                      key={index}
                      onClick={() => handleRatingClick(index + 1)}
                      className={index < rating ? "selected" : ""}
                    >
                      ★
                    </span>
                  ))}
                </div>

                <div className="report-section">
                  <h4>신고하기</h4>
                  <select
                    value={reportReason}
                    onChange={(e) => setReportReason(e.target.value)}
                  >
                    <option value="">신고 사유 선택</option>
                    {reportOptions.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <button
                    className="report-submit"
                    onClick={handleReportSubmit}
                  >
                    신고하기
                  </button>
                </div>
              </div>

              <button
                className="close-modal"
                onClick={() => setShowProfileModal(false)}
              >
                닫기
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default View;
