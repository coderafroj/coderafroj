import nextra from "nextra";

const withNextra = nextra({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.tsx",
});

export default withNextra({
  // Your existing Next.js config
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tor.cloud.appwrite.io",
      },
      {
        protocol: "https",
        hostname: "api.dicebear.com",
      }
    ],
  },
});
