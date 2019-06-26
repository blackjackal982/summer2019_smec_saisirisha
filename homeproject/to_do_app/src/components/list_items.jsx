import React, { Component } from "react";
//import ModalForm from "./modal";
import { Modal, Button, ModalFooter, ModalBody,Form,FormGroup,ModalHeader,InputGroup
 } from "reactstrap";

class List_item extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      isOpen: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClick() {
    this.setState({
      isOpen: true
    });
  }

  post_successful = event => {
    fetch(
      "http://localhost:8000/api_view/v1/lists/" +
        this.props.list.id +
        "/items",
      {
        method: "GET"
      }
    )
      .then(response => response.json())
      .then(data => {
        this.props.items = data;
      });
  };

  handleClose() {
    this.setState({ isOpen: false });
  }
  render() {
    return (
      <section>
        <div
          className="card-title text-warning"
          style={{ fontSize: "20px", fontWeight: "bold" }}
        >
          {this.props.list.name}
        </div>
        <div className="">
          <Button
            onClick={this.handleClick}
            variant="primary"
            style={{ fontSize: "13px", fontWeight: "normal" }}
          >
            Add item +
          </Button>
          <Modal isOpen={this.state.isOpen} fade = {true} onClose={this.handleClose}>
            <ModalHeader>
              Add item to {this.props.list.name}
            </ModalHeader>
            <ModalBody>
            <Form>
            </Form>
            </ModalBody>
            <ModalFooter>
              <Button variant="danger" onClick={ this.handleClose}>
                Close
              </Button>
              <Button variant="success" onClick={ this.handleClose}>
                Save Changes
              </Button>
            </ModalFooter>
          </Modal>
        </div>
        <br />
        <div>
          {this.props.items.map((p, id) => {
            return (
              <span key={id}>
                <div className="card bg-dark">
                  <div className="card-body bg-light">
                    <button
                      className="btn btn-default text-left m-2"
                      style={{
                        fontSize: "15px",
                        fontWeight: "normal",
                        width: "100%",
                        align: "left"
                      }}
                    >
                      {p.description}
                      <div>
                        Due Date : {p.due_date}
                        <br />
                        Completed : {String(p.completed)}
                        <br />
                      </div>
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
                <br />
              </span>
            );
          })}
        </div>
      </section>
    );
  }
}

export default List_item;
