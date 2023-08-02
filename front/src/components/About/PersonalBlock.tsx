import clsx from "clsx";
import Image from "next/image";
import { IMG_DOMAIN_SERVER } from "@/app/constants-server";

export interface IPersonalBlockProps {
  fullName: string;
  position: string;
  description: string;
  image: string;
  reverse?: boolean;
}

export const PersonalBlock = ({
  description,
  fullName,
  image,
  position,
  reverse,
}: IPersonalBlockProps) => {
  return (
    <div
      className={clsx(
        "flex justify-between items-end mb-[100px] tablet-min-max:items-start personClass",
        reverse && "flex-row-reverse personClass"
      )}
    >
      <div
        className={clsx(
          "relative w-[450px] h-[565px] mr-[0 80px 0 0] shadow-imageShadow personImageClass",
          reverse && "ml-[0 0 0 80px] personImageClassReverse"
        )}
      >
        <Image
          src={`${IMG_DOMAIN_SERVER}/gallery/leadership/${image}.jpg`}
          alt={`${fullName} photo`}
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
          priority={true}
        />
      </div>

      <div className="max-w-[654px] tablet-min-max:max-w-[300px] personTextClass">
        <h3 className="relative font-semibold text-3xl leading-[45px] mb-[10px] z-[1] before:flex before:content-[''] before:w-11 before:h-11 before:bg-[#a0e0ed] before:rounded-full before:absolute before:z-[-1] before:left-[-20px]">{fullName}</h3>
        <h4 className="font-normal text-base leading-[27px] mb-[10px]">{position}</h4>
        <p className="block font-normal text-base leading-[27px] desktop:text-justify">{description}</p>
      </div>
    </div>
  );
};
