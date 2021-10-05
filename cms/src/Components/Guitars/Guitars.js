import React from "react";
import Header from "../Header/Header.js";
import GuitarsView from "./GuitarsView";
import { Box, Text } from "grommet";
const Guitars = props => {
  return (
    <div>
      <Header history={props.history} />
      <GuitarsView history={props.history} />
    </div>
  );
};
export default Guitars;
