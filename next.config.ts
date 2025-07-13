import type { NextConfig } from "next";
import withTM from "next-transpile-modules";

// Khai báo các package cần transpile
const withTranspileModules = withTM([
  "antd",
  "@ant-design/icons",
  "@ant-design/icons-svg",
]);

const nextConfig: NextConfig = {
  // Các config khác của bạn ở đây (nếu có)
  reactStrictMode: true,
  // ... (thêm config khác nếu cần)
};

// Export config đã được bọc với withTranspileModules
export default withTranspileModules(nextConfig);
