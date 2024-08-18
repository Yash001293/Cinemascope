import React from "react";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import useFetch from "../../../hooks/useFetch";
import Carousel from "../../../components/carousel/Carousel";
const TopRated = () => {
  const { data, loading } = useFetch("movie/popular");
  return (
    <div className="trendingSection">
      <ContentWrapper>
        <span className="title">TopRated</span>
      </ContentWrapper>
      <Carousel
        data={data?.results}
        loading={loading}
        title={TopRated}
        endpoint={"movie"}
      />
    </div>
  );
};

export default TopRated;
