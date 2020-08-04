/* eslint-disable linebreak-style */
import React, { Component } from 'react';
import './app.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { SensorCard } from './cards'
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck'
import { SensorCard } from './cards';

export default class App extends Component {
  state = { username: null };

  componentDidMount() {
    fetch('/api/getUsername')
      .then(res => res.json())
      .then(user => this.setState({ username: user.username }));
  }

  render() {
    const { username } = this.state;
    const SBP1 = 1.23;
    return (
      <div>
        <h1>HMI testing</h1>
        <CardDeck>
        <Card 
        bg='secondary'
        text='light'
        style={{ width: '7rem' }}>
        <Card.Body>
          <Card.Title as = "h2">{SBP1} psi </Card.Title>          
          <Card.Text>
            SPP
          </Card.Text>          
        </Card.Body>
      </Card>
      <Card 
        bg='secondary'
        text='light'
        style={{ width: '7rem' }}>
        <Card.Body>
          <Card.Title as = "h2">{SBP1} psi </Card.Title>          
          <Card.Text>
            SBP
          </Card.Text>          
        </Card.Body>
      </Card>
      <Card 
        bg='secondary'
        text='light'
        style={{ width: '7rem' }}>
        <Card.Body>
          <Card.Title as = "h2">100 % </Card.Title>          
          <Card.Text>
            POS
          </Card.Text>          
        </Card.Body>
      </Card>
      </CardDeck>
      </div>
    );
  }
}
// {username ? <h1>{`Hello ${username}`}</h1> : <h1>Loading.. please wait!</h1>}