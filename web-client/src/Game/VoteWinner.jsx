import React, { Component } from 'react'
import { Button, Grid, Header, Progress } from 'semantic-ui-react'
import {Helmet} from 'react-helmet';
import './styles/VoteWinner.scss'

class VoteWinner extends Component {

  constructor(props) {
    super(props);
    this.state = { percentRound: 0, currentBallot: null }
  }

  componentDidMount() {
    this.setState({players:this.props.players, answers:this.props.answers})
    var percent = 100 / (2 * (this.props.timer))
    this.timerID = setInterval(
      () => {  
        if(this.state.percentRound < 100){
          this.setState(prevState => ({ percentRound: prevState.percentRound + percent}))
        }
      }, 500
    );
  }

  componentWillUnmount() {
    this.props.socket.emit('vote', {gameId: this.props.gameId, vote: this.state.currentBallot})
    clearInterval(this.timerID);
  }

  choiceOne(){
    this.setState({currentBallot:this.state.players[0]})
  }
 
  choiceTwo(){
    this.setState({currentBallot:this.state.players[1]})
  }


  render() {

    return (
      
      // <Container className='container'>


        <Grid >
          <Helmet>
              <style>{'body { background-color: #CEF6CE; }'}</style>
          </Helmet>


          {/* Progress Bar */}
          <Grid.Row columns={1} textAlign='center'>
              <Grid.Column>
                <Progress percent={this.state.percentRound} indicating />
              </Grid.Column>
          </Grid.Row>

          <Grid.Row columns={1} textAlign='center'>

            <Grid.Column>
              <Header size='huge'> {this.props.category}</Header>
            </Grid.Column>

          </Grid.Row>

          <Grid.Row textAlign='center' columns={2}>
          {/* onClick={this.choiceOne()} onClick={this.choiceTwo()}*/}
            <Grid.Column>
              <Button fluid inverted secondary size='massive' className="choices" onClick={()=>{this.choiceOne()}}>{this.props.answers[0]}</Button>
            </Grid.Column>
            
            <Grid.Column>
              <Button fluid inverted secondary size='massive' className="choices" onClick={()=>{this.choiceTwo()}}>{this.props.answers[1]}</Button>
            </Grid.Column>

          </Grid.Row>

      </Grid>
      //</Container>
    )
  }
}

export default VoteWinner;