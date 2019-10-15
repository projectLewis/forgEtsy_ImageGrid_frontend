import React from "react";
import { ApiResults } from "../../../interfaces/apiResultTypes";
import ImageGrid from "../ImageGrid";

interface PropTypes {
  products: ApiResults[];
}

const RelatedGrid: React.FC<PropTypes> = ({ products }: PropTypes) => {
  return <ImageGrid products={products} includeShop={true} />;
};

export default RelatedGrid;
