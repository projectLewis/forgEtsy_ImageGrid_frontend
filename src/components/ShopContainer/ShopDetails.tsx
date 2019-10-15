import faker from "faker";
import React from "react";
import { ShopTypes } from "../../interfaces/apiResultTypes";
import Rating from "../Ratings/Rating";
import style from "./ShopContainer.module.css";

interface PropTypes {
  shopInfo: ShopTypes;
}

const ShopDetails: React.FC<PropTypes> = ({ shopInfo }: PropTypes) => {
  const threeStars = 3;
  const lowSales = 20000;
  const highSales = 50000;
  const lowReviews = 400;
  const highReviews = 8000;
  const rating = shopInfo.custom_shops_state
    ? shopInfo.custom_shops_state
    : threeStars;
  const yearReference = 10;
  faker.seed(shopInfo.shop_id);
  const numberOfReviews = faker.random.number({
    min: lowReviews,
    max: highReviews
  });
  const numberOfSales = faker.random.number({ min: lowSales, max: highSales });
  const shopLocation = faker.fake("{{address.city}}, {{address.country}}");
  const shopCreationYear = faker.date.past(yearReference).getFullYear();

  return (
    <>
      <div className={style.shopDetailsContainer}>
        <div className={style.shopDetailsTop}>
          <h4>{shopInfo.shop_name}</h4>
          <Rating count={rating} />
          <span className={style.reviewCount}>
            {numberOfReviews.toLocaleString()}
          </span>
        </div>
        <div className={style.shopDetailsBottom}>
          <p className={style.shopDetails}>
            {shopLocation}{" "}
            <span className={style.shopSales}>
              {numberOfSales.toLocaleString()} Sales
            </span>{" "}
            On Etsy Since {shopCreationYear}
          </p>
        </div>
      </div>
    </>
  );
};

export default ShopDetails;
