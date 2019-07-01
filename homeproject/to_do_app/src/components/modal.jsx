import React, { Component } from "react";
import {
  Modal,
  Button,
  ModalFooter,
  ModalBody,
  Form,
  FormGroup,
  ModalHeader,
  Label,
  Input
} from "reactstrap";

class ModalForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: true,
      item_desc: this.props.new_item
        ? "Enter item description"
        : this.props.item.description,
      date: this.props.new_item ? "" : this.props.item.due_date,
      check: this.props.new_item
        ? 0
        : String(this.props.item.completed) == "true"
        ? 1
        : 0
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleDate = this.handleDate.bind(this);
    this.handleText = this.handleText.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch(
      "http://localhost:8000/api_view/v1/lists/" + this.props.id + "/items/",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `JWT ${sessionStorage.getItem("token")}`
        },
        mode: "cors",
        body: JSON.stringify({
          description: this.state.item_desc,
          due_date: this.state.date,
          completed: String(this.state.check)
        })
      }
    )
      .then(response => {
        if (response.ok) {
          alert("Item Added Successfully!");
          this.props.post_successful(response.ok);
          return response.json();
        } else {
          alert("Error occurred!Please Try Again Later");
        }
      })
      .catch(error => console.log(error));
    this.handleClose();
  }

  handleUpdate(event) {
    event.preventDefault();
    fetch(
      "http://localhost:8000/api_view/v1/lists/" +
        this.props.id +
        "/items/" +
        this.props.item.id,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `JWT ${sessionStorage.getItem("token")}`
        },
        mode: "cors",
        body: JSON.stringify({
          description: this.state.item_desc,
          due_date: this.state.date,
          completed: String(this.state.check)
        })
      }
    )
      .then(response => {
        if (response.ok) {
          alert("Item Updated Successfully!");
          this.props.post_successful(response.ok);
          return response.json();
        } else {
          alert("Error occurred!Please Try Again Later");
        }
      })
      .catch(error => console.log(error));
    this.handleClose();
  }

  handleClose() {
    this.setState({ isOpen: false, check: 0 });
    this.props.new_item ? this.props.handleClick() : this.props.handleClick(0);
  }

  handleText(event) {
    this.setState({
      item_desc: event.target.value
    });
  }

  handleDate(event) {
    this.setState({
      date: event.target.value
    });
  }

  handleCheck(event) {
    this.setState({
      check: !this.state.check
    });
  }
  render() {
    return (
      <div>
        <Modal
          isOpen={this.state.isOpen}
          fade={true}
          onClose={this.handleClose}
        >
          <ModalHeader>{this.props.title}</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="description">Description</Label>
                <Input
                  type="textarea"
                  name="description"
                  id="description"
                  value={this.state.item_desc}
                  onChange={this.handleText}
                />
              </FormGroup>
              <FormGroup>
                <Label for="description">Due Date</Label>
                <Input
                  type="date"
                  name="date"
                  id="date"
                  value={this.state.date}
                  onChange={this.handleDate}
                />
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input
                    type="checkbox"
                    onChange={this.handleCheck}
                    checked={this.state.check ? "checked" : ""}
                  />{" "}
                  Completed
                </Label>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={this.handleClose}>
              Close
            </Button>
            <Button
              color="success"
              onClick={
                this.props.new_item ? this.handleSubmit : this.handleUpdate
              }
            >
              Save Changes
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ModalForm;
