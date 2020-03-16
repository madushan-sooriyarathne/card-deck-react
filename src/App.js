import React, { Component } from "react";
import CardDeck from "./CardDeck";
import "./css/App.css";

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <CardDeck />
      </div>
    );
  }
}
