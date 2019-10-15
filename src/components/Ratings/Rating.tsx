import React from "react";
import style from "./Rating.module.css";

interface PropTypes {
  count: number;
}

const Rating: React.FC<PropTypes> = ({ count }: PropTypes) => {
  const oneStar = 1;
  const twoStars = 2;
  const threeStars = 3;
  const fourStars = 4;
  const fiveStars = 5;
  let stars;

  switch (count) {
    case oneStar:
      stars = (
        <>
          <span>★</span>
          <span>☆</span>
          <span>☆</span>
          <span>☆</span>
          <span>☆</span>
        </>
      );
      break;
    case twoStars:
      stars = (
        <>
          <span>★</span>
          <span>★</span>
          <span>☆</span>
          <span>☆</span>
          <span>☆</span>
        </>
      );
      break;
    case threeStars:
      stars = (
        <>
          <span>★</span>
          <span>★</span>
          <span>★</span>
          <span>☆</span>
          <span>☆</span>
        </>
      );
      break;
    case fourStars:
      stars = (
        <>
          <span>★</span>
          <span>★</span>
          <span>★</span>
          <span>★</span>
          <span>☆</span>
        </>
      );
      break;
    case fiveStars:
      stars = (
        <>
          <span>★</span>
          <span>★</span>
          <span>★</span>
          <span>★</span>
          <span>★</span>
        </>
      );
      break;
  }
  return <div className={style.stars}>{stars}</div>;
};

export default Rating;
