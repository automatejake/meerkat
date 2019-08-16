import React, { Component } from 'react'
import { Button, Container, Dimmer, Form, Grid, Header, Progress, TextArea  } from 'semantic-ui-react'
import {Helmet} from 'react-helmet';

class Game extends Component {

  constructor(props) {
    super(props);
    this.state = { percentRound: 0, category: this.props.category, answer: "", submitted: false }
    this.handleChange = this.handleChange.bind(this);
  }
  
  componentDidMount() {
    //-1 makes round end 1 second earlier than server so that answer is submitted successfully
    var percent = 100 / (2 * (this.props.timer))
    this.timerID = setInterval(
      () => {  
        if(this.state.percentRound < 100){
          this.setState(prevState => ({ percentRound: prevState.percentRound + percent}))
        }else if(this.state.submitted === false){
          this.endRound()
        }
      }, 500
    );
  }

  componentWillUnmount() {
    this.endRound()
    clearInterval(this.timerID);
  }

  fadeBackground = () => this.setState({ active: true })

  endRound = ()=> {
    this.fadeBackground()
    this.props.socket.emit("response", {answer:this.state.answer, gameId:this.props.gameId})
    this.setState({submitted:true})
  }

  increment = () => {

  }
  
  
  handleChange(event) {
    this.setState({answer: event.target.value});
  }
  

  render() {
    const { active } = this.state
    
   
    return (
      
      <Container className='container'>
        <Helmet>
            <style>{'body { background-color: #CEF6CE; }'}</style>
        </Helmet>


        <Grid divided='vertically'>

            {/* Progress Bar */}
            <Grid.Row columns={1} textAlign='center'>
                <Grid.Column>
                  <Progress percent={this.state.percentRound} indicating />
                </Grid.Column>
            </Grid.Row>

            {/* Category */}
            <Grid.Row columns={1} textAlign='center'>
              <Grid.Column>
                <Header size='huge'> {this.state.category}</Header>
              </Grid.Column>
            </Grid.Row>
            
            {/* Input Box */}
            <Grid.Row columns={1} textAlign='center'>

              <Grid.Column>
                
                <Dimmer.Dimmable  blurring dimmed={active}>

                  <Form>
                      <TextArea placeholder='Tell us more' style={{ minHeight: 100 }} value={this.state.answer} onChange={this.handleChange} />
                  </Form>
                  <br></br>

                  {/* <Button onClick={() => {this.setState({ active: true })}} secondary> */}
                  <Button onClick={()=>{this.endRound()}} secondary>
                      Submit
                  </Button>

                </Dimmer.Dimmable>

              </Grid.Column>
            </Grid.Row>

        </Grid>
       

      </Container>
    )
  }
}

export default Game;