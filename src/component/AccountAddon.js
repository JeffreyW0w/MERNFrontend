import React from "react";
import "../css/AccountAddon.css";
import axios from "axios";
import { deleteUser, updateUser } from "../actions/actions";
import { connect } from "react-redux";

function mapDispatchToProps(dispatch) {
  return {
    deleteUser: (payload) => dispatch(deleteUser(payload)),
    updateUser: (payload) => dispatch(updateUser(payload)),
  };
}

function mapStateToProps(state) {
  return {
    users: state.rootReducer.users,
  };
}

class AccountAddon extends React.Component {
  constructor(props) {
    super(props);
    this.inputs = {
      balance: "",
      credit: "",
      email: "",
      employer: "",
      phone: "",
      tags: "",
      comments: "",
    };
  }

  /**
   * prevent page from collapsing
   */
  pageClicked = (e) => {
    e.stopPropagation();
  };

  /**
   * delete user
   */
  delBtnClicked = () => {
    axios
      .delete(`http://localhost:5000/deleteUser/${this.props.user.id}`)
      .then((response) => {
        if (response.status === 200 && response.data.count === 1) {
          this.props.deleteUser({ id: this.props.user.id });
        }
      })
      .catch((e) => {
        alert(e.response.data);
      });
  };

  /**
   * update user
   */
  updateBtnClicked = (e) => {
    let id = e.target.id;
    let requestObj = {};
    if (id === "tags") {
      requestObj[id] = this.inputs[id]
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length !== 0);
    } else {
      requestObj[id] = this.inputs[id];
    }
    axios
      .put(`http://localhost:5000/updateUser/${this.props.user.id}`, requestObj)
      .then((response) => {
        if (response.status === 200 && response.data.count === 1) {
          this.props.updateUser({
            id: this.props.user.id,
            ...requestObj,
          });
        }
      })
      .catch((e) => {
        alert(e.response.data);
      });
  };

  /**
   * track user input
   */
  updateLocalInput = (e) => {
    this.inputs[e.target.id] = e.target.value;
  };

  render() {
    return (
      <div id={"add-on-wrapper"} onClick={this.pageClicked}>
        <div id={"input-wrapper"}>
          <input
            placeholder={"balance"}
            id={"balance"}
            onChange={this.updateLocalInput}
          />
          <button id={"balance"} onClick={this.updateBtnClicked}>
            Update
          </button>
          <label className={"current-data"}>{this.props.user.balance}</label>
        </div>
        <div id={"input-wrapper"}>
          <input
            placeholder={"credit"}
            id={"credit"}
            onChange={this.updateLocalInput}
          />
          <button id={"credit"} onClick={this.updateBtnClicked}>
            Update
          </button>
          <label className={"current-data"}>{this.props.user.credit}</label>
        </div>
        <div id={"input-wrapper"}>
          <input
            placeholder={"email"}
            id={"email"}
            onChange={this.updateLocalInput}
          />
          <button id={"email"} onClick={this.updateBtnClicked}>
            Update
          </button>
          <label className={"current-data"}>{this.props.user.email}</label>
        </div>
        <div id={"input-wrapper"}>
          <input
            placeholder={"employer"}
            id={"employer"}
            onChange={this.updateLocalInput}
          />
          <button id={"employer"} onClick={this.updateBtnClicked}>
            Update
          </button>
          <label className={"current-data"}>{this.props.user.employer}</label>
        </div>
        <div id={"input-wrapper"}>
          {" "}
          <input
            placeholder={"phone"}
            id={"phone"}
            onChange={this.updateLocalInput}
          />
          <button id={"phone"} onClick={this.updateBtnClicked}>
            Update
          </button>
          <label className={"current-data"}>{this.props.user.phone}</label>
        </div>
        <div id={"input-wrapper"}>
          <input
            placeholder={"tags"}
            id={"tags"}
            onChange={this.updateLocalInput}
          />
          <button id={"tags"} onClick={this.updateBtnClicked}>
            Update
          </button>
          <label className={"current-data"}>
            {this.props.user.tags.length
              ? this.props.user.tags.reduce((prev, cur) => {
                  return (prev += `, ${cur}`);
                })
              : ""}
          </label>
        </div>
        <div id={"input-wrapper"}>
          <input
            placeholder={"comments"}
            id={"comments"}
            onChange={this.updateLocalInput}
          />
          <button id={"comments"} onClick={this.updateBtnClicked}>
            Update
          </button>
        </div>
        <label className={"current-data"}>{this.props.user.comments}</label>
        <button id={"del-btn"} onClick={this.delBtnClicked}>
          Delete Account
        </button>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountAddon);
