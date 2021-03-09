import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App2 from "./App2";
import LocalityCheck from "./LocalityCheck";

function App() {
  return (
    <div>
      <Router>
        <Route exact path="/" component={App2} />
        <Route path="/LocalityCheck" component={LocalityCheck} />
      </Router>
    </div>
  );
}

export default App;