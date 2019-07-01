import React from "react";

class SignupForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      email: "",
      first_name: "",
      last_name: ""
    };
  }

  handle_change = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState(prevstate => {
      const newState = { ...prevstate };
      newState[name] = value;
      return newState;
    });
    this.props.errors(e);
  };

  render() {
    return (
      <form onSubmit={e => this.props.handle_signup(e, this.state)}>
        <div class="container">
          <div
            id="login"
            style={{
              fontSize: "28px",
              fontWeight: "100",
              lineHeight: "1.2",
              color: "#757575",
              textAlign: "center",
              textTransform: "inherit",
              letterSpacing: "inherit",
              maxWidth: "350px",
              borderRadius: "2px",
              margin: "20px auto",
              padding: "20px",
              backgroundColor: "#eceff1" /* Blue Grey 50*/,
              boxShadow:
                "0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)" /* shadow depth 3*/
            }}
          >
            <div class="logo-image">
              <img src="/images/logo.png" alt="Logo" title="Logo" width="138" />
            </div>
            <h1
              class="display1"
              style={{
                fontSize: "25px",
                fontWeight: "100",
                lineHeight: "1.2",
                color: "indigo",
                textAlign: "center",
                textTransform: "inherit",
                letterSpacing: "inherit"
              }}
            >
              SIGNUP FORM
            </h1>
            <form action="" method="" class="" role="form">
              <div id="form-login-username" class="form-group">
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      <i className="fa fa-user" />
                    </span>
                    <input
                      type="text"
                      name="first_name"
                      size="18"
                      alt="fname"
                      class="form-control"
                      value={this.state.first_name}
                      onChange={this.handle_change}
                      placeholder="First Name"
                      required
                    />
                    <span class="form-highlight" />
                    <span class="form-bar" />
                  </div>
                </div>
              </div>
              <div id="form-login-username" class="form-group">
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      <i className="fa fa-user" />
                    </span>
                    <input
                      type="text"
                      name="last_name"
                      size="18"
                      alt="lname"
                      class="form-control"
                      required
                      value={this.state.last_name}
                      onChange={this.handle_change}
                      placeholder="Last Name"
                    />
                    <span class="form-highlight" />
                    <span class="form-bar" />
                  </div>
                </div>
              </div>
              <div id="form-login-username" class="form-group">
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      <i className="fa fa-envelope" />
                    </span>
                    <input
                      type="email"
                      name="email"
                      size="18"
                      alt="emailid"
                      required
                      class="form-control"
                      value={this.state.email}
                      onChange={this.handle_change}
                      placeholder="Email"
                    />
                    <span class="form-highlight" />
                    <span class="form-bar" />
                  </div>
                </div>
              </div>
              <div id="form-login-username" class="form-group">
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      <i className="fa fa-user-circle-o" />
                    </span>
                    <input
                      type="text"
                      name="username"
                      size="18"
                      alt="login"
                      class="form-control"
                      value={this.state.username}
                      onChange={this.handle_change}
                      required
                      placeholder="Username"
                    />
                    <span class="form-highlight" />
                    <span class="form-bar" />
                  </div>
                </div>
              </div>
              <div id="form-login-password" class="form-group">
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      <i className="fa fa-key" />
                    </span>
                    <input
                      type="password"
                      name="password"
                      class="form-control"
                      value={this.state.password}
                      onChange={this.handle_change}
                      size="18"
                      alt="password"
                      placeholder="Password"
                      required
                    />

                    <span class="form-highlight" />
                    <span class="form-bar" />
                  </div>
                </div>
              </div>
              <div class="input-group">
                <button
                  class="btn btn-block btn-info ripple-effect"
                  type="submit"
                  name="Submit"
                  alt="sign in"
                  style={{ fontSize: "15px" }}
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      </form>
    );
  }
}

export default SignupForm;
