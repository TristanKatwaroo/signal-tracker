// cfImageLoader.ts

type CloudflareLoaderParams = {
    src: string;
    width: number;
    quality?: number;
  };
  
  const normalizeSrc = (src: string): string => {
    return src.startsWith('/') ? src.slice(1) : src;
  };
  
  export default function cloudflareLoader({ src, width, quality }: CloudflareLoaderParams): string {
    const params = [`width=${width}`, `quality=${quality || 75}`];
    const paramsString = params.join(',');
  
    // Construct the URL with Cloudflare's image transformation parameters
    return `https://imagedelivery.net/${normalizeSrc(src)}?${paramsString}`;
  }
  