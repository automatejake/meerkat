import React, {Component} from 'react'
import { Loader, Container } from 'semantic-ui-react'
import {Helmet} from 'react-helmet';
import './styles/FindGame.scss'


class FindGame extends Component {
    
    

    playersToFind = ()=> {
        console.log(this.props.foundPlayers)
        switch(this.props.foundPlayers){
            case 1:
                return "Waiting for Two More Players"
            case 2:
                return "Waiting for One More Players"
            case 3:
                return "Initializing Game "
            default:
                return "Waiting"
        }

    }

    render(){

        return(
            <Container className='container' textAlign='center'>
                <Helmet>
                    <style>{'body { background-color: #CEF6CE; }'}</style>
                </Helmet>
                <Loader active inline='centered' size='massive'></Loader>
                <h2>{this.playersToFind()}</h2>
            </Container>
        )
    }

}
  
  export default FindGame;
  