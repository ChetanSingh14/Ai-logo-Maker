/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
      GEMINI_API_KEY: process.env.GEMINI_API_KEY,
      NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
      CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    }
  };
  
  export default nextConfig;
  
