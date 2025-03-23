/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import loaderGif from "/spinning-loading.gif";
import "./Card.css";
import { useState } from "react";

const Card = ({ id, name, surname, image, teams }) => {
  const [loading, setLoading] = useState(true);
  return (
    <div className="card-container">
      <Link to={`/detail/${id}`}>
        <div className="card-image">
          {loading && (
            <img src={loaderGif} alt="Loading..." className="loader" />
          )}
          <img
            src={image}
            alt="driverApiImg"
            onLoad={() => setLoading(false)}
            onError={() => setLoading(false)} // Oculta el loader si hay un error
            style={{ display: loading ? "none" : "block" }}
          />
        </div>
      </Link>

      <div className="card-info">
        <h4>
          {name} {surname}
        </h4>
        <h4>{teams}</h4>
      </div>
    </div>
  );
};

export default Card;
