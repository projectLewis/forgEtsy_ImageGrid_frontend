import faker from "faker";
import React from "react";
import { backupImage } from "../../Const";
import { ApiResults, ShopTypes } from "../../interfaces/apiResultTypes";
import ShopGrid from "../ImageGrid/ShopGrid/ShopGrid";
import style from "./ShopContainer.module.css";
import ShopDetails from "./ShopDetails";

interface PropTypes {
  shopInfo: ShopTypes;
  products: ApiResults[];
}

const ShopContainer: React.FC<PropTypes> = ({
  shopInfo,
  products
}: PropTypes) => {
  // console.log(shopInfo);
  faker.seed(shopInfo.shop_id);
  const lowQuantity = 30;
  const highQuantity = 400;
  const numberOfItems = faker.random.number({
    min: lowQuantity,
    max: highQuantity
  });

  return (
    <>
      <div className={style.shopContainer}>
        <img
          className={style.shopIcon}
          src={shopInfo.icon_url_fullxfull}
          alt={`${shopInfo.title} logo`}
          onError={backupImage}
        />
        <div className={style.spacer}>
          <ShopDetails shopInfo={shopInfo} />
          <button className={style.addlItemsBtn}>
            View All {numberOfItems} Items
          </button>
        </div>
      </div>
      <ShopGrid products={products} />
    </>
  );
};

export default ShopContainer;
