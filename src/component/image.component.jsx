import React, { useState, useEffect } from "react";
import "./image.css";
import { API_URL } from "../config/config";
import spinner from "../assets/infinite-spinner.svg";
import InfiniteScroll from "react-infinite-scroll-component";

const Image = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);

  const getPhotos = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    console.log("data",data);
    setPhotos((prevPhotos) => [...prevPhotos, ...data.hits]);
    setLoading(false);
  };

  useEffect(() => {
    getPhotos();
  }, []);

  return (
    <InfiniteScroll
      dataLength={photos.length}
      next={getPhotos}
      hasMore={true}
      loader={
        loading && (
          <div className="loader" id="loader">
            <img src={spinner} alt="Loading" />
          </div>
        )
      }
    >
      {
        <div className="image-container">
          <h1>Image Scroller</h1>
          {photos.map((pics, indx) => (
            <img key={indx} src={pics.largeImageURL} alt={pics.tags} />
          ))}
        </div>
      }
    </InfiniteScroll>
  );
};

export default Image;
