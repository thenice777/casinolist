"use client";

import { useState } from "react";
import { Loader2, Check, AlertCircle } from "lucide-react";

const subjectOptions = [
  { value: "general", label: "General Inquiry" },
  { value: "listing", label: "Casino Listing Request" },
  { value: "partnership", label: "Partnership/Business" },
  { value: "feedback", label: "Website Feedback" },
  { value: "correction", label: "Report Incorrect Information" },
  { value: "other", label: "Other" },
];

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "general",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (status === "error") {
      setStatus("idle");
      setErrorMessage("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    // Validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus("error");
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "general", message: "" });
      } else {
        setStatus("error");
        setErrorMessage(data.error || "Failed to send message. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Failed to send message. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-emerald-400" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">Message Sent!</h3>
        <p className="text-slate-400 mb-6">
          Thank you for reaching out. We'll get back to you as soon as possible.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="text-emerald-400 hover:text-emerald-300"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-slate-400 text-sm mb-2">
            Name <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled={status === "loading"}
            className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-2.5 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent disabled:opacity-50"
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-slate-400 text-sm mb-2">
            Email <span className="text-red-400">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={status === "loading"}
            className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-2.5 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent disabled:opacity-50"
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="block text-slate-400 text-sm mb-2">
          Subject
        </label>
        <select
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          disabled={status === "loading"}
          className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent disabled:opacity-50"
        >
          {subjectOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-slate-400 text-sm mb-2">
          Message <span className="text-red-400">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          disabled={status === "loading"}
          rows={5}
          className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-2.5 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent disabled:opacity-50 resize-none"
          placeholder="How can we help you?"
        />
      </div>

      {status === "error" && (
        <div className="flex items-center gap-2 text-red-400 bg-red-500/10 px-4 py-3 rounded-lg">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span className="text-sm">{errorMessage}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Sending...
          </>
        ) : (
          "Send Message"
        )}
      </button>

      <p className="text-slate-500 text-xs text-center">
        We typically respond within 1-2 business days.
      </p>
    </form>
  );
}
