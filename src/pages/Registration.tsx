import RegistrationForm from "../components/RegistrationForm";
import RegistrationListTables from "../components/RegistrationList";


export default function Registration() {
  return (
    <div className="container py-4 px-lg-5 m-lg-5">
      <div className="mb-3">
        <h3 className="fw-semibold mb-0">
          Access Control{" "}
          <span className="text-body-secondary">/ Registration</span>
        </h3>
      </div>

      <div className="card shadow-sm rounded-4">
        <div className="card-header bg-white py-3">
          <h5 className="mb-0">Registration</h5>
        </div>
        <div className="card-body">
          <RegistrationForm />
        </div>
      </div>

      <div className="card shadow-sm rounded-4 mt-3">
        <div className="card-header bg-white py-3">
          <h5 className="mb-0">Registration List</h5>
        </div>
        <div className="card-body">
          <RegistrationListTables />
        </div>
      </div>
    </div>
  );
}
