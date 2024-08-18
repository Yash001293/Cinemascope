import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/home/Home";
import Header from "./components/header/Header";
import SearchResult from "./pages/searchResult/SearchResult";
import Footer from "./components/footer/Footer";
import Details from "./pages/details/Details";
import PageNotFound from "./pages/pageNotFound/PageNotFound";
import fetchDataFromApi from "./utils/api";
import { useDispatch } from "react-redux";
import { getUrlConfig } from "./store/homeSlice";
import { getGenrsConfig } from "./store/homeSlice";
const App = () => {
  const dispatch = useDispatch();

  // use effect for fetching url & genres with dependency  array [] empty
  useEffect(() => {
    fetchapiConfiguration();
    fetchgenres();
  }, []);

  const fetchapiConfiguration = () => {
    fetchDataFromApi("configuration").then((res) => {
      const url = {
        backdrop: res?.images?.secure_base_url + "original",
      };
      dispatch(getUrlConfig(url));
    });
  };

  const fetchgenres = async () => {
    let promises = [];
    let endpoints = ["movie", "tv"];
    let allsource = {};
    // push api calls into array promises
    endpoints.forEach((url) => {
      promises.push(fetchDataFromApi(`genre/${url}/list`));
    });

    // using Promise.all get data at same time for movie & tv genres

    // store data into object with key as genres id and value id perticular genre
    const data = await Promise.all(promises);
    data.map(({ genres }) => {
      return genres.map((g) => {
        allsource[g.id] = g;
      });
    });

    // used dispatch to store data into redux store by getGenrsConfig action.
    dispatch(getGenrsConfig(allsource));
  };

  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:mediaType/:id" element={<Details />} />
          <Route path="/search/:query" element={<SearchResult />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
