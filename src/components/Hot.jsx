import "./Hot.css";
import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const posts = [
  {
    title: "첫 번째 글",
    content: "이것은 첫 번째 글입니다.",
    price: "10,000원",
  },
  {
    title: "두 번째 글",
    content: "이것은 두 번째 글입니다.",
    price: "20,000원",
  },
  {
    title: "세 번째 글",
    content: "이것은 세 번째 글입니다.",
    price: "30,000원",
  },
  {
    title: "네 번째 글",
    content: "이것은 네 번째 글입니다.",
    price: "40,000원",
  },
  {
    title: "다섯 번째 글",
    content: "이것은 다섯 번째 글입니다.",
    price: "50,000원",
  },
  {
    title: "여섯 번째 글",
    content: "이것은 여섯 번째 글입니다.",
    price: "50,000원",
  },
];

const Hot = () => {
  const sliderRef = useRef(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (sliderRef.current) {
      setWidth(sliderRef.current.scrollWidth - sliderRef.current.offsetWidth);
    }
  }, []);
  const nav = useNavigate();
  return (
    <div className="Hot">
      <h2>급구</h2>
      <div className="slider-container">
        <motion.div
          ref={sliderRef}
          className="slider"
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
        >
          {posts.map((post, index) => (
            <div className="slide" key={index}>
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              <span>{post.price}</span>
              <br />
              <Button
                onClick={() => nav(`/bulletin/view/${post.id}`)}
                text="글보기"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Hot;
