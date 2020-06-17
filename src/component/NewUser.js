import React from "react";
import "../css/NewUser.css";
import axios from "axios";
import { createUser } from "../actions/actions";
import { connect } from "react-redux";

function mapDispatchToProps(dispatch) {
  return {
    createUser: (payload) => dispatch(createUser(payload)),
  };
}

class NewUser extends React.Component {
  constructor(props) {
    super(props);
    this.inputs = {
      id: "",
      name_first: "",
      name_last: "",
      picture: "",
      balance: "",
      credit: "",
      employer: "",
      email: "",
      phone: "",
      comments: "",
      tags: "",
    };
  }

  /**
   * track user input
   */
  inputChange = (e) => {
    this.inputs[e.target.id] = e.target.value;
  };

  /**
   * create user
   */
  createUser = () => {
    axios
      .post("http://localhost:5000/createUser", { ...this.inputs })
      .then((response) => {
        if (response.status === 200 && response.data) {
          alert("Successfully added new user");
          this.props.createUser({
            ...this.inputs,
          });
        } else {
          alert(response.data);
        }
      })
      .catch((e) => {
        alert(e.response.data);
      });
  };

  render() {
    return (
      <ul id={"new-user-input-wrapper"}>
        <li id={"new-user-input-wrapper"}>
          <input
            placeholder={"User Id"}
            id={"id"}
            onChange={this.inputChange}
          />
        </li>
        <li id={"new-user-input-wrapper"}>
          <input
            placeholder={"First Name"}
            id={"name_first"}
            onChange={this.inputChange}
          />
        </li>
        <li id={"new-user-input-wrapper"}>
          <input
            placeholder={"Last Name"}
            id={"name_last"}
            onChange={this.inputChange}
          />
        </li>
        <li id={"new-user-input-wrapper"}>
          <input
            placeholder={"Picture Url"}
            id={"picture"}
            onChange={this.inputChange}
          />
        </li>
        <li id={"new-user-input-wrapper"}>
          <input
            placeholder={"Balance"}
            id={"balance"}
            onChange={this.inputChange}
          />
        </li>
        <li id={"new-user-input-wrapper"}>
          <input
            placeholder={"Credit"}
            id={"credit"}
            onChange={this.inputChange}
          />
        </li>
        <li id={"new-user-input-wrapper"}>
          <input
            placeholder={"Employer"}
            id={"employer"}
            onChange={this.inputChange}
          />
        </li>
        <li id={"new-user-input-wrapper"}>
          <input
            placeholder={"Email"}
            id={"email"}
            onChange={this.inputChange}
          />
        </li>
        <li id={"new-user-input-wrapper"}>
          <input
            placeholder={"Phone"}
            id={"phone"}
            onChange={this.inputChange}
          />
        </li>
        <li id={"new-user-input-wrapper"}>
          <input
            placeholder={"Comments"}
            id={"comments"}
            onChange={this.inputChange}
          />
        </li>
        <li id={"new-user-input-wrapper"}>
          <input placeholder={"Tags"} id={"tags"} onChange={this.inputChange} />
        </li>
        <button onClick={this.createUser}>Create</button>
      </ul>
    );
  }
}

export default connect(null, mapDispatchToProps)(NewUser);
