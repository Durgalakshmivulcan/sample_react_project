import { useState } from "react";
import type { RegistrationListItem } from "../types/registration";
import RegistrationListTable from "./RegistrationListTable";
import TableActionButtons from "./TableActionButtons";

export default function RegistrationList() {
  const [rows] = useState<RegistrationListItem[]>([
    {
      id: 1,
      userName: "Venkatesh",
      email: "ven@gmail.com",
      contact: "6302669664",
      role: "Admin",
    },
    {
      id: 2,
      userName: "Administrator",
      email: "durgalaxmi417@gmail.com",
      contact: "6302669660",
      role: "Admin",
    },
    {
      id: 3,
      userName: "Pravallika",
      email: "test0@gmail.com",
      contact: "7032760271",
      role: "Admin",
    },
    {
      id: 4,
      userName: "Dr. Ashwin Kumar Panda",
      email: "pandas@gmail.com",
      contact: "8897355655",
      role: "Admin",
    },
  ]);

  return (
    <div className="container py-4">
      <h3 className="fw-semibold mb-3">Registration List</h3>

      <div className="d-flex justify-content-between align-items-center mb-3">
        {/* Show entries */}
        <div className="d-flex align-items-center gap-2">
          <span>Show</span>
          <select className="form-select" style={{ width: "80px" }}>
            <option>10</option>
            <option>25</option>
            <option>50</option>
          </select>
          <span>entries</span>
        </div>

        {/* Export buttons */}
        <TableActionButtons />
      </div>

      <div className="d-flex justify-content-end mb-2">
        {/* Search */}
        <div className="input-group" style={{ width: "260px" }}>
          <span className="input-group-text">
            <i className="bi bi-search"></i>
          </span>
          <input className="form-control" placeholder="Search…" />
        </div>
      </div>

      {/* Table */}
      <RegistrationListTable rows={rows} />

      {/* Pagination */}
      <div className="d-flex justify-content-between mt-3">
        <div>
          Showing 1 to {rows.length} of {rows.length} entries
        </div>

        <div className="d-flex gap-2">
          <button className="btn btn-outline-secondary btn-sm">Previous</button>
          <button className="btn btn-primary btn-sm">1</button>
          <button className="btn btn-outline-secondary btn-sm">Next</button>
        </div>
      </div>
    </div>
  );
}
