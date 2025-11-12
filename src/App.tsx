import { Link } from "react-router-dom";

export default function App() {
  return (
    <div className="container py-5">
      <h2 className="mb-3">Home</h2>
      <Link to="/registration" className="btn btn-outline-primary">Go to Registration</Link>
    </div>
  );
}
