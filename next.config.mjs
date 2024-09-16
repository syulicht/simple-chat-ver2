/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['firebasestorage.googleapis.com'], // 外部ホストを許可する
      },
};

export default nextConfig;
