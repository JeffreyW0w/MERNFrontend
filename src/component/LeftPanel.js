import React from "react";
import "../css/LeftPanel.css";
import { addNewUser, redirectList, redirectOverview } from "../actions/actions";
import { connect } from "react-redux";

function mapDispatchToState(dispatch) {
  return {
    redirectOverview: () => dispatch(redirectOverview()),
    redirectList: () => dispatch(redirectList()),
    addNewUser: () => dispatch(addNewUser()),
  };
}

class LeftPanel extends React.Component {
  /**
   * redirect page (act as a temporary react router for this project)
   */
  redirect = (link) => {
    switch (link) {
      case "list":
        this.props.redirectList();
        break;
      case "overview":
        this.props.redirectOverview();
        break;
      case "newUser":
        this.props.addNewUser();
        break;
      default:
        return;
    }
  };
  render() {
    return (
      <div id={"account-left-panel"}>
        <button className={"nav-btn"} onClick={() => this.redirect("list")}>
          User List
        </button>
        <button className={"nav-btn"} onClick={() => this.redirect("overview")}>
          Overview
        </button>
        <button className={"nav-btn"} onClick={() => this.redirect("newUser")}>
          Add a new user
        </button>
      </div>
    );
  }
}

export default connect(null, mapDispatchToState)(LeftPanel);
