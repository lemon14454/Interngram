import { Route, Redirect } from "react-router-dom";
import * as ROUTES from "../constants/routes";
import { User } from "../context/auth";

interface IsUserLoggedInProps {
  user: User;
  loggedInPath: string;
  children: JSX.Element;
  [x: string]: any;
}

export default function IsUserLoggedIn({
  user,
  children,
  loggedInPath,
  ...rest
}: IsUserLoggedInProps) {
  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (!user) {
          return children;
        }

        if (user) {
          return (
            <Redirect
              to={{
                pathname: loggedInPath,
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
