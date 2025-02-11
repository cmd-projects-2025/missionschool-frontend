import React, { useState } from "react";
import "./css/findPassword.css";
import Header from "../components/Header";
import Button from "../components/Button";

const FindPassword = () => {
  const [email, setEmail] = useState("");
  const [Phonenumber, setPhonenumber] = useState("");
  const [foundPassword, setFoundPassword] = useState(null);

  const handleFindPassword = (e) => {
    e.preventDefault();

    // 이메일 형식 검사
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      alert("올바른 이메일 형식을 입력하세요.");
      return;
    }

    // 전화번호 형식 검사
    const phonePattern = /^[0-9]{3}-[0-9]{3,4}-[0-9]{4}$/;
    if (!phonePattern.test(Phonenumber)) {
      alert("전화번호 형식이 올바르지 않습니다. (예: 010-1234-5678)");
      return;
    }

    // 이메일과 전화번호에 해당하는 비밀번호 찾기 (예시 데이터)
    const userDatabase = {
      "user1@example.com": { phone: "010-1234-5678", password: "password123" },
      "user2@example.com": {
        phone: "010-2345-6789",
        password: "password1234",
      },
      "user3@example.com": {
        phone: "010-3456-7890",
        password: "password12345",
      },
    };

    if (userDatabase[email] && userDatabase[email].phone === Phonenumber) {
      setFoundPassword(userDatabase[email].password);
      alert(`찾은 비밀번호: ${userDatabase[email].password}`);
    } else {
      setFoundPassword(null);
      alert("입력한 정보와 일치하는 계정이 없습니다.");
    }
  };

  return (
    <div className="FindPassword">
      <Header />
      <div className="findPassword-container">
        <h2>비밀번호 찾기</h2>
        <form onSubmit={handleFindPassword}>
          <div className="input-group">
            <label htmlFor="email">이메일</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="Phonenumber">전화번호</label>
            <input
              type="text"
              id="Phonenumber"
              value={Phonenumber}
              onChange={(e) => setPhonenumber(e.target.value)}
              placeholder="010-1234-5678"
              required
            />
          </div>

          <Button
            type="submit"
            className="findPassword-btn"
            text="비밀번호 찾기"
          />
        </form>
      </div>
    </div>
  );
};

export default FindPassword;
