import React, { Component } from 'react'
import { Container, Header, Grid, Button } from 'semantic-ui-react'
import {Helmet} from 'react-helmet';
import { Link } from 'react-router-dom'

class Winning extends Component {
    
  constructor(props) {
    super(props);
    this.state = { }
  }

  render(){
      return(
        <Container textAlign='center'>
            <Helmet>
                <style>{'body { background-color: #CEF6CE; }'}</style>
            </Helmet>
            
            <Header size='huge'> You Won!!! </Header>

            <Grid columns='two' divided>
              
              <Grid.Row textAlign='center'>
                <Grid.Column>
                  
                </Grid.Column>
              </Grid.Row>

              <Grid.Row textAlign='center'>
                <Grid.Column>
                  <Link to={"/game"}>
                  {<Button className='menu-button' positive size='massive' animated='fade'>
                    <Button.Content visible>Play Again!</Button.Content>
                    <Button.Content hidden>Begin Game</Button.Content>
                  </Button>}
                  </Link>
                </Grid.Column>
                <Grid.Column>
                  <Link to={"/"}>
                  {<Button className='menu-button' positive size='massive' animated='fade'>
                    <Button.Content>Return to Main Menu</Button.Content>
                  </Button>}
                  </Link>
                </Grid.Column>
              </Grid.Row>


            </Grid>
        </Container>
      )
  }

}

export default Winning;