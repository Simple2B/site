"use client"

import Image from "next/image"

interface Props {
  style: string;
}

export const ProcessCardImage = ({ style }: Props) => {
  return (
    <span className={style}>
      <Image
        alt="decor"
        src={"/png/curved_line.png"}
        width={260}
        height={170}
      />
    </span>
  )
}
