import React from "react";
import { connect } from "react-redux";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import "../css/Overview.css";

function mapStateToProps(state) {
  return {
    users: state.rootReducer.users,
  };
}
class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      credit_options: null,
      balance_options: null,
    };
  }

  /**
   * extract data when component is mounted
   */
  componentDidMount() {
    this.extractDataFromUser();
  }

  /**
   * categorize data
   */
  getCreditData = () => {
    let data = this.props.users.map((user) => user.credit).sort();
    let ranges = new Array(7).fill(0);
    for (const credit of data) {
      let loc = Math.floor(credit / 100 - 2);
      if (loc > ranges.length - 1) loc = ranges.length - 1;
      ranges[loc] += 1;
    }
    return ranges;
  };

  /**
   * categorize data
   */
  getBalanceData = () => {
    let data = this.props.users.map((user) => user.balance).sort();
    let ranges = new Array(6).fill(0);
    for (const balance of data) {
      let loc = Math.floor(balance / 4000);
      if (loc > ranges.length - 1) loc = ranges.length - 1;
      ranges[loc] += 1;
    }
    return ranges;
  };

  /**
   * get user data into Highchart format
   */
  extractDataFromUser = () => {
    this.setState({
      credit_options: {
        chart: {
          type: "column",
        },
        title: {
          text: "Credit Distribution",
        },
        xAxis: {
          title: {
            text: "credit range",
          },
          categories: [
            "200 - 300",
            "300 - 400",
            "400 - 500",
            "500 - 600",
            "600 - 700",
            "700 - 800",
            "800+",
          ],
        },
        yAxis: {
          title: { text: "count" },
        },
        series: [{ name: "credit count", data: this.getCreditData() }],
      },
      balance_options: {
        chart: {
          type: "column",
        },
        title: {
          text: "Balance Distribution",
        },
        xAxis: {
          title: {
            text: "balance",
          },
          categories: [
            "below 4000",
            "4000 - 8000",
            "8000 - 12000",
            "12000 - 16000",
            "16000 - 20000",
            "20000+",
          ],
        },
        yAxis: {
          title: {
            text: "count",
          },
        },
        series: [
          {
            name: "balance count",
            data: this.getBalanceData(),
          },
        ],
      },
    });
  };

  render() {
    return (
      <div id={"overview-wrapper"}>
        {this.state.credit_options ? (
          <HighchartsReact
            highcharts={Highcharts}
            options={this.state.credit_options}
          />
        ) : (
          ""
        )}
        {this.state.balance_options ? (
          <HighchartsReact
            highcharts={Highcharts}
            options={this.state.balance_options}
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(Overview);
