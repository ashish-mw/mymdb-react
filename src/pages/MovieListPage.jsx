import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Page from "../components/Page";
import Loading from "../components/Loading";

import { apiGetMovieList } from "../services/api/movies";

function MovieListPage() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const request = axios.CancelToken.source();

    async function getMovieList() {
      setIsLoading(true);
      try {
        const { data: movieData } = await apiGetMovieList({
          cancelToken: request.token,
        });
        setMovies(movieData);
      } catch (error) {
        console.log(error);
        setError("Failed to fetch movies");
      } finally {
        setIsLoading(false);
      }
    }
    getMovieList();

    return () => {
      request.cancel();
    };
  }, []);

  return (
    <Page title="All movies">
      <h1>All movies</h1>

      {isLoading && <Loading />}

      <figure>
        <table>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Genre</th>
              <th scope="col">Language</th>
              <th scope="col">Year</th>
              <th scope="col">Updated on</th>
            </tr>
          </thead>
          <tbody>
            {movies.length ? (
              movies.map((m, i) => (
                <tr key={m.id}>
                  <th scope="row">{i + 1}</th>
                  <td>
                    <Link to={`/info/${m.id}`}>{m.name}</Link>
                  </td>
                  <td>{m.genre}</td>
                  <td>{m.language}</td>
                  <td>{m.yearOfRelease}</td>
                  <td>{m.updatedAt}</td>
                </tr>
              ))
            ) : (
              <p>No movies found!</p>
            )}
          </tbody>
        </table>
      </figure>
    </Page>
  );
}

export default MovieListPage;
