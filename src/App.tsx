import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Suspense, lazy } from "react";
import * as ROUTES from "./constants/routes";

const Login = lazy(() => import("./pages/Login"));

export const App = () => {
  return (
    <Router>
      <Suspense fallback={<p>Loading ...</p>}>
        <Switch>
          <Route path={ROUTES.LOGIN} component={Login} />
        </Switch>
      </Suspense>
    </Router>
  );
};
