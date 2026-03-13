"use client";
import { useState } from "react";

export default function DemoForm() {
  const [form, setForm] = useState({
    name: "", company: "", email: "", phone: "", zip: ""
  });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const [errors, setErrors] = useState({});

  const submit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!form.name) newErrors.name = "Full Name is required.";
    if (!form.company) newErrors.company = "Company is required.";
    if (!form.email || !/^\S+@\S+\.\S+$/.test(form.email)) newErrors.email = "Please enter a valid work email address (e.g., name@company.com).";
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setStatus("idle");
      return;
    }
    setErrors({});
    setStatus("loading");
    try {
      const res = await fetch("/api/demo-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) setStatus("success");
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") return (
    <div style={{
      background: "var(--bg-card)",
      border: "1px solid rgba(0,212,170,0.3)",
      borderRadius: 14,
      padding: "48px 40px",
      textAlign: "center",
    }}>
      <div style={{
        width: 52, height: 52, borderRadius: "50%",
        background: "rgba(0,212,170,0.1)",
        border: "1px solid rgba(0,212,170,0.3)",
        display: "grid", placeItems: "center",
        margin: "0 auto 20px",
      }}>
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <path d="M4 11l5 5 9-9" stroke="#00D4AA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <h3 style={{
        fontFamily: "var(--font-display)", fontSize: "1.375rem", fontWeight: 700,
        color: "var(--white)", marginBottom: 10,
      }}>Request Received</h3>
      <p style={{ fontSize: "0.875rem", color: "var(--gray-2)", lineHeight: 1.7 }}>
        We'll reach out within one business day to schedule your enterprise demo.
      </p>
    </div>
  );

  const fields = [
    { name: "name",    label: "Full Name",     type: "text",  placeholder: "Jane Smith",              required: true,  auto: "name" },
    { name: "company", label: "Company",        type: "text",  placeholder: "Acme Corp",               required: true,  auto: "organization" },
    { name: "email",   label: "Work Email",     type: "email", placeholder: "jane@acmecorp.com",       required: true,  auto: "email" },
    { name: "phone",   label: "Phone Number",   type: "tel",   placeholder: "+1 (555) 000-0000",       required: false, auto: "tel" },
    { name: "zip",     label: "ZIP Code",       type: "text",  placeholder: "10001",                   required: false, auto: "postal-code" },
  ];

  return (
    <form onSubmit={submit} noValidate style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <p style={{ fontSize: "0.8125rem", color: "var(--gray-2)", textAlign: "left", marginBottom: 4 }}>Fields marked with <span style={{ color: "var(--teal)" }}>*</span> are required.</p>
      {fields.map((f) => (
        <div key={f.name} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <label
            htmlFor={f.name}
            style={{ fontSize: "0.75rem", fontWeight: 500, color: "var(--text-secondary)", letterSpacing: "0.04em" }}
          >
            {f.label}
            {f.required && <span style={{ color: "var(--teal)", marginLeft: 3 }}>*</span>}
          </label>
          <input
            id={f.name}
            name={f.name}
            type={f.type}
            placeholder={f.placeholder}
            required={f.required}
            autoComplete={f.auto}
            aria-required={f.required ? "true" : undefined}
            aria-invalid={errors[f.name] ? "true" : undefined}
            aria-describedby={errors[f.name] ? `${f.name}-error` : undefined}
            value={form[f.name]}
            onChange={handle}
            style={{
              background: "rgba(255,255,255,0.04)",
              border: `1px solid ${errors[f.name] ? "var(--accent-red)" : "var(--border-hi)"}`,
              borderRadius: 8,
              padding: "11px 14px",
              fontSize: "0.875rem",
              color: "var(--white)",
              fontFamily: "var(--font-body)",
              transition: "border-color 0.2s, box-shadow 0.2s",
              width: "100%",
            }}
            onFocus={e => { e.target.style.borderColor = errors[f.name] ? "#FF4D6A" : "var(--blue)"; }}
            onBlur={e => { e.target.style.borderColor = errors[f.name] ? "#FF4D6A" : "var(--gray-3)"; }}
          />
          {errors[f.name] && (
            <span role="alert" aria-live="polite" id={`${f.name}-error`} style={{ fontSize: "0.8125rem", color: "#FF4D6A", marginTop: 2 }}>
              {errors[f.name]}
            </span>
          )}
        </div>
      ))}

      {status === "error" && (
        <p style={{ fontSize: "0.8125rem", color: "#FF4D6A", margin: "4px 0 0" }}>
          Something went wrong. Please try again or email us directly.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        onMouseOver={e => { if (status !== "loading") e.currentTarget.style.color = "#FFC247"; }}
        onMouseOut={e => { e.currentTarget.style.color = "var(--white)"; }}
        style={{
          marginTop: 6,
          background: status === "loading" ? "rgba(29,106,255,0.6)" : "var(--blue)",
          color: "var(--white)",
          border: "none",
          borderRadius: 8,
          padding: "13px 24px",
          fontSize: "0.9375rem",
          fontWeight: 600,
          fontFamily: "var(--font-body)",
          cursor: status === "loading" ? "not-allowed" : "pointer",
          transition: "color 0.2s, background 0.2s, opacity 0.2s",
          width: "100%",
        }}
      >
        {status === "loading" ? "Sending..." : "Request Enterprise Demo →"}
      </button>

      <p style={{ fontSize: "0.6875rem", color: "var(--gray-2)", textAlign: "center", marginTop: 4 }}>
        No spam. One response within one business day.
      </p>
    </form>
  );
}