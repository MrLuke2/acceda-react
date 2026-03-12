"use client";
import { useState } from "react";

export default function DemoForm() {
  const [form, setForm] = useState({
    name: "", company: "", email: "", phone: "", zip: ""
  });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
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
        fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700,
        color: "var(--white)", marginBottom: 10,
      }}>Request Received</h3>
      <p style={{ fontSize: 14, color: "var(--gray-2)", lineHeight: 1.7 }}>
        We'll reach out within one business day to schedule your enterprise demo.
      </p>
    </div>
  );

  const fields = [
    { name: "name",    label: "Full Name",     type: "text",  placeholder: "Jane Smith",              required: true  },
    { name: "company", label: "Company",        type: "text",  placeholder: "Acme Corp",               required: true  },
    { name: "email",   label: "Work Email",     type: "email", placeholder: "jane@acmecorp.com",       required: true  },
    { name: "phone",   label: "Phone Number",   type: "tel",   placeholder: "+1 (555) 000-0000",       required: false },
    { name: "zip",     label: "ZIP Code",       type: "text",  placeholder: "10001",                   required: false },
  ];

  return (
    <form onSubmit={submit} noValidate style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {fields.map((f) => (
        <div key={f.name} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <label
            htmlFor={f.name}
            style={{ fontSize: 12, fontWeight: 500, color: "var(--gray-2)", letterSpacing: "0.04em" }}
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
            value={form[f.name]}
            onChange={handle}
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid var(--border)",
              borderRadius: 8,
              padding: "11px 14px",
              fontSize: 14,
              color: "var(--white)",
              fontFamily: "var(--font-body)",
              outline: "none",
              transition: "border-color 0.2s",
              width: "100%",
            }}
            onFocus={e => e.target.style.borderColor = "var(--blue)"}
            onBlur={e => e.target.style.borderColor = "var(--border)"}
          />
        </div>
      ))}

      {status === "error" && (
        <p style={{ fontSize: 13, color: "#FF4D6A", margin: "4px 0 0" }}>
          Something went wrong. Please try again or email us directly.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        style={{
          marginTop: 6,
          background: status === "loading" ? "rgba(29,106,255,0.6)" : "var(--blue)",
          color: "var(--white)",
          border: "none",
          borderRadius: 8,
          padding: "13px 24px",
          fontSize: 15,
          fontWeight: 600,
          fontFamily: "var(--font-body)",
          cursor: status === "loading" ? "not-allowed" : "pointer",
          transition: "opacity 0.2s",
          width: "100%",
        }}
      >
        {status === "loading" ? "Sending..." : "Request Enterprise Demo →"}
      </button>

      <p style={{ fontSize: 11, color: "var(--gray-3)", textAlign: "center", marginTop: 4 }}>
        No spam. One response within one business day.
      </p>
    </form>
  );
}