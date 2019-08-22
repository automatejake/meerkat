import React from 'react';
import './MainMenu.scss';
import {Helmet} from 'react-helmet';
import { Container, Button, Grid } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

// this also works with react-router-native

function MainMenu() {
  
  return (
    <Container className='container' textAlign='center'>
    <Helmet>
    <style>{'body { background-color: #CEF6CE; }'}</style>
    </Helmet>
    
    <Grid columns='one' divided>
      
      <Grid.Row textAlign='center'>
        <Grid.Column>
          <Link to={"/game"}>
          {<Button className='menu-button' positive size='massive' animated='fade'>
            <Button.Content visible>Ready?</Button.Content>
            <Button.Content hidden>Begin Game</Button.Content>
          </Button>}
          </Link>

        </Grid.Column>
      </Grid.Row>

      <Grid.Row textAlign='center'>
        <Grid.Column>
          <Button className='menu-button' primary size='massive' animated='fade'>
            <Button.Content visible>Leaderboard</Button.Content>
            <Button.Content hidden>Where do you stand?</Button.Content>
          </Button>
        </Grid.Column>
      </Grid.Row>
      
  </Grid>
  </Container>
  );
}

export default MainMenu;
