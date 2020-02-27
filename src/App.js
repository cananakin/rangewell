import React, { Component } from "react";
import fetch from "isomorphic-fetch";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deals: [],
            filters:[]
        }
    }
    
  componentDidMount() {
    fetch(`http://localhost:3001/api/deals`)
        .then(response => response.json())
        .then(response => {
            this.setState({ deals: response });
        });
      
  }
  render() {
    const {deals} = this.state;
    const list = deals.map(deal => <li key={deal._id}>{deal.title} - {deal.amountRequired}</li>);
    return (
      <div className="App">
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
        </header>

        <main className="BodyContent">
            <h1>Deals</h1>
            <div>
                <ul>
                  {list}
                </ul>
            </div>
        </main>
      </div>
    );
  }
}

export default App;
