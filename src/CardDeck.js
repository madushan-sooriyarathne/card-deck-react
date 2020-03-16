import React, { Component } from "react";
import Card from "./Card";
import { getRotationAmount, getTranslateAmount } from "./helper";
import "./css/CardDeck.css";

export default class ColorDeck extends Component {
  static defaultProps = {
    shuffleDeckUrl:
      "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
  };

  constructor(props) {
    super(props);
    this.state = {
      cardRemaining: 0,
      deckId: "",
      cardDeck: []
    };

    this.handleClick = this.handleClick.bind(this);
  }

  async componentDidMount() {
    console.log("Here");
    // get a deck from API
    const data = await fetch(this.props.shuffleDeckUrl).then(res => res.json());
    console.log(data);
    if (data.success) {
      this.setState({ cardRemaining: data.remaining, deckId: data.deck_id });
    }
  }

  async handleClick(event) {
    const drawUrl = `https://deckofcardsapi.com/api/deck/${this.state.deckId}/draw/?count=1`;
    const data = await fetch(drawUrl).then(res => res.json());

    if (data.success) {
      this.setState(st => {
        const newDeck = [
          ...st.cardDeck,
          ...data.cards.map(card => ({
            code: card.code,
            image: card.image,
            suit: card.suit,
            value: card.value,
            translate: getTranslateAmount(),
            rotate: getRotationAmount()
          }))
        ];
        return { cardDeck: newDeck, cardRemaining: data.remaining };
      });
    }
  }

  render() {
    return (
      <div className="CardDeck">
        <h1 className="CardDeck-title"> Card Deck</h1>
        <p className="CardDeck-remaining">
          {this.state.cardRemaining < 1
            ? "You draw all 52 Cards!"
            : `Cards Remaining: ${this.state.cardRemaining}`}
        </p>
        <button
          onClick={this.handleClick}
          className={`CardDeck-btn ${
            this.state.cardRemaining < 1 ? "disabled" : ""
          }`}
          disabled={this.state.cardRemaining < 1}
        >
          Draw a Card
        </button>
        <div className="CardDeck-stack">
          {this.state.cardDeck.map(card => (
            <Card
              image={card.image}
              value={card.value}
              suit={card.suit}
              translate={card.translate}
              rotate={card.rotate}
            />
          ))}
        </div>
      </div>
    );
  }
}
