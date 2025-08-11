"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";

export default function ContactForm() {
  const t = useTranslations("contact");
  const [state, setState] = useState({ loading: false, ok: null, error: null });

  async function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;

    // Let the browser do required/minLength checks first
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const data = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      message: form.message.value.trim(),
      company: form.company.value.trim(), // honeypot
    };

    try {
      setState({ loading: true, ok: null, error: null });
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();

      if (!res.ok || !json.ok) {
        // If server sent validation feedback, show a generic error for now
        setState({ loading: false, ok: null, error: t("errors.submit") });
        return;
      }

      setState({ loading: false, ok: true, error: null });
      form.reset();
    } catch {
      setState({ loading: false, ok: null, error: t("errors.submit") });
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 max-w-xl">
      {/* Honeypot (hidden) */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div>
        <label htmlFor="name" className="block text-sm mb-1">
          {t("name")}
        </label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder={t("namePh")}
          required
          minLength={2}
          className="h-11 w-full rounded-md border bg-transparent px-3"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm mb-1">
          {t("email")}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder={t("emailPh")}
          required
          className="h-11 w-full rounded-md border bg-transparent px-3"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm mb-1">
          {t("message")}
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          placeholder={t("messagePh")}
          required
          minLength={5}
          className="w-full rounded-md border bg-transparent p-3"
        />
      </div>

      <button
        type="submit"
        disabled={state.loading}
        className="px-4 h-11 rounded-lg border hover:bg-gray-100 dark:hover:bg-zinc-800"
      >
        {state.loading ? t("sending") : t("send")}
      </button>

      {state.ok && <p className="text-sm text-green-600">{t("success")}</p>}
      {state.error && <p className="text-sm text-red-600">{state.error}</p>}
    </form>
  );
}
