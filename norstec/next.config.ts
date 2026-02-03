import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    domains: [
      "media.licdn.com",
      "img.rss.com",
      "images.unsplash.com",
      "pbs.twimg.com",
      "i.ytimg.com",
      "www.juicer.io"
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "img.rss.com",
        pathname: "/spacepodden/160/**",
      },
    ],
  },
};

export default nextConfig;
