import { gsap } from "gsap";
import Flip from "gsap/Flip";

gsap.registerPlugin(Flip);

/**
 * Animates an element from source to target position using GSAP Flip
 * @param sourceElement - The element to animate from
 * @param targetElement - The element to animate to
 * @param clone - Ref object holding the cloned element
 * @param next - Callback function to execute after animation
 */
export function flipAnimate(
  sourceElement: HTMLElement,
  targetElement: HTMLElement,
  clone: { current: HTMLElement | null },
  next: () => void
) {
  document.body.appendChild(sourceElement);

  const state = Flip.getState(sourceElement);

  Flip.from(state, {
    targets: targetElement,
    absolute: true,
    ease: "power1.inOut",
    duration: 0.6,
    onStart: () => {
      targetElement.style.visibility = "visible";
      sourceElement.style.visibility = "hidden";
    },
    onComplete: () => {
      sourceElement.remove();
      clone.current = null;
      next();
    },
  });
}

/**
 * Creates a fixed-position clone of an HTML element for GSAP Flip animations
 * @param element - The source HTML element to clone
 * @param flipId - Unique identifier for GSAP Flip to track the element
 * @returns A cloned element with fixed positioning and the same dimensions/position as the original
 */
export function cloneElement(
  element: HTMLElement,
  flipId: string
): HTMLElement {
  const clonedElement = element.cloneNode(true) as HTMLElement;

  const rect = element.getBoundingClientRect();

  clonedElement.style.position = "fixed";
  clonedElement.style.width = `${rect.width}px`;
  clonedElement.style.height = `${rect.height}px`;
  clonedElement.style.left = `${rect.left + window.scrollX}px`;
  clonedElement.style.top = `${rect.top + window.scrollY}px`;
  clonedElement.style.pointerEvents = "none";
  clonedElement.dataset.flipId = flipId;

  return clonedElement;
}
