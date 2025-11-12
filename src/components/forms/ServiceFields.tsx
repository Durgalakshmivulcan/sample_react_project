import React from "react";
import { Service } from "../../types/service";
import { BriefcaseFill, CurrencyRupee, Percent } from "react-bootstrap-icons";

interface Props {
  formData: Service;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const ServiceFields: React.FC<Props> = ({ formData, onChange }) => {
  return (
    <div className="row">
      {/* Service Name */}
      <div className="form-group col-lg-4 col-sm-12">
        <label>
          Service Name <span className="text-danger">*</span>
        </label>
        <div className="input-group">
          <span className="input-group-text">
            <BriefcaseFill />
          </span>
          <input
            type="text"
            className="form-control"
            name="service_name"
            value={formData.service_name}
            onChange={onChange}
            placeholder="Enter service name"
          />
        </div>
      </div>

      {/* Price */}
      <div className="form-group col-lg-4 col-sm-12">
        <label>
          Price <span className="text-danger">*</span>
        </label>
        <div className="input-group">
          <span className="input-group-text">
            <CurrencyRupee />
          </span>
          <input
            type="number"
            className="form-control"
            name="service_price_initial"
            value={formData.service_price_initial || ""}
            onChange={onChange}
            placeholder="Enter price"
          />
        </div>
      </div>

      {/* GST */}
      <div className="form-group col-lg-4 col-sm-12">
        <label>
          GST (%) <span className="text-danger">*</span>
        </label>
        <div className="input-group">
          <input
            type="number"
            className="form-control"
            name="services_gst"
            value={formData.services_gst || ""}
            onChange={onChange}
            placeholder="Enter GST"
          />
          <span className="input-group-text">
            <Percent />
          </span>
        </div>
      </div>

      {/* Total Price */}
      <div className="form-group col-lg-4 col-sm-12">
        <label>
          Total Price <span className="text-danger">*</span>
        </label>
        <div className="input-group">
          <span className="input-group-text">
            <CurrencyRupee />
          </span>
          <input
            type="text"
            className="form-control"
            name="service_price"
            value={formData.service_price.toFixed(2)}
            readOnly
          />
        </div>
      </div>

      {/* Organization (optional dropdown) */}
      <div className="form-group col-lg-4 col-sm-12">
        <label>
          Organization <span className="text-danger">*</span>
        </label>
        <div className="input-group">
          <select
            className="form-select"
            name="organizations"
            value={formData.organizations}
            onChange={onChange}
          >
            <option value="">Select Organization</option>
            <option value="1">Organization A</option>
            <option value="2">Organization B</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ServiceFields;
