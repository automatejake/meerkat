import React, { Component } from 'react'
import { Container, Header } from 'semantic-ui-react'
import {Helmet} from 'react-helmet';

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
            <Header size='huge'> You Won! </Header>
        </Container>
      )
  }

}

export default Winning;