import React from "react";
import { ApiResults } from "../../interfaces/apiResultTypes";
import RelatedGrid from "../ImageGrid/RelatedGrid/RelatedGrid";
import style from "./RelatedContainer.module.css";

interface PropTypes {
  products: ApiResults[];
}

const RelatedContainer: React.FC<PropTypes> = ({ products }: PropTypes) => {
  return (
    <>
      <div className={style.relatedContainer}>
        <h3 className={style.relatedHeader}>You May Also Like</h3>
        <RelatedGrid products={products} />
        <div className={style.similarItemsBtnContainer}>
          <button className={style.similarItemsBtn}>
            Shop more similar items
          </button>
        </div>
      </div>
    </>
  );
};

export default RelatedContainer;
