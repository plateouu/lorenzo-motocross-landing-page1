/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  async rewrites() {
    return [
      { source: '/dist/:path*', destination: '/api/r/dist/:path*' },
      { source: '/fonts/:path*', destination: '/api/r/fonts/:path*' },
      { source: '/pwa/:path*', destination: '/api/r/pwa/:path*' },
      { source: '/images/:path*', destination: '/api/r/images/:path*' },
    ]
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'loremflickr.com' },
      { protocol: 'https', hostname: 'covers.openlibrary.org' },
      { protocol: 'https', hostname: 'upload.wikimedia.org' },
      { protocol: 'https', hostname: 'picsum.photos' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
}

export default nextConfig
