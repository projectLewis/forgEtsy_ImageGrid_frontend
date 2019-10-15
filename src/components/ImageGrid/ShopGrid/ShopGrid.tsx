import React from "react";
import { ApiResults } from "../../../interfaces/apiResultTypes";
import ImageGrid from "../ImageGrid";

interface PropTypes {
  products: ApiResults[];
}

const ShopGrid: React.FC<PropTypes> = ({ products }: PropTypes) => {
  return <ImageGrid products={products} includeShop={false} />;
};

export default ShopGrid;
