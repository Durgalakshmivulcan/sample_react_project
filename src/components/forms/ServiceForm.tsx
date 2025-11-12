import React, { useEffect, useState } from "react";
import { Service } from "../../types/service";
import { validateServiceForm } from "../../utils/validation";
import ServiceFields from "./ServiceFields";

interface Props {
  onSubmit: (data: Service) => void;
  initialData?: Service;
}

const ServiceForm: React.FC<Props> = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState<Service>(
    initialData || {
      service_name: "",
      service_price_initial: 0,
      services_gst: 0,
      service_price: 0,
      organizations: "",
    }
  );

  // Reset form whenever initialData changes
  useEffect(() => {
    setFormData(
      initialData || {
        service_name: "",
        service_price_initial: 0,
        services_gst: 0,
        service_price: 0,
        organizations: "",
      }
    );
  }, [initialData]);

  // Calculate total price whenever price or GST changes
  useEffect(() => {
    const total =
      formData.service_price_initial +
      (formData.service_price_initial * formData.services_gst) / 100;
    setFormData(prev => ({
      ...prev,
      service_price: parseFloat(total.toFixed(2)),
    }));
  }, [formData.service_price_initial, formData.services_gst]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name.includes("price") || name.includes("gst") ? Number(value) : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const error = validateServiceForm(formData);
    if (error) {
      alert(error);
      return;
    }
    onSubmit(formData);

    // Clear the form after submit
    if (!initialData) {
      setFormData({
        service_name: "",
        service_price_initial: 0,
        services_gst: 0,
        service_price: 0,
        organizations: "",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-3">
      <ServiceFields formData={formData} onChange={handleChange} />
      <div className="text-center mt-4">
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};

export default ServiceForm;
