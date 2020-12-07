import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function PrivateRoute({
  component: Component,
  ...rest
}: {
  component: any;
  exact?: any;
  path: any;
}) {
  const { currentUser }: any = useAuth();

  return (
    <Route
      {...rest}
      render={(props: any) => {
        return currentUser ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        );
      }}
    ></Route>
  );
}
