import React, { Component } from "react";
import LoginForm from "./components/login";
import SignupForm from "./components/signup";
import Nav from "./components/nav";
import Display from "./components/dashboard";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayed_form: "",
      logged_in: sessionStorage.getItem("token") ? true : false,
      username: ""
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
        sessionStorage.setItem("userid", json.user.id);
        this.setState({
          logged_in: true,
          displayed_form: "",
          username: json.user.username
        });
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
        sessionStorage.setItem("username", json.user.username);
        this.setState({
          logged_in: true,
          displayed_form: "",
          username: json.username
        });
      });
  };

  handle_logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("userid");
    this.setState({ logged_in: false, username: "" });
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
        form = <LoginForm handle_login={this.handle_login} />;
        break;
      case "signup":
        form = <SignupForm handle_signup={this.handle_signup} />;
        break;
      default:
        form = null;
    }
    return (
      <div className="App">
        <Nav
          logged_in={this.state.logged_in}
          display_form={this.display_form}
          handle_logout={this.handle_logout}
        />
        {form}
        {this.state.logged_in ? <Display /> : "Please Log In"}
      </div>
    );
  }
}

export default App;
