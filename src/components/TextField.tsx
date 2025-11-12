import type React from "react";

type Props = {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: "text" | "email";
  required?: boolean;
  error?: string;
  iconClassName?: string;
};

export default function TextField({
  id,
  label,
  value,
  onChange,
  type = "text",
  required,
  error,
  iconClassName,
}: Props) {
  return (
    <div style={{ marginBottom: 12 }}>
      <label htmlFor={id} style={{ display: "block", fontWeight: 600 }}>
        {label}
      </label>
      <div className="input-group">
        {iconClassName && (
          <span className="input-group-text">
            <i className={iconClassName} />
          </span>
        )}
        

        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          required={required}
          className={`form-control ${error ? "is-invalid" : ""}`}
          // style={{
          //   width: "100%",
          //   padding: 8,
          //   border: "1px solid #121010ff",
          //   borderRadius: 6,
          //   backgroundColor: "white",
          //   color: "black",
          // }}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          autoComplete={id}
        />
        {error && (
          <div
            id={`${id}-error`}
            style={{ color: "#b91c1c", fontSize: 12, marginTop: 4 }}
          >
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
