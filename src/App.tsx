import axios from "axios";
import React from "react";
import style from "./App.module.css";
import RelatedContainer from "./components/RelatedContainer/RelatedContainer";
import ShopContainer from "./components/ShopContainer/ShopContainer";
import { ApiResults } from "./interfaces/apiResultTypes";

interface State {
  products: ApiResults[];
  productId: ApiResults["listing_id"];
  addlShopProducts: ApiResults[] | null;
  relatedProducts: ApiResults[] | null;
  selectedProduct: ApiResults | null;
}

const serverDB = "http://ec2-3-14-146-35.us-east-2.compute.amazonaws.com";
class App extends React.Component<{}, State> {
  private CancelToken = axios.CancelToken;
  private source = this.CancelToken.source();

  constructor(props: {}) {
    super(props);
    this.state = {
      products: [],
      productId: 0,
      addlShopProducts: [],
      relatedProducts: [],
      selectedProduct: null
    };
  }

  public async componentDidMount() {
    try {
      const results = await axios.get(`${serverDB}/products`, {
        cancelToken: this.source.token
      });

      // TODO replace with number from React-Router or Web Sockets
      const magicNumber = 695893902;
      const products: ApiResults[] = results.data;
      this.setState({ products, productId: magicNumber });
    } catch (error) {
      if (axios.isCancel(error)) {
        console.error("Request canceled", error.message);
        throw new Error("Cancelled");
      } else {
        console.error(error);
      }
    }
  }

  public componentDidUpdate(prevProps: {}, prevState: State) {
    if (this.state.productId !== prevState.productId) {
      const selectedProduct = this.findProduct();
      let relatedCount = 0;
      const relatedCap = 5;
      const relatedProducts: ApiResults[] = [];
      const addlShopProducts = this.findRandomShopProducts();
      (async () => {
        await this.state.products.forEach(async (product) => {
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
        this.setState({ selectedProduct, relatedProducts, addlShopProducts });
      })();
    }
  }

  public componentWillUnmount() {
    this.source.cancel("cancelled on unmount");
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
    const productToReturn = this.state.products.filter((product) => {
      if (product.listing_id === this.state.productId) {
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
      randomShopProducts.push(this.state.products[randomIndex]);
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

export default App;
