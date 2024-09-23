/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  env: {
    host: '127.0.0.1',
    port: '3306',
    user: 'app',
    password: 'Beezus5263',
    database: 'site',
    // socketPath: '/var/run/mysqld/mysqld.sock',
  }
}

module.exports = nextConfig
