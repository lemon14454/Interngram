import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Suspense, lazy } from "react";
import * as ROUTES from "./constants/routes";
import { FirebaseAuthProvider } from "./context/auth";

const Login = lazy(() => import("./pages/Login"));
const SignUp = lazy(() => import("./pages/Signup"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Dashboard = lazy(() => import("./pages/Dashboard"));

export const App = () => {
  return (
    <FirebaseAuthProvider>
      <Router>
        <Suspense fallback={<p>Loading ...</p>}>
          <Switch>
            <Route path={ROUTES.LOGIN} component={Login} />
            <Route path={ROUTES.SIGNUP} component={SignUp} />
            <Route path={ROUTES.DASHBOARD} component={Dashboard} />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </Router>
    </FirebaseAuthProvider>
  );
};
