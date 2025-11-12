import { useState } from "react";
import type { ContactFormData } from "../types/form";
import TextField from "./TextField";

export default function ContactForm() {
  const [data, setData] = useState<ContactFormData>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  function validate(values: ContactFormData) {
    const e: Partial<Record<keyof ContactFormData, string>> = {};
    if (!values.name.trim()) e.name = "Name is required";
    if (!values.email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) e.email = "Enter a valid email";
    if (!values.message.trim()) e.message = "Message is required";
    return e;
  }

  function onSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const e = validate(data);
    setErrors(e);
    if (Object.keys(e).length === 0) {
      // pretend to send to server
      console.log("Submitting:", data);
      setSubmitted(true);
      setData({ name: "", email: "", message: "" });
    }
  }

  return (
    <form onSubmit={onSubmit} style={{ margin: "40px 0px 0px 350px", padding: 100, border: "1px solid #eee", borderRadius: 12 }}>
      <h2 style={{ marginTop: 0 }}>Contact Us</h2>

      <TextField
        id="name"
        label="Name"
        value={data.name}
        onChange={(e) => setData({ ...data, name: e.target.value })}
        required
        error={errors.name}
      />

      <TextField
        id="email"
        label="Email"
        type="email"
        value={data.email}
        onChange={(e) => setData({ ...data, email: e.target.value })}
        required
        error={errors.email}
      />

      <div style={{ marginBottom: 12 }}>
        <label htmlFor="message" style={{ display: "block", fontWeight: 600 }}>Message</label>
        <textarea
          id="message"
          value={data.message}
          onChange={(e) => setData({ ...data, message: e.target.value })}
          required
          rows={4}
          style={{ width: "100%", padding: 8, border: "1px solid #ccc", borderRadius: 6 }}
        />
        {errors.message && (
          <div id="message-error" style={{ color: "#b91c1c", fontSize: 12, marginTop: 4 }}>
            {errors.message}
          </div>
        )}
      </div>

      <button type="submit" style={{ padding: "8px 14px", border: "1px solid #0d49b0ff", borderRadius: 8 }}>
        Submit
      </button>

      {submitted && <div style={{ marginTop: 10, color: "#065f46" }}>Thanks! We received your message.</div>}
    </form>
  );
}
