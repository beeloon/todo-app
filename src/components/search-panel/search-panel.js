import React, { Component } from "react";

import "./search-panel.css";
export default class SearchPanel extends Component {
  state = {
    term: "",
  };

  onSearchChange = e => {
    const term = e.target.value;

    this.setState({ term });
    this.props.onSearch(term);
  };

  render() {
    return (
      <input
        className="search-input form-control"
        type="text"
        value={this.state.term}
        onChange={this.onSearchChange}
        placeholder="Type to search..."
      />
    );
  }
}
