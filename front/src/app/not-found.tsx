import Image from 'next/image';
import { MainLayout } from '@/components';
import { IMG_DOMAIN_SERVER } from './constants-server';
import NavigateBtn from '@/components/Buttons/NavigateBtn';

export default function NotFound() {
  return (
    <MainLayout hideFooter={true}>
      <div className="flex justify-center items-center flex-col h-[80vh] mx-6">
        <Image
          src={`${IMG_DOMAIN_SERVER}/error/404.svg`}
          alt="404 error page"
          width={522}
          height={300}
        />

        <h1 className="font-semibold text-4xl text-center">
          Oops! <br />
          Page not found!
        </h1>

        <h2 className="text-center w-80 my-6">
          This page doesn’t exist or was removed. We suggest you to go back to
          main.
        </h2>

        <NavigateBtn title="Go To Main" size="large" pushTo="/" />
      </div>
    </MainLayout>
  );
}
