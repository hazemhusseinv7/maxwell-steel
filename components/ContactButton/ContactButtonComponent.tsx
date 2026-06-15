"use client";

import { Button } from "@heroui/react";

import { FaWhatsapp } from "react-icons/fa6";

const ContactButtonComponent = ({ whatsapp }: { whatsapp: string }) => {
  return (
    <Button
      as="a"
      href={whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      endContent={<FaWhatsapp className="size-9 text-white" />}
      className="fixed start-4 bottom-4 z-50 min-w-0 bg-[#25D366] p-0 w-14 h-13"
      aria-label="Contact us on WhatsApp"
    />
  );
};

export default ContactButtonComponent;
