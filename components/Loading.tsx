"use client";

import { Spinner } from "@heroui/react";

import { cn } from "@/lib/utils";

const Loading = ({
  id,
  as: Tag = "section",
  className,
}: {
  id?: string;
  as?: React.ElementType;
  className?: string;
}) => {
  return (
    <Tag id={id} className={cn(className, "flex items-center justify-center")}>
      <Spinner />
    </Tag>
  );
};

export default Loading;
