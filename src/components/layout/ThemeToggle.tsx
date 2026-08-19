"use client";

import { useCallback, useSyncExternalStore } from "react";

import { cn } from "@/lib/cn";

type Theme = "light" | "dark";

/**
 * The theme lives on `<html data-theme>`, written by the inline script in
 * layout.tsx before first paint. That makes it external state, so it is read
 * with `useSyncExternalStore` rather than mirrored into React state — the
 * button stays correct even if the attribute is changed from anywhere else.
 *
 * Light is the default and the OS preference is not consulted; dark is opt-in
 * and, once chosen, persists. So there is no media-query listener here — a
 * visitor's system flipping to dark should not move a page they never set.
 */
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

function getSnapshot(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

/** Unknowable on the server — the button gets a neutral label until hydration. */
function getServerSnapshot(): Theme | null {
  return null;
}

export function ThemeToggle({ className }: { className?: string }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = useCallback(() => {
    const root = document.documentElement;
    const next: Theme = root.dataset.theme === "dark" ? "light" : "dark";

    // Colours cross-fade only for the length of the switch, then the transition
    // rule comes off again so it costs nothing for the rest of the session.
    root.classList.add("theme-transition");
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Private browsing or blocked storage: the switch still works for this
      // page view, it just will not be remembered.
    }
    window.setTimeout(() => root.classList.remove("theme-transition"), 320);
  }, []);

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={
        theme
          ? `Switch to ${theme === "dark" ? "light" : "dark"} theme`
          : "Switch colour theme"
      }
      className={cn(
        "flex min-h-9 items-center justify-center rounded-full px-2.5 text-ink-faint transition-colors duration-200 hover:bg-terracotta-wash hover:text-terracotta-deep sm:px-3",
        className,
      )}
    >
      {/* Which icon shows is decided in CSS off `[data-theme]`, so the button is
          already correct in the server-rendered HTML, before hydration. */}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        className="hidden h-4 w-4 [[data-theme='dark']_&]:block"
        focusable="false"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4.2" />
        <path d="M12 3v2.2M12 18.8V21M3 12h2.2M18.8 12H21M5.6 5.6l1.6 1.6M16.8 16.8l1.6 1.6M18.4 5.6l-1.6 1.6M7.2 16.8l-1.6 1.6" />
      </svg>

      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4 [[data-theme='dark']_&]:hidden"
        focusable="false"
        aria-hidden="true"
      >
        <path d="M20.2 14.4A8.4 8.4 0 0 1 9.6 3.8a8.4 8.4 0 1 0 10.6 10.6Z" />
      </svg>
    </button>
  );
}
