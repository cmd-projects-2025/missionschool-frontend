import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Bulletin from "./pages/Bulletin";
import Join from "./pages/Join";
import Login from "./pages/Login";
import FindId from "./pages/FindId";
import FindPassword from "./pages/FindPassword";
import Notfound from "./pages/Notfound";
import MyPage from "./pages/MyPage";
import View from "./pages/View";
import Write from "./pages/Write";
import MessageWrite from "./pages/MessageWrite";
import MessageList from "./pages/MessageList";
import MessageView from "./pages/MessageView";
import EditProfile from "./pages/EditProfile";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Join" element={<Join />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Bulletin" element={<Bulletin />} />
        <Route path="/FindId" element={<FindId />} />
        <Route path="/FindPassword" element={<FindPassword />} />
        <Route path="/MyPage" element={<MyPage />} />
        <Route path="/View" element={<View />} />
        <Route path="/Write" element={<Write />} />
        <Route path="/MessageWrite" element={<MessageWrite />} />
        <Route path="/MessageList" element={<MessageList />} />
        <Route path="/MessageView" element={<MessageView />} />
        <Route path="/EditProfile" element={<EditProfile />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </>
  );
}

export default App;
