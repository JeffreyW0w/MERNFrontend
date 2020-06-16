import React from "react";
import axios from "axios";
import "../css/App.css";
import LeftPanel from "./LeftPanel";
import { connect } from "react-redux";
import { updateUserList } from "../actions/actions";
import UserList from "./UserList";
import Overview from "./Overview";
import NewUser from "./NewUser";

function mapDispatchToProps(dispatch) {
  return {
    updateUserList: (payload) => dispatch(updateUserList(payload)),
  };
}

function mapStateToProps(state) {
  return {
    currentPage: state.rootReducer.currentPage,
  };
}

class App extends React.Component {
  /**
   * fetch user when mounted
   */
  componentDidMount() {
    this.fetchUser(null).catch((e) => {
      alert(e);
    });
  }

  /**
   * actual fetch user function
   */
  fetchUser = async () => {
    try {
      let result = await axios.get("http://localhost:5000/listUser");
      this.props.updateUserList({
        users: result.data,
      });
    } catch (e) {
      alert(e);
    }
  };

  render() {
    return (
      <div id={"panel-wrapper"}>
        <LeftPanel />
        {this.props.currentPage === "list" ? (
          <UserList />
        ) : this.props.currentPage === "overview" ? (
          <Overview />
        ) : (
          <NewUser />
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
