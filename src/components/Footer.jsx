import "./Footer.css";

const Footer = () => {
  return (
    <div className="Footer">
      <p>Random-spin</p>
      <p>© 2025 Random-spin. All rights reserved.</p>
      <div className="footer-meta">
        <a
          href="https://github.com/do-haru/random-spin.git"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        <span className="footer-divider">|</span>
        <span className="footer-version">Version 1.0.0</span>
      </div>
      <p className="footer-email">doharu05@naver.com</p>

      <p className="footer-font">Typeface: NEXON Lv1 Gothic © NEXON Korea</p>
    </div>
  );
};

export default Footer;
