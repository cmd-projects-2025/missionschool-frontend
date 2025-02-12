import "./css/MyPage.css";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { getProfileImage } from "../util/get-profile-image";
import Footer from "../components/footer";

const MyPage = () => {
  const nav = useNavigate();
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
          <ul className="post-list" onClick={() => nav("/View")}>
            <li>글 제목 1</li>
            <li>글 제목 2</li>
            <li>글 제목 3</li>
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MyPage;
