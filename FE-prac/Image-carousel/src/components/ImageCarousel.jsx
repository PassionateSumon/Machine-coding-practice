import React, { useEffect, useState } from "react";

const ImageCarousel = () => {
  const [images, setImages] = useState([]);
  const [index, setIndex] = useState(0);

  const fetchData = async () => {
    const url = "https://www.reddit.com/r/aww/top/.json?t=all";
    const res = await fetch(url);
    const result = await res.json();
    const fullData = await result.data.children;
    const data = fullData
      .filter((fd) => fd.data.url_overridden_by_dest.includes(".jpg"))
      .map((item) => item.data.url_overridden_by_dest);
    // console.log(data);
    setImages(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const tId = setTimeout(() => {
      handleClick("right");
    }, 2000);
    return () => clearTimeout(tId);
  }, [index]);

  const handleClick = (dir) => {
    const lastIndex = images.length - 1;
    if (dir === "left") {
      if (index === 0) {
        setIndex(lastIndex);
      } else {
        setIndex((prev) => prev - 1);
      }
    } else {
      if (index === lastIndex) {
        setIndex(0);
      } else {
        setIndex((prev) => prev + 1);
      }
    }
  };

  return (
    <div className="image-con">
      <button onClick={() => handleClick("left")}>{"<"}</button>
      <img src={images[index]} alt="no-image" />
      <button className="right" onClick={() => handleClick("right")}>
        {">"}
      </button>
    </div>
  );
};

export default ImageCarousel;
