import { Suspense, lazy } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import MovieListPage from "./pages/MovieListPage";
import NotFoundPage from "./pages/NotFoundPage";

const LoginPage = lazy(() => import("./pages/LoginPage"));
const SignupPage = lazy(() => import("./pages/SignupPage"));
const AddMoviePage = lazy(() => import("./pages/AddMoviePage"));
const MovieInfoPage = lazy(() => import("./pages/MovieInfoPage"));

function App() {
  return (
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
  );
}

export default App;
