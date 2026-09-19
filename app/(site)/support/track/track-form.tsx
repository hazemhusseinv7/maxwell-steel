"use client";

import {
  Button,
  Chip,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  toast,
} from "@heroui/react";
import { useRef, useState } from "react";
import {
  HiArrowRight,
  HiChatBubbleOvalLeft,
  HiClock,
  HiEnvelope,
  HiMagnifyingGlass,
  HiPhone,
  HiTicket,
} from "react-icons/hi2";

import { CornerFrame } from "@/components/corner-frame";
import { ImageLightbox } from "@/components/image-lightbox";
import { TicketStatusBadge } from "@/components/ticket-badge";
import { usePersistentState } from "@/hooks/use-persistent-state";
import { TICKET_PRIORITIES } from "@/lib/constants";
import {
  formatCountAr,
  formatDateTimeAr,
  TICKET_FORMS,
} from "@/lib/formatters";
import { fieldErrorsFromIssues, trackTicketSchema } from "@/lib/ticket-schemas";
import type { TicketListItem } from "@/lib/tickets";
import { type TrackState, trackTicketAction } from "./actions";

const inputClass =
  "w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:border-accent focus:outline-none";

function priorityColor(
  priority: string,
): "accent" | "success" | "warning" | "danger" {
  switch (priority) {
    case "low":
      return "accent";
    case "medium":
      return "warning";
    default:
      return "danger";
  }
}

export function TrackForm({ initialRef }: { initialRef: string }) {
  const [state, setState] = useState<TrackState>({});
  const [pending, setPending] = useState(false);
  const [method, setMethod] = usePersistentState<"email" | "phone">(
    "maqrat:track-method",
    "phone",
  );
  const [reference, setReference] = usePersistentState(
    "maqrat:track-ref",
    initialRef,
  );
  const [contact, setContact] = usePersistentState("maqrat:track-contact", "");
  const [savedList, setSavedList] = useState<TicketListItem[] | null>(null);
  const lastError = useRef<string | null>(null);

  function fail(next: TrackState) {
    if (next.error && next.error !== lastError.current) {
      lastError.current = next.error;
      toast(next.error, { variant: "danger" });
    }
    setState(next);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const pre = trackTicketSchema.safeParse({ method, reference, contact });
    if (!pre.success) {
      fail(fieldErrorsFromIssues(pre.error.issues, []));
      return;
    }
    setSavedList(null);
    setPending(true);
    try {
      fail(await trackTicketAction({}, new FormData(e.currentTarget)));
    } finally {
      setPending(false);
    }
  }

  async function drillTo(nextReference: string) {
    setReference(nextReference);
    const pre = trackTicketSchema.safeParse({
      method,
      reference: nextReference,
      contact,
    });
    if (!pre.success) {
      fail(fieldErrorsFromIssues(pre.error.issues, []));
      return;
    }
    if (state.tickets) setSavedList(state.tickets);
    const fd = new FormData();
    fd.set("method", method);
    fd.set("reference", nextReference);
    fd.set("contact", contact);
    setPending(true);
    try {
      fail(await trackTicketAction({}, fd));
    } finally {
      setPending(false);
    }
  }

  function backToList() {
    if (!savedList) return;
    lastError.current = null;
    setState({ tickets: savedList });
  }
  const ticket = state.ticket;
  const isEmail = method === "email";

  return (
    <div className="space-y-6">
      <CornerFrame>
        <Form
          onSubmit={handleSubmit}
          validationBehavior="aria"
          validationErrors={state.fieldErrors}
          className="texture-panel border-border bg-surface-secondary shadow-surface card-gradient space-y-4 rounded-none border p-4"
        >
          <input type="hidden" name="method" value={method} />
          <ToggleButtonGroup
            selectionMode="single"
            disallowEmptySelection
            selectedKeys={[method]}
            onSelectionChange={(keys) => {
              const next = [...keys][0];
              if (next === "email" || next === "phone") setMethod(next);
            }}
            aria-label="طريقة التتبع"
          >
            <ToggleButton id="phone">
              <HiPhone className="size-4" aria-hidden="true" />
              جوال
            </ToggleButton>
            <ToggleButton id="email">
              <HiEnvelope className="size-4" aria-hidden="true" />
              بريد إلكتروني
            </ToggleButton>
          </ToggleButtonGroup>
          <div className="grid gap-4 sm:grid-cols-[1fr_1fr_auto]">
            <TextField
              name="reference"
              value={reference}
              onChange={setReference}
            >
              <Label>
                <span className="inline-flex items-center gap-1.5">
                  <HiTicket
                    className="size-4 shrink-0 text-bronze"
                    aria-hidden="true"
                  />
                  رقم المرجع (اختياري)
                </span>
              </Label>
              <Input
                dir="ltr"
                placeholder="TKT-XXXXXX"
                className={inputClass}
              />
              <FieldError className="text-danger text-sm" />
            </TextField>
            <TextField
              name="contact"
              value={contact}
              onChange={setContact}
              isRequired
            >
              <Label>
                <span className="inline-flex items-center gap-1.5">
                  {isEmail ? (
                    <HiEnvelope
                      className="size-4 shrink-0 text-bronze"
                      aria-hidden="true"
                    />
                  ) : (
                    <HiPhone
                      className="size-4 shrink-0 text-bronze"
                      aria-hidden="true"
                    />
                  )}
                  {isEmail ? "البريد الإلكتروني" : "رقم الجوال"}
                </span>
              </Label>
              <Input
                type={isEmail ? "email" : "tel"}
                dir="ltr"
                placeholder={isEmail ? "you@example.com" : "05xxxxxxxx"}
                className={inputClass}
              />
              <FieldError className="text-danger text-sm" />
            </TextField>
            <div className="flex items-end">
              <Button type="submit" variant="primary" isDisabled={pending}>
                <HiMagnifyingGlass className="size-4" aria-hidden="true" />
                {pending ? "جارٍ البحث…" : "بحث"}
              </Button>
            </div>
          </div>
        </Form>
      </CornerFrame>

      {state.error && Object.keys(state.fieldErrors ?? {}).length === 0 ? (
        <FieldError className="text-danger text-sm">{state.error}</FieldError>
      ) : null}

      {state.tickets ? (
        <CornerFrame>
          <div className="texture-panel border-border shadow-surface card-gradient space-y-3 rounded-none border p-5">
            <p className="text-muted text-sm">
              {formatCountAr(state.tickets.length, TICKET_FORMS)}
            </p>
            <ul className="space-y-2">
              {state.tickets.map((t) => (
                <li key={t._id}>
                  <button
                    type="button"
                    onClick={() => drillTo(t.reference)}
                    disabled={pending}
                    className="border-border bg-surface-secondary hover:border-accent flex w-full cursor-pointer flex-col gap-1 rounded-none border p-3 text-start transition-colors disabled:opacity-50"
                  >
                    <span className="flex flex-wrap items-center gap-2">
                      <span
                        dir="ltr"
                        className="text-accent font-mono text-sm font-bold"
                      >
                        {t.reference}
                      </span>
                      <TicketStatusBadge status={t.status} />
                    </span>
                    <span className="line-clamp-1 text-sm">{t.subject}</span>
                    <span className="text-muted text-xs">
                      <time dateTime={t._createdAt}>
                        {formatDateTimeAr(t._createdAt)}
                      </time>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </CornerFrame>
      ) : null}

      {ticket ? (
        <CornerFrame>
          {savedList ? (
            <div className="mb-3">
              <button
                type="button"
                onClick={backToList}
                className="text-accent hover:text-accent/80 inline-flex cursor-pointer items-center gap-1.5 text-sm font-bold transition-colors"
              >
                <HiArrowRight className="size-4 shrink-0" aria-hidden="true" />
                عودة إلى النتائج
              </button>
            </div>
          ) : null}
          <article className="texture-panel border-border shadow-surface card-gradient space-y-6 rounded-none border p-5">
            <div className="flex flex-wrap items-center gap-2">
              <TicketStatusBadge status={ticket.status} />
              <Chip color={priorityColor(ticket.priority)} variant="soft">
                الأولوية:{" "}
                {TICKET_PRIORITIES.find((p) => p.value === ticket.priority)
                  ?.label ?? ticket.priority}
              </Chip>
            </div>
            <div>
              <h2 className="font-display text-xl font-bold">
                {ticket.subject}
              </h2>
              <p className="text-muted mt-1 text-sm">
                <span dir="ltr">{ticket.reference}</span> ·{" "}
                <time>{formatDateTimeAr(ticket._createdAt)}</time>
              </p>
              <p className="mt-3 leading-8 whitespace-pre-wrap">
                {ticket.description}
              </p>
            </div>

            {ticket.attachments.length > 0 ? (
              <div>
                <h3 className="font-bold">المرفقات</h3>
                <ul className="mt-2 flex flex-wrap gap-3">
                  {ticket.attachments.map((url, i) => (
                    <li key={url}>
                      <ImageLightbox src={url} alt={`مرفق ${i + 1}`} />
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {ticket.replies.length > 0 ? (
              <div>
                <h3 className="flex items-center gap-1.5 font-bold">
                  <HiChatBubbleOvalLeft
                    className="text-muted size-4"
                    aria-hidden="true"
                  />
                  ردود الدعم
                </h3>
                <ul className="mt-2 space-y-3">
                  {ticket.replies.map((r, i) => (
                    <li
                      key={`${r.createdAt}-${i}`}
                      className="bg-surface-secondary rounded-none p-3"
                    >
                      <p className="leading-7 whitespace-pre-wrap">{r.body}</p>
                      <p className="text-muted mt-1 text-xs">
                        {r.authorName} · {formatDateTimeAr(r.createdAt)}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div>
              <h3 className="flex items-center gap-1.5 font-bold">
                <HiClock className="text-muted size-4" aria-hidden="true" />
                الجدول الزمني
              </h3>
              <ol className="border-border mt-2 space-y-2 border-s-2 ps-4">
                {ticket.events.map((e, i) => (
                  <li key={`${e.createdAt}-${i}`} className="text-sm">
                    <p>{e.label}</p>
                    <p className="text-muted text-xs">
                      {formatDateTimeAr(e.createdAt)}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </article>
        </CornerFrame>
      ) : null}
    </div>
  );
}
