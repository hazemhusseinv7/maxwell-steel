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

interface ProductsType {
  productsList: {
    name: string;
    description: string;
    features: string[];
    specifications: string[];
    image: ImageType[];
  }[];
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
