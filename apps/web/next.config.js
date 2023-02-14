require("dotenv").config({path: "../../.env"});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['ui','tsconfig'],
}

module.exports = nextConfig