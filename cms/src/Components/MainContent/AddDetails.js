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
  TableCell
} from "grommet";
import { connect } from "react-redux";
class AddDetails extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    if (this.props.guitarType.editId === "") {
      this.setState({ guitarInfo: this.props.guitarType.guitarDetails }, () => {
      });
    } else {
      this.editData();
    }
  }
  editData = () => {
    var url = "/api/guitars/getSingleGuitarDetails";
    var obj = {
      itemId: this.props.guitarType.editId
    };
    fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(obj)
    })
      .then(resp => resp.json())
      .then(data => {
        this.props.editSingleData("editsingleinfo", data[0]);
      })
      .catch(function(error) {
        console.log("Error--------->", error);
      });
  };
  submitGuitarDetails = props => {
    if (this.props.guitarType.editId === "") {
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
          this.props.displayMainContent("List");
        })
        .catch(function(error) {
          console.log("Error--------->", error);
        });
    } else {
      console.log(
        "this.props.guitarType.guitarDetails",
        this.props.guitarType.editId
      );
      var obj = this.props.guitarType.guitarDetails;
      var url =
        "/api/guitars/updateGuitarDetails/" + this.props.guitarType.editId;

      fetch(url, {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
      })
        .then(resp => resp.json())
        .then(data => {
          this.props.displayMainContent("List");
        })
        .catch(function(error) {
          console.log("Error--------->", error);
        });
    }
  };

  render() {
    const guitarInfo = this.props.guitarType.guitarDetails;
    return (
      <Box
        border={{ color: "fade", size: "large" }}
        pad="small"
        style={{ width: "100%", height: "750px" }}
      >
        <Box direction="column" pad="large">
          <label direction="row">Name of guitar</label>
          <input
            type="text"
            onChange={e => {
              this.props.getguitardetails(e.target.value, "guitarName");
            }}
            value={guitarInfo.guitarName}
          />
        </Box>
        <Box direction="column" pad="large">
          <label direction="row">Make of guitar</label>
          <input
            type="text"
            onChange={e => {
              this.props.getguitardetails(e.target.value, "guitarMake");
            }}
            value={guitarInfo.guitarMake}
          />
        </Box>
        <Box direction="column" pad="large">
          <label direction="row">Price of guitar</label>
          <input
            type="number"
            onChange={e => {
              this.props.getguitardetails(e.target.value, "guitarPrice");
            }}
            value={guitarInfo.guitarPrice}
          />
        </Box>
        <Box direction="column" pad="large">
          <label direction="row">Image URL of guitar</label>
          <input
            type="text"
            onChange={e => {
              this.props.getguitardetails(e.target.value, "guitarImage");
            }}
            value={guitarInfo.guitarImage}
          />
        </Box>
        <Box direction="column" pad="large">
          <label direction="row">Type of guitar</label>
          <input
            type="text"
            onChange={e => {
              this.props.getguitardetails(e.target.value, "guitarType");
            }}
            value={guitarInfo.guitarType}
          />
        </Box>
        <Box pad="large" align="end">
          <Button
            type="submit"
            style={{ width: "25%" }}
            primary
            label={this.props.guitarType.editId === "" ? "Submit" : "Update"}
            onClick={this.submitGuitarDetails}
          />
        </Box>
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
    displayMainContent: val => dispach({ type: val }),
    editSingleData: (val, inputType) => dispach({ type: val, key: inputType })
  };
};

export default connect(mapStateToProps, mapDispachToProps)(AddDetails);
