import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Alert } from "./components/alert/Alert";
import Footer from "./components/Footer";
import Header from "./components/Header";
import PageRender from "./PageRender";
import { refreshToken } from "./redux/actions/authActions";
import { getCategories } from "./redux/actions/categoryActions";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(refreshToken());
    dispatch(getCategories());
  }, [dispatch]);
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
