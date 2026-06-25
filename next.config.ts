import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin({
  experimental: {
    createMessagesDeclaration: "./messages/ar.json",
  },
});

const config: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
        pathname: "/images/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/ar",
        permanent: true,
      },
      {
        source: "/blog",
        destination: "/ar/blog",
        permanent: true,
      },
      {
        source: "/blog/:slug*",
        destination: "/ar/blog/:slug*",
        permanent: true,
      },
      {
        source: "/products",
        destination: "/ar/products",
        permanent: true,
      },
      {
        source: "/products/:slug*",
        destination: "/ar/products/:slug*",
        permanent: true,
      },
      {
        source: "/about-us",
        destination: "/ar/about-us",
        permanent: true,
      },
      {
        source: "/contact",
        destination: "/ar/contact",
        permanent: true,
      },
      {
        source: "/why-us",
        destination: "/ar/why-us",
        permanent: true,
      },
      {
        source: "/projects",
        destination: "/ar/projects",
        permanent: true,
      },
      {
        source: "/thank-you",
        destination: "/ar/thank-you",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(config);
