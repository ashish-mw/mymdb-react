import Page from "../components/Page";

function SignupPage() {
  return (
    <Page title="Signup">
      <h1>Signup</h1>
      <form action="">
        <label htmlFor="username">
          Username
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            required
          />
        </label>

        <label htmlFor="password">
          Password
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            required
          />
        </label>

        <button type="submit">Signup</button>
      </form>
    </Page>
  );
}

export default SignupPage;
