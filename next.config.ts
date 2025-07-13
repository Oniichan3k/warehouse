import type { NextConfig } from "next";
import withTM from "next-transpile-modules";

// Khai báo các package cần transpile
const withTranspileModules = withTM([
  "antd",
  "@ant-design/icons",
  "@ant-design/icons-svg",
  "rc-util",
  "rc-picker",
]);

const nextConfig: NextConfig = {
  // Các config khác của bạn ở đây (nếu có)
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    // Fix for rc-util module resolution
    config.resolve.alias = {
      ...config.resolve.alias,
      'rc-util/es/Dom/canUseDom': 'rc-util/lib/Dom/canUseDom',
    };
    
    return config;
  },
  // ... (thêm config khác nếu cần)
};

// Export config đã được bọc với withTranspileModules
export default withTranspileModules(nextConfig);
