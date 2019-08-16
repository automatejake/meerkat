import React, { Component } from 'react'
import { Container, Header } from 'semantic-ui-react'
import {Helmet} from 'react-helmet';

class Losing extends Component {
    
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
            <Header size='huge'> You Lost </Header>
            
        </Container>
      )
  }

}

export default Losing;