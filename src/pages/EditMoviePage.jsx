import { useState, useMemo, useEffect } from "react";
import { useImmer } from "use-immer";
import axios from "axios";
import Page from "../components/Page";
import Loading from "../components/Loading";
import Goback from "../components/Goback";
import Modal from "../components/Modal";
import { apiUpdateMovie, apiGetMovieInfo } from "../services/api/movies";
import { useNavigate, useParams } from "react-router-dom";

function makeGenreArray(str) {
  // Horror, Sci-fi
  const arr = str.split(",").map((g) => g.charAt(0).toUpperCase() + g.slice(1));
  return arr;
}

function EditMoviePage() {
  let { movieId } = useParams();

  const [editMovie, setEditMovie] = useImmer({
    id: "",
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
    originalMovieInfo: {
      name: "",
      createdUserInfo: {},
      updatedAt: "",
    },
    reloadCount: 0,
  });

  const navigate = useNavigate();

  const genres = ["Horror", "Scifi", "Romance", "Adventure", "Crime"];
  const languages = ["English", "Tamil", "Hindi", "French", "Telugu"];

  useEffect(() => {
    const request = axios.CancelToken.source();

    async function getMovieInfo() {
      setEditMovie((draft) => {
        draft.isLoading = true;
      });
      try {
        const { data: movieData } = await apiGetMovieInfo({
          movieId,
          cancelToken: request.token,
        });
        // original info
        setEditMovie((draft) => {
          draft.originalMovieInfo = movieData;
        });

        // editing
        setEditMovie((draft) => {
          draft.id = movieData.id;
          draft.name = movieData.name;
          draft.language = movieData.language;
          draft.yearOfRelease = movieData.yearOfRelease;
          draft.genreList = makeGenreArray(movieData.genre);
        });
      } catch (error) {
        // TODO: handle errors here!
        console.log(error);
        // setError("Failed to fetch movie info");
      } finally {
        setEditMovie((draft) => {
          draft.isLoading = false;
        });
      }
    }

    if (movieId || reloadCount) {
      console.log("calling apiGetMovieInfo with ", movieId);
      getMovieInfo();
    }

    return () => {
      request.cancel();
    };
  }, [movieId, editMovie.reloadCount]);

  const isValid = useMemo(() => {
    if (
      editMovie.name &&
      editMovie.language &&
      editMovie.yearOfRelease &&
      editMovie.genreList.length
    ) {
      return true;
    }
    return false;
  }, [
    editMovie.name,
    editMovie.language,
    editMovie.yearOfRelease,
    editMovie.genreList.length,
  ]);

  useEffect(() => {
    const request = axios.CancelToken.source();

    async function doEditMovieSubmit() {
      setEditMovie((draft) => {
        draft.isLoading = true;
      });
      try {
        const payload = {
          name: editMovie.name,
          genre: editMovie.genreList.map((g) => g.toLowerCase()).join(","),
          language: editMovie.language,
          yearOfRelease: editMovie.yearOfRelease,
        };

        console.log("payload ...", payload);
        await apiUpdateMovie({
          movieId: editMovie.id,
          payload: {
            ...payload,
          },
          cancelToken: request.token,
        });
        resetState();
        // navigate("/");
        // TODO: show a success modal, and on its onclick, navigate to the movie list page
      } catch (error) {
        // TODO: show errors in UI
        console.log(error);
        if (error.response && error.response.data.message) {
          setEditMovie((draft) => {
            draft.apiStatus.type = "error";
            draft.apiStatus.message = error.response.data.message;
            draft.apiStatus.show = true;
          });
        }
      } finally {
        setEditMovie((draft) => {
          draft.isLoading = false;
          draft.callApi = false;
        });
      }
    }

    if (
      editMovie.name &&
      editMovie.language &&
      editMovie.yearOfRelease &&
      editMovie.genreList.length &&
      editMovie.callApi &&
      editMovie.id
    ) {
      doEditMovieSubmit();
    }

    return () => {
      request.cancel();
    };
  }, [
    editMovie.id,
    editMovie.callApi,
    editMovie.name,
    editMovie.language,
    editMovie.yearOfRelease,
    editMovie.genreList.length,
  ]);

  function resetState() {
    setEditMovie((draft) => {
      draft.reloadCount++;
    });
  }

  function handleChange({ e, type }) {
    if (type === "name") {
      setEditMovie((draft) => {
        draft.name = e.target.value;
      });
    } else if (type === "genre") {
      setEditMovie((draft) => {
        draft.genreList.push(e.target.value);
      });
    } else if (type === "language") {
      setEditMovie((draft) => {
        draft.language = e.target.value;
      });
    } else if (type === "yearOfRelease") {
      setEditMovie((draft) => {
        draft.yearOfRelease = e.target.value;
      });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    setEditMovie((draft) => {
      draft.callApi = true;
    });
  }

  // TODO: improve on this later!
  function clearApiStatus() {
    setEditMovie((draft) => {
      draft.apiStatus.show = false;
      draft.apiStatus.type = "success";
      draft.apiStatus.message = "";
    });
  }

  return (
    <Page title="Edit movie">
      {editMovie.isLoading && <Loading />}

      <Goback />

      {editMovie.apiStatus.show && (
        <Modal
          type={editMovie.apiStatus.type}
          message={editMovie.apiStatus.message}
          onClick={clearApiStatus}
        />
      )}

      <h1>Editing {editMovie.originalMovieInfo.name}</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="movie-name">
          Name
          <input
            type="text"
            id="movie-name"
            name="movie-name"
            placeholder="Movie name"
            required
            value={editMovie.name}
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
                checked={editMovie.genreList.includes(g)}
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
            value={editMovie.language}
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
            value={editMovie.yearOfRelease}
            onChange={(e) => handleChange({ e, type: "yearOfRelease" })}
          />
        </label>

        <button
          type="submit"
          aria-busy={editMovie.isLoading}
          disabled={!isValid}
        >
          Update movie
        </button>
      </form>
    </Page>
  );
}

export default EditMoviePage;
