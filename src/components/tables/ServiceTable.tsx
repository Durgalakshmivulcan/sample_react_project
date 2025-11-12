import React from "react";
import { Service } from "../../types/service";

interface Props {
  services: Service[];
  onEdit: (service: Service) => void;
  onDelete: (service: Service) => void;
}

const ServiceTable: React.FC<Props> = ({ services, onEdit, onDelete }) => {
  return (
    <table className="table table-bordered table-striped">
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>GST (%)</th>
          <th>Total Price</th>
          <th>Organization</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {services.map((s, idx) => (
          <tr key={idx}>
            <td>{s.service_name}</td>
            <td>{s.service_price_initial.toFixed(2)}</td>
            <td>{s.services_gst}</td>
            <td>{s.service_price.toFixed(2)}</td>
            <td>{s.organizations}</td>
            <td>
              <button
                className="btn btn-sm btn-primary me-2"
                onClick={() => onEdit(s)}
              >
                Edit
              </button>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => onDelete(s)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ServiceTable;
