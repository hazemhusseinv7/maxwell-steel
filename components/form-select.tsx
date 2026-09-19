"use client";

import { type Key, Label, ListBox, Select } from "@heroui/react";
import type { ReactNode } from "react";

export interface SelectOption {
  value: string;
  label: string;
  icon?: ReactNode;
}

interface BaseProps {
  name: string;
  label: ReactNode;
  options: SelectOption[];
  defaultValue?: string;
  value?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  onChange?: (key: Key | null) => void;
  onSelectionChange?: (key: Key | null) => void;
}

function OptionList({ options }: { options: SelectOption[] }) {
  return (
    <ListBox>
      {options.map((o) => (
        <ListBox.Item key={o.value} id={o.value} textValue={o.label}>
          <span className="flex items-center gap-2">
            {o.icon}
            <span>{o.label}</span>
          </span>
          <ListBox.ItemIndicator />
        </ListBox.Item>
      ))}
    </ListBox>
  );
}

export function FormSelect({
  name,
  label,
  options,
  defaultValue,
  value,
  placeholder = "اختر…",
  required,
  disabled,
  onChange,
  onSelectionChange,
}: BaseProps) {
  return (
    <Select
      name={name}
      defaultValue={value === undefined ? defaultValue : undefined}
      selectedKey={value}
      isRequired={required}
      isDisabled={disabled}
      onChange={onChange}
      onSelectionChange={onSelectionChange}
      placeholder={placeholder}
      fullWidth
    >
      <Label>{label}</Label>
      <Select.Trigger>
        <Select.Value />
        <Select.Indicator />
      </Select.Trigger>
      <Select.Popover>
        <OptionList options={options} />
      </Select.Popover>
    </Select>
  );
}

export function FilterSelect({
  allLabel = "الكل",
  ...props
}: Omit<BaseProps, "label" | "value" | "onSelectionChange"> & {
  allLabel?: string;
  label: ReactNode;
  ariaLabel?: string;
}) {
  const accessibleName =
    props.ariaLabel ?? (typeof props.label === "string" ? props.label : "");
  return (
    <Select
      name={props.name}
      defaultValue={props.defaultValue ?? "all"}
      isDisabled={props.disabled}
      onChange={props.onChange}
      placeholder={props.placeholder ?? allLabel}
      fullWidth
      aria-label={accessibleName}
    >
      <Label>{props.label}</Label>
      <Select.Trigger>
        <Select.Value />
        <Select.Indicator />
      </Select.Trigger>
      <Select.Popover>
        <OptionList
          options={[{ value: "all", label: allLabel }, ...props.options]}
        />
      </Select.Popover>
    </Select>
  );
}
