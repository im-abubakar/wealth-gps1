/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',          // genera la carpeta /out: HTML estático listo para publicar
  images: { unoptimized: true },
  reactStrictMode: true
};
export default nextConfig;
