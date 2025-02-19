import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: false,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
  webpack: (config, { isServer, dev }) => {
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
      layers: true,
    };
    config.output.webassemblyModuleFilename = (isServer && !dev ? "../" : "") + "static/wasm/[modulehash].wasm";
    config.infrastructureLogging = { debug: /PackFileCache/ }
    return config;
  }
};

export default nextConfig;
