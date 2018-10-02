import React, { Component } from 'react';
import ListStudents from './components/ListStudents';
import Add from './components/Add';
import { Route, Switch } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/add" component={Add}/>
          <Route path="/" component={ListStudents}/>
        </Switch>
      </div>
    );
  }
}

export default App;
