import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import CreateOrphanage from "./pages/CreateOrphanage";

import Landing from "./pages/Landing";
import Orphanage from "./pages/Orphanage";
import OrphanatesMap from "./pages/OrphanatesMap";

interface RouteItem {
  id: number;
  path: string;
  component: React.ComponentType;
}

const routes: RouteItem[] = [
  {
    id: 1,
    path: "/map",
    component: OrphanatesMap,
  },
  {
    id: 2,
    path: "/orphanages/create",
    component: CreateOrphanage,
  },
  {
    id: 3,
    path: "/orphanages/:id",
    component: Orphanage,
  },
];

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Landing} />
        {routes.map((route) => (
          <Route key={route.id} path={route.path} component={route.component} />
        ))}
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
