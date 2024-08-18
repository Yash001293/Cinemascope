import React, { useEffect, useState } from "react";
import "./style.scss";
import HeroBanner from "./homeBanner/HeroBanner";
import Trending from "./trending/Trending";
import Popular from "./popular/Popular";
import TopRated from "./topRated/TopRated";
const Home = () => {
  return (
    <div className="home">
      <HeroBanner />
      <Trending />
      <TopRated />
      <Popular />
    </div>
  );
};

export default Home;
