import type React from "react";

type Option = { value: string; label: string };

type Props = {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
  error?: string;
  options: Option[];
  iconClassName?: string; // e.g. "bi bi-people"
};

export default function SelectField({
  id, label, value, onChange, required, error, options, iconClassName,
}: Props) {
  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label fw-semibold">
        {label} {required && <span className="text-danger">*</span>}
      </label>
      <div className="input-group">
        {iconClassName && (
          <span className="input-group-text">
            <i className={iconClassName} />
          </span>
        )}
        <select
          id={id}
          className={`form-select ${error ? "is-invalid" : ""}`}
          value={value}
          onChange={onChange}
          required={required}
          aria-describedby={error ? `${id}-error` : undefined}
        >
          {options.map(o => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        {error && <div id={`${id}-error`} className="invalid-feedback">{error}</div>}
      </div>
    </div>
  );
}
