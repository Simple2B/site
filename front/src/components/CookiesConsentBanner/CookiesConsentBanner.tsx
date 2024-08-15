"use client"

import React, { useEffect, useState } from "react";
import Link from 'next/link';
import Image from 'next/image';
import cookie from "js-cookie";
import { IMG_DOMAIN } from '@/app/constants';
import { CustomButton } from "../Buttons/CustomButton";

const USER_CONSENT_COOKIE_KEY = 'is_cookie_consent'
const USER_CONSENT_COOKIE_EXPIRE_DATE = 365

type Props = {
  text: string
  aceeptText: string
  rejectText: string
  privacyPolicy: string
}

const CookieConsentBanner: React.FC<Props> = ({ text, aceeptText, rejectText, privacyPolicy }) => {
  const [showBanner, setShowBanner] = useState<boolean>(false);

  useEffect(() => {
    const consentCookie = cookie.get(USER_CONSENT_COOKIE_KEY);

    console.log(USER_CONSENT_COOKIE_KEY, consentCookie);

    if (consentCookie === "rejected" || !consentCookie) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    setShowBanner(false);
    cookie.set(USER_CONSENT_COOKIE_KEY, "accepted", { expires: USER_CONSENT_COOKIE_EXPIRE_DATE });
  };

  const handleReject = () => {
    setShowBanner(false);
    cookie.set(USER_CONSENT_COOKIE_KEY, "rejected", { expires: USER_CONSENT_COOKIE_EXPIRE_DATE });
  };

  if (!showBanner) {
    return null;
  }

  return (
    <div className="w-full min-w-72 z-50 min-h-32 fixed bottom-0 left-0 bg-white shadow-inner">
      <div className="h-full flex justify-between gap-2 items-center">
        <div className="h-full w-1/6 flex flex-col justify-end min-w-40 tablet-max:hidden"><Image
          src={`${IMG_DOMAIN}/logos/cookie.svg`}
          alt="Simple2B logo"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: '100%', height: 'auto' }}
        /></div>
        <div className="w-5/6 py-2 tablet-max:w-full flex gap-2 tablet-max:flex-col justify-between">
          <div className="flex flex-col p-2">
            <div className="screen-min-max:text-sm">
              {text}{" "}
            </div>
            <Link href={`/privacy-policy`} className="screen-min-max:text-sm underline hover:text-lightAccent hover:text-[#70BBFF]">
              {privacyPolicy}
            </Link>
          </div>
          <div className="px-2 flex items-center justify-center gap-2 sm:flex-col">
            <CustomButton onClick={handleReject} title={rejectText} />
            <CustomButton onClick={handleAccept} title={aceeptText} type="filled" />
          </div>
        </div>

      </div>
    </div>
  );
};

export default CookieConsentBanner;

