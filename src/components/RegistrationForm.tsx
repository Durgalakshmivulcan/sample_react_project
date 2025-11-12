import { useState } from "react";
import type { RegistrationFormData } from "../types/registration";
import TextField from "./TextField";          // reuse your existing component
import SelectField from "./SelectField";
import PasswordField from "./PasswordField";

function validate(v: RegistrationFormData) {
  const e: Partial<Record<keyof RegistrationFormData, string>> = {};
  if (!v.userName.trim()) e.userName = "User Name is required";
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v.email)) e.email = "Enter a valid email";
  if (!v.contact.trim()) e.contact = "Contact is required";
  if (!v.password.trim()) e.password = "Password is required";
  if (!v.role) e.role = "Select a role";
  return e;
}

export default function RegistrationForm() {
  const [values, setValues] = useState<RegistrationFormData>({
    userName: "", email: "", contact: "", password: "", role: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof RegistrationFormData, string>>>({});

  function update<K extends keyof RegistrationFormData>(k: K, val: RegistrationFormData[K]) {
    setValues(v => ({ ...v, [k]: val }));
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const eMap = validate(values);
    setErrors(eMap);
    if (Object.keys(eMap).length === 0) {
      console.log("Registration submit:", values);
      alert("Submitted!");
    }
  }

  return (
    <form onSubmit={onSubmit} className="row gy-3 px-lg-4">
      {/* Row 1 */}
      <div className="col-md-4">
        <TextField
          id="userName"
          label="User Name"
          value={values.userName}
          onChange={(e) => update("userName", e.target.value)}
          required
          error={errors.userName}
          iconClassName="bi bi-person-fill"
        />
      </div>

      <div className="col-md-4">
        <TextField
          id="email"
          label="Email"
          type="email"
          value={values.email}
          onChange={(e) => update("email", e.target.value)}
          required
          error={errors.email}
          iconClassName="bi bi-envelope-fill"
        />
      </div>

      <div className="col-md-4">
        <TextField
          id="contact"
          label="Contact"
          value={values.contact}
          onChange={(e) => update("contact", e.target.value)}
          required
          error={errors.contact}
          iconClassName="bi bi-telephone-fill"

        />
      </div>

      {/* Row 2 */}
      <div className="col-md-6">
        <PasswordField
          id="password"
          label="Password"
          value={values.password}
          onChange={(e) => update("password", e.target.value)}
          required
          error={errors.password}
        />
      </div>

      <div className="col-md-6">
        <SelectField
          id="role"
          label="Roles"
          value={values.role}
          onChange={(e) => update("role", e.target.value)}
          required
          error={errors.role}
          options={[
            { value: "", label: "Select Security" },
            { value: "security", label: "Security" },
            { value: "admin", label: "Admin" },
            { value: "user", label: "User" },
          ]}
          iconClassName="bi bi-people-fill"
        />
      </div>

      {/* Submit */}
      <div className="col-12 d-flex justify-content-center pt-2">
        <button className="btn btn-primary px-4" type="submit">Submit</button>
      </div>
    </form>
  );
}
