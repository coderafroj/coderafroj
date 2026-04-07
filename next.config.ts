import nextra from "nextra";

const withNextra = nextra({
  // Nextra 4 options go here
});

export default withNextra({
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
