"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { TextEffect } from "@/components/ui/text-effect";
import { addToast, Button, Card, Input, Textarea } from "@heroui/react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { MdMarkEmailRead } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { FaMapLocationDot } from "react-icons/fa6";
import Link from "next/link";

interface FormDataType {
  name: string;
  email?: string;
  phone?: string;
  message: string;
}

interface ContactComponentProps extends React.ComponentProps<"div"> {
  settings: SettingsType | null;
}

const ContactComponent = ({
  className,
  settings,
  ...props
}: ContactComponentProps) => {
  const t = useTranslations("Contact");
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormDataType>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleInputChange = (field: keyof FormDataType, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        addToast({
          title: t("messages.success.title"),
          description: t("messages.success.description"),
          color: "success",
        });

        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        });

        router.push("/thank-you");
      } else {
        throw new Error(t("messages.error.title"));
      }
    } catch (error) {
      addToast({
        title: t("messages.error.title"),
        description: t("messages.error.description"),
        color: "danger",
      });
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-8", className)} {...props}>
      <TextEffect
        per="word"
        as="h1"
        preset="blur"
        speedReveal={0.3}
        speedSegment={0.3}
        className="text-primary-blue mx-auto text-4xl font-semibold lg:text-7xl"
      >
        {t("title")}
      </TextEffect>

      <Card className="mx-auto w-full max-w-120 p-4 shadow-2xl shadow-zinc-300 dark:shadow-zinc-900">
        <div className="grid grid-cols-2 gap-2 lg:gap-4">
          <div className="flex flex-col items-start gap-1">
            <FaPhone className="text-blue-700" />

            <div className="flex flex-col">
              {settings?.phones?.map((phone, i) => (
                <Link href={`tel:${phone}`} key={i}>
                  {phone}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-start gap-1">
            <MdMarkEmailRead className="text-blue-700" />

            <div className="flex flex-col">
              {settings?.emails?.map((email, i) => (
                <Link href={`mailto:${email}`} key={i}>
                  {email}
                </Link>
              ))}
            </div>
          </div>
          <div className="col-span-2 flex items-center gap-1">
            <FaMapLocationDot className="text-blue-700" />

            <div>{settings?.location}</div>
          </div>
        </div>
      </Card>

      <Card className="mx-auto w-full max-w-120 p-4 shadow-2xl shadow-zinc-300 dark:shadow-zinc-900">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <Input
            label={t("form.name")}
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            required
          />
          <Input
            label={t("form.email")}
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
          />
          <Input
            label={t("form.phone")}
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
          />
          <Textarea
            label={t("form.message")}
            minRows={4}
            value={formData.message}
            onChange={(e) => handleInputChange("message", e.target.value)}
            required
          />
          <Button
            type="submit"
            className="from-primary-blue/70 to-primary-blue bg-linear-to-tr text-white"
            disabled={isLoading}
            isLoading={isLoading}
          >
            {!isLoading && t("form.button")}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default ContactComponent;
