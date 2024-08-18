import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";
import "./footer.scss";
import ContentWrapper from "../contentWrapper/ContentWrapper";
const Footer = () => {
  const data = new Date();
  let year = data.getFullYear();
  return (
    <footer className="footer">
      <ContentWrapper>
        <footer className="footerContent">
          <div className="footer__addr">
            <h1 className="footer__logo">CINEMASCOPE</h1>
            <h2>Contact</h2>
            <address className="addresss">
              1111 Somewhere In. The World The North Pole is 90° N; the South
              Pole is 90° S.
            </address>
            <button className="button" href="mailto:example@gmail.com">
              Email Us
            </button>
          </div>
          <div className="socialMediaLinks">
            <span className="link">
              <FaFacebookF />
            </span>
            <span className="link">
              <FaInstagram />
            </span>
            <span className="link">
              <FaTwitter />
            </span>
            <span className="link">
              <FaLinkedin />
            </span>
          </div>
          <div className="legal">
            <p>&copy; {year} Something. All rights reserved.</p>
            <div className="legal__links">
              <span>
                Made with <span className="heart">♥</span>
              </span>
            </div>
          </div>
        </footer>
      </ContentWrapper>
    </footer>
  );
};

export default Footer;
