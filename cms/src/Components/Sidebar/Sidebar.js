import React, { Component } from "react";
import { Box, Text, Accordion, AccordionPanel } from "grommet";
import styled from "styled-components";
import { connect } from "react-redux";

const Title = styled.label`
  color: lightfade;
  &:hover {
    color: blue; // <Thing> when hovered
    cursor: pointer;
  }
`;

class Sidebar extends Component {
  render() {
    return (
      <Box
        border={{ color: "fade", size: "large" }}
        pad="small"
        style={{ width: "20%", height: "750px" }}
      >
        <Accordion>
          <AccordionPanel label="Add Details">
            <Box pad="small" background="lightfade">
              <Text
                pad="medium"
                onClick={e => {
                  this.props.displayMainContent("resetData", "Electric");
                }}
              >
                <Title>Add Guitar Details</Title>
              </Text>
              <Text
                pad="medium"
                onClick={e => {
                  this.props.displayMainContent("resetData", "List");
                }}
              >
                <Title>List Of Guitar</Title>
              </Text>
            </Box>
          </AccordionPanel>
        </Accordion>
      </Box>
    );
  }
}
const mapStateToProps = state => {
  return null;
};
const mapDispachToProps = dispach => {
  return {
    displayMainContent: (val, inputValue) =>
      dispach({ type: val, key: inputValue })
  };
};

export default connect(mapStateToProps, mapDispachToProps)(Sidebar);
