"use client";

import { UserButton } from "@clerk/nextjs";
import { FaPaperPlane } from "react-icons/fa6";
import { HiHome, HiNewspaper } from "react-icons/hi2";
import { clerkAppearance } from "@/lib/clerk-appearance";

export function NavUser() {
  return (
    <span className="flex size-8 shrink-0 items-center justify-center">
      <UserButton
        appearance={clerkAppearance}
        userProfileProps={{ appearance: clerkAppearance }}
      >
        <UserButton.MenuItems>
          <UserButton.Link
            label="إدارة المدونة"
            labelIcon={<HiNewspaper />}
            href="/admin"
          />
          <UserButton.Link label="عرض الموقع" labelIcon={<HiHome />} href="/" />
          <UserButton.Link
            label="إرسال تذكرة"
            labelIcon={<FaPaperPlane />}
            href="/support/submit"
          />
        </UserButton.MenuItems>
      </UserButton>
    </span>
  );
}
