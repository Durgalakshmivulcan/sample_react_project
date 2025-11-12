import RowActions from "./RowActions";
import type { RegistrationListItem } from "../types/registration";

type Props = {
  rows: RegistrationListItem[];
};

export default function RegistrationListTable({ rows }: Props) {
  return (
    <div className="table-responsive mt-3">
      <table className="table table-bordered align-middle">
        <thead className="table-light">
          <tr>
            <th>S No <i className="bi bi-arrow-down-up"></i></th>
            <th>User Name <i className="bi bi-arrow-down-up"></i></th>
            <th>Email <i className="bi bi-arrow-down-up"></i></th>
            <th>Contact <i className="bi bi-arrow-down-up"></i></th>
            <th>Role <i className="bi bi-arrow-down-up"></i></th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((r, index) => (
            <tr key={r.id}>
              <td>{index + 1}</td>
              <td>{r.userName}</td>
              <td>{r.email}</td>
              <td>{r.contact}</td>
              <td>{r.role}</td>
              <td><RowActions /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
