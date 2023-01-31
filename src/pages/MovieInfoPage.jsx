import { useState, useMemo, useEffect, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

import Page from "../components/Page";
import Loading from "../components/Loading";
import Goback from "../components/Goback";
import Rating from "../components/Rating";

import { apiGetMovieInfo, apiDeleteMovie } from "../services/api/movies";
import { formatDate } from "../services/utils";

import StateContext from "../contexts/StateContext";

function MovieInfoPage() {
  const appState = useContext(StateContext);
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const [movieInfo, setMovieInfo] = useState({
    name: "",
    createdUserInfo: {},
    updatedAt: "",
  });

  const [deleteMovie, setDeleteMovie] = useState(false);

  let { movieId } = useParams();

  useEffect(() => {
    const request = axios.CancelToken.source();

    async function getMovieInfo() {
      setIsLoading(true);
      try {
        const { data: movieData } = await apiGetMovieInfo({
          movieId,
          cancelToken: request.token,
        });
        setMovieInfo(movieData);
      } catch (error) {
        // TODO: handle errors here!
        console.log(error);
        // setError("Failed to fetch movie info");
      } finally {
        setIsLoading(false);
      }
    }

    if (movieId) {
      console.log("calling apiGetMovieInfo with ", movieId);
      getMovieInfo();
    }

    return () => {
      request.cancel();
    };
  }, [movieId]);

  useEffect(() => {
    const request = axios.CancelToken.source();

    async function callDeleteMovie() {
      setIsLoading(true);
      try {
        await apiDeleteMovie({
          movieId: movieInfo.id,
          cancelToken: request.token,
        });
        // TODO: show a modal for successful delete and then clicking on OK
        // would bring them to the movie list page
        navigate("/");
      } catch (error) {
        // TODO: handle errors here!
        console.log(error);
        // setError("Failed to fetch movie info");
      } finally {
        setIsLoading(false);
      }
    }

    if (deleteMovie) {
      console.log("deleting ", movieInfo.id);
      callDeleteMovie();
    }

    return () => {
      request.cancel();
    };
  }, [deleteMovie, movieInfo]);

  const pageTitle = useMemo(() => {
    if (movieInfo) {
      return "Info on " + movieInfo.name;
    } else {
      return "...";
    }
  }, [movieInfo.name]);

  const canEdit = useMemo(() => {
    if (
      appState.isLoggedIn &&
      appState.user.id === movieInfo.createdUserInfo.id
    ) {
      return true;
    }
    return false;
  }, [appState.isLoggedIn, movieInfo.createdUserInfo]);

  function handleDelete() {
    setDeleteMovie(true);
  }

  return (
    <Page title={pageTitle}>
      {isLoading && <Loading />}

      {movieInfo && (
        <article>
          <Goback />
          <h2>{movieInfo.name}</h2>
          <p>
            <strong>genre:</strong> {movieInfo.genre}
          </p>
          <p>
            <strong>language:</strong> {movieInfo.language}
          </p>
          <p>
            <strong>year:</strong> {movieInfo.yearOfRelease}
          </p>
          <p>
            <strong>last update:</strong> {formatDate(movieInfo.updatedAt)}
          </p>

          <p>
            <Rating count={movieInfo.rating} />
          </p>

          <p>
            <strong>Created by:</strong> {movieInfo.createdUserInfo.username}
          </p>

          {canEdit && (
            <>
              <div className="m-b-sm">
                <Link
                  className="w-100"
                  role="button"
                  to={`/movies/${movieInfo.id}/edit`}
                >
                  Edit
                </Link>
              </div>
              <button onClick={handleDelete} className="secondary">
                Delete
              </button>
            </>
          )}
        </article>
      )}
    </Page>
  );
}

export default MovieInfoPage;
