import { Link } from "react-router-dom";
import Page from "../components/Page";

function NotFoundPage() {
  return (
    <Page title="404" skipNav={true}>
      <Link to="/">&larr; Go to homepage</Link>
      <h1>404 - page not found</h1>
    </Page>
  );
}

export default NotFoundPage;
