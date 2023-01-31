// https://ui.dev/react-router-v5-protected-routes-authentication/
// make sure to redirect the user back to the page they originally
// wanted to visit when auth failed

import { useContext } from "react";
import { Navigate } from "react-router-dom";

import StateContext from "../contexts/StateContext";

const PrivateRoute = (props) => {
  const { outlet } = props;
  const appState = useContext(StateContext);

  if (appState.isLoggedIn) {
    return outlet;
  } else {
    return <Navigate to="/login" />;
  }
};

export default PrivateRoute;
