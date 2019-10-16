import axios from "axios";
import React from "react";
import { match } from "react-router-dom";
import style from "./App.module.css";
import RelatedContainer from "./components/RelatedContainer/RelatedContainer";
import ShopContainer from "./components/ShopContainer/ShopContainer";
import { APIENDPOINT } from "./Const";
import { ApiResults } from "./interfaces/apiResultTypes";

interface PropTypes {
  match: match<{ productId: string }>;
}

interface State {
  addlShopProducts: ApiResults[] | null;
  relatedProducts: ApiResults[] | null;
  selectedProduct: ApiResults | null;
}

class BelowMainContent extends React.Component<PropTypes, State> {
  private CancelToken = axios.CancelToken;
  private source = this.CancelToken.source();

  constructor(props: any) {
    super(props);
    this.state = {
      addlShopProducts: [],
      relatedProducts: [],
      selectedProduct: null
    };
  }

  public componentDidMount() {
    this.getProducts();
  }

  public componentWillUnmount() {
    this.source.cancel("cancelled on unmount");
  }

  public componentDidUpdate(prevProps: PropTypes) {
    if (
      prevProps.match.params.productId !== this.props.match.params.productId
    ) {
      this.getProducts();
    }
  }

  public render() {
    if (
      this.state.selectedProduct &&
      this.state.relatedProducts &&
      this.state.addlShopProducts
    ) {
      return (
        <div className="App">
          <ShopContainer
            products={this.state.addlShopProducts}
            shopInfo={this.state.selectedProduct.Shop}
          />
          <div className={style.horizontalRule} />
          <RelatedContainer products={this.state.relatedProducts} />
        </div>
      );
    }
    return (
      <div className="App">
        <h1 className={style.h1Color}>"loading...</h1>
      </div>
    );
  }

  private async getProducts() {
    const productId = this.props.match.params.productId;
    try {
      const results = await axios.get(`${APIENDPOINT}/product/${productId}`, {
        cancelToken: this.source.token
      });

      const selectedProductsIndex = 0;
      const relatedProductsIndex = 1;
      const shopProductsIndex = 2;

      const selectedProduct: ApiResults = results.data[selectedProductsIndex];
      const relatedProducts: ApiResults[] = results.data[relatedProductsIndex];
      const addlShopProducts: ApiResults[] = results.data[shopProductsIndex];
      this.setState({ selectedProduct, relatedProducts, addlShopProducts });
    } catch (error) {
      if (axios.isCancel(error)) {
        console.error("Request canceled", error.message);
        throw new Error("Cancelled");
      } else {
        console.error(error);
      }
    }
  }
}

export default BelowMainContent;
