import React, { Component } from "react";
import { Edit, FormTrash } from "grommet-icons";
import {
  Box,
  Form,
  FormField,
  Button,
  Table,
  TableBody,
  TableHeader,
  TableRow,
  TableCell,
  Text
} from "grommet";
import styled from "styled-components";
import { connect } from "react-redux";
const Title = styled.label`
  color: blue;
  &:hover {
    color: blue; // <Thing> when hovered
    cursor: pointer;
  }
`;
class GuitarList extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.getAllGuitarData();
  }

  getAllGuitarData = props => {
    var url = "/api/guitars/getAllGuitarDetails";
    fetch(url, {
      method: "get",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(resp => resp.json())
      .then(data => {
        this.props.getallguitardata(data);
      })
      .catch(function(error) {});
  };

  deleteDetails = id => {
    var obj = {
      itemId: id
    };
    var url = "/api/guitars/deleteitem";
    fetch(url, {
      method: "delete",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(obj)
    })
      .then(resp => resp.json())
      .then(data => {
        this.getAllGuitarData();
        this.props.clrId("");
      })
      .catch(error => {});
  };

  render() {
    const guitarData = this.props.guitarType.guitarData;
    return (
      <Box
        border={{ color: "fade", size: "large" }}
        pad="small"
        style={{ width: "100%", height: "750px" }}
      >
        <Title
          size="small"
          color="brand"
          onClick={e => {
            this.props.displayMainContent("resetData", "Electric");
          }}
        >
          Add Guitar Details
        </Title>
        {guitarData.length > 0 ? (
          <Box overflow="auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell scope="col" border="bottom">
                    Sr. No.
                  </TableCell>
                  <TableCell scope="col" border="bottom">
                    Name of Guitar
                  </TableCell>
                  <TableCell scope="col" border="bottom">
                    Make of Guitar
                  </TableCell>
                  <TableCell scope="col" border="bottom">
                    Price
                  </TableCell>
                  <TableCell scope="col" border="bottom">
                    Image
                  </TableCell>
                  <TableCell scope="col" border="bottom">
                    Guitar Type
                  </TableCell>
                  <TableCell scope="col" border="bottom">
                    Action
                  </TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {guitarData.map((item, index) => {
                  return (
                    <TableRow key={DataTransferItem._id}>
                      <TableCell scope="row">{index + 1}</TableCell>
                      <TableCell scope="row">{item.guitarName}</TableCell>
                      <TableCell scope="row">{item.guitarMake}</TableCell>
                      <TableCell scope="row">{item.guitarPrice}</TableCell>
                      <TableCell scope="row">
                        <Box style={{ height: "60px", width: "60px" }}>
                          <img
                            style={{ height: "60px", width: "60px" }}
                            src={item.guitarImage}
                          />
                        </Box>
                      </TableCell>
                      <TableCell scope="row">{item.guitarType}</TableCell>
                      <TableCell scope="row">
                        <Edit
                          onClick={e => {
                            this.props.editDetails(item._id);
                          }}
                          color="brand"
                          size="small"
                        />
                        <FormTrash
                          color="red"
                          onClick={e => {
                            this.deleteDetails(item._id);
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Box>
        ) : null}
      </Box>
    );
  }
}

const mapStateToProps = state => {
  return {
    guitarType: state
  };
};
const mapDispachToProps = dispach => {
  return {
    getallguitardata: val => dispach({ type: "getGuitarData", key: val }),
    displayMainContent: (val, inputValue) =>
      dispach({ type: val, key: inputValue }),
    editDetails: val => dispach({ type: "editData", key: val }),
    clrId: val => dispach({ type: "clearID", key: val })
  };
};

export default connect(mapStateToProps, mapDispachToProps)(GuitarList);
