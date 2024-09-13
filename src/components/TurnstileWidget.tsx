import { useEffect, useRef } from 'react';

interface TurnstileWidgetProps {
  onVerify: (token: string) => void;
}

const TurnstileWidget: React.FC<TurnstileWidgetProps> = ({ onVerify }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (ref.current && (window as any).turnstile) {
      (window as any).turnstile.render(ref.current, {
        sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
        callback: onVerify,
      });
    }
  }, [onVerify]);

  return <div ref={ref} />;
};

export default TurnstileWidget;