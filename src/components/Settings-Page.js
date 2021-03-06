import React, { Component } from 'react';

import UserList from '../components/UserList';
import ChoreList from '../components/ChoreList';

import * as helpers from '../helpers';

export default class SettingsPage extends Component {
  constructor() {
    super();

    this.state = {
      nameInput: "",
      colorSelect: "#1d9f9f",
      choreInput: ""
    };
  }

  handleUserTextInputChange = (event) => {
    let inputText = event.target.value;
    this.setState({nameInput: inputText})
  }

  handleChoreTextInputChange = (event) => {
    let inputText = event.target.value;
    this.setState({choreInput: inputText})
  }

  handleUserColorSelectChange = (event) => {
    let colorSelect = event.target.value;
    this.setState({colorSelect: colorSelect})
  }

  handleSubmitHousemate = (event) => {
    event.preventDefault();
    let userName = this.state.nameInput;
    let userColor = this.state.colorSelect;

    // check if user is unique
    if (helpers.findIndexOfUser(this.props.users, userName) < 0
      && this.state.nameInput !== "") {
      this.props.addUserActionCreator(userName, userColor);
      this.setState({nameInput: ""});
      this.props.openModal(userName + ' was added as a housemate');

    } else if (this.state.nameInput === "") {
      this.props.openModal('Field cannot be empty', "ERROR");

    // if user already exists, do not add to store and give error modal
    } else {
      this.props.openModal(userName + ' already exists', "ERROR");
    }

  }

  handleSubmitChore = (event) => {
    event.preventDefault();
    let chore = this.state.choreInput;
    // check if chore is unique
    if (helpers.findIndexOfChore(this.props.chores, chore) < 0
      && this.state.choreInput !== "") {
      this.props.addChoreActionCreator(chore);
      this.setState({choreInput: ""});
      this.props.openModal(chore + ' added to chores');

      // if chore already exists, do not add to store and give error modal
    } else if (this.state.choreInput === "") {
      this.props.openModal('Field cannot be empty', "ERROR");
    }
    else {
      this.props.openModal(chore + ' already exists', "ERROR");

    }

  }

  // this function will clear our localStorage and reset the store
  // to its default values
  handleDeleteData = () => {
    localStorage.clear();
    this.props.clearUserData();
    this.props.openModal('All data has been deleted');
  }

  render() {
    return (
      <div className="route settings-page">
        <fieldset className="fieldset">
          <legend>Add Housemate</legend>
          <form
            onSubmit={this.handleSubmitHousemate}
          >
            <label>
              Username
              <input
                value={this.state.nameInput}
                onChange={this.handleUserTextInputChange}
                type="text"
                name="name"
                placeholder="Enter Name"
              />
            </label>
            <div className="form-group">
            <label>
              Token Color
              <select
                value={this.state.colorSelect}
                onChange={this.handleUserColorSelectChange}
              >
                <option value="#1d9f9f">Blue</option>
                <option value="#3cbf1b">Green</option>
                <option value="#dbe931">Yellow</option>
                <option value="#ffa800">Orange</option>
                <option value="#af2ad2">Purple</option>
              </select>
            </label>
            <button>Submit</button>
          </div>
          </form>
        </fieldset>
        <fieldset className="fieldset">
          <legend>Add Chore</legend>
          <div className="form-group">
          <form
            onSubmit={this.handleSubmitChore}
          >
            <label>
              Chore
              <input
                value={this.state.choreInput}
                onChange={this.handleChoreTextInputChange}
                type="text"
                name="chore"
                placeholder="Enter Chore"
              />
            </label>
            <button>Submit</button>
          </form>
        </div>
        </fieldset>


        <UserList
          users={this.props.users}
          selectItemToEdit={this.props.selectItemToEdit}

        />

        <ChoreList
          selectItemToEdit={this.props.selectItemToEdit}
          chores={this.props.chores}
        />

        <fieldset className="fieldset delete-user-data">
          <legend>Delete User Data</legend>
          <form
            onSubmit={this.handleDeleteData}
          >
            <button>Delete Data</button>
          </form>
        </fieldset>
      </div>
    );
  }
}
