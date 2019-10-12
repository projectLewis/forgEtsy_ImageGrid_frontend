import axios from "axios";
import unescape from "lodash.unescape";
import React from "react";
import style from "./App.module.css";
import { ApiResults } from "./types/apiResultTypes";

interface State {
  products: ApiResults[];
}

const serverDB = "http://ec2-3-14-146-35.us-east-2.compute.amazonaws.com";
class App extends React.Component<{}, State> {
  constructor({}) {
    super({});
    this.state = {
      products: []
    };
  }

  public async componentDidMount() {
    try {
      const results = await axios.get(`${serverDB}/products`);
      const products: ApiResults[] = results.data;
      this.setState({products});

    } catch (error) {
      console.log(error);
    }
  }

  public render() {
    return (
      <div className="App">
        <header>
          <h1 className={style.h1Color}>{this.state.products[0] ? unescape(this.state.products[0].title) : "loading..."}</h1>
        </header>
      </div>
    );
  }
}

export default App;
