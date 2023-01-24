import { useState, useMemo, useEffect } from "react";
import axios from "axios";

import { apiLogin } from "../services/api/user";
import Page from "../components/Page";

function LoginPage() {
  const [state, setState] = useState({
    username: "",
    password: "",
    isLoading: false,
    callApi: false,
  });

  const isValid = useMemo(() => {
    if (state.username && state.password) {
      return true;
    }
    return false;
  }, [state.username, state.password]);

  useEffect(() => {
    const request = axios.CancelToken.source();

    async function doLogin() {
      setState((prev) => ({ ...prev, isLoading: true }));
      try {
        const resp = await apiLogin({
          payload: {
            username: state.username,
            password: state.password,
          },
          cancelToken: request.token,
        });
        console.log(resp);
        resetState();
      } catch (error) {
        // TODO: show errors in UI
        console.log(error);
      } finally {
        setState((prev) => ({ ...prev, isLoading: false }));
      }
    }

    if (state.username && state.password && state.callApi) {
      doLogin();
    }

    return () => {
      request.cancel();
    };
  }, [state.callApi, state.username, state.password]);

  function handleChange({ e, field }) {
    if (field === "username") {
      setState((prev) => ({ ...prev, username: e.target.value }));
    } else if (field === "password") {
      setState((prev) => ({ ...prev, password: e.target.value }));
    }
    setState((prev) => ({ ...prev, callApi: false }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setState((prev) => ({ ...prev, callApi: true }));
  }

  function resetState() {
    setState({
      username: "",
      password: "",
      isLoading: false,
      callApi: false,
    });
  }

  return (
    <Page title="Login">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">
          Username
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            required
            value={state.username}
            onChange={(e) => handleChange({ e, field: "username" })}
          />
        </label>

        <label htmlFor="password">
          Password
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            required
            value={state.password}
            onChange={(e) => handleChange({ e, field: "password" })}
          />
        </label>

        <button type="submit" aria-busy={state.isLoading} disabled={!isValid}>
          Login
        </button>
      </form>
    </Page>
  );
}

export default LoginPage;
