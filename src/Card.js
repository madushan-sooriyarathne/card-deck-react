import React, { Component } from "react";
import "./css/Card.css";

export default class Card extends Component {
  render() {
    return (
      <img
        src={this.props.image}
        alt={`${this.props.suit}-${this.props.value}`}
        className="Card"
        style={{
          transform: `translate(${this.props.translate}) rotate(${this.props.rotate})`
        }}
      ></img>
    );
  }
}
