import React from "react";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import useFetch from "../../../hooks/useFetch";
import Carousel from "../../../components/carousel/Carousel";
const Popular = () => {
  const { data, loading } = useFetch("tv/popular");
  return (
    <div className="trendingSection">
      <ContentWrapper>
        <span className="title">Popular</span>
      </ContentWrapper>
      <Carousel
        data={data?.results}
        loading={loading}
        endpoint={"tv"}
        title={Popular}
      />
    </div>
  );
};

export default Popular;
