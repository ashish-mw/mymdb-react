import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";

import Page from "../components/Page";
import Loading from "../components/Loading";
import Goback from "../components/Goback";
import Rating from "../components/Rating";

function MovieInfoPage() {
  const [isLoading, setIsLoading] = useState(false);

  const [movieInfo, setMovieInfo] = useState({
    id: "02e57aeb-fc94-4e74-aba6-8f92f4bd3f07",
    name: "Matrix Reloaded",
    genre: "sci-fi",
    language: "English",
    yearOfRelease: 1998,
    createdByUser: "584f459d-5fdc-4955-b0ed-63b8a59dca1a",
    createdAt: "2023-01-12T10:24:26.311Z",
    updatedAt: "2023-01-12T10:24:26.311Z",
    rating: 2,
    createdUserInfo: {
      id: "584f459d-5fdc-4955-b0ed-63b8a59dca1a",
      username: "neo_anderson",
      password: "",
      createdAt: "2023-01-12T10:24:26.311Z",
      updatedAt: "2023-01-12T10:24:26.311Z",
    },
  });

  let { movieId } = useParams();

  console.log(movieId);

  const pageTitle = useMemo(() => {
    if (movieInfo) {
      return "Info on " + movieInfo.name;
    } else {
      return "...";
    }
  }, movieInfo);

  return (
    <Page title={pageTitle}>
      {isLoading && <Loading />}

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
          <strong>last update:</strong> {movieInfo.updatedAt}
        </p>

        <p>
          <Rating count={movieInfo.rating} />
        </p>

        <p>
          <strong>Created by:</strong> {movieInfo.createdUserInfo.username}
        </p>
      </article>
    </Page>
  );
}

export default MovieInfoPage;
