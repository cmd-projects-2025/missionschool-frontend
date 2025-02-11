import React, { useState } from "react";
import "./css/findId.css";
import Header from "../components/Header";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const FindId = () => {
  const [Phonenumber, setPhonenumber] = useState("");
  const [foundId, setFoundId] = useState(null);

  const nav = useNavigate();

  const handleFindId = (e) => {
    e.preventDefault();

    // 전화번호 형식 검사
    const phonePattern = /^[0-9]{3}-[0-9]{3,4}-[0-9]{4}$/;
    if (!phonePattern.test(Phonenumber)) {
      alert("전화번호 형식이 올바르지 않습니다. 올바른 형식: 010-1234-5678");
      return;
    }

    // 전화번호에 해당하는 아이디 찾기 (예시 데이터)
    const userDatabase = {
      "010-1234-5678": "user123",
      "010-2345-6789": "user456",
      "010-3456-7890": "user789",
    };

    if (userDatabase[Phonenumber]) {
      setFoundId(userDatabase[Phonenumber]);
      alert(`찾은 아이디: ${userDatabase[Phonenumber]}`);
    } else {
      setFoundId(null);
      alert("해당 전화번호로 가입된 아이디가 없습니다.");
    }
  };

  return (
    <div className="FindId">
      <Header />
      <div className="findId-container">
        <h2>아이디 찾기</h2>
        <form onSubmit={handleFindId}>
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

          <Button type="submit" className="findId-btn" text="아이디 찾기" />
        </form>
      </div>
    </div>
  );
};

export default FindId;
