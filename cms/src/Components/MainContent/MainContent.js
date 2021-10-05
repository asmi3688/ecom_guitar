import React, { Component } from "react";
import { Edit, FormTrash } from "grommet-icons";
import GuitarList from "./GuitarList";
import AddDetails from "./AddDetails";
import {
  Box,
  Form,
  FormField,
  Button,
  Table,
  TableBody,
  TableHeader,
  TableRow,
  TableCell
} from "grommet";
import { connect } from "react-redux";
class MainContent extends Component {
  constructor(props) {
    super(props);
  }
  submitGuitarDetails = props => {
    var obj = this.props.guitarType.guitarDetails;
    var url = "/api/guitars/addGuitarDetails";
    fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(obj)
    })
      .then(resp => resp.json())
      .then(data => {
        this.getAllGuitarData();
      })
      .catch(function(error) {
        console.log("Error--------->", error);
      });
  };

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
      .catch(function(error) {
        console.log("Error--------->", error);
      });
  };

  render() {
    const guitarInfo = this.props.guitarType.guitarDetails;
    const guitarData = this.props.guitarType.guitarData;
    return (
      <Box
        border={{ color: "fade", size: "large" }}
        pad="small"
        style={{ width: "80%", height: "750px" }}
      >
        {this.props.guitarType.selectedGuitarType == "Electric" ? (
          <AddDetails />
        ) : (
          <GuitarList />
        )}
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
    getguitardetails: (val, inputType) =>
      dispach({ type: "getguitardetails", key: val, inputfield: inputType }),
    getallguitardata: val => dispach({ type: "getGuitarData", key: val })
  };
};

export default connect(mapStateToProps, mapDispachToProps)(MainContent);
