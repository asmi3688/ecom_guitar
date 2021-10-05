import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./Signup.css";

class Signup extends Component {
  constructor(props) {
    super(props);
  }
  submitSignupData = props => {
    var obj = {
      userName: this.props.signupData.userName,
      emailId: this.props.signupData.emailId,
      contactNo: this.props.signupData.contactNo,
      password: this.props.signupData.password,
      role: "user"
    };
    var url = "/api/users/signup";
    fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(obj)
    })
      .then(resp => resp.json())
      .then(data => {
        if (
          data.emailId === "Email already exists. Enter another email id!!!!"
        ) {
          alert("Email already exists!");
        } else {
          alert("Successfull!!!");
          this.props.clearData();
        }
      })
      .catch(function(error) {
        console.log("Request failed----->", error);
      });
  };

  componentDidMount() {
    localStorage.removeItem("userId");
  }

  render() {
    return (
      <div className="welcomepage col-lg-12">
        <div className="col-lg-4 offset-lg-7 signupbox">
          <h5 className="titlesignup">Signup Here</h5>
          <label className="col-lg-12 paddingleftzero">Name</label>
          <div>
            <input
              type="text"
              className="signupinputbx col-lg-10"
              onChange={e => {
                this.props.getvalue(e.target.value, "userName");
              }}
              value={this.props.signupData.userName}
            />
          </div>
          <label className="col-lg-12 paddingleftzero spaceline">
            Email ID:{" "}
          </label>
          <div>
            <input
              type="text"
              className="signupinputbx col-lg-10"
              onChange={e => {
                this.props.getvalue(e.target.value, "emailId");
              }}
              value={this.props.signupData.emailId}
            />
          </div>
          <label className="col-lg-12 paddingleftzero spaceline">
            Contact No.{" "}
          </label>
          <div>
            <input
              type="number"
              className="signupinputbx col-lg-10"
              onChange={e => {
                this.props.getvalue(e.target.value, "contactNo");
              }}
              value={this.props.signupData.contactNo}
            />
          </div>
          <label className="col-lg-12 paddingleftzero spaceline">
            Enter password.{" "}
          </label>
          <div>
            <input
              type="password"
              className="signupinputbx col-lg-10"
              onChange={e => {
                this.props.getvalue(e.target.value, "password");
              }}
              value={this.props.signupData.password}
            />
          </div>
          <label className="col-lg-12 paddingleftzero spaceline">
            Re-Enter password.{" "}
          </label>
          <div>
            <input
              type="password"
              className="signupinputbx col-lg-10"
              onChange={e => {
                this.props.getvalue(e.target.value, "confirmPassword");
              }}
              value={this.props.signupData.confirmPassword}
            />
          </div>
          <button
            className="col-lg-4 offset-lg-6 btn btn-primary spaceline"
            onClick={this.submitSignupData}
          >
            Signup
          </button>
          <label className="col-lg-2 offset-lg-8 spaceline">
            <Link to="/login">Login</Link>
          </label>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    signupData: state
  };
};
const mapDispachToProps = dispach => {
  return {
    getvalue: (val, inputType) =>
      dispach({ type: "getvalue", key: val, inputfield: inputType }),
    clearData: () => dispach({ type: "cleardata" })
  };
};

export default connect(mapStateToProps, mapDispachToProps)(Signup);
