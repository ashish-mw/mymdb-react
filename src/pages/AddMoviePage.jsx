import { useState } from "react";

import Page from "../components/Page";
import Loading from "../components/Loading";
import Goback from "../components/Goback";

function AddMoviePage() {
  const [isLoading, setIsLoading] = useState(false);

  const genres = ["Horror", "Scifi", "Romance", "Adventure", "Crime"];
  const languages = ["English", "Tamil", "Hindi", "French", "Telugu"];

  return (
    <Page title="Add new movie">
      {isLoading && <Loading />}

      <Goback />

      <h1>Add new movie</h1>

      <form action="">
        <label htmlFor="movie-name">
          Name
          <input
            type="text"
            id="movie-name"
            name="movie-name"
            placeholder="Movie name"
            required
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
              />
              {g}
            </label>
          ))}
        </fieldset>

        <label htmlFor="movie-lang">
          Language
          <select id="movie-lang" name="movie-lang" required="">
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
          />
        </label>

        <button type="submit">Add movie</button>
      </form>
    </Page>
  );
}

export default AddMoviePage;
