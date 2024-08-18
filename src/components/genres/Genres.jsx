import React from "react";
import { useSelector } from "react-redux";
import "./style.scss";
const Genres = ({ data }) => {
  const { genres } = useSelector((state) => state.home);
  return (
    <div className="Genres">
      {data?.map((gen) => {
        if (!genres[gen]?.name) return;
        return (
          <div key={gen} className="genre">
            {genres[gen]?.name}
          </div>
        );
      })}
    </div>
  );
};

export default Genres;
