import { useState } from "react";

type Props = {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  error?: string;
};

export default function PasswordField({
  id, label, value, onChange, required, error,
}: Props) {
  const [show, setShow] = useState(false);

  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label fw-semibold">
        {label} {required && <span className="text-danger">*</span>}
      </label>
      <div className="input-group">
        <span className="input-group-text">
          <i className="bi bi-lock-fill" />
        </span>
        <input
          id={id}
          type={show ? "text" : "password"}
          className={`form-control ${error ? "is-invalid" : ""}`}
          placeholder="•••••"
          value={value}
          onChange={onChange}
          required={required}
          aria-describedby={error ? `${id}-error` : undefined}
        />
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() => setShow(s => !s)}
          title={show ? "Hide" : "Show"}
        >
          <i className={show ? "bi bi-eye-slash-fill" : "bi bi-eye-fill"} />
        </button>
        {error && <div id={`${id}-error`} className="invalid-feedback">{error}</div>}
      </div>
    </div>
  );
}
