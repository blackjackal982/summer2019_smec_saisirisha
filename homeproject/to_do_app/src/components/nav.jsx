import React from "react";
import PropTypes from "prop-types";
import { Navbar, NavbarBrand, Nav, NavItem } from "reactstrap";

function NavBar(props) {
  const logged_out_nav = (
    <Navbar color="dark" light expand="md">
      <NavbarBrand
        href="/"
        style={{
          fontSize: "20px",
          color: "whitesmoke"
        }}
      >
        TODOAPP
      </NavbarBrand>
      <Nav className="ml-auto" navbar>
        <NavItem
          onClick={() => props.display_form("login")}
          className="btn btn-primary m-2"
        >
          login
        </NavItem>
        <NavItem
          onClick={() => props.display_form("signup")}
          className="btn btn-primary m-2"
        >
          signup
        </NavItem>
      </Nav>
    </Navbar>
  );

  const logged_in_nav = (
    <Navbar color="dark" light expand="md">
      <NavbarBrand
        href="/"
        style={{
          fontSize: "20px",
          color: "whitesmoke"
        }}
      >
        {sessionStorage.getItem("username")}
      </NavbarBrand>
      <Nav className="ml-auto" navbar>
        <NavItem onClick={props.handle_logout} className="btn btn-primary m-2">
          logout
        </NavItem>
      </Nav>
    </Navbar>
  );
  return <div>{props.logged_in ? logged_in_nav : logged_out_nav}</div>;
}

export default NavBar;

NavBar.propTypes = {
  logged_in: PropTypes.bool.isRequired,
  display_form: PropTypes.func.isRequired,
  handle_logout: PropTypes.func.isRequired
};
