import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axiosInstance";
import Button from "../components/Button";
import Footer from "../components/Footer";
import Header from "../components/Header";
import "./css/Write.css";

const Write = () => {
  const nav = useNavigate();
  
  // 폼 데이터 상태 관리
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    urgent: false,
    writerId: "testUser" // 임시로 하드코딩
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault(); // 기본 폼 제출 방지

    try {
      const response = await axios.post("http://localhost:8080/api/bulletin/write", formData);
      console.log("게시글 작성 성공:", response.data);
      nav("/View"); // 성공 시 이동
    } catch (error) {
      console.error("게시글 작성 실패:", error);
      alert("게시글 작성에 실패했습니다.");
    }
  };

  return (
    <div>
      <Header />
      <div className="write-page">
        <h2>글쓰기</h2>
        <form className="write-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">제목</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">내용</label>
            <textarea
              id="description"
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">가격</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group checkbox">
            <label htmlFor="urgent">급구[1000원]</label>
            <input
              type="checkbox"
              id="urgent"
              name="urgent"
              checked={formData.urgent}
              onChange={handleChange}
            />
          </div>
          <div className="form-buttons">
            <Button
              className="back-button"
              onClick={() => nav(-1)}
              text="뒤로가기"
            />
            <Button type="submit" text="완료" variant="success" />
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Write;
