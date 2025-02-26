import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axiosInstance";
import Button from "../components/Button";
import Footer from "../components/Footer";
import Header from "../components/Header";
import "./css/Login.css";

const Login = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const response = await axios.post(
        "/api/user/login",
        { username: id, password: password }
      );

      const token = response.headers["authorization"]?.replace("Bearer ", "");
      if (!token) {
        throw new Error("토큰을 받지 못했습니다.");
      }

      if (rememberMe) {
        localStorage.setItem("jwt", token);
      } else {
        sessionStorage.setItem("jwt", token);
      }

      if (response.status === 200) {
        alert("로그인 성공!");
        navigate("/");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          setErrorMessage("아이디 또는 비밀번호가 잘못되었습니다.");
        } else {
          setErrorMessage(`로그인 중 오류가 발생했습니다: ${error.response.status}`);
        }
      } else if (error.request) {
        setErrorMessage("서버와 연결할 수 없습니다.");
      } else {
        setErrorMessage(`로그인 요청 중 오류: ${error.message}`);
      }
    }
  };

  return (
    <>
      <Header />
      <div className="login-container">
        <h2>로그인</h2>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="id">아이디</label>
            <input
              type="email"
              id="id"
              value={id}
              onChange={(e) => setId(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="options">
            <label>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              자동 로그인
            </label>
          </div>

          <Button text="로그인" type="submit" />

          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

          <br />
          <br />
          <Button onClick={() => navigate("/Join")} text={"회원가입"} type="primary" />
          <div className="links">
            <a href="/FindId">아이디 찾기</a> | <a href="/FindPassword">비밀번호 찾기</a>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Login;