import type { NextConfig } from "next";
import { hostname } from "os";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    // domains: ['parkstayfly.showmyproject.net', 'cdn.sanity.io'],
    remotePatterns : [
      {
        protocol: 'https', // Must match the image URL protocol
        hostname: 'parkstayfly.showmyproject.net', // The domain name
      },
      {
        protocol: 'https', // Must match the image URL protocol
        hostname: 'cdn.sanity.io', // The domain name
      },
      {
          protocol : 'https',
          hostname: 'sanity.io'
      }
    ]
  }
  
       
};

export default nextConfig;
