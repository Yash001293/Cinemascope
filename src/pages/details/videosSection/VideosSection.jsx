import React, { useRef, useState } from "react";

import "./style.scss";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { AiFillPlayCircle } from "react-icons/ai";
import VideoPopup from "../../../components/videoPopup/VideoPopup";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import LazyLoad from "../../../components/lazyload/LazyLoad";
const VideosSection = ({ data, loading }) => {
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);
  const officialvideosref = useRef();
  // scroll in y direction start
  // using ref
  const navigation = (direction) => {
    const officialvideos = officialvideosref.current;
    const scroll =
      direction === "left"
        ? officialvideos.scrollLeft - (officialvideos.offsetWidth + 20)
        : officialvideos.scrollLeft + (officialvideos.offsetWidth + 20);
    officialvideos.scrollTo({
      left: scroll,
      behavior: "smooth",
    });
  };
  // scroll in y direction end
  return (
    <div className="videosSection">
      <ContentWrapper>
        <BsFillArrowLeftCircleFill
          className="arrow leftarrow"
          onClick={() => navigation("left")}
        />
        <BsFillArrowRightCircleFill
          className="arrow rightarrow"
          onClick={() => navigation("right")}
        />
        <div className="sectionHeading">Official Videos</div>
        {!loading ? (
          <div className="videos" ref={officialvideosref}>
            {data?.results?.map((video) => (
              <div
                key={video.id}
                className="videoItem"
                onClick={() => {
                  setVideoId(video.key);
                  setShow(true);
                }}
              >
                <div className="videoThumbnail">
                  <LazyLoad
                    src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}
                  />
                  <AiFillPlayCircle />
                </div>
                <div className="videoTitle">{video.name}</div>
              </div>
            ))}
          </div>
        ) : (
          <span>loading</span>
        )}
      </ContentWrapper>
      <VideoPopup
        show={show}
        setShow={setShow}
        videoId={videoId}
        setVideoId={setVideoId}
      />
    </div>
  );
};

export default VideosSection;
