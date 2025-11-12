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
    profilePic: "", // ✅ store base64 string here
  });

  const validateForm = (): boolean => {
    const requiredFields = [
      "doc_id",
      "doctorName",
      // "department",
      "gender",
      "phone",
      "specialization",
      "experience",
      "email",
      "address",
      // "services",
      // "fee",
      // "timeSlot",
      // "receptionist",
      // "details",
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

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Email",
        text: "Please enter a valid email address.",
      });
      return false;
    }

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
      setFormData(selectedDoctor);
    } else {
      const newDocID = generateNextDocID(3, "2", "ORG001");
      const savedPic = localStorage.getItem("doctorProfilePic"); // ✅ restore saved image
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
        profilePic: savedPic || "",
      });
    }
  }, [selectedDoctor]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;

    // ✅ Handle image upload (convert to Base64 + store in localStorage)
    if (name === "profilePic" && files && files[0]) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setFormData((prev) => ({ ...prev, profilePic: base64String }));
        localStorage.setItem("doctorProfilePic", base64String);
      };
      reader.readAsDataURL(file);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

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
              {/* Registration Number */}
              <div className="col-md-6">
                <label className="form-label">
                  Registration Number<span style={{ color: "red" }}>*</span>
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-light">
                    <i className="fas fa-hashtag text-secondary"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    name="registrationNumber"
                    value={formData.doc_id}
                    onChange={handleChange}
                    required
                    disabled
                  />
                </div>
              </div>

              {/* Doctor Name */}
              <div className="col-md-6">
                <label className="form-label">
                  Doctor Name<span style={{ color: "red" }}>*</span>
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-light">
                    <i className="fas fa-user text-secondary"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    name="doctorName"
                    value={formData.doctorName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Gender */}
              <div className="col-md-6">
                <label className="form-label">
                  Gender<span style={{ color: "red" }}>*</span>
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-light">
                    <i className="fas fa-venus-mars text-secondary"></i>
                  </span>
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
              </div>

              {/* Phone */}
              <div className="col-md-6">
                <label className="form-label">
                  Phone<span style={{ color: "red" }}>*</span>
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-light">
                    <i className="fas fa-phone-alt text-secondary"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Specialization */}
              <div className="col-md-6">
                <label className="form-label">
                  Specialization<span style={{ color: "red" }}>*</span>
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-light">
                    <i className="fas fa-notes-medical text-secondary"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Experience */}
              <div className="col-md-6">
                <label className="form-label">
                  Experience (Years)<span style={{ color: "red" }}>*</span>
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-light">
                    <i className="fas fa-calendar-check text-secondary"></i>
                  </span>
                  <input
                    type="number"
                    className="form-control"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="col-md-6">
                <label className="form-label">
                  Email<span style={{ color: "red" }}>*</span>
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-light">
                    <i className="fas fa-at text-secondary"></i>
                  </span>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Profile Picture (Base64 + localStorage) */}
              <div className="col-md-6">
                <label className="form-label">
                  Profile Picture<span style={{ color: "red" }}>*</span>
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-light">
                    <i className="fas fa-upload text-secondary"></i>
                  </span>
                  <input
                    type="file"
                    className="form-control"
                    name="profilePic"
                    accept="image/*"
                    onChange={handleChange}
                    required
                  />
                </div>

                {formData.profilePic && (
                  <div className="mt-2 text-center">
                    <img
                      src={
                        formData.profilePic instanceof File
                          ? URL.createObjectURL(formData.profilePic)
                          : formData.profilePic
                      }
                      alt="Profile Preview"
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                        borderRadius: "50%",
                        border: "2px solid #ddd",
                      }}
                    />
                  </div>
                )}

              </div>

              {/* Address */}
              <div className="col-md-6">
                <label className="form-label">
                  Address<span style={{ color: "red" }}>*</span>
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-light">
                    <i className="fas fa-home text-secondary"></i>
                  </span>
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
