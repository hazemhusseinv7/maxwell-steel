import { sanityClient } from "@/lib/sanity/client";

const REVALIDATE_TIME =
  process.env.NODE_ENV === "production"
    ? Number(process.env.REVALIDATE_TIME) || 3600
    : 0;

export async function getSettingsData(
  lang: string = "en",
): Promise<SettingsType | null> {
  const query = `*[_type == "settings"][0]{
    "location": location[_key == $lang][0].value,
    phones,
    emails,
    twitter,
    linkedin,
    tiktok,
    telegram,
    snapchat,
    whatsapp,
    facebook,
    youtube,
    instagram,
    "seoTitle": seoTitle[_key == $lang][0].value,
    "seoDescription": seoDescription[_key == $lang][0].value,
    "seoKeywords": seoKeywords[_key == $lang][0].value,
    ogImage {
      asset-> {
        _id,
        url,
        metadata {
          dimensions
        }
      }
    },
    twitterCardType,
    "productsSeoTitle": productsSeoTitle[_key == $lang][0].value,
    "productsSeoDescription": productsSeoDescription[_key == $lang][0].value
  }`;

  try {
    return await sanityClient.fetch(
      query,
      { lang },
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
): Promise<ProductItem[] | null> {
  const query = `*[_type == "product"] | order(name[_key == "en"][0].value asc) {
    "name": name[_key == $lang][0].value,
    "nameEn": name[_key == "en"][0].value,
    "slug": slug.current,
    "description": description[_key == $lang][0].value,
    "features": features[].item[_key == $lang][0].value,
    "specifications": specifications[].item[_key == $lang][0].value,
    "categories": categories[].item[_key == $lang][0].value,
    "applications": applications[].item[_key == $lang][0].value,
    "industries": industries[].item[_key == $lang][0].value,
    "manufacturing": manufacturing[].item[_key == $lang][0].value,
    "advantages": advantages[].item[_key == $lang][0].value,
    image[] {
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
        next: { revalidate: REVALIDATE_TIME, tags: ["products", "content"] },
      },
    );
  } catch (error) {
    console.error("Error fetching products data:", error);
    return null;
  }
}

export async function getProjectsData(
  lang: string = "en",
): Promise<ProjectsType | null> {
  const query = `*[_type == "projects"][0]{
    "title": title[_key == $lang][0].value,
    images[] {
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
        next: {
          revalidate: REVALIDATE_TIME,
          tags: ["projects", "content"],
        },
      },
    );
  } catch (error) {
    console.error("Error fetching projects data:", error);
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
    "content": content[_key == $lang][0].value,
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
    },
    ourVision {
      "title": title[_key == $lang][0].value,
      "content": content[_key == $lang][0].value,
      image {
        asset-> {
          _id,
          url,
          metadata {
            dimensions
          }
        }
      }
    },
    ourMission {
      "title": title[_key == $lang][0].value,
      "content": content[_key == $lang][0].value,
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
  const query = `*[_type == "blog"] | order(publishedAt desc) {
    _id,
    "title": title[][_key == $lang][0].value,
    slug,
    mainImage,
    publishedAt,
    "author": author->{
      "name": name[][_key == $lang][0].value,
      image, 
      bio
    },
    "categories": categories[]->{
      "title": title[][_key == $lang][0].value,
      description
    },
    "content": content[_key == $lang][0].value
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
  const query = `*[_type == "blog" && slug.current == $slug][0] {
    _id,
    "title": title[][_key == $lang][0].value,
    slug,
    mainImage,
    publishedAt,
    "author": author->{
      "name": name[][_key == $lang][0].value,
      image, 
      bio
    },
    "categories": categories[]->{
      "title": title[][_key == $lang][0].value,
      description
    },
    "content": content[_key == $lang][0].value
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

export async function getPageData(
  slug: string,
  lang: string = "en",
): Promise<PageType | null> {
  const query = `*[_type == "page" && slug.current == $slug][0]{
    "title": title[_key == $lang][0].value,
    slug,
    "content": content[_key == $lang][0].value
  }`;

  try {
    return await sanityClient.fetch(
      query,
      { slug, lang },
      {
        next: {
          revalidate: REVALIDATE_TIME,
          tags: ["page", "content"],
        },
      },
    );
  } catch (error) {
    console.error("Error fetching page data:", error);
    return null;
  }
}

export async function getAllPageSlugs(): Promise<{ slug: string }[] | null> {
  const query = `*[_type == "page"]{
    "slug": slug.current
  }`;

  try {
    return await sanityClient.fetch(
      query,
      {},
      {
        next: {
          revalidate: REVALIDATE_TIME,
          tags: ["page", "content"],
        },
      },
    );
  } catch (error) {
    console.error("Error fetching page slugs:", error);
    return null;
  }
}

export async function getFooterPagesData(
  lang: string = "en",
): Promise<{ title: string; slug: string }[] | null> {
  const query = `*[_type == "page"]{
    "title": title[_key == $lang][0].value,
    "slug": slug.current
  }`;

  try {
    return await sanityClient.fetch(
      query,
      { lang },
      {
        next: {
          revalidate: REVALIDATE_TIME,
          tags: ["page", "content"],
        },
      },
    );
  } catch (error) {
    console.error("Error fetching footer pages data:", error);
    return null;
  }
}

export async function getBlogSlugs(): Promise<string[]> {
  const query = `*[_type == "blog" && defined(slug.current)].slug.current`;

  try {
    const result = await sanityClient.fetch(
      query,
      {},
      {
        next: {
          revalidate: REVALIDATE_TIME,
          tags: ["blog", "content"],
        },
      },
    );
    return result?.filter(Boolean) || [];
  } catch (error) {
    console.error("Error fetching blog slugs:", error);
    return [];
  }
}

export async function getProductSlugs(): Promise<string[]> {
  const query = `*[_type == "product" && defined(slug.current)].slug.current`;

  try {
    const result = await sanityClient.fetch(
      query,
      {},
      {
        next: {
          revalidate: REVALIDATE_TIME,
          tags: ["products", "content"],
        },
      },
    );
    return result?.filter(Boolean) || [];
  } catch (error) {
    console.error("Error fetching product slugs:", error);
    return [];
  }
}

export async function getProductBySlug(
  slug: string,
  lang: string = "en",
): Promise<ProductDetailResult> {
  const query = `{
    "product": *[_type == "product" && slug.current == $slug][0] {
      "name": name[_key == $lang][0].value,
      "nameEn": name[_key == "en"][0].value,
      "slug": slug.current,
      "description": description[_key == $lang][0].value,
      "features": features[].item[_key == $lang][0].value,
      "specifications": specifications[].item[_key == $lang][0].value,
      "categories": categories[].item[_key == $lang][0].value,
      "applications": applications[].item[_key == $lang][0].value,
      "industries": industries[].item[_key == $lang][0].value,
      "manufacturing": manufacturing[].item[_key == $lang][0].value,
      "advantages": advantages[].item[_key == $lang][0].value,
      youtubeUrl,
      image[] {
        asset-> {
          _id,
          url,
          metadata {
            dimensions
          }
        }
      },
      "seoTitle": seoTitle[_key == $lang][0].value,
      "seoDescription": seoDescription[_key == $lang][0].value,
      "seoKeywords": seoKeywords[_key == $lang][0].value,
      canonicalUrl,
      noIndex,
      "ogTitle": ogTitle[_key == $lang][0].value,
      "ogDescription": ogDescription[_key == $lang][0].value,
      ogImage {
        asset-> {
          _id,
          url,
          metadata {
            dimensions
          }
        }
      },
      twitterCardType,
      "twitterTitle": twitterTitle[_key == $lang][0].value,
      "twitterDescription": twitterDescription[_key == $lang][0].value,
      twitterImage {
        asset-> {
          _id,
          url,
          metadata {
            dimensions
          }
        }
      },
      "material": material[_key == $lang][0].value,
      "category": category[_key == $lang][0].value,
      sku,
      mpn,
      brandName
    },
    "allProducts": *[_type == "product" && slug.current != $slug] {
      "name": name[_key == $lang][0].value,
      "nameEn": name[_key == "en"][0].value,
      "slug": slug.current,
      "description": description[_key == $lang][0].value,
      image[] {
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
    const result = await sanityClient.fetch(
      query,
      { slug, lang },
      {
        next: {
          revalidate: REVALIDATE_TIME,
          tags: ["products", "content"],
        },
      },
    );

    return {
      product: result?.product || null,
      allProducts: result?.allProducts || [],
    };
  } catch (error) {
    console.error("Error fetching product by slug:", error);
    return { product: null, allProducts: [] };
  }
}
