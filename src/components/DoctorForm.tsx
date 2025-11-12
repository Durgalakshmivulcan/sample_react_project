import React, { useState, useEffect } from "react";
import { Doctor } from "../types/doctor";
import Swal from "sweetalert2";
import { generateNextDocID } from "../utils/generateNextDocID";

interface Props {
  selectedDoctor: Doctor | null;
  onSave: (doctor: Doctor) => void;
}

const DoctorForm: React.FC<Props> = ({ selectedDoctor, onSave }) => {
  const [formData, setFormData] = useState<Doctor>({
    doc_id: "",
    doctorName: "",
    experience:0,
    address:"",
    gender: "",
    phone: "",
    email: "",
    department: "",
    specialization: "",
    services: "",
    fee: "",
    timeSlot: "",
    receptionist: "",
    details: "",
    picture: null,
  });
const validateForm = (): boolean => {
    const requiredFields = [
      "doc_id",
      "doctorName",
      "department",
      "gender",
      "phone",
      "specialization",
      "experience",
      "email",
      "address",
      "services",
      "fee",
      "timeSlot",
      "receptionist",
      "details",
    ];

    for (let field of requiredFields) {
      if (!formData[field as keyof Doctor] || formData[field as keyof Doctor] === "") {
        Swal.fire({
          icon: "warning",
          title: "Missing Field",
          text: `Please fill out the "${field}" field.`,
        });
        return false;
      }
    }

    // Basic Email validation
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Email",
        text: "Please enter a valid email address.",
      });
      return false;
    }

    // Phone validation
    if (!/^\d{10}$/.test(formData.phone)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Phone Number",
        text: "Phone number must be 10 digits.",
      });
      return false;
    }

    return true;
  };
  useEffect(() => {
  if (selectedDoctor) {
    setFormData(selectedDoctor); // Prefill form with selected doctor data
  } else {
    // If no doctor selected (fresh add), reset form and generate new ID
    const newDocID = generateNextDocID(3, "2", "ORG001");
    setFormData({
      doc_id: newDocID,
      doctorName: "",
      experience: 0,
      address: "",
      gender: "",
      phone: "",
      email: "",
      department: "",
      specialization: "",
      services: "",
      fee: "",
      timeSlot: "",
      receptionist: "",
      details: "",
      picture: null,
    });
  }
}, [selectedDoctor]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

 const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
if (!validateForm()) return;
  // const isUpdate = !!formData.id; // check if doctor has an ID

  onSave(formData);

   Swal.fire({
      icon: selectedDoctor ? "info" : "success",
      title: selectedDoctor ? "Doctor Updated!" : "Doctor Added!",
      text: selectedDoctor
        ? `Doctor ${formData.doctorName} details updated successfully.`
        : `Doctor ${formData.doctorName} registered successfully!`,
      confirmButtonColor: "#3085d6",
    });

  console.log("Doctor Data:", formData);
};



  return (
    <div className="container my-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <h4 className="text-center mb-3">
            {selectedDoctor ? "Edit Doctor" : "Add Doctor"}
          </h4>
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Registration Number<span style={{ color: 'red' }}>*</span><span style={{ color: 'red' }}>*</span></label>
                <input
                  type="text"
                  className="form-control"
                  name="registrationNumber"
                  value={formData.doc_id}
                  onChange={handleChange}
                  required disabled
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Doctor Name<span style={{ color: 'red' }}>*</span></label>
                <input
                  type="text"
                  className="form-control"
                  name="doctorName"
                  value={formData.doctorName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Gender<span style={{ color: 'red' }}>*</span></label>
                <select
                  className="form-select"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label">Phone<span style={{ color: 'red' }}>*</span></label>
                <input
                  type="text"
                  className="form-control"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Specialization<span style={{ color: 'red' }}>*</span></label>
                <input
                  type="text"
                  className="form-control"
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Experience (Years)<span style={{ color: 'red' }}>*</span></label>
                <input
                  type="number"
                  className="form-control"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Email<span style={{ color: 'red' }}>*</span></label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Address<span style={{ color: 'red' }}>*</span></label>
                <input
                  type="text"
                  className="form-control"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="text-center mt-4">
              <button className="btn btn-primary" type="submit">
                {selectedDoctor ? "Update Doctor" : "Add Doctor"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DoctorForm;
