import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Suspense, lazy } from "react";
import { useFirebaseAuth } from "./context/auth";
import ProtectedRoute from "./helpers/ProtectedRoute";
import * as ROUTES from "./constants/routes";
import IsUserLoggedIn from "./helpers/isUserLoggedIn";

const Login = lazy(() => import("./pages/Login"));
const SignUp = lazy(() => import("./pages/Signup"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Profile = lazy(() => import("./pages/Profile"));
const Dashboard = lazy(() => import("./pages/Dashboard"));

export const App = () => {
  const user = useFirebaseAuth();

  return (
    <Router>
      <Suspense fallback={<p>Loading ...</p>}>
        <Switch>
          <IsUserLoggedIn
            user={user}
            loggedInPath={ROUTES.DASHBOARD}
            path={ROUTES.LOGIN}
          >
            <Route path={ROUTES.LOGIN} component={Login} />
          </IsUserLoggedIn>
          <IsUserLoggedIn
            user={user}
            loggedInPath={ROUTES.DASHBOARD}
            path={ROUTES.SIGNUP}
          >
            <Route path={ROUTES.SIGNUP} component={SignUp} />
          </IsUserLoggedIn>
          <Route path={ROUTES.PROFILE} component={Profile} />
          <ProtectedRoute user={user} path={ROUTES.DASHBOARD} exact>
            <Dashboard />
          </ProtectedRoute>
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </Router>
  );
};
