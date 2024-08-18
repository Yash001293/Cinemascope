import React, { useEffect, useState } from "react";
import "./header.scss";
import ContenttWrapper from "../contentWrapper/ContentWrapper";
import { HiOutlineSearch } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
// import logo from "../../assets/logo.png";
import logo from "../../assets/images.png";
const Header = () => {
  const [lastScroll, setLastScroll] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const [show, setShow] = useState("top");
  const navigate = useNavigate();
  const searchQueryHandler = (e) => {
    if ((e.key === "Enter" && searchQuery.length > 0) || e.type === "click") {
      navigate(`/search/${searchQuery}`);
      setSearchQuery("");
    }
  };
  const handleScroll = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScroll) {
        setShow("hide");
      } else {
        setShow("show");
      }
    } else {
      setShow("top");
    }
    setLastScroll(window.scrollY);
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScroll]);
  return (
    <header className={`header ${show}`}>
      <ContenttWrapper>
        <div className="headerContent">
          <div className="logo" onClick={() => navigate("/")}>
            <img src={logo} alt="Cinescope" />
          </div>
          <div className="searchBox">
            <input
              className="inputSearchBox"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyUp={searchQueryHandler}
            />
            <HiOutlineSearch onClick={searchQueryHandler} />
          </div>
        </div>
      </ContenttWrapper>
    </header>
  );
};

export default Header;
