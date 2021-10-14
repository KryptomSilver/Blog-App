import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Alert } from "./components/alert/Alert";
import Footer from "./components/Footer";
import Header from "./components/Header";
import PageRender from "./PageRender";

function App() {
  return (
    <div className="container">
      <Router>
        <Alert />
        <Header />
        <Switch>
          <Route exact path="/" component={PageRender} />
          <Route exact path="/:page" component={PageRender} />
          <Route exact path="/:page/:slug" component={PageRender} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
