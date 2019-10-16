import React from "react";
import { Link } from "react-router-dom";
import { ApiResults } from "../../interfaces/apiResultTypes";
import { backupImage } from "../../utils";
import style from "./ImageCard.module.css";

interface PropTypes {
  imgUrl: string;
  title: string;
  price: number;
  shop?: string;
  listingId: ApiResults["listing_id"];
}

const ImageCard: React.FC<PropTypes> = (props: PropTypes) => {
  const priceAsFloat = Number.isInteger(props.price)
    ? `${props.price}.00`
    : `${props.price}`;
  return (
    <div className={style.imageCard}>
      <Link to={`/${props.listingId}`}>
        <img
          className={style.productImage}
          src={props.imgUrl}
          alt={props.title}
          onError={(e) => backupImage(e)}
        />
      </Link>
      <p className={style.truncateTitle}>{props.title}</p>
      {props.shop ? <p className={style.shopTitle}>{props.shop}</p> : null}
      <h3>
        ${priceAsFloat}{" "}
        <span className={style.freeShipping}>FREE Shipping</span>
      </h3>
    </div>
  );
};

export default ImageCard;
