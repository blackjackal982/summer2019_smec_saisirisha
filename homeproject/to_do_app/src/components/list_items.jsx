import React, { Component } from "react";
import ModalForm from "./modal";
import { Button } from "reactstrap";

class List_item extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      isAddItem: false,
      isEditItem: 0,
      item: null
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({
      isAddItem: !this.state.isAddItem
    });
  }

  handleEdit = (id, item) => {
    this.setState({
      isEditItem: id,
      item: item
    });
  };
  handleDelete = (event, id, item) => {
    event && event.preventDefault();
    fetch(
      "http://localhost:8000/api_view/v1/lists/" + id + "/items/" + item.id,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `JWT ${sessionStorage.getItem("token")}`
        },
        mode: "cors"
      }
    )
      .then(response => {
        if (response.ok) {
          alert("Item Deleted Successfully!");
          return response.json();
        } else {
          alert("Error occurred!Please Try Again Later");
        }
      })
      .catch(error => console.log(error));
  };
  render() {
    return (
      <section>
        <label
          className="card-title text-dark"
          style={{
            fontSize: "30px",
            fontWeight: "bold"
          }}
        >
          {this.props.list.name}
        </label>
        <div>
          <Button
            onClick={this.handleClick}
            color="primary"
            style={{ fontSize: "13px", fontWeight: "normal" }}
          >
            Add item +
          </Button>
          {this.state.isAddItem ? (
            <ModalForm
              title={String("Add item to " + this.props.list.name)}
              id={this.props.list.id}
              handleClick={this.handleClick}
              new_item={true}
            />
          ) : null}
        </div>
        <br />
        <div>
          {this.props.items.map((p, id) => {
            return (
              <span key={id}>
                <div
                  className="column"
                  style={{
                    float: "left",
                    width: "25 %",
                    padding: "20px 10px"
                  }}
                >
                  <div className="card bg-light">
                    <img
                      className="card-img img-fluid"
                      style={{
                        width: "100%",
                        height: "45vh",
                        objectFit: "cover"
                      }}
                      src="/images/note.png"
                      alt="Card image cap"
                    />
                    <div className="card-img-overlay">
                      <div
                        className="card-title"
                        style={{
                          fontSize: "15px",
                          fontWeight: "normal",
                          display: "block"
                        }}
                      >
                        <b>
                          <i>{p.description}</i>
                        </b>
                        <br />
                        <br />
                        <b>Due Date :</b> {p.due_date}
                        <br />
                        <b>Completed :</b> {String(p.completed)}
                        <br />
                      </div>
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
                      {this.state.isEditItem ? (
                        <ModalForm
                          title={String("Edit item " + this.state.isEditItem)}
                          id={this.props.list.id}
                          new_item={false}
                          handleClick={this.handleEdit}
                          item={this.state.item}
                        />
                      ) : null}
                      <button
                        onClick={event => this.handleDelete(event, p.id, p)}
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
      </section>
    );
  }
}

export default List_item;
