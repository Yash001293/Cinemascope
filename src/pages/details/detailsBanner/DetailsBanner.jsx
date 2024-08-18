import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import { useSelector } from "react-redux";
import LazyLoad from "../../../components/lazyload/LazyLoad";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import dayjs from "dayjs";
import Genres from "../../../components/genres/Genres";
import VideoPopup from "../../../components/videoPopup/VideoPopup";
import { AiFillPlayCircle } from "react-icons/ai";
import "./style.scss";
const DetailsBanner = ({ video }) => {
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);
  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`${mediaType}/${id}`);
  const { url } = useSelector((state) => state.home);
  const getGenresId = data?.genres?.map((it) => it.id);

  const toHandM = (min) => {
    const h = ~~(min / 60);
    const m = min % 60;
    return `${h}h${m > 0 ? `${m}m` : ""}`;
  };
  return (
    <div className="DetailsBanner">
      {!loading ? (
        <>
          {!!data && (
            <>
              <div className="details">
                <div className="posterimg">
                  <LazyLoad src={url?.backdrop + data?.backdrop_path} />
                </div>
              </div>
              <div className="opacitylayer"></div>
              <ContentWrapper>
                <div className="content">
                  <div className="left-section">
                    <LazyLoad src={url.backdrop + data?.backdrop_path} />
                  </div>
                  <div className="right-section">
                    <div className="title">
                      {`${data?.name || data?.title} (${dayjs(
                        data?.release_date
                      ).format("YYYY")})`}
                    </div>
                    <div className="tagline">{data?.tagline}</div>
                    <Genres data={getGenresId} />
                    <div className="section-1">
                      <div className="rating">
                        Rating : {data?.vote_average?.toFixed(1)}
                      </div>
                      <div
                        className="playbtn"
                        onClick={() => {
                          setShow(true);
                          setVideoId(video?.key);
                        }}
                      >
                        <span className="text">what Trailer</span>
                        <AiFillPlayCircle />
                      </div>
                    </div>
                    <div className="section-2">
                      <div className="heading">Overview</div>
                      <div className="description">{data?.overview}</div>
                    </div>
                    <div className="section-3">
                      {data?.status && (
                        <div className="information">
                          <span className="textinfo bold">Status: </span>
                          <span className="textinfo">{data?.status}</span>
                        </div>
                      )}
                      {data?.release_date && (
                        <div className="information">
                          <span className="textinfo bold">Release Date: </span>
                          <span className="textinfo">
                            {dayjs(data?.release_date).format("MMM D, YYYY")}
                          </span>
                        </div>
                      )}
                      {data?.runtime && (
                        <div className="information">
                          <span className="textinfo bold">Runtime: </span>
                          <span className="textinfo">
                            {toHandM(data?.runtime)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </ContentWrapper>
              <VideoPopup
                show={show}
                videoId={videoId}
                setShow={setShow}
                setVideoId={setVideoId}
              />
            </>
          )}
        </>
      ) : (
        <span>loading.......</span>
      )}
    </div>
  );
};

export default DetailsBanner;
