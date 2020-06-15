import React from "react";
import "../css/Account.css";
import AccountAddon from "./AccountAddon";
import { connect } from "react-redux";

class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expand: false,
    };
  }

  /**
   * expand account section
   */
  clicked = () => {
    this.setState({
      expand: !this.state.expand,
    });
  };

  /**
   * percentage calculation
   */
  getProgress = () => {
    return (
      Math.max(this.props.user.credit / 750, this.props.user.balance / 50000) *
      100
    ).toFixed(2);
  };

  render() {
    return (
      <li id={"account-wrapper"}>
        <div
          className={this.state.expand ? "expand" : ""}
          key={this.props.user.id}
          id={"account"}
          onClick={this.clicked}
        >
          <img src={this.props.user.picture} />
          {this.props.user.name_first} {this.props.user.name_last}
          <label id={"progress"}>{this.getProgress()} % to Goal </label>
          {this.state.expand ? <AccountAddon user={this.props.user} /> : ""}
        </div>
      </li>
    );
  }
}

export default Account;
