import React, { Component } from "react";
import Lists from "./todolist";
import List_item from "./list_items";
import { Card, Button } from "reactstrap";

class Display extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemData: [],
      listData: null
    };
    this.handler = this.handler.bind(this);
    this.handleHome = this.handleHome.bind(this);
  }

  handleHome() {
    this.setState({
      itemData: [],
      listData: null
    });
  }
  handler(parent, child) {
    this.setState({
      listData: parent,
      itemData: child
    });
  }
  render() {
    return (
      <div className="content">
        <div style={{ display: "grid" }}>
          <h1 className="text-uppercase text-center my-4">
            {sessionStorage.getItem("username")}'s Lists
          </h1>
          <Button
            onClick={this.handleHome}
            color="success"
            style={{
              width: "10%",
              fontSize: "20px",
              fontWeight: "normal",
              float: "right"
            }}
          >
            Home &nbsp;
            <i class="fa fa-home" />
          </Button>
        </div>
        <div className="row justify-content-center">
          <Card>
            <img
              className="card-img-top"
              src="/images/board.jpg"
              alt="Card image cap"
              style={{
                width: "auto",
                height: "auto",
                padding: "0 10px",
                maxHeight: "100%",
                maxWidth: "100%"
              }}
            />
            <div className="card-img-overlay">
              {this.state.listData ? (
                <List_item
                  list={this.state.listData}
                  items={this.state.itemData}
                  action={this.handler}
                />
              ) : (
                <Lists action={this.handler} user_id={this.props.user_id} />
              )}
            </div>
          </Card>
        </div>
      </div>
    );
  }
}
export default Display;
