import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

import { isAdmin, isPrincipal, isStudent } from "../utils/roleChecks";
export function PrivateRoute({
  children,
  cond = true,
  redirect = "/login",
  ...rest
}) {
  return (
    <Route
      exact
      {...rest}
      render={({ location }) =>
        cond ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: redirect,
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export function StudentRoute({ component: Component, ...rest }) {
  const { isLogged, role } = useSelector((state) => state.auth);
  return (
    <PrivateRoute cond={isLogged && isStudent(role)} {...rest}>
      <Component />
    </PrivateRoute>
  );
}

export function AdminRoute({ component: Component, ...rest }) {
  const { isLogged, role } = useSelector((state) => state.auth);

  return (
    <PrivateRoute cond={isLogged && isAdmin(role)} {...rest}>
      <Component />
    </PrivateRoute>
  );
}

export function PrincipalRoute({ component: Component, ...rest }) {
  const { isLogged, role } = useSelector((state) => state.auth);

  return (
    <PrivateRoute
      redirect="/dashboard"
      cond={isLogged && isPrincipal(role)}
      {...rest}
    >
      <Component />
    </PrivateRoute>
  );
}
