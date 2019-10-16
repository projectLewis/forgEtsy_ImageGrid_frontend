import axios from "axios";
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import BelowMainContent from "./BelowMainContent";
import { APIENDPOINT } from "./Const";
import { ApiResults } from "./interfaces/apiResultTypes";

interface State {
  products: ApiResults[];
}

class App extends React.Component<{}, State> {
  private CancelToken = axios.CancelToken;
  private source = this.CancelToken.source();

  constructor(props: any) {
    super(props);
    this.state = {
      products: []
    };
  }

  public async componentDidMount() {
    try {
      const results = await axios.get(`${APIENDPOINT}/products/`, {
        cancelToken: this.source.token
      });

      const products: ApiResults[] = this.shuffleProducts(results.data);
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
    if (this.state.products.length >= 1) {
      return (
        <Router>
          <Route
            path="/:productId"
            render={(routeProps) => {
              return (
                <BelowMainContent
                  {...routeProps}
                  products={this.state.products}
                />
              );
            }}
          />
        </Router>
      );
    } else {
      return <div>Loading...</div>;
    }
  }

  // shuffle products so the related items arent always the same first 5 related items
  private shuffleProducts(productsArray: ApiResults[]) {
    const products = [...productsArray];
    for (let i = products.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [products[i], products[j]] = [products[j], products[i]];
    }
    return products;
  }
}

export default App;
