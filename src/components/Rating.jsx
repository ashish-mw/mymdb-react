function Rating(props) {
  const { count } = props;

  let stars = "";
  for (let i = 0; i < count; i++) {
    stars += "★ ";
  }

  return (
    <>
      <strong>rating: {stars} </strong>
      <small>({count}/5)</small>
    </>
  );
}

export default Rating;
