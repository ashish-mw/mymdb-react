import { useNavigate } from "react-router-dom";

function Goback() {
  const navigate = useNavigate();
  // navigate('route')
  return (
    <a
      onClick={() => {
        navigate(-1);
      }}
    >
      &larr; Go back
    </a>
  );
}

export default Goback;
