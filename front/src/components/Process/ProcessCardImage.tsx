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
        src="https://simple2b-site-static.s3.eu-north-1.amazonaws.com/curved_line.png"
        width={260}
        height={170}
      />
    </span>
  )
}
