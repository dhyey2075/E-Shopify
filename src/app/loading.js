"use client";
import Image from "next/image";
export default function Loading() {
  // Or a custom loading skeleton component
  return <Image className="flex justify-center items-center" src={"/pacman.gif"} height={200} width={200} />
}