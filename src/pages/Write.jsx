import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axiosInstance";
import Button from "../components/Button";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useAuth } from "../hooks/useAuth";
import "./css/Write.css";

const Write = () => {
  const nav = useNavigate();
  const { isLoggedIn, user } = useAuth();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    urgent: false,
    writerId: "",
  });

  useEffect(() => {
    console.log("Write useEffect - isLoggedIn:", isLoggedIn, "user:", user);
    if (!isLoggedIn) {
      nav("/login");
      return;
    }
    if (user && !formData.writerId) {
      // 한 번만 설정
      setFormData((prev) => ({
        ...prev,
        writerId: user.username || "unknown",
      }));
    }
  }, [isLoggedIn, user, nav, formData.writerId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("jwt") || sessionStorage.getItem("jwt");
    if (!token || !isLoggedIn) {
      alert("로그인이 필요합니다.");
      nav("/login");
      return;
    }
    try {
      const response = await axios.post("/api/bulletin/write", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      nav(`/bulletin/view/${response.data.id}`);
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
            <label htmlFor="nickname">작성자</label>
            <input
              type="text"
              id="nickname"
              name="nickname"
              value={formData.nickname}
              onChange={handleChange}
              required
              placeholder="" // @닉네임 뜨게 어떻게 하나요?
              /* readOnly */
            />
          </div>
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
