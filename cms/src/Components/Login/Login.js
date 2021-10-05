import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, history } from "react-router-dom";
import "./Login.css";

class Login extends Component {
  constructor(props) {
    super(props);
  }
  userlogin = props => {
    var obj = {
      emailId: this.props.loginData.userName,
      password: this.props.loginData.password
    };
    var url = "/api/users/login";

    fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(obj)
    })
      .then(resp => resp.json())
      .then(data => {
        localStorage.setItem("userId", data.userId);
        if (data === "User Not Found") {
          alert("You are not registered, please signup!!!!");
        } else if (data === "Wrong password") {
          alert("Wrong password!!!");
        } else {
          if (data.userRole == "admin") {
            this.props.history.push("/dashboard");
          } else {
            this.props.history.push("/guitars");
          }
        }
      })
      .catch(function(error) {
        console.log("Request failed", error);
      });
  };

  render() {
    return (
      <div className="welcomepage col-lg-12">
        <div className="col-lg-4 offset-lg-7 signupbox">
          <h5 className="titlesignup">Login Here</h5>
          <label className="col-lg-12 paddingleftzero">User Name</label>
          <div>
            <input
              type="text"
              className="signupinputbx col-lg-10"
              onChange={e => {
                this.props.getvalue(e.target.value, "userName");
              }}
              value={this.props.loginData.userName}
            />
          </div>
          <label className="col-lg-12 paddingleftzero spaceline">
            password.{" "}
          </label>
          <div>
            <input
              type="password"
              className="signupinputbx col-lg-10"
              onChange={e => {
                this.props.getvalue(e.target.value, "password");
              }}
              value={this.props.loginData.password}
            />
          </div>
          <button
            className="col-lg-4 offset-lg-6 btn btn-primary spaceline"
            onClick={this.userlogin}
          >
            Login
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loginData: state
  };
};
const mapDispachToProps = dispach => {
  return {
    getvalue: (val, inputType) =>
      dispach({ type: "getvalue", key: val, inputfield: inputType }),
    clearData: () => dispach({ type: "cleardata" })
  };
};

export default connect(mapStateToProps, mapDispachToProps)(Login);
