import React, { Component } from "react";
import axios from "axios";

import NavigationBar from "./Navbar";

class Request extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sentRequests: [],
    };
  }

  render() {
    return (
      <div>
        <NavigationBar></NavigationBar>
        <div>

        </div>
      </div>
    );
  }
}

export default Request;