import React, { Component } from 'react'
import socketIOClient from "socket.io-client";
import FindGame from './FindGame.jsx'
import Game from './Game.jsx'
import VoteWinner from './VoteWinner.jsx'
import Finishing from './EndGame/Finishing.jsx'
import Winning from './EndGame/Winning.jsx'
import Losing from './EndGame/Losing.jsx'
import TieGame from './EndGame/TieGame.jsx'

class GameRoom extends Component {
    
  constructor(props) {
    super(props);
    this.state = { 
                   foundPlayers: 0,
                   endpoint: "http://127.0.0.1:4001",
                   gameId: null,
                   status: "waiting",
                   timer: 20,
                   socket: null,
                   answers: null,
                   players: null,
                   category: null
                 }
  }

  componentDidMount() {

    const { endpoint } = this.state;
    this.state.socket = socketIOClient(endpoint);

    
    this.state.socket.on("assignGameroom", data => {
      this.setState({gameId: data.gameId})
      this.setState({category: data.category})
    })

    this.state.socket.on("updateStatus", data => {
      this.setState({status: data})
    })

    this.state.socket.on("fetchAnswers", data => {
      this.setState({answers: [data[0].answer, data[1].answer]})
      this.setState({players: [data[0].id, data[1].id]})
    })

    this.state.socket.on("updateTimer", data => {
      this.setState({timer: data})
    })
    
    this.state.socket.on("playerFound", data => {
      this.setState({ foundPlayers: data })  
    })

    this.state.socket.on("getWinner", data => {

    })
                                      
  }

  render(){
    if(this.state.status === 'waiting'){
      return(<FindGame foundPlayers={this.state.foundPlayers}></FindGame>)
    }else if(this.state.status === 'playing'){
      return(<Game socket={this.state.socket} timer={this.state.timer} gameId={this.state.gameId} category={this.state.category}></Game>)
    }else if(this.state.status === 'voting'){
      return(<VoteWinner socket={this.state.socket} timer={this.state.timer} gameId={this.state.gameId} category={this.state.category} answers={this.state.answers} players={this.state.players}></VoteWinner>)
    }else if(this.state.status === 'finishing'){
      return(<Finishing></Finishing>)
    }else if(this.state.status === 'won'){
      return(<Winning></Winning>)
    }else if(this.state.status === 'lost'){
      return(<Losing></Losing>)
    }else if(this.state.status === 'tie'){
      return(<TieGame></TieGame>)
    }
  }
}

export default GameRoom