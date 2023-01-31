import { useState, useMemo, useEffect } from "react";
import { useImmer } from "use-immer";
import axios from "axios";
import Page from "../components/Page";
import Loading from "../components/Loading";
import Goback from "../components/Goback";
import Modal from "../components/Modal";
import { apiAddMovie } from "../services/api/movies";
import { useNavigate } from "react-router-dom";

function AddMoviePage() {
  const [newMovie, setNewMovie] = useImmer({
    name: "",
    // genre: "",
    language: "",
    yearOfRelease: 0,
    genreList: [],
    isLoading: false,
    callApi: false,
    apiStatus: {
      show: false,
      type: "success", // success, error,
      message: "",
    },
  });

  const navigate = useNavigate();

  const genres = ["Horror", "Scifi", "Romance", "Adventure", "Crime"];
  const languages = ["English", "Tamil", "Hindi", "French", "Telugu"];

  const isValid = useMemo(() => {
    if (
      newMovie.name &&
      newMovie.language &&
      newMovie.yearOfRelease &&
      newMovie.genreList.length
    ) {
      return true;
    }
    return false;
  }, [
    newMovie.name,
    newMovie.language,
    newMovie.yearOfRelease,
    newMovie.genreList.length,
  ]);

  useEffect(() => {
    const request = axios.CancelToken.source();

    async function doNewMovieSubmit() {
      setNewMovie((draft) => {
        draft.isLoading = true;
      });
      try {
        const { data } = await apiAddMovie({
          payload: {
            name: newMovie.name,
            genre: newMovie.genreList.map((g) => g.toLowerCase()).join(","),
            language: newMovie.language,
            yearOfRelease: newMovie.yearOfRelease,
          },
          cancelToken: request.token,
        });
        resetState();
        // navigate("/");
        setNewMovie((draft) => {
          draft.apiStatus.type = "success";
          draft.apiStatus.message = "Movie added successfully!";
          draft.apiStatus.show = true;
        });
        // TODO: show a success modal, and on its onclick, navigate to the movie list page
      } catch (error) {
        // TODO: show errors in UI
        console.log(error);
        if (error.response && error.response.data.message) {
          setNewMovie((draft) => {
            draft.apiStatus.type = "error";
            draft.apiStatus.message = error.response.data.message;
            draft.apiStatus.show = true;
          });
        }
      } finally {
        setNewMovie((draft) => {
          draft.isLoading = false;
          draft.callApi = false;
        });
      }
    }

    if (
      newMovie.name &&
      newMovie.language &&
      newMovie.yearOfRelease &&
      newMovie.genreList.length &&
      newMovie.callApi
    ) {
      doNewMovieSubmit();
    }

    return () => {
      request.cancel();
    };
  }, [
    newMovie.callApi,
    newMovie.name,
    newMovie.language,
    newMovie.yearOfRelease,
    newMovie.genreList.length,
  ]);

  function resetState() {
    setNewMovie((draft) => {
      draft.name = "";
      draft.language = "";
      draft.yearOfRelease = 0;
      draft.genreList = [];
      draft.isLoading = false;
      draft.callApi = false;
    });
  }

  function handleChange({ e, type }) {
    if (type === "name") {
      setNewMovie((draft) => {
        draft.name = e.target.value;
      });
    } else if (type === "genre") {
      setNewMovie((draft) => {
        draft.genreList.push(e.target.value);
      });
    } else if (type === "language") {
      setNewMovie((draft) => {
        draft.language = e.target.value;
      });
    } else if (type === "yearOfRelease") {
      setNewMovie((draft) => {
        draft.yearOfRelease = e.target.value;
      });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    setNewMovie((draft) => {
      draft.callApi = true;
    });
  }

  // TODO: improve on this later!
  function clearApiStatus() {
    if (newMovie.apiStatus.type == "success" && newMovie.apiStatus.show) {
      navigate("/");
    } else {
      setNewMovie((draft) => {
        draft.apiStatus.show = false;
        draft.apiStatus.type = "success";
        draft.apiStatus.message = "";
      });
    }
  }

  return (
    <Page title="Add new movie">
      {newMovie.isLoading && <Loading />}

      <Goback />

      {newMovie.apiStatus.show && (
        <Modal
          type={newMovie.apiStatus.type}
          message={newMovie.apiStatus.message}
          onClick={clearApiStatus}
        />
      )}

      <h1>Add new movie</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="movie-name">
          Name
          <input
            type="text"
            id="movie-name"
            name="movie-name"
            placeholder="Movie name"
            required
            value={newMovie.name}
            onChange={(e) => handleChange({ e, type: "name" })}
          />
        </label>

        <fieldset>
          <legend>Genre</legend>
          {genres.map((g) => (
            <label htmlFor={`checkbox-${g}`} key={g}>
              <input
                type="checkbox"
                id={`checkbox-${g}`}
                name={`checkbox-${g}`}
                value={g}
                onChange={(e) => handleChange({ e, type: "genre" })}
                checked={newMovie.genreList.includes(g)}
              />
              {g}
            </label>
          ))}
        </fieldset>

        <label htmlFor="movie-lang">
          Language
          <select
            id="movie-lang"
            name="movie-lang"
            required=""
            defaultValue={newMovie.language}
            onChange={(e) => handleChange({ e, type: "language" })}
          >
            <option disabled>Select…</option>
            {languages.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="movie-year">
          Year
          <input
            type="number"
            id="movie-year"
            name="movie-year"
            placeholder="Year of release"
            required
            value={newMovie.yearOfRelease}
            onChange={(e) => handleChange({ e, type: "yearOfRelease" })}
          />
        </label>

        <button
          type="submit"
          aria-busy={newMovie.isLoading}
          disabled={!isValid}
        >
          Add movie
        </button>
      </form>
    </Page>
  );
}

export default AddMoviePage;
