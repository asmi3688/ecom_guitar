import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, history } from "react-router-dom";
import "./Dashboard.css";
import Header from "../Header/Header.js";
import Sidebar from "../Sidebar/Sidebar.js";
import MainContent from "../MainContent/MainContent.js";
import { Box, Text } from "grommet";
class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Box border={{ color: "light", size: "large" }} pad="small">
        <Text>Welcome to Enduring Guitar...</Text>
        <Box>
          <Header />
          <Box direction="row">
            <Sidebar />
            <MainContent />
          </Box>
        </Box>
      </Box>
    );
  }
}

const mapStateToProps = state => {
  return {
    dashboardnData: state
  };
};
const mapDispachToProps = dispach => {
  return {
    getvalue: (val, inputType) =>
      dispach({ type: "getvalue", key: val, inputfield: inputType }),
    clearData: () => dispach({ type: "cleardata" })
  };
};

export default connect(mapStateToProps, mapDispachToProps)(Dashboard);
