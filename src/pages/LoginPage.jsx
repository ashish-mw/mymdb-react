import Page from "../components/Page";

function LoginPage() {
  return (
    <Page title="Login">
      <h1>Login</h1>
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

        <button type="submit">Login</button>
      </form>
    </Page>
  );
}

export default LoginPage;
