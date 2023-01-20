import { useEffect } from "react";
import Layout from "./Layout";

function Page(props) {
  let { title, skipNav } = props;

  useEffect(() => {
    if (title) {
      document.title = `${title} | mymdb`;
    }
  }, [title]);

  return <Layout skipNav={skipNav}>{props.children}</Layout>;
}

export default Page;
