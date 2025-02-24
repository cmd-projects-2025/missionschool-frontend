import "./Footer.css";

const Footer = () => {
  return (
    <footer className="Footer">
      <div className="Footer_content">
        <p>&copy; {new Date().getFullYear()} My Website.</p>
        <nav>
          <a href="#">About</a>
          <a href="#">Contact</a>
          <a href="#">Privacy Policy</a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
