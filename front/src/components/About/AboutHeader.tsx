import { IMG_DOMAIN_SERVER } from "@/app/constants-server";
import Image from "next/image";

export const AboutHeader = ({ content }: { content: string }) => {
  return (
    <div className="flex flex-row justify-between items-center box-border screen-min-max:flex-col-reverse screen-min-max:items-center">
      <p className="max-w-[660px] pr-12 text-justify text-base leading-7 screen-min-max:pr-0"
      >
        {content}
      </p>

      <span className="mt-[-100px] w-[540px] h-[480px] aboutUsImageClass">
        <Image
          alt="List item icon"
          src={`${IMG_DOMAIN_SERVER}/others/about.svg`}
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
          loading="eager"
        />
      </span>
    </div>
  );
};
