const accountHash = process.env.NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_HASH;

if (!accountHash) {
  throw new Error('NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_HASH environment variable is not defined.');
}

// Define image paths relative to the Cloudflare Image Delivery URL
const imagesConfig: { [key: string]: any } = {
  logos: {
    main: `${accountHash}/357c2697-28a5-4c60-4e94-150e3847ab00/public`,
    secondary: `${accountHash}/example-image-id/variant`,
  },
  bangboos: {
    bangboo1half: `${accountHash}/357c2697-28a5-4c60-4e94-150e3847ab00/public`,
    // Add more images as needed
  },
  thumbnails: {
    cunninghares1: `${accountHash}/3ee082f2-ac19-41cf-fef2-aa1855e81500/public`,
    // Add more thumbnails as needed
  },
};

export default imagesConfig;
