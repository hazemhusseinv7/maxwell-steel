"use client";

import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextArea,
  TextField,
  toast,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FaPaperPlane } from "react-icons/fa6";
import {
  HiDocumentText,
  HiEnvelope,
  HiFlag,
  HiPencilSquare,
  HiPhone,
  HiPhoto,
  HiTag,
  HiUser,
} from "react-icons/hi2";

import { CornerFrame } from "@/components/corner-frame";
import { FormSelect } from "@/components/form-select";
import { ScreenshotUploader } from "@/components/screenshot-uploader";
import { usePersistentState } from "@/hooks/use-persistent-state";
import { TICKET_CATEGORIES, TICKET_PRIORITIES } from "@/lib/constants";
import {
  TICKET_CATEGORY_ICONS,
  TICKET_PRIORITY_ICONS,
} from "@/lib/option-icons";
import {
  fieldErrorsFromIssues,
  submitTicketSchema,
} from "@/lib/ticket-schemas";
import { type SubmitState, submitTicketAction } from "./actions";

const inputClass =
  "w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:border-accent focus:outline-none";

const EMPTY = {
  name: "",
  phone: "",
  email: "",
  subject: "",
  category: "general",
  priority: "medium",
  description: "",
};

type FieldKey = keyof typeof EMPTY;

const LABEL_ICON = "size-4 shrink-0 text-bronze";

function FieldLabel({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <span className="inline-flex items-center gap-1.5">
      {icon}
      {children}
    </span>
  );
}

export function SubmitForm({ fresh }: { fresh?: boolean }) {
  const [state, setState] = useState<SubmitState>({});
  const [pending, setPending] = useState(false);
  const [values, setValues] = usePersistentState<Record<FieldKey, string>>(
    "maqrat:submit",
    EMPTY,
  );
  const router = useRouter();
  const freshDone = useRef(false);

  useEffect(() => {
    if (fresh && !freshDone.current) {
      freshDone.current = true;
      setValues(EMPTY);
      router.replace("/support/submit", { scroll: false });
    }
  }, [fresh, router, setValues]);
  const lastError = useRef<string | null>(null);

  function fail(next: SubmitState) {
    if (next.error && next.error !== lastError.current) {
      lastError.current = next.error;
      toast(next.error, { variant: "danger" });
    }
    setState(next);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const pre = submitTicketSchema.safeParse({
      name: values.name,
      phone: values.phone,
      email: values.email.trim() === "" ? undefined : values.email,
      subject: values.subject,
      category: values.category,
      priority: values.priority,
      description: values.description,
      honeypot: "",
    });
    if (!pre.success) {
      fail(fieldErrorsFromIssues(pre.error.issues));
      return;
    }
    setPending(true);
    try {
      const res = await submitTicketAction({}, new FormData(e.currentTarget));
      fail(res);
    } finally {
      setPending(false);
    }
  }

  function set<K extends FieldKey>(key: K, value: string) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <CornerFrame>
      <Form
        onSubmit={handleSubmit}
        validationBehavior="aria"
        validationErrors={state.fieldErrors}
        className="texture-panel border-border bg-surface shadow-surface card-gradient space-y-5 rounded-none border p-5"
      >
        {/* Honeypot: invisible to humans, traps bots */}
        <input
          type="text"
          name="honeypot"
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden="true"
        />

        <div className="grid gap-5 sm:grid-cols-2">
          <TextField
            name="name"
            value={values.name}
            onChange={(v) => set("name", v)}
            isRequired
          >
            <Label>
              <FieldLabel
                icon={<HiUser className={LABEL_ICON} aria-hidden="true" />}
              >
                الاسم
              </FieldLabel>
            </Label>
            <Input placeholder="الاسم" className={inputClass} />
            <FieldError className="text-danger text-sm" />
          </TextField>
          <TextField
            name="phone"
            value={values.phone}
            onChange={(v) => set("phone", v)}
            isRequired
          >
            <Label>
              <FieldLabel
                icon={<HiPhone className={LABEL_ICON} aria-hidden="true" />}
              >
                رقم الجوال
              </FieldLabel>
            </Label>
            <Input
              type="tel"
              dir="ltr"
              placeholder="05xxxxxxxx"
              className={inputClass}
            />
            <FieldError className="text-danger text-sm" />
          </TextField>
        </div>

        <TextField
          name="email"
          value={values.email}
          onChange={(v) => set("email", v)}
        >
          <Label>
            <FieldLabel
              icon={<HiEnvelope className={LABEL_ICON} aria-hidden="true" />}
            >
              البريد الإلكتروني (اختياري لاستلام التنبيهات)
            </FieldLabel>
          </Label>
          <Input
            type="email"
            dir="ltr"
            placeholder="you@example.com"
            className={inputClass}
          />
          <FieldError className="text-danger text-sm" />
        </TextField>

        <TextField
          name="subject"
          value={values.subject}
          onChange={(v) => set("subject", v)}
          isRequired
        >
          <Label>
            <FieldLabel
              icon={
                <HiPencilSquare className={LABEL_ICON} aria-hidden="true" />
              }
            >
              الموضوع
            </FieldLabel>
          </Label>
          <Input placeholder="عنوان مختصر للمشكلة" className={inputClass} />
          <FieldError className="text-danger text-sm" />
        </TextField>

        <div className="grid gap-5 sm:grid-cols-2">
          <FormSelect
            name="category"
            label={
              <FieldLabel
                icon={<HiTag className={LABEL_ICON} aria-hidden="true" />}
              >
                التصنيف
              </FieldLabel>
            }
            required
            value={values.category}
            onSelectionChange={(k) => set("category", String(k ?? "general"))}
            options={TICKET_CATEGORIES.map((c) => ({
              value: c.value,
              label: c.label,
              icon: TICKET_CATEGORY_ICONS[c.value],
            }))}
          />
          <FormSelect
            name="priority"
            label={
              <FieldLabel
                icon={<HiFlag className={LABEL_ICON} aria-hidden="true" />}
              >
                الأولوية
              </FieldLabel>
            }
            required
            value={values.priority}
            onSelectionChange={(k) => set("priority", String(k ?? "medium"))}
            options={TICKET_PRIORITIES.map((p) => ({
              value: p.value,
              label: p.label,
              icon: TICKET_PRIORITY_ICONS[p.value],
            }))}
          />
        </div>

        <TextField
          name="description"
          value={values.description}
          onChange={(v) => set("description", v)}
          isRequired
        >
          <Label>
            <FieldLabel
              icon={
                <HiDocumentText className={LABEL_ICON} aria-hidden="true" />
              }
            >
              وصف المشكلة
            </FieldLabel>
          </Label>
          <TextArea
            rows={6}
            placeholder="اشرح المشكلة بالتفصيل: ماذا حدث؟ ومتى؟"
            className={inputClass}
          />
          <FieldError className="text-danger text-sm" />
        </TextField>

        <div>
          <Label htmlFor="screenshots">
            <FieldLabel
              icon={<HiPhoto className={LABEL_ICON} aria-hidden="true" />}
            >
              لقطات شاشة (حتى ١٠ صور، ١٠ م.ب لكل صورة)
            </FieldLabel>
          </Label>
          <div className="mt-2">
            <ScreenshotUploader formPending={pending} />
          </div>
        </div>

        {state.error && Object.keys(state.fieldErrors ?? {}).length === 0 ? (
          <p role="alert" className="text-danger text-sm">
            {state.error}
          </p>
        ) : null}

        <Button
          type="submit"
          variant="primary"
          size="lg"
          isDisabled={pending}
          fullWidth
        >
          <FaPaperPlane className="size-4" aria-hidden="true" />
          {pending ? "جارٍ الإرسال…" : "إرسال التذكرة"}
        </Button>
      </Form>
    </CornerFrame>
  );
}
