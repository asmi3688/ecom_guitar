import React, { Component } from "react";
import { Box, Text } from "grommet";
import { User, FormTrash, Logout, Notification } from "grommet-icons";
import { Link } from "react-router-dom";

import styled from "styled-components";
const notify = styled(Box)`
  border: 1px solid blue;
  border-radius: 50%;
  text-align: center;

  background-color: blue;
  color: white;
  &:hover {
    cursor: pointer;
  }
`;
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartcount: 0
    };
  }
  logout = props => {
    localStorage.removeItem("userId");
    this.props.history.push("/");
  };
  gotohomepage = props => {
    this.props.history.push("/guitars");
    window.location.reload();
  };
  componentDidMount() {
    this.getcartcount();
  }
  gotocart = () => {
    this.props.history.push("/cart");
    window.location.reload();
  };
  async getcartcount() {
    var url = "/api/cart/getCountInCart";
    const response = await fetch(url, {
      method: "get",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const json = await response.json();
    this.setState({
      cartcount: json
    });
  }
  render() {
    return (
      <Box
        border={{ color: "lightblue", size: "small" }}
        background="lightblue"
        pad="small"
        direction="row"
      >
        <Box
          style={{ height: "40px", width: "10%" }}
          onClick={this.gotohomepage}
        >
          <img
            src="/images/music.png"
            style={{ height: "40px", width: "40px" }}
          />
        </Box>
        <Box pad="small" style={{ height: "30px", width: "90%" }} align="end">
          <Box direction="row" gap="medium">
            <User color="white" size="medium" />
            <Link color="white" to="/">
              <Logout color="white" size="medium" />
            </Link>

            <Notification color="white" size="medium" />
          </Box>
          <Box
            style={{
              height: "25px",
              width: "17px",
              background: "blue",
              color: "white",
              border: "black",
              borderRadius: "50%",
              paddingBottom: "14px",
              textAlign: "center",
              marginTop: "-20px",
              marginLeft: "13px",
              fontSize: "12px"
            }}
            onClick={this.gotocart}
          >
            {this.state.cartcount}
          </Box>
        </Box>
      </Box>
    );
  }
}
export default Header;
