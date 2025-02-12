import React, { useState } from "react";
import "./css/Join.css";
import "./css/SelectMember.css";
import Button from "../components/Button";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import Footer from "../components/footer";

const Join = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [Phonenumber, setPhonenumber] = useState("");
  const [agree, setAgree] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  const [selectedSchool, setSelectedSchool] = useState("");
  const [selectedAreas, setSelectedAreas] = useState([]);

  const [isJoined, setIsJoined] = useState(false); // 회원가입 여부 추적

  const schools = ["학교 1", "학교 2", "학교 3"];
  const areas = ["동네 1", "동네 2", "동네 3", "동네 4"];

  const handleJoin = (e) => {
    e.preventDefault();
    if (!agree) {
      alert("이용약관에 동의해야 회원가입이 가능합니다.");
      return;
    }

    // 전화번호 형식 검사
    const phonePattern = /^[0-9]{3}-[0-9]{3,4}-[0-9]{4}$/;
    if (!phonePattern.test(Phonenumber)) {
      alert("전화번호 형식이 올바르지 않습니다. 올바른 형식: 010-1234-5678");
      return;
    }

    // 회원가입 완료 후, 회원 선택 부분 표시
    alert(`회원가입 완료!\n이메일: ${email}\n닉네임: ${nickname}`);
    setIsJoined(true); // 회원가입 완료 상태로 설정
  };

  const handleAreaChange = (area) => {
    setSelectedAreas((prev) =>
      prev.includes(area) ? prev.filter((a) => a !== area) : [...prev, area]
    );
  };

  const nav = useNavigate();

  const handleCloseTerms = () => setShowTerms(false);

  return (
    <div>
      <Header />
      <div className="Join-container">
        {!isJoined ? (
          <div>
            {/* 회원가입 폼 */}
            <h2>회원가입</h2>
            <form onSubmit={handleJoin}>
              {/* 회원가입 정보 입력 */}
              <div className="input-group">
                <label htmlFor="email">이메일</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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

              <div className="input-group">
                <label htmlFor="nickname">닉네임</label>
                <input
                  type="text"
                  id="nickname"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
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

              {/* 이용약관 동의 */}
              <div className="terms">
                <label>
                  <input
                    type="checkbox"
                    checked={agree}
                    onChange={() => setAgree(!agree)}
                  />
                  이용약관에 동의합니다
                </label>
                <p
                  type="button"
                  className="terms-btn"
                  onClick={() => setShowTerms(true)}
                >
                  [보기]
                </p>
              </div>

              {/* 완료 버튼 */}
              <div className="submit-container">
                <Button type="success" className="Join-btn" text="가입하기" />
              </div>

              {/* 이용약관 팝업 */}
              {showTerms && (
                <div className="terms-popup">
                  <div className="terms-content">
                    <h3>이용약관</h3>
                    <p>이용약관 내용이 여기에 들어갑니다.</p>
                    <Button onClick={handleCloseTerms} text="닫기" />
                  </div>
                </div>
              )}
            </form>
          </div>
        ) : (
          // 회원 선택 부분
          <div className="select-container">
            <h2>회원 선택</h2>
            {/* 학교 및 동네 선택 */}
            <div className="school-select">
              <label>학교 선택:</label>
              <select
                value={selectedSchool}
                onChange={(e) => setSelectedSchool(e.target.value)}
              >
                <option value="">학교를 선택하세요</option>
                {schools.map((school) => (
                  <option key={school} value={school}>
                    {school}
                  </option>
                ))}
              </select>
            </div>

            <div className="area-select">
              <label>동네 선택:</label>
              <table>
                <tbody>
                  {areas.map((area) => (
                    <tr key={area}>
                      <td>
                        <input
                          type="checkbox"
                          checked={selectedAreas.includes(area)}
                          onChange={() => handleAreaChange(area)}
                        />
                      </td>
                      <td>{area}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* 선택 결과 */}
            <div className="selection-result">
              <h3>선택한 항목</h3>
              <p>학교: {selectedSchool || "선택 안 함"}</p>
              <p>
                동네:{" "}
                {selectedAreas.length > 0
                  ? selectedAreas.join(", ")
                  : "선택 안 함"}
              </p>
            </div>

            {/* 선택 완료 버튼 */}
            <div className="submit-container">
              <Button
                type="success"
                className="Join-btn"
                text="선택 완료"
                onClick={() => nav("/Login")}
              />
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Join;
