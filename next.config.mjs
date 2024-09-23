/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      use: ['graphql-tag/loader'],
    })
    return config
  },
  images: {
    remotePatterns: [{ hostname: 'rickandmortyapi.com' }],
  },
}

export default nextConfig
