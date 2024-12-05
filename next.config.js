/** @type {import('next').NextConfig} */
const nextConfig = {
  // SWCを有効化
  swcMinify: true,
  // Babelの代わりにSWCを使用
  experimental: {
    forceSwcTransforms: true,
  }
}

module.exports = nextConfig 