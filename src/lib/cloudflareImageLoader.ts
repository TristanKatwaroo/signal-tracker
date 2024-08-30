// lib/cloudflareImageLoader.ts
type LoaderProps = {
    src: string;
    width: number;
    quality?: number;
  };
  
  export function cloudflareImageLoader({ src, width, quality }: LoaderProps) {
    return `${src}?width=${width}&quality=${quality || 75}`;
  }
  