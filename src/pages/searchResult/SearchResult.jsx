import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import fetchDataFromApi from "../../utils/api";
import Spinner from "../../components/spinner/Spinner";
import { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import "./style.scss";
import MovieCard from "../../components/moviecard/MovieCard";
const SearchResult = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [pagen, setPagen] = useState(1);
  const { query } = useParams();

  const location = useLocation();
  // if query changes page will reload and scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  // infinite scroll functionality start
  useEffect(() => {
    setPagen(1);
    fetchDatainit();
  }, [query]);

  // to get data for first time
  const fetchDatainit = () => {
    setLoading(true);
    fetchDataFromApi(`search/multi?query=${query}&page=${pagen}`).then(
      (res) => {
        setData(res);
        setPagen((pre) => pre + 1);
        setLoading(false);
      }
    );
  };

  // get the data for second time and increment page n

  const fetchnextdata = () => {
    fetchDataFromApi(`search/multi?query=${query}&page=${pagen}`).then(
      (res) => {
        // if we have previous data then merge it with upcoming data
        if (data?.results) {
          setData({
            ...data,
            results: [...data?.results, ...res.results],
          });
        } else {
          setData(res);
        }
        setPagen((pre) => pre + 1);
      }
    );
  };
  // infinite scroll functionality end
  return (
    <div className="resultPage">
      {loading && <Spinner initial={true} />}
      {!loading && (
        <ContentWrapper>
          {data?.results?.length > 0 ? (
            <>
              <div className="pageTitle">
                {`Search ${
                  data.total_results > 1 ? "results" : "result"
                } of  '${query}'`}
              </div>
              <InfiniteScroll
                className="content"
                dataLength={data?.results?.length || []}
                next={fetchnextdata} // pass the next function call to make it
                hasMore={pagen <= data?.total_pages} // while pagen reach to end i.e data?.total_pages
                loader={<Spinner />} // specify loader which will render when loading is true
              >
                {data?.results?.map((item, index) => {
                  if (item.media_type === "person") return; // we only want the item which has media_type "movie" or "tv"
                  return (
                    <MovieCard key={index} data={item} fromSearch={true} />
                  );
                })}
              </InfiniteScroll>
            </>
          ) : (
            <span className="notFound">Sorry ,results Not Found</span>
          )}
        </ContentWrapper>
      )}
    </div>
  );
};

export default SearchResult;
