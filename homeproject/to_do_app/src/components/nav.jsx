import React from "react";
import { Navbar, NavbarBrand, Nav, NavItem } from "reactstrap";

function NavBar(props) {
  const logged_out_nav = (
    <Navbar color="dark" light expand="md">
      <NavbarBrand href="/">
        <img src="/images/logo.png" alt="Logo" title="Logo" width="138" />
      </NavbarBrand>
      <Nav className="ml-auto" navbar>
        <NavItem
          onClick={() => props.display_form("login")}
          className="btn btn-primary m-2"
          style={{ fontSize: "15px" }}
        >
          login
        </NavItem>
        <NavItem
          onClick={() => props.display_form("signup")}
          className="btn btn-primary m-2"
          style={{ fontSize: "15px" }}
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
        <img src="/images/logo.png" alt="Logo" title="Logo" width="138" />
      </NavbarBrand>
      <Nav className="ml-auto" navbar>
        <NavItem
          className="text-light"
          style={{ fontSize: "15px", paddingTop: "10px" }}
        >
          <i className="fa fa-user-circle-o m-2" />
          {sessionStorage.getItem("username")}
        </NavItem>
        <br />
        <NavItem
          onClick={props.handle_logout}
          className="btn btn-primary m-2"
          style={{ fontSize: "15px" }}
        >
          logout
        </NavItem>
      </Nav>
    </Navbar>
  );
  return <div>{props.logged_in ? logged_in_nav : logged_out_nav}</div>;
}

export default NavBar;
