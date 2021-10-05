import React, { useEffect, useState } from "react";
import { Box, Text, Button } from "grommet";
import styled from "styled-components";
import { connect } from "react-redux";
import Header from "../Header/Header.js";
import "font-awesome/css/font-awesome.min.css";
const LinkHover = styled(Box)`
  border: 1px solid #dadada;
  border-radius: 3px;
  text-align: center;
  &:hover {
    box-shadow: 0 3px 16px 0 rgba(0, 0, 0, 0.25);
  }
`;

const cartbutton = styled(Button)`
  border: 1px solid blue;
  border-radius: 1px;
  text-align: center;
  &:hover {
    cursor: pointer;
  }
`;

const GuitarDesc = props => {
  const [details, setDetails] = useState({});
  useEffect(async () => {
    var url = "/api/guitars/getSingleGuitarDetails";
    var obj = {
      itemId: props.match.params.id
    };

    const response = await fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(obj)
    });
    const json = await response.json();
    setDetails(json[0]);
  }, [props.match.params.id]);

  const addtocart = async () => {
    details.userId = localStorage.getItem("userId");
    var url = "/api/cart/addToCart";
    const response = await fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(details)
    });
    const json = await response.json();
    console.log("json----------->", json);
  };

  return (
    <>
      <Header history={props.history} />
      <Box height="721px" width="100%" direction="row" pad="small">
        <Box width="60%" height="100%" pad="small">
          <Box pad="small" width="100%" height="100%">
            <img width="100%" height="100%" src={details.guitarImage} />
          </Box>
        </Box>
        <Box pad="medium" width="40%" height="100%">
          <Box width="100%" height="100%" pad="small" direction="column">
            <Box pad="small" width="100%" height="100%">
              <Text color="black1">{details.guitarName}</Text>
              <Text>
                by <Text color="blue">{details.guitarMake}</Text>
              </Text>
              <Box
                direction="row"
                gap="small"
                border={{
                  color: "dark5",
                  size: "small",
                  style: "solid",
                  side: "bottom"
                }}
              >
                <Text color="likeyellow">
                  <i className="fa fa-star-o" aria-hidden="true"></i>
                </Text>
                <Text color="likeyellow">
                  <i className="fa fa-star-o" aria-hidden="true"></i>
                </Text>
                <Text color="likeyellow">
                  <i className="fa fa-star-o" aria-hidden="true"></i>
                </Text>
                <Text color="likeyellow">
                  <i className="fa fa-star-o" aria-hidden="true"></i>
                </Text>
                <Text color="likeyellow">
                  <i className="fa fa-star-o" aria-hidden="true"></i>
                </Text>
              </Box>
              <Box>
                <Text color="#777">
                  Price:
                  <Text color="red1">
                    <i className="fa fa-inr" aria-hidden="true"></i>
                    {details.guitarPrice}
                  </Text>
                </Text>
              </Box>
              <Box direction="column">
                <Text color="#777">Desc:</Text>
                <Box pad={{ left: "small" }}>
                  <Text color="black1">
                    The handling comfort of the slightly reduced body depth and
                    intermediate scale length will be particularly appreciated
                    by younger players
                  </Text>
                </Box>
              </Box>
              <Box pad="large">
                <Button
                  type="submit"
                  primary
                  label="Add To Cart"
                  onClick={addtocart}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default GuitarDesc;
