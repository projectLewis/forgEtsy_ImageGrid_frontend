import axios from "axios";
import React from "react";
import style from "./App.module.css";
import RelatedContainer from "./components/RelatedContainer/RelatedContainer";
import ShopContainer from "./components/ShopContainer/ShopContainer";
import { ApiResults } from "./interfaces/apiResultTypes";

interface State {
  products: ApiResults[];
}

const serverDB = "http://ec2-3-14-146-35.us-east-2.compute.amazonaws.com";
class App extends React.Component<{}, State> {
  private CancelToken = axios.CancelToken;
  private source = this.CancelToken.source();

  constructor(props: {}) {
    super(props);
    this.state = {
      products: []
    };
  }

  public async componentDidMount() {
    try {
      const results = await axios.get(`${serverDB}/products`, {
        cancelToken: this.source.token
      });
      const products: ApiResults[] = results.data;
      this.setState({ products });
    } catch (error) {
      if (axios.isCancel(error)) {
        console.error("Request canceled", error.message);
        throw new Error("Cancelled");
      } else {
        console.error(error);
      }
    }
  }

  public componentWillUnmount() {
    this.source.cancel("cancelled on unmount");
  }

  public render() {
    if (this.state.products[0]) {
      return (
        <div className="App">
          <ShopContainer
            products={this.state.products}
            shopInfo={this.state.products[0].Shop}
          />
          <div className={style.horizontalRule} />
          <RelatedContainer products={this.state.products} />
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
