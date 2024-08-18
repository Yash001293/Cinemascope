import React from "react";
import { useNavigate } from "react-router-dom";
import pagenotfound from "../../assets/pagenotfound.jpg";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import "./style.scss";
// page not found ka svg dal de

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <div>
      <ContentWrapper>
        <div className="mainContainer">
          <div className="pagenotfound">
            <img src={pagenotfound} alt="pagenotfound" />
          </div>
          <div className="notfoundpageinfo">
            <h2>Ooos !! Something Went Wrong</h2>
            <p>Not to worry we will be up & running shortly.</p>
          </div>
          <button
            className="gotohomebtn"
            onClick={() => {
              navigate("/");
            }}
          >
            Go back to Homepage
          </button>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default PageNotFound;
