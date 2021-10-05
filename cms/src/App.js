import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { hashHistory } from "react-router";
import Signup from "./Components/Signup/Signup.js";
import Login from "./Components/Login/Login.js";
import Dashboard from "./Components/Dashboard/Dashboard.js";
import Guitars from "./Components/Guitars/Guitars.js";
import GuitarDesc from "./Components/Guitars/GuitarDesc.js";
import Cart from "./Components/Cart/Cart.js";
import { Grommet, Box } from "grommet";
const theme = {
  global: {
    font: {
      family: "Roboto",
      size: "18px",
      height: "20px"
    },
    colors: {
      brand: "#228BE6",
      dark: "black",
      pink: "pink",
      light: "#777",
      fade: "#cacaca",
      lightfade: "#eaeaea",
      white: "#fff",
      lightblue: "#99CCFF",
      lightbrand: "#dadada",
      light2: "#fafafa",
      black1: "#333",
      light4: "#F0EEED",
      likeyellow: "#ffce00",
      dark5: "#E5E4E3",
      red1: "#B12704"
    },
    background: {
      brand: "#228BE6",
      dark: "black",
      pink: "pink"
    }
  }
};
class App extends Component {
  render() {
    return (
      <Router history={hashHistory}>
        <Grommet theme={theme}>
          <div>
            <Switch>
              <Route exact path="/" component={Signup} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/guitars" component={Guitars} />
              <Route exact path="/guitars/desc/:id" component={GuitarDesc} />
              <Route exact path="/cart" component={Cart} />
            </Switch>
          </div>
        </Grommet>
      </Router>
    );
  }
}

export default App;
