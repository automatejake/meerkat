import React, { Component } from 'react'
import { Loader, Container } from 'semantic-ui-react'
import {Helmet} from 'react-helmet';

class Finishing extends Component {
    
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
            <Loader active inline='centered' size='massive'></Loader>
            Hold your Horses Trooper
        </Container>
      )
  }

}

export default Finishing;