import React from "react";
import Account from "./Account";
import "../css/RightPanel.css";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return {
    users: state.rootReducer.users,
  };
}

class UserList extends React.Component {
  render() {
    return (
      <ul id={"account-list"}>
        {this.props.users.map((user) => {
          return <Account key={user.id} user={user} />;
        })}
      </ul>
    );
  }
}

export default connect(mapStateToProps, null)(UserList);
