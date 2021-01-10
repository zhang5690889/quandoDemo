import React from "react";

export class DemoWarningBar extends React.Component {
  render() {
    return (
      <div
        className="alert alert-danger"
        role="alert"
        style={{ textAlign: "center", fontWeight: "bold" }}
      >
        You are in demo mode. Contact{" "}
        <a href="https://www.linkedin.com/in/xzhang-888/" target="_blank">
          Victor Zhang
        </a>{" "}
        for more info!
      </div>
    );
  }
}
