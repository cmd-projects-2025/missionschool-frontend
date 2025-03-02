import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../api/axiosInstance";
import Button from "../components/Button";
import Footer from "../components/Footer";
import Header from "../components/Header";
import icon from "../assets/icon.png";
import { getProfileImage } from "../util/get-profile-image";
import "./css/View.css";

const View = () => {
  const nav = useNavigate();
  const { id } = useParams();

  const [title, setTitle] = useState("게시글 제목");
  const [profileId, setProfileId] = useState(1);
  const [rating, setRating] = useState(3);
  const [reportReason, setReportReason] = useState("");
  const [content, setContent] = useState(
    "게시글 내용: 여기에 글 내용이 들어갑니다."
  );
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showOptions, setShowOptions] = useState(false); // 버튼 보이기 상태 추가

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

  // 데이터 가져오기
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`/api/bulletin/view/${id}`);
        const post = response.data;
        setTitle(post.title);
        setProfileId(post.writerId);
        setContent(post.description);
      } catch (error) {
        console.error("게시글 조회 실패:", error);
        nav(-1); // 실패 시 이전 페이지로 이동
      }
    };
    fetchPost();
  }, [id, nav]);

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

  const toggleOptions = () => {
    setShowOptions(!showOptions); // 옵션 버튼 토글
  };

  return (
    <div className="View">
      <Header />
      <div className="View-container">
        <div className="icon">
          <img
            src={icon}
            alt="아이콘"
            onClick={toggleOptions} // 아이콘 클릭 시 옵션 보이기
          />
          {/* 아이콘 클릭 시 표시되는 옵션들 */}
          {showOptions && (
            <div className="options">
              <button onClick={() => nav("/Update")}>수정하기</button>
              <button>삭제하기</button>
              <button>마감하기</button>
            </div>
          )}
        </div>

        <div className="post-header">
          <div>
            <p>작성자</p>
            <h2>{title}</h2>
          </div>
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
          <p>
            <b>가격: </b>
            {}원
          </p>
          <div>
            <p className="date">2025-00-00</p>
            <p>조회수: </p>
          </div>
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
        </div>

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
