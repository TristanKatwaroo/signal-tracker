import { DiscordLogoIcon, GitHubLogoIcon } from '@radix-ui/react-icons';
import { SquareArrowOutUpRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const Footer = () => {
  return (
    // <footer className="border-t bg-card dot-pattern text-muted-foreground py-5">
    <footer className="border-t bg-card text-muted-foreground py-5">
      <div className="container mx-auto grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <h5 className="font-bold mb-2 text-primary-foreground">SIGNALTRACKER.GG</h5>
          <ul>
            <li>
              <Link href="https://discord.com/invite/your-discord-link" target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center">
                Discord Server<DiscordLogoIcon className="ml-2 w-4 h-4" />
              </Link>
            </li>
            <li>
              <Link href="https://github.com/your-github-repo" target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center">
                Github<GitHubLogoIcon className="ml-2 w-4 h-4" />
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h5 className="font-bold mb-2 text-primary-foreground">Official Links</h5>
          <ul>
            <li>
              <Link href="https://www.hoyoverse.com" target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center">
                HoYoverse <SquareArrowOutUpRight className="ml-2 w-4 h-4" />
              </Link>
            </li>
            <li>
              <Link href="https://zenless.hoyoverse.com" target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center">
                Zenless Zone Zero <SquareArrowOutUpRight className="ml-2 w-4 h-4" />
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h5 className="font-bold mb-2 text-primary-foreground">Resources</h5>
          <ul>
            <li>
              <Link href="/privacy-policy" className="hover:underline">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="mailto:support@signaltracker.gg" className="hover:underline">
                Support
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto grid grid-cols-1 text-sm mt-6 mb-1">
        &copy; {new Date().getFullYear()} SIGNALTRACKER.GG. SIGNALTRACKER.GG is not affiliated with HoYoverse or Zenless Zone Zero which are registered trademarks of COGNOSPHERE PTE. LTD. 
      </div>
    </footer>
  );
};

export default Footer;
