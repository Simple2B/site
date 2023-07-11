"use client"

import { IMG_DOMAIN } from "@/app/constants";
import Image from "next/image"

interface Props {
  style: string;
}

export const ProcessCardImage = ({ style }: Props) => {
  return (
    <span className={style}>
      <Image
        alt="decor"
        src={`${IMG_DOMAIN}/curved_line.png`}
        width={260}
        height={170}
      />
    </span>
  )
}
