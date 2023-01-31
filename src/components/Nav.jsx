import { useContext } from "react";
import { Link } from "react-router-dom";

import StateContext from "../contexts/StateContext";
import DispatchContext from "../contexts/DispatchContext";

function Nav() {
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);

  function handleLogout() {
    appDispatch({ type: "logout" });
  }

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">
            <strong>mymdb</strong>
          </Link>
        </li>
      </ul>
      <ul>
        {appState.isLoggedIn ? (
          <>
            <li>
              <Link to="/add-movie">Add movie</Link>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Nav;
