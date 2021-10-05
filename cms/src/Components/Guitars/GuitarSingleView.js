import React, { useEffect, useState } from "react";
import { Box, Text } from "grommet";
import styled from "styled-components";
import { connect } from "react-redux";
import "font-awesome/css/font-awesome.min.css";
import { Link } from "react-router-dom";
const LinkHover = styled(Box)`
  border: 1px solid #dadada;
  border-radius: 3px;
  text-align: center;
  &:hover {
    box-shadow: 0 3px 16px 0 rgba(0, 0, 0, 0.25);
  }
`;

export const GuitarSingleView = props => {
  const [dataInfo, setDatalist] = useState(props.guitardata);
  const goToDetails = id => {
    props.history.push("/guitars/desc/" + id);
    window.location.reload();
  };
  return (
    <LinkHover
      height="300px"
      pad="medium"
      onClick={() => goToDetails(dataInfo._id)}
    >
      <Box pad="small" style={{ height: "150px", width: "100%" }}>
        <img
          src={dataInfo.guitarImage}
          style={{ height: "100%", width: "100%" }}
        />
      </Box>
      <Text pad="small">{dataInfo.guitarName}</Text>
      <Text pad="small">{dataInfo.guitarMake}</Text>
      <Text pad="small" color="blue">
        <i className="fa fa-inr" aria-hidden="true"></i>
        {dataInfo.guitarPrice}
      </Text>
    </LinkHover>
  );
};

export default GuitarSingleView;
