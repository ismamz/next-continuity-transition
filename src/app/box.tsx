"use client";

import { useEffect, useRef } from "react";

interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  color: string;
}

export function Box({ children, color, ...rest }: BoxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // avoid flicker
    if (ref.current) ref.current.style.visibility = "visible";
  }, []);

  return (
    <div
      ref={ref}
      style={{ visibility: "hidden" }}
      className={`${color} aspect-video flex items-center justify-center uppercase text-white text-5xl`}
      {...rest}
    >
      {children}
    </div>
  );
}
