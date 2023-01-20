import { useState } from "react";
import { Link } from "react-router-dom";

import Page from "../components/Page";
import Loading from "../components/Loading";

function MovieListPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([
    {
      id: "c93cc1e8-4a0e-4bcc-8b5a-5a9bfe173c7f",
      name: "Matrix",
      genre: "sci-fi",
      language: "English",
      yearOfRelease: 1998,
      createdByUser: "584f459d-5fdc-4955-b0ed-63b8a59dca1a",
      createdAt: "2023-01-12T10:24:26.311Z",
      updatedAt: "2023-01-12T10:24:26.311Z",
    },
    {
      id: "02e57aeb-fc94-4e74-aba6-8f92f4bd3f07",
      name: "Matrix Reloaded",
      genre: "sci-fi",
      language: "English",
      yearOfRelease: 1998,
      createdByUser: "584f459d-5fdc-4955-b0ed-63b8a59dca1a",
      createdAt: "2023-01-12T10:24:26.311Z",
      updatedAt: "2023-01-12T10:24:26.311Z",
    },
    {
      id: "e2ed48c6-fbba-46f3-9530-6bfbebc0e372",
      name: "Toy Story",
      genre: "Kids,Cartoon",
      language: "English",
      yearOfRelease: 1999,
      createdByUser: "82bbfc0f-4ff1-4488-bed3-624e53e1053d",
      createdAt: "2023-01-12T10:59:12.209Z",
      updatedAt: "2023-01-12T10:59:12.210Z",
    },
  ]);

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
