import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Footer from "../components/Footer";
import Header from "../components/Header";
import "./css/Join.css";

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

  const [selectedSchool, setSelectedSchool] = useState("");
  const [selectedAreas, setSelectedAreas] = useState([]);

  const schools = ["학교 1", "학교 2", "학교 3"];
  const areas = ["동네 1", "동네 2", "동네 3", "동네 4"];

  const handleAreaChange = (area) => {
    setSelectedAreas((prev) =>
      prev.includes(area) ? prev.filter((a) => a !== area) : [...prev, area]
    );
  };

  return (
    <div>
      <Header />
      <div className="Join-container">
        <h2>회원정보 수정</h2>
        <div className="input-group">
          <label>비밀번호</label>
          <input type="password" placeholder="새 비밀번호 입력" />
        </div>
        <div className="input-group">
          <label>이름</label>
          <input type="text" placeholder="새 이름 입력" />
        </div>
        <div className="input-group">
          <label>닉네임</label>
          <input type="text" placeholder="새 닉네임 입력" />
        </div>
        <div className="select-container">
          {/* 학교 및 동네 선택 */}
          <div className="school-select">
            <label>학교 수정:</label>
            <select
              value={selectedSchool}
              onChange={(e) => setSelectedSchool(e.target.value)}
            >
              <option value="">학교를 수정하세요</option>
              {schools.map((school) => (
                <option key={school} value={school}>
                  {school}
                </option>
              ))}
            </select>
          </div>

          <div className="area-select">
            <label>동네 수정:</label>
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
        </div>
        <div className="button-group">
          <Button text="저장" onClick={handleSave} type="success" />
          <Button
            text="취소"
            onClick={nav(-1)}
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
