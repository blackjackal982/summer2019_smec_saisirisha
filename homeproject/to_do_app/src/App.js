import React, { Component } from "react";
import LoginForm from "./components/login";
import SignupForm from "./components/signup";
import Nav from "./components/nav";
import Display from "./components/dashboard";
import { Alert } from "reactstrap";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayed_form: "",
      logged_in: sessionStorage.getItem("token") ? true : false,
      username: "",
      errors: null,
      user_id: 0
    };
  }

  componentDidMount() {
    if (this.state.logged_in) {
      fetch("http://localhost:8000/current_user/", {
        headers: {
          Authorization: `JWT ${sessionStorage.getItem("token")}`
        }
      })
        .then(res => res.json())
        .then(json => {
          this.setState({ username: json.username });
        });
    }
  }

  handle_login = (e, data) => {
    e.preventDefault();
    fetch("http://localhost:8000/token-auth/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        sessionStorage.setItem("token", json.token);
        sessionStorage.setItem("username", json.user.username);
        this.setState({
          logged_in: true,
          displayed_form: "",
          username: json.user.username,
          errors: null,
          user_id: json.user.id
        });
      })
      .catch(errors => {
        this.setState({ errors: errors, logged_in: false, user_id: 0 });
        sessionStorage.removeItem("token");
      });
  };

  handle_signup = (e, data) => {
    e.preventDefault();
    fetch("http://localhost:8000/users/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        sessionStorage.setItem("token", json.token);
        sessionStorage.setItem("username", json.username);
        this.setState({
          logged_in: true,
          displayed_form: "",
          username: json.username,
          user_id: json.id
        });
      })
      .catch(errors => {
        this.setState({ errors: errors, logged_in: false, user_id: 0 });
        sessionStorage.removeItem("token");
      });
  };

  handle_logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("username");
    this.setState({ logged_in: false, username: "" });
  };

  handle_errors = event => {
    this.setState({
      errors: null,
      logged_in: false
    });
  };

  display_form = form => {
    this.setState({
      displayed_form: form
    });
  };

  render() {
    let form;
    switch (this.state.displayed_form) {
      case "login":
        form = (
          <LoginForm
            handle_login={this.handle_login}
            errors={this.handle_errors}
          />
        );
        break;
      case "signup":
        form = (
          <SignupForm
            handle_signup={this.handle_signup}
            errors={this.handle_errors}
          />
        );
        break;
      default:
        form = null;
    }
    return (
      <div className="App" style={{ fontSize: "20px" }}>
        <Nav
          logged_in={this.state.logged_in}
          display_form={this.display_form}
          handle_logout={this.handle_logout}
        />
        {this.state.errors ? (
          <Alert color="danger">Invalid Credentials</Alert>
        ) : null}
        {form}
        {this.state.logged_in ? (
          <Display user_id={this.state.user_id} />
        ) : this.state.displayed_form ? null : (
          "Please Login/Signup"
        )}
      </div>
    );
  }
}

export default App;
