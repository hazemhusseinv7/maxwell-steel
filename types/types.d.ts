interface ImageType {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
}

interface SettingsType {
  location?: string;
  phones?: string[];
  emails?: string[];
  twitter?: string;
  linkedin?: string;
  tiktok?: string;
  telegram?: string;
  snapchat?: string;
  instagram?: string;
  whatsapp?: string;
  facebook?: string;
  youtube?: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
  ogImage?: ResolvedImage;
  twitterCardType?: string;
  productsSeoTitle?: string;
  productsSeoDescription?: string;
}

interface HeroType {
  title: string;
  image: ImageType;
  certificateBadge?: ImageType;
}

interface RiskAdvantageType {
  title: string;
  toggleLabel: string;
  onCards: {
    title: string;
    description: string[];
    image: ImageType;
  }[];
  offCards: {
    title: string;
    description: string[];
    image: ImageType;
  }[];
}

interface ResolvedImage {
  asset: { _id: string; url: string; metadata?: { dimensions?: { width: number; height: number } } }
}

interface ProductItem {
  name: string
  nameEn: string
  slug: string
  description: string
  features: string[]
  specifications: string[]
  categories?: string[]
  applications?: string[]
  industries?: string[]
  manufacturing?: string[]
  advantages?: string[]
  image: ResolvedImage[]
  youtubeUrl?: string
  // SEO: Meta
  seoTitle?: string
  seoDescription?: string
  seoKeywords?: string
  canonicalUrl?: string
  noIndex?: boolean
  // SEO: Open Graph
  ogTitle?: string
  ogDescription?: string
  ogImage?: ResolvedImage
  // SEO: Twitter
  twitterCardType?: string
  twitterTitle?: string
  twitterDescription?: string
  twitterImage?: ResolvedImage
  // Structured Data
  material?: string
  category?: string
  sku?: string
  mpn?: string
  brandName?: string
}

interface ProductDetailResult {
  product: ProductItem | null
  allProducts: ProductItem[]
}

interface ProjectsType {
  title: string;
  images: ImageType[];
}

interface FeaturesType {
  title: string;
  block1: {
    image: ImageType;
    title: string;
    description: string;
    items: {
      title: string;
      description: string;
      icon: ImageType;
    }[];
  };
  block2: {
    image: ImageType;
    title: string;
    heading: string;
    content: string;
    button1: {
      title: string;
      link: string;
    };
    button2: {
      title: string;
      link: string;
    };
  };
  block3: {
    title: string;
    cards: {
      title: string;
      description: string;
      image: ImageType;
    }[];
  };
}

interface AboutUsType {
  title: string;
  heroImage: ImageType;
  heading: string;
  subheading: string;
  content?: any[];
  leftTopStat: {
    value: string;
    label: string;
  };
  leftBottomStat: {
    value: string;
    label: string;
  };
  rightTopStat: {
    value: string;
    label: string;
  };
  rightBottomStat: {
    value: string;
    label: string;
  };
  ourVision?: {
    title: string;
    content?: any[];
    image: ImageType;
  };
  ourMission?: {
    title: string;
    content?: any[];
    image: ImageType;
  };
}

interface TestimonialsType {
  testimonials: {
    name: string;
    content: string;
  }[];
}

interface ClientsType {
  logos: ImageType[];
}

interface CategoryType {
  title: string;
  description?: any[];
}

interface AuthorType {
  name: string;
  image?: any;
  bio?: any[];
}
interface BlogPost {
  _id: string;
  title?: string;
  slug: {
    current: string;
  };
  mainImage: any;
  publishedAt?: string;
  content: any[];
  author?: AuthorType;
  categories?: CategoryType[];
}

// Pages
interface PageType {
  title: string;
  slug: {
    current: string;
  };
  content: any[];
}
