import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
//Components

import NavBar from "./components/Navbar";

//Pages
import home from "./pages/home";
import login from "./pages/login";
import signup from "./pages/signup";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="container">
          <Router>
            <NavBar />
            <Switch>
              <Route exact path="/" component={home} />
              <Route exact path="/login" component={login} />
              <Route exact path="/signup" component={signup} />
            </Switch>
          </Router>
        </div>
      </div>
    );
  }
}

export default App;
