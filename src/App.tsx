import React, { useState } from "react";
import DoctorForm from "./components/DoctorForm"; // ✅ corrected path
import DoctorList from "./components/DoctorList"; // ✅ corrected path
import { Doctor } from "./types/doctor"; // ✅ doctor type

const App: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  const handleSave = (doctor: Doctor) => {
    if (doctor.id) {
      // Update existing doctor
      setDoctors((prev) =>
        prev.map((d) => (d.id === doctor.id ? doctor : d))
      );
    } else {
      // Add new doctor
      const newDoctor = { ...doctor, id: Date.now() };
      setDoctors((prev) => [...prev, newDoctor]);
    }
    setSelectedDoctor(null);
  };

  const handleDelete = (id: number) => {
    setDoctors((prev) => prev.filter((d) => d.id !== id));
  };

  return (
    <div>
      <h1 style={{ textAlign: "center", margin: "20px 0" }}>
        🩺 Doctor Registration Form
      </h1>
      {/* ✅ Make sure DoctorForm accepts selectedDoctor & onSave props */}
      <DoctorForm selectedDoctor={selectedDoctor} onSave={handleSave} />

      {/* ✅ Make sure DoctorList accepts doctors, onEdit, and onDelete props */}
      <DoctorList
        doctors={doctors}
        onEdit={setSelectedDoctor}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default App;
