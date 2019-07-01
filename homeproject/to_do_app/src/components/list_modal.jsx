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

class ListModalForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: true,
      desc: this.props.new_item ? "Enter list name" : this.props.name
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleText = this.handleText.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch("http://localhost:8000/api_view/v1/lists", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        id: `${sessionStorage.getItem("userid")}`,
        Authorization: `JWT ${sessionStorage.getItem("token")}`
      },
      mode: "cors",
      body: JSON.stringify({
        name: this.state.desc
      })
    })
      .then(response => {
        if (response.ok) {
          alert("List Added Successfully!");
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
    console.log(this.props.id);
    fetch("http://localhost:8000/api_view/v1/lists/" + this.props.id, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `JWT ${sessionStorage.getItem("token")}`
      },
      mode: "cors",
      body: JSON.stringify({
        name: this.state.desc
      })
    })
      .then(response => {
        if (response.ok) {
          alert("List Updated Successfully!");
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
    this.setState({ isOpen: false });
    this.props.new_item ? this.props.handleClick() : this.props.handleClick(0);
  }

  handleText(event) {
    this.setState({
      desc: event.target.value
    });
  }

  render() {
    //console.log(this.props.title);
    //console.log(this.state.isOpen);
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
                <Label for="description">List Name</Label>
                <Input
                  type="textbox"
                  name="name"
                  id="name"
                  value={this.state.desc}
                  onChange={this.handleText}
                />
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

export default ListModalForm;
