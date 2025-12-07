import { sanityClient } from "@/lib/sanity/client";

const REVALIDATE_TIME =
  process.env.NODE_ENV === "production"
    ? Number(process.env.REVALIDATE_TIME) || 3600
    : 0;

export async function getSettingsData(): Promise<SettingsType | null> {
  const query = `*[_type == "settings"][0]{
    email,
    phone,
    twitter,
    linkedin,
    tiktok,
    telegram,
    snapchat,
    whatsapp,
    facebook,
    youtube,
    instagram
  }`;

  try {
    return await sanityClient.fetch(
      query,
      {},
      {
        next: {
          revalidate: REVALIDATE_TIME,
          tags: ["settings"],
        },
      }
    );
  } catch (error) {
    console.error("Error fetching settings data:", error);
    return null;
  }
}
