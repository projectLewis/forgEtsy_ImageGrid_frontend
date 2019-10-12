import axios from "axios";
import unescape from "lodash.unescape";
import React, {useEffect, useState} from "react";
import style from "./App.module.css";
import { ApiResults } from "./types/apiResultTypes";

const serverDB = "http://ec2-3-14-146-35.us-east-2.compute.amazonaws.com";
const App: React.FC = () => {

  const [products, setProducts] = useState<ApiResults[]>([]);

  useEffect(() => {
    axios.get(`${serverDB}/products`)
    .then((result) => {
      const productResults: ApiResults[] = result.data;
      setProducts(productResults);
    });
  }, []);

  return (
    <div className="App">
      <header>
        <h1 className={style.h1Color}>{products[0] ? unescape(products[0].title) : "loading..."}</h1>
      </header>
    </div>
  );
};

export default App;
