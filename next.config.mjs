/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config) {
        config.module.rules.push({
        test: /\.svg$/,
        use: ['@svgr/webpack'],
        });

        return config;
    },
    swcMinify: true,
    eslint: {
        ignoreDuringBuilds: true,
      },
    rules: {
    '@typescript-eslint/no-unused-vars': ['warn', { 'varsIgnorePattern': '^_' }],
    '@typescript-eslint/no-explicit-any': 'off',
    },
};

export default nextConfig;
