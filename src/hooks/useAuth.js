import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../api/axiosInstance";

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("jwt") || !!sessionStorage.getItem("jwt"));
  const [user, setUser] = useState(null);
  const nav = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = localStorage.getItem("jwt") || sessionStorage.getItem("jwt");
      if (!token) {
        setIsLoggedIn(false);
        setUser(null);
        if (location.pathname !== "/") {
          nav("/login");
        }
        return;
      }
      try {
        const response = await axios.get("/api/user/status", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.status === 200) {
          setIsLoggedIn(true);
          const userData = typeof response.data === "string" ? { username: response.data } : response.data;
          setUser(userData);
        } else {
          setIsLoggedIn(false);
          setUser(null);
          localStorage.removeItem("jwt");
          sessionStorage.removeItem("jwt");
          if (location.pathname !== "/") {
            nav("/login");
          }
        }
      } catch (error) {
        console.error("API 호출 실패:", error.response?.status, error.message);
        setIsLoggedIn(false);
        setUser(null);
        localStorage.removeItem("jwt");
        sessionStorage.removeItem("jwt");
        if (location.pathname !== "/") {
          nav("/login");
        }
      }
    };

    checkLoginStatus();
  }, [nav, location]);

  const logout = async () => {
    try {
      const token = localStorage.getItem("jwt") || sessionStorage.getItem("jwt");
      if (token) {
        await axios.put("/api/user/logout", null, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      localStorage.removeItem("jwt");
      sessionStorage.removeItem("jwt");
      setIsLoggedIn(false);
      setUser(null);
      alert("로그아웃 되었습니다.");
      nav("/");
    } catch (error) {
      console.error("로그아웃 실패:", error);
      alert("로그아웃에 실패했습니다.");
    }
  };

  return { isLoggedIn, user, logout };
};
