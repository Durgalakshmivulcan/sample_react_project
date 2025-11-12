import React, { useState } from "react";
import ServiceForm from "../components/forms/ServiceForm";
import ServiceTable from "../components/tables/ServiceTable";
import { Service } from "../types/service";

const ServicesPage: React.FC = () => {

    const [servicesList, setServicesList] = useState<Service[]>([]);

  const [editingService, setEditingService] = useState<Service | null>(null);

  const handleFormSubmit = (data: Service) => {
    if (editingService) {

        setServicesList(prev =>
        prev.map(s => (s.service_name === editingService.service_name ? data : s))
      );
      alert(`✅ Service "${data.service_name}" updated successfully!`);
      setEditingService(null); 
    } else {

        setServicesList(prev => [...prev, data]);
      alert(`✅ Service "${data.service_name}" added successfully!`);
      setEditingService(null);
    }
  };

  // Edit a service
  const handleEdit = (service: Service) => {
    setEditingService(service);
    window.scrollTo({ top: 0, behavior: "smooth" }); // scroll to form
  };

  // Delete a service
  const handleDelete = (service: Service) => {
    if (window.confirm(`Are you sure you want to delete "${service.service_name}"?`)) {
      setServicesList(prev => prev.filter(s => s.service_name !== service.service_name));
      alert(`✅ Service "${service.service_name}" deleted successfully!`);
    }
  };

  return (
    <div className="container mt-4">
      {/* Breadcrumb */}
      <ul className="breadcrumb">
        <li className="breadcrumb-item">
          <h4 className="page-title m-0">Services</h4>
        </li>
        <li className="breadcrumb-item">Add & Modify Services</li>
      </ul>

      {/* Form Card */}
      <div className="card mb-4">
        <div className="card-header">
          <h4>{editingService ? "Edit Service" : "Add Service"}</h4>
        </div>
        <div className="card-body">
          <ServiceForm onSubmit={handleFormSubmit} initialData={editingService || undefined} />
        </div>
      </div>

      {/* Table Card */}
      <div className="card">
        <div className="card-header">
          <h4>Services List</h4>
        </div>
        <div className="card-body">
          {servicesList.length > 0 ? (
            <ServiceTable
              services={servicesList}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ) : (
            <p>No services added yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
