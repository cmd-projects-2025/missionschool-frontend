import "./css/Write.css";
import Header from "../components/Header";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Footer from "../components/footer";

const Write = () => {
  const nav = useNavigate();
  const [isUrgent, setIsUrgent] = useState(false);

  return (
    <div>
      <Header />
      <div className="write-page">
        <h2>글쓰기</h2>
        <form className="write-form">
          <div className="form-group">
            <label htmlFor="title">제목</label>
            <input type="text" id="title" name="title" required />
          </div>
          <div className="form-group">
            <label htmlFor="content">내용</label>
            <textarea id="content" name="content" rows="4" required></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="price">가격</label>
            <input type="number" id="price" name="price" required />
          </div>
          <div className="form-group checkbox">
            <label htmlFor="urgent">급구[1000원]</label>
            <input type="checkbox" />
          </div>
          <div className="form-buttons">
            <Button
              className="back-button"
              onClick={() => nav(-1)}
              text="뒤로가기"
            />
            <Button onClick={() => nav("/View")} text="완료" type="success" />
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Write;
