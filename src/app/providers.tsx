"use client";

import { TransitionRouter } from "next-transition-router";
import { gsap } from "gsap";
import { useRef, useState } from "react";
import { cloneElement, flipAnimate } from "./utils";

const FLIP_ID = "demo";
const TARGET_SELECTOR = "#target";

export function Providers({ children }: { children: React.ReactNode }) {
  const cloneRef = useRef<HTMLElement | null>(null);

  const [from, setFrom] = useState<string | undefined>();

  return (
    <TransitionRouter
      auto
      leave={(next, from, to) => {
        setFrom(from);

        if (from === "/") {
          // navigate from the grid to a page

          const elements = document.querySelectorAll(
            `#grid > *:not([href="${to}"]) > *`
          );

          const currentElement = document.querySelector(
            `#grid > [href="${to}"] > *`
          );

          if (currentElement) {
            // store the clicked element
            cloneRef.current = cloneElement(
              currentElement as HTMLElement,
              FLIP_ID
            );
          }

          // all boxes except the clicked one are going to fade out
          gsap.fromTo(
            elements,
            { autoAlpha: 1 },
            { autoAlpha: 0, duration: 0.6, stagger: 0.2, onComplete: next }
          );
        } else if (from?.includes("/p/")) {
          // navigate from a page to the grid

          const targetElement = document.querySelector(TARGET_SELECTOR);

          if (targetElement) {
            // store the target element
            cloneRef.current = cloneElement(
              targetElement as HTMLElement,
              FLIP_ID
            );
          }

          next();
        } else {
          next();
        }
      }}
      enter={(next) => {
        if (cloneRef.current) {
          const sourceElement = cloneRef.current;
          let targetElement;

          if (from === "/") {
            targetElement = document.querySelector(TARGET_SELECTOR);
          } else {
            targetElement = document.querySelector(
              `[href="${from}"] > *`
            ) as HTMLElement;

            // add a flip id to the target (link) element
            targetElement.dataset.flipId = FLIP_ID;

            // avoid z-index issues
            targetElement.style.zIndex = "10";

            // fade in the grid elements
            gsap.fromTo(
              `#grid > *:not([href="${from}"]) > *`,
              { autoAlpha: 0 },
              { autoAlpha: 1, duration: 0.6, stagger: 0.2 }
            );
          }

          flipAnimate(
            sourceElement,
            targetElement as HTMLElement,
            cloneRef,
            next
          );
        } else {
          next();
        }
      }}
    >
      {children}
    </TransitionRouter>
  );
}
