// lib/imagesConfig.ts
const accountHash = process.env.NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_HASH;

const imagesConfig: { [key: string]: any } = {
  logos: {
    main: `https://imagedelivery.net/${accountHash}/357c2697-28a5-4c60-4e94-150e3847ab00/public`,
    secondary: `https://imagedelivery.net/${accountHash}/example-image-id/variant`,
  },
  bangboos: {
    bangboo1half: `https://imagedelivery.net/${accountHash}/357c2697-28a5-4c60-4e94-150e3847ab00/public`,
    // bangboo2half: `https://imagedelivery.net/${accountHash}/example-image-id/variant`,
  },
  thumbnails: {
    cunninghares1: `https://imagedelivery.net/${accountHash}/39ec9354-f9dc-492c-a810-63913fcf3900/public`,
    // cunninghares2: `https://imagedelivery.net/${accountHash}/example-image-id/variant`,
  }
};

export default imagesConfig;
