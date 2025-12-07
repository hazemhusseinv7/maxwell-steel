interface ImageType {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
}

interface SettingsType {
  phone?: string;
  email?: string;
  twitter?: string;
  linkedin?: string;
  tiktok?: string;
  telegram?: string;
  snapchat?: string;
  instagram?: string;
  whatsapp?: string;
  facebook?: string;
  youtube?: string;
}

interface HeroType {
  title: string;
  image: ImageType;
  certificateBadge?: ImageType;
}

interface RiskAdvantageType {
  title: string;
  cards: {
    title: string;
    description: string[];
    image: ImageType;
  }[];
}

interface ProductsType {
  productsList: {
    name: string;
    description: string;
    features: string[];
    specifications: string[];
    image: ImageType;
  }[];
}

interface AboutUsType {
  title: string;
  heroImage: {
    asset: {
      _id: string;
      url: string;
      metadata: {
        dimensions: {
          width: number;
          height: number;
          aspectRatio: number;
        };
      };
    };
  };
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
  title: string;
  slug: {
    current: string;
  };
  mainImage: any;
  publishedAt?: string;
  body: any[];
  author?: AuthorType;
  categories?: CategoryType[];
}
