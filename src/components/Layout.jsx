import Container from "./Container";
import Nav from "./Nav";

function Layout(props) {
  let { skipNav } = props;
  console.log("skip ", skipNav);
  return (
    <Container>
      {!skipNav && <Nav />}
      {props.children}
    </Container>
  );
}

export default Layout;
