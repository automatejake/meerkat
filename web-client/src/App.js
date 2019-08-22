import MainMenu from './MainMenu/MainMenu.jsx';
import GameRoom from './Game/GameRoom.jsx'

import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
  
  function App() {
    return (
      <Router>
          <Route path="/" exact component={MainMenu} />
          <Route path="/game/" component={GameRoom} />
      </Router>
    );
  }





export default App;