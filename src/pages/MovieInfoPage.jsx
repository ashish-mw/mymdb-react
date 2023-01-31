import { useState, useMemo, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

import Page from "../components/Page";
import Loading from "../components/Loading";
import Goback from "../components/Goback";
import Rating from "../components/Rating";

import { apiGetMovieInfo } from "../services/api/movies";
import { formatDate } from "../services/utils";

import StateContext from "../contexts/StateContext";

function MovieInfoPage() {
  const appState = useContext(StateContext);

  const [isLoading, setIsLoading] = useState(false);

  const [movieInfo, setMovieInfo] = useState({
    name: "",
    createdUserInfo: {},
    updatedAt: "",
  });

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
              <button className="secondary">Delete</button>
            </>
          )}
        </article>
      )}
    </Page>
  );
}

export default MovieInfoPage;
