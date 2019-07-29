import React, { Component } from "react";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      names: [],
      name: ""
    };
  }

  render() {
    return (
      <button
        className="btn indigo"
        onClick={() => {
          console.log("MO");
        }}
      >
        Click
      </button>
    );
  }
}

export default Home;
