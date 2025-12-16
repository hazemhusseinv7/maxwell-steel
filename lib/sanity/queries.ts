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
          tags: ["settings", "content"],
        },
      },
    );
  } catch (error) {
    console.error("Error fetching settings data:", error);
    return null;
  }
}

export async function getHeroData(
  lang: string = "en",
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
        next: { revalidate: REVALIDATE_TIME, tags: ["main", "content"] },
      },
    );
  } catch (error) {
    console.error("Error fetching hero data:", error);
    return null;
  }
}

export async function getRiskAdvantageData(
  lang: string = "en",
): Promise<RiskAdvantageType | null> {
  const query = `*[_type == "riskAdvantage"][0]{
    "title": title[_key == $lang][0].value,
    "toggleLabel": toggleLabel[_key == $lang][0].value,
    "onCards": onCards[] {
      "title": title[_key == $lang][0].value,
      "description": description[].item[_key == $lang][0].value,
      image {
        asset-> {
          _id,
          url,
          metadata {
            dimensions {
              width,
              height,
              aspectRatio
            },
            lqip
          }
        }
      }
    },
    "offCards": offCards[] {
      "title": title[_key == $lang][0].value,
      "description": description[].item[_key == $lang][0].value,
      image {
        asset-> {
          _id,
          url,
          metadata {
            dimensions {
              width,
              height,
              aspectRatio
            },
            lqip
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
        next: {
          revalidate: REVALIDATE_TIME,
          tags: ["riskAdvantage", "content"],
        },
      },
    );
  } catch (error) {
    console.error("Error fetching risk advantage data:", error);
    return null;
  }
}

export async function getProductsData(
  lang: string = "en",
): Promise<ProductsType | null> {
  const query = `*[_type == "products"][0]{
    "productsList": productsList[] {
      "name": name[_key == $lang][0].value,
      "description": description[_key == $lang][0].value,
      "features": features[].item[_key == $lang][0].value,
      "specifications": specifications[].item[_key == $lang][0].value,
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
        next: { revalidate: REVALIDATE_TIME, tags: ["products", "content"] },
      },
    );
  } catch (error) {
    console.error("Error fetching products data:", error);
    return null;
  }
}

export async function getFeaturesData(
  lang: string = "en",
): Promise<FeaturesType | null> {
  const query = `*[_type == "features"][0]{
    "title": title[_key == $lang][0].value,
    block1 {
      image {
        asset-> {
          _id,
          url,
          metadata {
            dimensions
          }
        }
      },
      "title": title[_key == $lang][0].value,
      "description": description[_key == $lang][0].value,
      items[] {
        "title": title[_key == $lang][0].value,
        "description": description[_key == $lang][0].value,
        icon {
          asset-> {
            _id,
            url,
            metadata {
              dimensions
            }
          }
        }
      }
    },
    block2 {
      image {
        asset-> {
          _id,
          url,
          metadata {
            dimensions
          }
        }
      },
      "title": title[_key == $lang][0].value,
      "heading": heading[_key == $lang][0].value,
      "content": content[_key == $lang][0].value,
      button1 {
        "title": title[_key == $lang][0].value,
        link
      },
      button2 {
        "title": title[_key == $lang][0].value,
        link
      }
    },
    block3 {
      "title": title[_key == $lang][0].value,
      cards[] {
        "title": title[_key == $lang][0].value,
        "description": description[_key == $lang][0].value,
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
    }
  }`;

  try {
    return await sanityClient.fetch(
      query,
      { lang },
      {
        next: {
          revalidate: REVALIDATE_TIME,
          tags: ["features", "content"],
        },
      },
    );
  } catch (error) {
    console.error("Error fetching features data:", error);
    return null;
  }
}

export async function getAboutUsData(
  lang: string = "en",
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
        next: { revalidate: REVALIDATE_TIME, tags: ["aboutUs", "content"] },
      },
    );
  } catch (error) {
    console.error("Error fetching about us data:", error);
    return null;
  }
}

export async function getTestimonialsData(
  lang: string = "en",
): Promise<TestimonialsType | null> {
  const query = `*[_type == "testimonials"][0]{
    "testimonials": testimonials[] {
      "name": name[_key == $lang][0].value,
      "content": content[_key == $lang][0].value
    }
  }`;

  try {
    return await sanityClient.fetch(
      query,
      { lang },
      {
        next: {
          revalidate: REVALIDATE_TIME,
          tags: ["testimonials", "content"],
        },
      },
    );
  } catch (error) {
    console.error("Error fetching testimonials data:", error);
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
          tags: ["clients", "content"],
        },
      },
    );
  } catch (error) {
    console.error("Error fetching clients data:", error);
    return null;
  }
}

export async function getBlogPosts(
  lang: string = "en",
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
      },
    );
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}

export async function getBlogPost(
  slug: string,
  lang: string = "en",
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
      },
    );
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return null;
  }
}
