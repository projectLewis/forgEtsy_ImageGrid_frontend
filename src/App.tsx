import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import BelowMainContent from "./BelowMainContent";

class App extends React.Component<{}, {}> {
  public render() {
    return (
      <Router>
        <Route
          path="/:productId"
          render={(routeProps) => {
            return <BelowMainContent {...routeProps} />;
          }}
        />
      </Router>
    );
  }
}

export default App;
