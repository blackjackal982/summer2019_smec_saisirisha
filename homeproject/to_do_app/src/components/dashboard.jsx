import React, { Component } from "react";
import Lists from "./todolist";
import List_item from "./list_items";
import { Card } from "reactstrap";

class Display extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemData: [],
      listData: null
    };
    this.handler = this.handler.bind(this);
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
        <h1 className="text-uppercase text-center my-4">
          {sessionStorage.getItem("username")}'s Lists
        </h1>
        <div className="row">
          <Card>
            <img
              className="card-img-top"
              src="/images/board.jpg"
              alt="Card image cap"
              style={{
                width: "80wh",
                height: "70wh",
                padding: "0 10px"
              }}
            />
            <div className="card-img-overlay">
              {this.state.listData ? (
                <List_item
                  list={this.state.listData}
                  items={this.state.itemData}
                />
              ) : (
                <Lists action={this.handler} />
              )}
            </div>
          </Card>
        </div>
      </div>
    );
  }
}
export default Display;
