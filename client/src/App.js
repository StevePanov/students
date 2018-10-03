import React, { Component } from "react";
import StudentsList from "./components/StudentsList";
import AddStudent from "./components/AddStudent";
import { Route, Switch } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/add" component={AddStudent} />
          <Route path="/" component={StudentsList} />
        </Switch>
      </div>
    );
  }
}

export default App;
