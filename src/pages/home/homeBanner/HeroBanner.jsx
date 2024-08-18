import React, { useState, useEffect } from "react";
import useFetch from "../../../hooks/useFetch";
import LazyLoadImage from "../../../components/lazyload/LazyLoad";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import "./style.scss";
import { useNavigate } from "react-router-dom";
const HeroBanner = () => {
  const [backgroundImage, setBackgroundImage] = useState("");
  const [heroBannerMovieData, setHeroBannerMovieData] = useState(null);
  const { data, loading } = useFetch("movie/upcoming");
  const { url } = useSelector((state) => state.home);
  const navigate = useNavigate();
  // to get random movie data
  // start
  useEffect(() => {
    const index = Math.floor(Math.random() * 20);
    const bg = url?.backdrop + data?.results?.[index]?.backdrop_path;
    setHeroBannerMovieData(data?.results?.[index]);
    setBackgroundImage(bg);
  }, [data]);
  // end

  // console.log(heroBannerMovieData);

  return (
    <div className="HeroBanner">
      <div className="heroBgImg">
        <LazyLoadImage src={backgroundImage} />
        <div className="heroImginfo">
          <h2 className="banner-title">{`${
            heroBannerMovieData?.title
              ? heroBannerMovieData?.title
              : "Movies for you"
          }`}</h2>
          <div className="banner-info">
            {" "}
            Release Date -{" "}
            {heroBannerMovieData?.release_date
              ? dayjs(heroBannerMovieData?.release_date).format("MMM D, YYYY")
              : "1-1-1"}
          </div>
          <p className="banner-overview"> {heroBannerMovieData?.overview} </p>
          <div className="action-buttom-container">
            <button className="action-button playbtn">play</button>
            <button
              className="action-button infobtn"
              onClick={() =>
                navigate(
                  `${heroBannerMovieData?.media_type || "movie"}/${
                    heroBannerMovieData.id
                  }`
                )
              }
            >
              More info
            </button>
          </div>
        </div>
      </div>
      <div className="opacitylayer"></div>
    </div>
  );
};

export default HeroBanner;
