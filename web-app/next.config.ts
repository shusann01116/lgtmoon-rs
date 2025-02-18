import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
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
