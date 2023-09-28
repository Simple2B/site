import Link from 'next/link';
import Image from 'next/image';

import { IMG_DOMAIN_SERVER } from '@/app/constants-server';

import { MenuLink } from './MenuLink';
import { IMenuInclude } from '@/types/menu';
import { OpenModal } from '../Buttons/OpenModal';
// import LoginQut from "../Buttons/LoginQut";

export const Navbar = ({
  menuLinks,
  contactUs,
}: IMenuInclude & { loginQut: string }) => {
  return (
    <nav className="fixed top-0 p-2 bg-white w-full z-10">
      <div className="flex justify-between items-center py-4 px-0 max-w-[1240px] my-0 mx-auto">
        <div>
          <div className="flex items-center h-12 w-16">
            <Link href={'/'}>
              <Image
                src={`${IMG_DOMAIN_SERVER}/logos/main_site_logo.svg`}
                alt="Simple2b logo"
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: '100%', height: 'auto' }}
              />
            </Link>
          </div>
        </div>

        <div className="flex justify-between items-center gap-4">
          <div className="flex">
            {menuLinks.map((itm) => (
              <MenuLink key={itm.id} itm={itm} />
            ))}
          </div>
          <div className="flex gap-1">
            <OpenModal btnText={contactUs} />

            {/* Only for devs */}
            {/* <LoginQut btnText={loginQut} /> */}
          </div>
        </div>
      </div>
    </nav>
  );
};
