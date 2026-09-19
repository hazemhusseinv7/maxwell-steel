"use client";

import {
  Button,
  FieldError,
  Label,
  TextArea,
  TextField,
  toast,
} from "@heroui/react";
import { useActionState, useEffect, useState } from "react";
import { FormSelect } from "@/components/form-select";
import { TICKET_STATUSES } from "@/lib/constants";
import { ADMIN_ICON, TICKET_STATUS_ICONS } from "@/lib/option-icons";
import {
  type AdminUser,
  addNoteAction,
  addReplyAction,
  assignTicketAction,
  updateStatusAction,
} from "./actions";

const inputClass =
  "w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:border-accent focus:outline-none";

function useBoundAction(
  action: (
    prev: { error?: string; ok?: boolean },
    fd: FormData,
  ) => Promise<{ error?: string; ok?: boolean }>,
  okMessage?: string,
) {
  const [state, formAction, pending] = useActionState(action, {});
  useEffect(() => {
    if (state.ok && okMessage) toast.success(okMessage);
  }, [state, okMessage]);
  return [state, formAction, pending] as const;
}

export function StatusForm({ id, current }: { id: string; current: string }) {
  const [state, action, pending] = useBoundAction(
    updateStatusAction.bind(null, id),
    "تم تحديث الحالة",
  );
  return (
    <form action={action} className="flex items-end gap-2">
      <div className="flex-1">
        <FormSelect
          name="status"
          label="الحالة"
          defaultValue={current}
          options={TICKET_STATUSES.map((s) => ({
            value: s.value,
            label: s.label,
            icon: TICKET_STATUS_ICONS[s.value],
          }))}
        />
      </div>
      <Button
        type="submit"
        variant="primary"
        isDisabled={pending}
        className="min-w-20"
      >
        حفظ
      </Button>
      {state.error ? (
        <FieldError className="text-danger text-sm">{state.error}</FieldError>
      ) : null}
    </form>
  );
}

export function AssignForm({
  id,
  admins,
}: {
  id: string;
  admins: AdminUser[];
}) {
  const [state, action, pending] = useBoundAction(
    assignTicketAction.bind(null, id),
    "تم تعيين التذكرة",
  );
  const [selectedName, setSelectedName] = useState(admins[0]?.name ?? "");
  return (
    <form action={action} className="flex items-end gap-2">
      <input type="hidden" name="name" value={selectedName} readOnly />
      <div className="flex-1">
        <FormSelect
          name="clerkId"
          label="تعيين إلى"
          defaultValue={admins[0]?.clerkId}
          disabled={admins.length === 0}
          onChange={(key) => {
            const admin = admins.find((a) => a.clerkId === String(key));
            setSelectedName(admin?.name ?? "");
          }}
          options={admins.map((a) => ({
            value: a.clerkId,
            label: a.name,
            icon: ADMIN_ICON,
          }))}
        />
      </div>
      <Button
        type="submit"
        variant="outline"
        isDisabled={pending || admins.length === 0}
        className="min-w-20"
      >
        تعيين
      </Button>
      {state.error ? (
        <FieldError className="text-danger text-sm">{state.error}</FieldError>
      ) : null}
    </form>
  );
}

export function ReplyForm({ id }: { id: string }) {
  const [state, action, pending] = useBoundAction(
    addReplyAction.bind(null, id),
    "تم إرسال الرد",
  );
  return (
    <form
      action={action}
      className="space-y-2"
      key={state.ok ? "sent" : "idle"}
    >
      <TextField name="body" isRequired>
        <Label>رد عام (يراه مقدّم الطلب)</Label>
        <TextArea rows={3} className={inputClass} />
      </TextField>
      {state.error ? (
        <FieldError className="text-danger text-sm">{state.error}</FieldError>
      ) : null}
      <Button
        type="submit"
        variant="primary"
        isDisabled={pending}
        className="w-full"
      >
        {pending ? "جارٍ الإرسال…" : "إرسال الرد"}
      </Button>
    </form>
  );
}

export function NoteForm({ id }: { id: string }) {
  const [state, action, pending] = useBoundAction(
    addNoteAction.bind(null, id),
    "تم حفظ الملاحظة",
  );
  return (
    <form
      action={action}
      className="space-y-2"
      key={state.ok ? "sent" : "idle"}
    >
      <TextField name="body" isRequired>
        <Label>ملاحظة داخلية (للإدارة فقط)</Label>
        <TextArea rows={3} className={inputClass} />
      </TextField>
      {state.error ? (
        <FieldError className="text-danger text-sm">{state.error}</FieldError>
      ) : null}
      <Button
        type="submit"
        variant="primary"
        isDisabled={pending}
        className="bg-gold hover:bg-gold/80 w-full"
      >
        {pending ? "جارٍ الحفظ…" : "حفظ الملاحظة"}
      </Button>
    </form>
  );
}
