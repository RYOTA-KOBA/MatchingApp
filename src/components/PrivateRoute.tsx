import React from "react"
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { Route, Redirect } from "react-router-dom"
// @ts-expect-error ts-migrate(6142) FIXME: Module '../contexts/AuthContext' was resolved to '... Remove this comment to see the full error message
import { useAuth } from "../contexts/AuthContext"

// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'Component' implicitly has an 'any... Remove this comment to see the full error message
export default function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth()

  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <Route
      {...rest}
      render={(props: any) => {
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        return currentUser ? <Component {...props} /> : <Redirect to="/login" />
      }}
    ></Route>
  );
}
