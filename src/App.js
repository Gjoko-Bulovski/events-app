import React from 'react';
import './App.css';
import Event from './components/Event';
import Login from './components/Login';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

const App = () =>  {
    return(
      <Router>
        <div className='App'>
          <Link to='/'>
            <h1 className="header-h1">Events App</h1>
          </Link>
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/event" component={Event} />
          </Switch>
        </div>
      </Router>
    );
  }

export default App;
