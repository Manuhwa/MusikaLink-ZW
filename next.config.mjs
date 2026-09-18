/** @type {import('next').NextConfig} */
const isExport = process.env.EXPORT === "1";

const nextConfig = {
  reactStrictMode: true,
  ...(isExport
    ? {
        output: "export",
        images: { unoptimized: true },
        basePath: "/MusikaLink-ZW",
        assetPrefix: "/MusikaLink-ZW/",
      }
    : {}),
};

export default nextConfig;
