import React, { useState } from "react";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import useFetch from "../../../hooks/useFetch";
import Carousel from "../../../components/carousel/Carousel";
const Trending = () => {
  const { data, loading } = useFetch("trending/all/week");
  return (
    <div className="trendingSection">
      <ContentWrapper>
        <span className="title">Trending</span>
      </ContentWrapper>
      <Carousel data={data?.results} loading={loading} title={Trending} />
    </div>
  );
};

export default Trending;
