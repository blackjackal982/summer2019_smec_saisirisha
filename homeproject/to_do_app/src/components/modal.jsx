import React, { Component } from "react";
import { Modal, Button, ModalFooter, ModalBody, ModalHeader } from "reactstrap";

class ModalForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleClose() {
    this.setState({ show: false });
  }
  handleChange(event) {
    this.setState({ text: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    let data = {
      text: this.state.text
    };
    fetch("http://localhost:8000/api_view/v1/lists/" + this.props.id, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      mode: "cors",
      body: JSON.stringify(data)
    })
      .then(response => {
        if (response.ok) {
          alert("Item added Successfully!");
          this.props.updateSuccess(true);
        } else {
          alert("An error occurred !\n    Please try again later");
        }
      })
      .catch(error => console.log(error));
  }

  render() {
    console.log(this.props.title);
    console.log(this.state.show);
    return (
      <div>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <ModalHeader closeButton>{this.props.title}</ModalHeader>

          {/* <label className="text-danger">Description:</label>
          <textarea
            className="form-control mr-sm-2 m-2"
            onChange={this.handleChange}
            style={{ height: 200 }}
          />
          <br />
          <label className="text-danger">Due_date:</label>
          <input type="date" />
          <br />
          <label className="text-danger">Completed:</label>
          <input type="checkbox" />
          <br /> */}
          <ModalBody>Woohoo, you're reading this text in a modal!</ModalBody>
          <ModalFooter>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.handleClose}>
              Save Changes
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ModalForm;
