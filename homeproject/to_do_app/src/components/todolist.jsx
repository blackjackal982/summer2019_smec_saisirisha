import React, { Component } from "react";

class Lists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: [],
      errors: null,
      isLoaded: false,
      identifier: null
    };
  }

  handleList(button) {
    fetch("http://localhost:8000/api_view/v1/lists/" + button.id + "/items", {
      method: "GET"
    })
      .then(response => response.json())
      .then(data => {
        this.props.action(button, data);
      });
  }

  componentDidMount() {
    fetch("http://localhost:8000/api_view/v1/lists", {
      method: "GET"
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          lists: data,
          isLoaded: true
        });
      })
      .catch(errors => this.setState({ errors, isLoading: false }));
  }

  render() {
    if (!this.state.isLoaded) {
      return (
        <div className="text-warning" style={{ fontSize: "30px" }}>
          Loading....
        </div>
      );
    } else {
      return (
        <section>
          <div className="">
            <button
              className="btn btn-primary"
              style={{ fontSize: "13px", fontWeight: "normal" }}
            >
              Add list +
            </button>
          </div>
          <br />
          <div>
            <div>
              {this.state.lists.map((p, id) => {
                return (
                  <span key={id}>
                    <div className="card bg-light">
                      <div className="card-body">
                        <div className="card-text">
                          <button
                            onClick={() => this.handleList(p)}
                            className="btn btn-default text-left m-2"
                            style={{
                              fontSize: "15px",
                              fontWeight: "normal",
                              width: "100%",
                              align: "center"
                            }}
                          >
                            {p.name}
                          </button>
                          <button
                            className="btn btn-warning text-left m-2"
                            style={{
                              fontSize: "10px",
                              fontWeight: "normal",
                              float: "right"
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger text-left m-2"
                            style={{
                              fontSize: "10px",
                              fontWeight: "normal",
                              float: "right"
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                    <br />
                  </span>
                );
              })}
            </div>
          </div>
        </section>
      );
    }
  }
}
export default Lists;
