import ContactButtonComponent from "./ContactButtonComponent";

import { getSettingsData } from "@/lib/sanity/queries";

const ContactButton = async () => {
  const settings: SettingsType | null = await getSettingsData();

  if (!settings?.whatsapp) return null;

  return <ContactButtonComponent whatsapp={settings?.whatsapp} />;
};

export default ContactButton;
