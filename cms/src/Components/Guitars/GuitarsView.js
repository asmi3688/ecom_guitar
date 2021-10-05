import React, { useEffect, useState } from "react";
import { Box, Text } from "grommet";
import styled from "styled-components";
import { connect } from "react-redux";
import GuitarSingleView from "./GuitarSingleView";
import "font-awesome/css/font-awesome.min.css";
const LinkHover = styled(Box)`
  border: 1px solid #dadada;
  border-radius: 3px;
  text-align: center;
  &:hover {
    box-shadow: 0 3px 16px 0 rgba(0, 0, 0, 0.25);
  }
`;

export const GuitarsView = props => {
  const [datalist, setDatalist] = useState([]);
  const totalItems = 10;
  useEffect(async () => {
    var url = "/api/guitars/getAllGuitarDetails";

    const response = await fetch(url, {
      method: "get",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const json = await response.json();
    setDatalist(json);
  }, []);

  return (
    <Box height="auto" width="100%">
      <Box pad="medium" wrap="true" direction="row" style={{ flexGrow: "1" }}>
        {datalist &&
          datalist.map((data, index) => (
            <Box pad="medium" width="25%" height="auto" key={data._id}>
              <GuitarSingleView guitardata={data} history={props.history} />
            </Box>
          ))}
      </Box>
    </Box>
  );
};

export default GuitarsView;
