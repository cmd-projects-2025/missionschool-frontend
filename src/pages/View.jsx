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

  const [title, setTitle] = useState("");
  const [writerId, setWriterId] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [bulletinState, setBulletinState] = useState(false);
  const [viewCnt, setViewCnt] = useState(0);
  const [createdAt, setCreatedAt] = useState(null);
  const [updatedAt, setUpdatedAt] = useState(null);
  const [urgent, setUrgent] = useState(false);
  const [rating, setRating] = useState(3);
  const [reportReason, setReportReason] = useState("");
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

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

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`/api/bulletin/view/${id}`);
        const post = response.data;
        setTitle(post.title);
        setWriterId(post.writerId);
        setPrice(post.price);
        setDescription(post.description);
        setBulletinState(post.bulletinState);
        setViewCnt(post.viewCnt);
        setCreatedAt(post.createdAt);
        setUpdatedAt(post.updatedAt);
        setUrgent(post.urgent);
      } catch (error) {
        console.error("게시글 조회 실패:", error);
        nav(-1);
      }
    };
    fetchPost();
  }, [id, nav]);

  const handleProfileClick = () => setShowProfileModal(true);
  const handleRatingClick = (rating) => setRating(rating);
  const handleReportSubmit = () => {
    console.log("신고 사유:", reportReason);
    setShowProfileModal(false);
  };
  const toggleOptions = () => setShowOptions(!showOptions);

  return (
    <div className="View">
      <Header />
      <div className="View-container">
        <div className="icon">
          <img src={icon} alt="아이콘" onClick={toggleOptions} />
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
            <p>작성자: {writerId}</p>
          </div>
          <div className="profile-section" onClick={handleProfileClick}>
            <img
              src={getProfileImage(writerId)}
              alt="프로필"
              className="profile-image"
            />
          </div>
        </div>

        <div className="content-section">
          <p>{description}</p>
          <p>
            <b>가격: </b>
            {price.toLocaleString()}원
          </p>
          <div>
            <p className="date">{new Date(createdAt).toLocaleDateString()}</p>
            <p>조회수: {viewCnt}</p>
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
                src={getProfileImage(writerId)}
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
