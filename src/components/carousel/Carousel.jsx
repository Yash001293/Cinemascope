import React, { useRef } from "react";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import "./style.scss";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LazyLoad from "../lazyload/LazyLoad";
import Genres from "../genres/Genres";
import dayjs from "dayjs";
const Carousel = ({ data, loading, endpoint, title }) => {
  const carouselContainer = useRef();
  const { url } = useSelector((state) => state.home);
  const navigate = useNavigate();

  const navigation = (dir) => {
    const container = carouselContainer.current;

    const scroll =
      dir === "left"
        ? container.scrollLeft - (container.offsetWidth + 20)
        : container.scrollLeft + (container.offsetWidth + 20);
    container.scrollTo({
      left: scroll,
      behavior: "smooth",
    });
  };

  return (
    <div className="carouselSection">
      <ContentWrapper>
        {title && <div className="carouselTitle">{title}</div>}
        <BsFillArrowLeftCircleFill
          className="arrow leftarrow"
          onClick={() => navigation("left")}
        />
        <BsFillArrowRightCircleFill
          className="arrow rightarrow"
          onClick={() => navigation("right")}
        />

        {!loading ? (
          <div className="carouselitems" ref={carouselContainer}>
            {data?.map((item) => {
              const posterImgUrl = item.poster_path
                ? url.backdrop + item.poster_path
                : "";
              return (
                <div
                  key={item.id}
                  className="carouselitem"
                  onClick={() =>
                    navigate(`/${item?.media_type || endpoint}/${item.id}`)
                  }
                >
                  <div className="poster">
                    <LazyLoad src={posterImgUrl} />
                    <Genres data={item.genre_ids.slice(0, 2)}></Genres>
                  </div>
                  <div className="textBlock">
                    <span className="title">{item.title || item.name}</span>
                    <div className="flexit">
                      <div className="date">
                        {dayjs(item.release_date).format("MMM D,YYYY")}
                      </div>
                      <div className="rating">
                        Rating {item.vote_average.toFixed(1)}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          "loading"
        )}
      </ContentWrapper>
    </div>
  );
};

export default Carousel;
