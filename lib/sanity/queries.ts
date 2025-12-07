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

export async function getHeroData(
  lang: string = "en"
): Promise<HeroType | null> {
  const query = `*[_type == "main"][0]{
    "title": title[_key == $lang][0].value,
    image {
      asset-> {
        _id,
        url,
        metadata {
          dimensions
        }
      }
    },
    certificateBadge {
      asset-> {
        _id,
        url,
        metadata {
          dimensions
        }
      }
    }
  }`;

  try {
    return await sanityClient.fetch(
      query,
      { lang },
      {
        next: { revalidate: REVALIDATE_TIME, tags: ["main"] },
      }
    );
  } catch (error) {
    console.error("Error fetching hero data:", error);
    return null;
  }
}

export async function getRiskAdvantageData(
  lang: string = "en"
): Promise<RiskAdvantageType | null> {
  const query = `*[_type == "riskAdvantage"][0]{
    "title": title[_key == $lang][0].value,
    "cards": cards[] {
      "title": title[_key == $lang][0].value,
      "description": description[].item[_key == $lang][0].value,
      image {
        asset-> {
          _id,
          url,
          metadata {
            dimensions
          }
        }
      }
    }
  }`;

  try {
    return await sanityClient.fetch(
      query,
      { lang },
      {
        next: { revalidate: REVALIDATE_TIME, tags: ["riskAdvantage"] },
      }
    );
  } catch (error) {
    console.error("Error fetching risk advantage data:", error);
    return null;
  }
}

export async function getAboutUsData(
  lang: string = "en"
): Promise<AboutUsType | null> {
  const query = `*[_type == "aboutUs"][0]{
    "title": title[_key == $lang][0].value,
    heroImage {
      asset-> {
        _id,
        url,
        metadata {
          dimensions
        }
      }
    },
    "heading": heading[_key == $lang][0].value,
    "subheading": subheading[_key == $lang][0].value,
    "content": select(
      $lang == "en" => contentEn,
      $lang == "ar" => contentAr
    ),
    leftTopStat {
      "value": value[_key == $lang][0].value,
      "label": label[_key == $lang][0].value
    },
    leftBottomStat {
      "value": value[_key == $lang][0].value,
      "label": label[_key == $lang][0].value
    },
    rightTopStat {
      "value": value[_key == $lang][0].value,
      "label": label[_key == $lang][0].value
    },
    rightBottomStat {
      "value": value[_key == $lang][0].value,
      "label": label[_key == $lang][0].value
    }
  }`;

  try {
    return await sanityClient.fetch(
      query,
      { lang },
      {
        next: { revalidate: REVALIDATE_TIME, tags: ["aboutUs"] },
      }
    );
  } catch (error) {
    console.error("Error fetching about us data:", error);
    return null;
  }
}

export async function getClientsData(): Promise<ClientsType | null> {
  const query = `*[_type == "clients"][0]{
    logos[] {
      asset-> {
        _id,
        url,
        metadata {
          dimensions
        }
      }
    }
  }`;

  try {
    return await sanityClient.fetch(
      query,
      {},
      {
        next: {
          revalidate: REVALIDATE_TIME,
          tags: ["clients"],
        },
      }
    );
  } catch (error) {
    console.error("Error fetching clients data:", error);
    return null;
  }
}

export async function getBlogPosts(
  lang: string = "en"
): Promise<BlogPost[] | null> {
  const query = `*[_type == "blog" && language == $lang] | order(publishedAt desc) {
    _id,
    title,
    slug,
    mainImage,
    publishedAt,
    "author": author->{name, image, bio},
    "categories": categories[]->{title, description}
  }`;

  try {
    return await sanityClient.fetch(
      query,
      { lang },
      {
        next: { revalidate: REVALIDATE_TIME, tags: ["blog", "content"] },
      }
    );
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}

export async function getBlogPost(
  slug: string,
  lang: string = "en"
): Promise<BlogPost | null> {
  const query = `*[_type == "blog" && slug.current == $slug && language == $lang][0] {
    _id,
    title,
    slug,
    mainImage,
    publishedAt,
    body,
    "author": author->{name, image, bio},
    "categories": categories[]->{title, description}
  }`;

  try {
    return await sanityClient.fetch(
      query,
      { slug, lang },
      {
        next: {
          revalidate: REVALIDATE_TIME,
          tags: [`blog-post-${slug}`, "content"],
        },
      }
    );
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return null;
  }
}
