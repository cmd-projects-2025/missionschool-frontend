import React, { useState } from "react";
import "./css/Login.css";
import Header from "../components/Header";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import Footer from "../components/footer";

const Login = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    alert(
      `ID: ${id}\nPassword: ${password}\n자동 로그인: ${
        rememberMe ? "On" : "Off"
      }`
    );
  };

  const nav = useNavigate();

  const handleSave = () => {
    alert("로그인되었습니다.");
    nav("/");
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

          <Button text="로그인" type="submit" onClick={handleSave} />
          <br />
          <br />
          <Button
            onClick={() => nav("/Join")}
            text={"회원가입"}
            type="primary"
          />
          <div className="links">
            <a href="/FindId">아이디 찾기</a> |{" "}
            <a href="/FindPassword">비밀번호 찾기</a>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Login;
