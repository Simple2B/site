"use client"

import React, { useEffect, useState } from "react";
import Link from 'next/link';
import cookie from "js-cookie";
import NavigateBtn from "../Buttons/NavigateBtn";

const USER_CONSENT_COOKIE_KEY = 'is_cookie_consent'
const USER_CONSENT_COOKIE_EXPIRE_DATE = 365

const CookieConsentBanner: React.FC = () => {
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
    <section className="fixed bottom-0 left-0 w-full">
      <div className="flex flex-col items-start px-5 py-8 space-y-2 bg-gray-200 md:flex-row md:space-y-0 md:items-stretch md:space-x-2">
        <div className="flex items-center flex-grow text-gray-900 pb-3">
          <p className="text-lg font-medium">
            This site uses services that use cookies to deliver better
            experience and analyze traffic. You can learn more about the
            services we use at our{' '}
            <Link href={`/privacy-policy`} className="text-lg underline hover:text-lightAccent hover:text-[#70BBFF]">
              privacy policy
            </Link>
            .
          </p>
        </div>
        <div className="flex items-center gap-5">
          <button onClick={handleReject} className="p-3 px-10 text-lg font-medium rounded-3xl border-2 hover:border-[#70BBFF] hover:text-[#70BBFF]">Reject</button>
          <button onClick={handleAccept} className="p-3 px-10 rounded-3xl text-lg font-bold text-white uppercase bg-gray-400 whitespace-nowrap hover:bg-[#70BBFF] hover:text-[#FDE691]">Accept</button>
        </div>
      </div>
    </section>
  );
};

export default CookieConsentBanner;

