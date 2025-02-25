import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Footer from "../components/footer";
import Header from "../components/Header";
import { getProfileImage } from "../util/get-profile-image";
import "./css/MyPage.css";

const MyPage = () => {
  const nav = useNavigate();
  const handleDeleteAccount = () => {
    if (window.confirm("정말 탈퇴하시겠습니까?")) {
      alert("회원 탈퇴가 완료되었습니다.");
      nav("/");
    }
  };
  return (
    <div>
      <Header />
      <div className="mypage-container">
        <div className="profile-section">
          <div className="profile-info">
            <div className="profile-image">
              <img
                src={getProfileImage(1)}
                alt="프로필"
                className="profile-image"
              />
            </div>
            <p className="nickname">닉네임</p>
          </div>
          <Button text="회원정보 수정" onClick={() => nav("/EditProfile")} />
        </div>
        <div className="posts-section">
          <h3>내가 쓴 글</h3>
          <ul className="post-list" onClick={() => nav("/Update")}>
            <li>글 제목 1</li>
            <li>글 제목 2</li>
            <li>글 제목 3</li>
          </ul>
        </div>
      </div>
      <div className="posts-section buttonSection">
        <div></div>
        <Button
          text="회원 탈퇴"
          onClick={handleDeleteAccount}
          className="delete-btn"
          type="danger"
        />
      </div>
      <Footer />
    </div>
  );
};

export default MyPage;
