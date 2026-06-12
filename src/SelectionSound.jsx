import { useEffect } from "react";
import { playSelectSound } from "./selectSound";

const SELECTOR = [
  "button",
  "a",
  "[role='button']",
  ".p3-row",
  ".sc-bar-outer",
  ".resume-card-wrap",
  ".resume-more-card",
  ".contact-row",
].join(",");

function isSelectable(target) {
  const element = target instanceof Element ? target.closest(SELECTOR) : null;
  if (!element) return false;
  if (element.getAttribute("aria-disabled") === "true") return false;
  if ("disabled" in element && element.disabled) return false;
  return true;
}

export default function SelectionSound() {
  useEffect(() => {
    const onClick = (event) => {
      if (isSelectable(event.target)) playSelectSound();
    };

    const onKeyDown = (event) => {
      if (event.repeat) return;
      if (event.key !== "Enter" && event.key !== " ") return;
      playSelectSound();
    };

    window.addEventListener("click", onClick, true);
    window.addEventListener("keydown", onKeyDown, true);

    return () => {
      window.removeEventListener("click", onClick, true);
      window.removeEventListener("keydown", onKeyDown, true);
    };
  }, []);

  return null;
}
