"use client";

import Link from "next/link";
import { Box } from "@/app/(components)/box";
import { useEffect } from "react";
import { gsap } from "gsap";

export default function Home() {
  useEffect(() => {
    const elements = document.querySelectorAll("#grid > * > *");
    gsap.set(elements, { autoAlpha: 1 });
  }, []);

  return (
    <main className="container mx-auto">
      <div id="grid" className="grid grid-cols-2 py-10 gap-10">
        <Link href="/p/a" className="aspect-video">
          <Box color="bg-red-500">A</Box>
        </Link>
        <Link href="/p/b" className="aspect-video">
          <Box color="bg-blue-500">B</Box>
        </Link>
        <Link href="/p/c" className="aspect-video">
          <Box color="bg-green-500">C</Box>
        </Link>
        <Link href="/p/d" className="aspect-video">
          <Box color="bg-yellow-500">D</Box>
        </Link>
      </div>
    </main>
  );
}
