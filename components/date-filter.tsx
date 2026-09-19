"use client";

import { Calendar, DateField, DatePicker, Label } from "@heroui/react";
import { parseDate } from "@internationalized/date";
import type { ReactNode } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

interface Props {
  name: string;
  label: ReactNode;
  ariaLabel: string;
  defaultValue: string;
}

export function DateFilter({ name, label, ariaLabel, defaultValue }: Props) {
  return (
    <div className="min-w-0">
      <DatePicker
        name={name}
        granularity="day"
        defaultValue={defaultValue ? parseDate(defaultValue) : undefined}
        className="w-full min-w-0"
      >
        <Label>{label}</Label>
        <DateField.Group className="w-full min-w-0">
          <DateField.InputContainer className="w-full min-w-0">
            <DateField.Input className="w-full min-w-0 gap-0 px-2 text-[13px]">
              {(segment) => <DateField.Segment segment={segment} />}
            </DateField.Input>
          </DateField.InputContainer>
          <DatePicker.Trigger aria-label={ariaLabel}>
            <DatePicker.TriggerIndicator />
          </DatePicker.Trigger>
        </DateField.Group>
        <DatePicker.Popover>
          <Calendar aria-label={ariaLabel} firstDayOfWeek="sat">
            <Calendar.Header>
              <Calendar.NavButton slot="previous" aria-label="الشهر السابق">
                <HiChevronRight className="size-4" aria-hidden="true" />
              </Calendar.NavButton>
              <Calendar.Heading />
              <Calendar.NavButton slot="next" aria-label="الشهر التالي">
                <HiChevronLeft className="size-4" aria-hidden="true" />
              </Calendar.NavButton>
            </Calendar.Header>
            <Calendar.Grid weekdayStyle="narrow">
              <Calendar.GridHeader>
                {(day) => <Calendar.HeaderCell>{day}</Calendar.HeaderCell>}
              </Calendar.GridHeader>
              <Calendar.GridBody>
                {(date) => <Calendar.Cell date={date} />}
              </Calendar.GridBody>
            </Calendar.Grid>
          </Calendar>
        </DatePicker.Popover>
      </DatePicker>
    </div>
  );
}
