import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/i18n.ts');

const config = {
  // Use ISR instead of static export for better compatibility
  // output: 'export' as const,
  trailingSlash: true,
  images: {
    // unoptimized: true, // Not needed for ISR
  },
  // Enable static optimization with ISR
  experimental: {
    // Enable static optimization
  },
};

export default withNextIntl(config);
