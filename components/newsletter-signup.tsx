"use client";

import { toast } from "@heroui/react";
import { useState } from "react";
import { HiArrowLeft } from "react-icons/hi2";

import {
  type SubscribeState,
  subscribeNewsletterAction,
} from "@/lib/newsletter-actions";

export function NewsletterSignup() {
  const [pending, setPending] = useState(false);
  const [state, setState] = useState<SubscribeState>({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    try {
      const next = await subscribeNewsletterAction(
        {},
        new FormData(e.currentTarget),
      );
      if (next.error) toast(next.error, { variant: "danger" });
      else if (next.message) toast.success(next.message);
      setState(next);
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="max-w-sm">
      <p className="text-sm font-bold">النشرة البريدية</p>
      <p className="text-muted mt-1 text-sm leading-7">
        اشترك ليصلك جديد المقالات.
      </p>
      <form
        className="border-border bg-surface mt-3 flex items-stretch border"
        onSubmit={handleSubmit}
      >
        <input
          type="email"
          required
          name="newsletter_email"
          placeholder="بريدك الإلكتروني"
          aria-label="بريدك الإلكتروني"
          className="text-foreground placeholder:text-muted min-w-0 flex-1 bg-transparent px-3 py-2.5 text-sm outline-none"
        />
        <input
          type="text"
          name="honeypot"
          autoComplete="off"
          tabIndex={-1}
          aria-hidden="true"
          className="hidden"
        />
        <button
          type="submit"
          disabled={pending}
          aria-label="اشترك في النشرة البريدية"
          className="bg-accent flex w-11 shrink-0 cursor-pointer items-center justify-center text-white transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          <HiArrowLeft className="size-4" aria-hidden="true" />
        </button>
      </form>
      {state.message ? (
        <p className="text-accent mt-2 text-sm font-bold">{state.message}</p>
      ) : null}
      {state.error ? (
        <p className="text-danger mt-2 text-sm font-bold">{state.error}</p>
      ) : null}
      {state.fieldErrors?.email ? (
        <p className="text-danger mt-2 text-sm font-bold">
          {state.fieldErrors.email}
        </p>
      ) : null}
    </div>
  );
}
