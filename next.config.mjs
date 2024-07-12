/** @type {import('next').NextConfig} */
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, './src')],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**easystayfa.s3.amazonaws.com**",
      }
    ],
  },
  
};


export default nextConfig;