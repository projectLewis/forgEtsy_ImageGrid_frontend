import axios from "axios";
import React from "react";
import style from "./App.module.css";
import RelatedContainer from "./components/RelatedContainer/RelatedContainer";
import ShopContainer from "./components/ShopContainer/ShopContainer";
import { ApiResults } from "./interfaces/apiResultTypes";

interface State {
  products: ApiResults[];
  productId: ApiResults["listing_id"];
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
      const selectedProduct = this.state.products.filter((product) => {
        if (product.listing_id === this.state.productId) {
          return product;
        }
        return undefined;
      });
      let relatedCount = 0;
      const relatedCap = 5;
      const relatedProducts: ApiResults[] = [];
      (async () => {
        await this.state.products.forEach(async (product) => {
          if (relatedCount === relatedCap) {
            return;
          }
          if (
            product.category_path.includes(selectedProduct[0].category_path[0])
          ) {
            relatedCount += 1;
            await relatedProducts.push(product);
          }
        });
        this.setState({ selectedProduct: selectedProduct[0], relatedProducts });
      })();
    }
  }

  public componentWillUnmount() {
    this.source.cancel("cancelled on unmount");
  }

  public render() {
    if (this.state.selectedProduct && this.state.relatedProducts) {
      return (
        <div className="App">
          <ShopContainer
            products={this.state.products}
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
}

export default App;
