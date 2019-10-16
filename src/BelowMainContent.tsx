import React from "react";
import { match } from "react-router-dom";
import style from "./App.module.css";
import RelatedContainer from "./components/RelatedContainer/RelatedContainer";
import ShopContainer from "./components/ShopContainer/ShopContainer";
import { ApiResults } from "./interfaces/apiResultTypes";

interface PropTypes {
  match: match<{ productId: string }>;
  products: ApiResults[];
}

interface State {
  addlShopProducts: ApiResults[] | null;
  relatedProducts: ApiResults[] | null;
  selectedProduct: ApiResults | null;
}

class BelowMainContent extends React.Component<PropTypes, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      addlShopProducts: [],
      relatedProducts: [],
      selectedProduct: null
    };
  }

  public componentDidMount() {
    const selectedProduct = this.findProduct();
    let relatedCount = 0;
    const relatedCap = 5;
    const relatedProducts: ApiResults[] = [];
    const addlShopProducts = this.findRandomShopProducts();
    this.props.products.forEach((product) => {
      if (relatedCount === relatedCap) {
        return;
      }
      if (product.category_path.includes(selectedProduct.category_path[0])) {
        relatedCount += 1;
        relatedProducts.push(product);
      }
    });
    this.setState({ selectedProduct, relatedProducts, addlShopProducts });
  }

  public componentDidUpdate(prevProps: PropTypes) {
    if (
      prevProps.match.params.productId !== this.props.match.params.productId
    ) {
      const selectedProduct = this.findProduct();
      let relatedCount = 0;
      const relatedCap = 5;
      const relatedProducts: ApiResults[] = [];
      const addlShopProducts = this.findRandomShopProducts();
      (async () => {
        await this.props.products.reverse().forEach(async (product, idx) => {
          if (relatedCount === relatedCap) {
            return;
          }
          if (
            product.category_path.includes(selectedProduct.category_path[0])
          ) {
            relatedCount += 1;
            await relatedProducts.push(product);
          }
        });
        this.setState({ relatedProducts });
      })();
      this.setState({ selectedProduct, addlShopProducts });
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

  private findProduct(): ApiResults {
    const productId: ApiResults["listing_id"] = Number(
      this.props.match.params.productId
    );
    const productToReturn = this.props.products.filter((product) => {
      if (product.listing_id === productId) {
        return product;
      }
      return undefined;
    });
    return productToReturn[0];
  }

  private findRandomShopProducts(): ApiResults[] {
    const randomIndexes: number[] = [];
    let count = 0;
    const maxCount = 5;

    while (count < maxCount) {
      const randomNumber = this.getRandomNumber(randomIndexes, maxCount);
      randomIndexes.push(randomNumber);
      count += 1;
    }

    const randomShopProducts: ApiResults[] = [];
    randomIndexes.forEach((randomIndex) => {
      randomShopProducts.push(this.props.products[randomIndex]);
    });
    return randomShopProducts;
  }

  private getRandomNumber = (array: number[], max: number): number => {
    let randomNumber = Math.floor(Math.random() * (max * max));
    while (array.includes(randomNumber)) {
      randomNumber = Math.floor(Math.random() * (max + max));
    }
    return randomNumber;
  }
}

export default BelowMainContent;
