import React, { Component } from "react";
import Lists from "./components/todolist";
import List_item from "./components/list_items";

class App extends Component {
  constructor(props) {
    super(props);
    this.handler = this.handler.bind(this);
    this.state = {
      itemData: [],
      listData: null
    };
  }

  handler(parent, child) {
    this.setState({
      listData: parent,
      itemData: child
    });
  }

  render() {
    return (
      <main className="content">
        <h1 className="text-uppercase text-center my-4">Todo app</h1>
        <div className="row ">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3 bg-dark">
              <div>
                {this.state.listData ? (
                  <List_item
                    list={this.state.listData}
                    items={this.state.itemData}
                  />
                ) : (
                  <Lists action={this.handler} />
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default App;
