import { Route, Redirect } from "react-router-dom";
import * as ROUTES from "../constants/routes";
import { User } from "../context/auth";

interface ProtectedRouteProps {
  user: User;
  children: JSX.Element;
  [x: string]: any;
}

export default function ProtectedRoute({
  user,
  children,
  ...rest
}: ProtectedRouteProps) {
  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (user) {
          return children;
        }

        if (!user) {
          return (
            <Redirect
              to={{
                pathname: ROUTES.LOGIN,
                state: { from: location },
              }}
            />
          );
        }

        return null;
      }}
    />
  );
}
