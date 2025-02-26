import BoardHome from "../components/BoardHome";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Hot from "../components/Hot";

const Home = () => {
  return (
    <div>
      <Header />
      <Hot />
      <BoardHome />
      <Footer />
    </div>
  );
};

export default Home;
