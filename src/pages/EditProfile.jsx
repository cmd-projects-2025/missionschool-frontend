import "./css/EditProfile.css";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Footer from "../components/footer";

const EditProfile = () => {
  const nav = useNavigate();

  const handleSave = () => {
    alert("회원정보가 수정되었습니다.");
    nav("/MyPage");
  };

  const handleDeleteAccount = () => {
    if (window.confirm("정말 탈퇴하시겠습니까?")) {
      alert("회원 탈퇴가 완료되었습니다.");
      nav("/");
    }
  };

  return (
    <div>
      <Header />
      <div className="edit-profile-container">
        <h2>회원정보 수정</h2>
        <div className="form-group">
          <label>닉네임</label>
          <input type="text" placeholder="새 닉네임 입력" />
        </div>
        <div className="form-group">
          <label>아이디</label>
          <input type="text" placeholder="새 아이디 입력" />
        </div>
        <div className="form-group">
          <label>비밀번호</label>
          <input type="password" placeholder="새 비밀번호 입력" />
        </div>
        <div className="button-group">
          <Button text="저장" onClick={handleSave} type="success" />
          <Button
            text="회원 탈퇴"
            onClick={handleDeleteAccount}
            className="delete-btn"
            type="danger"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EditProfile;
