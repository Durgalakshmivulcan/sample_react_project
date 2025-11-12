import React from "react";
import { Doctor } from "../types/doctor";

interface Props {
  doctors: Doctor[];
  onEdit: (doctor: Doctor) => void;
  onDelete: (id: number) => void;
}

const DoctorList: React.FC<Props> = ({ doctors, onEdit, onDelete }) => {
  return (
    <div className="container my-4">
      <h4 className="text-center mb-3">Registered Doctors</h4>

      <div className="table-responsive">
        <table className="table table-bordered table-striped align-middle">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Gender</th>
              <th>Phone</th>
              <th>Specialization</th>
              <th>Experience</th>
              <th>Email</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {doctors.length > 0 ? (
              doctors.map((doctor) => (
                <tr key={doctor.id}>
                  <td>{doctor.id}</td>
                  <td>{doctor.doctorName}</td>
                  <td>{doctor.gender}</td>
                  <td>{doctor.phone}</td>
                  <td>{doctor.specialization}</td>
                  <td>{doctor.experience}</td>
                  <td>{doctor.email}</td>
                  <td>{doctor.address}</td>
                  <td>
                    <div className="d-flex justify-content-center align-items-center gap-2">
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => onEdit(doctor)}
                        title="Edit"
                      >
                        <i className="fas fa-edit"></i>
                      </button>

                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => onDelete(doctor.id!)}
                        title="Delete"
                      >
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </div>
                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={10} className="text-center">
                  No doctors found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DoctorList;
