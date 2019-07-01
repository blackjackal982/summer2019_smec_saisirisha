import React, { Component } from "react";
import { Spinner } from "reactstrap";
import ListModalForm from "./list_modal";

class Lists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: [],
      errors: null,
      isLoaded: false,
      identifier: null,
      isAddList: false,
      isEditList: 0,
      editList: null
    };
    this.handleClick = this.handleClick.bind(this);
  }
  post_successful = event => {
    console.log(event);
    fetch("http://localhost:8000/api_view/v1/lists", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        id: `${this.props.user_id}`,
        Authorization: `JWT ${sessionStorage.getItem("token")}`
      },
      mode: "cors"
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          lists: data
        });
      });
  };
  handleClick() {
    this.setState({
      isAddList: !this.state.isAddList
    });
  }

  handleEdit = (id, list) => {
    this.setState({
      isEditList: id,
      editList: list
    });
  };
  handleDelete = (event, id) => {
    event && event.preventDefault();
    fetch("http://localhost:8000/api_view/v1/lists/" + id, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `JWT ${sessionStorage.getItem("token")}`
      },
      mode: "cors"
    })
      .then(response => {
        if (response.ok) {
          alert("List Deleted Successfully!");
          this.post_successful(response.ok);
          return response.json();
        } else {
          alert("Error occurred!Please Try Again Later");
        }
      })
      .catch(error => console.log(error));
  };

  handleList(button) {
    fetch("http://localhost:8000/api_view/v1/lists/" + button.id + "/items", {
      method: "GET",
      mode: "cors",
      headers: {
        Authorization: `JWT ${sessionStorage.getItem("token")}`
      }
    })
      .then(response => response.json())
      .then(data => {
        this.props.action(button, data);
      });
  }

  componentDidMount() {
    console.log(sessionStorage.getItem("token"));
    fetch("http://localhost:8000/api_view/v1/lists", {
      method: "GET",
      mode: "cors",
      headers: {
        Authorization: `JWT ${sessionStorage.getItem("token")}`,
        id: `${this.props.user_id}`
      },
      credentials: "include"
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
        <div className="text-light">
          <Spinner color="light" />
          <label
            style={{
              fontSize: "30px"
            }}
          >
            Loading
          </label>
        </div>
      );
    } else {
      return (
        <section>
          <button
            onClick={this.handleClick}
            className="btn btn-primary"
            style={{
              fontSize: "13px",
              fontWeight: "normal",
              float: "left",
              display: "flex"
            }}
          >
            Add list +
          </button>
          {this.state.isAddList ? (
            <ListModalForm
              title={
                String("Add list to " + sessionStorage.getItem("username")) +
                " database"
              }
              user_id={this.props.user_id}
              handleClick={this.handleClick}
              new_item={true}
              post_successful={this.post_successful}
            />
          ) : null}
          <br />
          <div>
            <div>
              {this.state.lists.map((p, id) => {
                return (
                  <span key={id}>
                    <div
                      className="column"
                      style={{
                        float: "left",
                        width: "25 %",
                        padding: "0 10px"
                      }}
                    >
                      <div className="card bg-light">
                        <img
                          className="card-img img-fluid"
                          style={{
                            width: "100%",
                            height: "40vh",
                            objectFit: "cover"
                          }}
                          src="/images/note.png"
                          alt="Card image cap"
                        />
                        <div className="card-img-overlay">
                          <label style={{ fontSize: "15px" }}>{p.name}</label>
                          <button
                            onClick={() => this.handleList(p)}
                            className="btn btn-primary text-left"
                            style={{
                              fontSize: "15px",
                              fontWeight: "normal",
                              display: "flex"
                            }}
                          >
                            View Items
                          </button>

                          <button
                            onClick={() => this.handleEdit(p.id, p)}
                            className="btn btn-warning text-left m-2"
                            style={{
                              fontSize: "10px",
                              fontWeight: "normal",
                              display: "flex"
                            }}
                          >
                            Edit
                          </button>
                          {this.state.isEditList ? (
                            <ListModalForm
                              user_id={this.props.user_id}
                              title={String(
                                "Edit list " + this.state.isEditList
                              )}
                              id={this.state.editList.id}
                              title={
                                String("Edit list ") + this.state.editList.name
                              }
                              name={this.state.editList.name}
                              new_item={false}
                              handleClick={this.handleEdit}
                              post_successful={this.post_successful}
                            />
                          ) : null}
                          <button
                            onClick={event => this.handleDelete(event, p.id)}
                            className="btn btn-danger text-left m-2"
                            style={{
                              fontSize: "10px",
                              fontWeight: "normal",
                              display: "flex"
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                      <br />
                    </div>
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
