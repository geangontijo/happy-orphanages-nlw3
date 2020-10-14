import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import OrphanatesList from "./pages/OrphanatesMap";

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/map" component={OrphanatesList} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
