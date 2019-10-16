import unescape from "lodash.unescape";
import React from "react";
import { ApiResults } from "../../interfaces/apiResultTypes";
import ImageCard from "../ImageCard/ImageCard";
import style from "./ImageGrid.module.css";

interface PropTypes {
  products: ApiResults[];
  includeShop: boolean;
}

const ImageGrid: React.FC<PropTypes> = ({
  products,
  includeShop
}: PropTypes) => {
  return (
    <div className={style.relatedItems}>
      {products.map((product, idx) => {
        const title = unescape(product.title);
        const limit = 5;
        if (idx >= limit) {
          return null;
        }
        return (
          <ImageCard
            key={product.listing_id}
            listingId={product.listing_id}
            shop={includeShop ? product.Shop.shop_name : undefined}
            price={product.price}
            title={title}
            imgUrl={product.Images[0].url_170x135}
          />
        );
      })}
    </div>
  );
};

export default ImageGrid;
