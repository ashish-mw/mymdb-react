import { Suspense, lazy, useReducer, useEffect } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import axios from "axios";

import { setTokenInStorage, getTokenFromStorage } from "./services/storage";
import { apiGetUserInfo } from "./services/api/user";
import { setAuthHeaders } from "./services/api";

import MovieListPage from "./pages/MovieListPage";
import NotFoundPage from "./pages/NotFoundPage";

import StateContext from "./contexts/StateContext";
import DispatchContext from "./contexts/DispatchContext";

const LoginPage = lazy(() => import("./pages/LoginPage"));
const SignupPage = lazy(() => import("./pages/SignupPage"));
const AddMoviePage = lazy(() => import("./pages/AddMoviePage"));
const MovieInfoPage = lazy(() => import("./pages/MovieInfoPage"));

function App() {
  const initialState = {
    isLoggedIn: Boolean(getTokenFromStorage()),
    token: getTokenFromStorage(),
    user: null,
  };

  function appReducer(state, action) {
    switch (action.type) {
      case "login":
        return {
          ...state,
          isLoggedIn: true,
          token: action.value,
        };
      case "logout":
        return {
          ...state,
          isLoggedIn: false,
          token: "",
          user: null,
        };
      case "set_user":
        return {
          ...state,
          user: action.value,
        };
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    if (state.token) {
      setTokenInStorage({ token: state.token });
      setAuthHeaders({ accessToken: state.token });
    }
  }, [state.token]);

  useEffect(() => {
    if (!state.isLoggedIn) {
      setTokenInStorage({ token: "" });
      setAuthHeaders({ accessToken: "" });
    }
  }, [state.isLoggedIn]);

  useEffect(() => {
    const request = axios.CancelToken.source();

    async function getUserInfo() {
      try {
        const { data } = await apiGetUserInfo({ cancelToken: request.token });
        dispatch({ type: "set_user", value: data });
      } catch (error) {
        console.log(error);
      } finally {
        // TODO:
      }
    }

    if (state.isLoggedIn && state.token) {
      getUserInfo();
    }

    return () => request.cancel();
  }, [state.isLoggedIn, state.token]);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <BrowserRouter>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<MovieListPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/add-movie" element={<AddMoviePage />} />
              <Route path="/info/:movieId" element={<MovieInfoPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

export default App;
