import { DiscordLogoIcon, GitHubLogoIcon } from '@radix-ui/react-icons';
import { SquareArrowOutUpRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const Footer = () => {
  return (
    <footer className="container max-w-7xl 2xl:max-w-[100rem] mx-auto w-full px-4 md:px-6 lg:px-8 pb-8 sm:pb-8">
      <div className="py-10 px-2 bg-card border border-secondary rounded-xl">
        <div className="grid grid-cols-1 md:grid-cols-3 px-6 gap-8 2xl:gap-x-12">
          <div className="flex flex-col items-start md:items-center">
            <div className="md:inline-block md:text-left">
              <h5 className="font-bold mb-2 text-primary-foreground">SIGNALTRACKER.GG</h5>
              <Link href="https://discord.gg/Cg6tNsrhXj" target="_blank" rel="noopener noreferrer" className="hover:underline text-muted-foreground flex items-center">
                Discord Server<DiscordLogoIcon className="ml-1.5 w-3.5 h-3.5" />
              </Link>
              <Link href="https://github.com/TristanKatwaroo/signal-tracker" target="_blank" rel="noopener noreferrer" className="hover:underline text-muted-foreground flex items-center">
                Github<GitHubLogoIcon className="ml-1.5 w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="flex flex-col items-start md:items-center">
            <div className="md:inline-block md:text-left">
              <h5 className="font-bold mb-2 text-primary-foreground">Official Links</h5>
              <Link href="https://www.hoyoverse.com" target="_blank" rel="noopener noreferrer" className="hover:underline text-muted-foreground flex items-center">
                HoYoverse <SquareArrowOutUpRight className="ml-1.5 w-3.5 h-3.5" />
              </Link>
              <Link href="https://zenless.hoyoverse.com" target="_blank" rel="noopener noreferrer" className="hover:underline text-muted-foreground flex items-center">
                Zenless Zone Zero <SquareArrowOutUpRight className="ml-1.5 w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="flex flex-col items-start md:items-center">
            <div className="md:inline-block md:text-left">
              <h5 className="font-bold mb-2 text-primary-foreground">Resources</h5>
              <Link href="/" className="hover:underline text-muted-foreground flex items-center">
                Privacy Policy
              </Link>
              <Link href="mailto:support@signaltracker.gg" className="hover:underline text-muted-foreground flex items-center">
                Support
              </Link>
            </div>
          </div>
        </div>
        <div className="w-full text-center text-muted-foreground/60 px-6 text-sm mt-6 mb-1">
          &copy; {new Date().getFullYear()} SIGNALTRACKER.GG. SIGNALTRACKER.GG is not affiliated with HoYoverse or Zenless Zone Zero which are registered trademarks of COGNOSPHERE PTE. LTD.
        </div>
      </div>
    </footer>
  );
};

export default Footer;