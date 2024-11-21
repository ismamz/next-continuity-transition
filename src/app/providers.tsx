"use client";

import { TransitionRouter } from "next-transition-router";
import { gsap } from "gsap";
import { useRef, useState } from "react";
import Flip from "gsap/Flip";

gsap.registerPlugin(Flip);

function cloneElement(element: HTMLElement): HTMLElement {
  const clonedElement = element.cloneNode(true) as HTMLElement;

  const rect = element.getBoundingClientRect();

  clonedElement.style.position = "fixed";
  clonedElement.style.width = `${rect.width}px`;
  clonedElement.style.height = `${rect.height}px`;
  clonedElement.style.left = `${rect.left + window.scrollX}px`;
  clonedElement.style.top = `${rect.top + window.scrollY}px`;
  clonedElement.style.pointerEvents = "none";
  clonedElement.dataset.flipId = "test";

  return clonedElement;
}

export function Providers({ children }: { children: React.ReactNode }) {
  const clonedElementRef = useRef<HTMLElement | null>(null);
  const clonedBackRef = useRef<HTMLElement | null>(null);
  const [from, setFrom] = useState<string | null>(null);

  return (
    <TransitionRouter
      auto
      leave={(next, from, to) => {
        setFrom(from as string);

        if (from === "/") {
          const elements = document.querySelectorAll(
            "#grid > *:not([href='" + to + "']) > *"
          );

          const currentElement = document.querySelector(
            "#grid > [href='" + to + "'] > *"
          );

          if (currentElement) {
            clonedElementRef.current = cloneElement(
              currentElement as HTMLElement
            );
          }

          gsap.fromTo(
            elements,
            { autoAlpha: 1 },
            { autoAlpha: 0, duration: 0.6, stagger: 0.2, onComplete: next }
          );
        } else if (from?.includes("/p/")) {
          const targetElement = document.querySelector("#final") as HTMLElement;

          if (targetElement) {
            clonedBackRef.current = cloneElement(targetElement as HTMLElement);
          }

          next();
        } else {
          next();
        }
      }}
      enter={(next) => {
        if (clonedElementRef.current) {
          const sourceElement = clonedElementRef.current as HTMLElement;
          const targetElement = document.querySelector("#final") as HTMLElement;

          document.body.appendChild(sourceElement as HTMLElement);

          const state = Flip.getState(sourceElement);

          Flip.from(state, {
            targets: targetElement,
            absolute: true,
            ease: "power1.inOut",
            duration: 0.8,
            onStart: () => {
              targetElement.style.visibility = "visible";
              sourceElement.style.visibility = "hidden";
            },
            onComplete: () => {
              sourceElement.remove();
              clonedElementRef.current = null;
              next();
            },
          });
        } else if (clonedBackRef.current) {
          const sourceElement = clonedBackRef.current as HTMLElement;
          const targetElement = document.querySelector(
            `[href="${from}"] > *`
          ) as HTMLElement;
          targetElement.dataset.flipId = "test";

          document.body.appendChild(sourceElement as HTMLElement);

          const state = Flip.getState(sourceElement);

          Flip.from(state, {
            targets: targetElement,
            absolute: true,
            ease: "power1.inOut",
            duration: 0.5,
            onStart: () => {
              targetElement.style.visibility = "visible";
              sourceElement.style.visibility = "hidden";
            },
            onComplete: () => {
              sourceElement.remove();
              clonedBackRef.current = null;
              next();
            },
          });
        } else {
          next();
        }
      }}
    >
      {children}
    </TransitionRouter>
  );
}
