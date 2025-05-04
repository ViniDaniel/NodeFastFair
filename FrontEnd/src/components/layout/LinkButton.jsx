import { Link } from "react-router-dom";

function LinkButton({ to, text }) {
  return (
    <Link to={to}>
      <button>{text}</button>
    </Link>
  );
}

export default LinkButton;
