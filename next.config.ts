import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.openfoodfacts.org",
                port: "",
                pathname: "/images/products/**",
            }
        ]
    }
};

export default nextConfig;
