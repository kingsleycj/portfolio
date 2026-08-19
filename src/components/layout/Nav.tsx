"use client";

import { useEffect, useState } from "react";

import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { cn } from "@/lib/cn";

const SECTIONS = [
  { id: "about", label: "About" },
  { id: "experience", label: "Path" },
  { id: "projects", label: "Work" },
  { id: "skills", label: "Skills" },
  { id: "currently", label: "Now" },
  { id: "contact", label: "Contact" },
] as const;

/**
 * Floating dock nav.
 *
 * Active section comes from an IntersectionObserver watching a band across the
 * middle of the viewport, rather than from scroll offsets — it stays correct
 * when sections differ wildly in height, which these do.
 */
export function Nav() {
  const [active, setActive] = useState<string>("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const sections = SECTIONS.map(({ id }) =>
      document.getElementById(id),
    ).filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActive(visible.target.id);
      },
      // A thin band at roughly the vertical centre: whatever crosses it is "current".
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 120);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      aria-label="Section navigation"
      className="fixed inset-x-0 top-4 z-40 flex justify-center px-3 sm:px-4"
    >
      {/* The section links scroll inside the pill; the theme toggle sits outside
          that scroll area so it stays reachable on a narrow phone rather than
          disappearing off the end of the list. */}
      <div
        className={cn(
          "flex max-w-full items-center rounded-full border p-1 transition-all duration-300 sm:p-1.5",
          scrolled
            ? "border-line-strong bg-paper/85 shadow-[0_8px_30px_-12px_rgba(28,22,19,0.35)] backdrop-blur-md"
            : "border-transparent bg-transparent",
        )}
      >
        {/* Fades the right edge on narrow screens, so a half-visible label reads
            as "this scrolls" rather than as a clipped bug. Removed once every
            item fits. */}
        <ul className="flex min-w-0 items-center gap-1 overflow-x-auto [mask-image:linear-gradient(to_right,black_calc(100%-1.75rem),transparent)] [scrollbar-width:none] sm:[mask-image:none] [&::-webkit-scrollbar]:hidden">
          {SECTIONS.map(({ id, label }) => {
            const isActive = active === id;
            return (
              <li key={id} className="shrink-0">
                <a
                  href={`#${id}`}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    // min-h keeps every dock item above the 24px touch-target
                    // floor once the mobile type step-down shrinks the label.
                    "text-meta flex min-h-9 items-center rounded-full px-2.5 text-[0.6875rem] transition-colors duration-200 sm:px-3.5 sm:text-xs",
                    isActive
                      ? "bg-ink text-paper"
                      : "text-ink-faint hover:bg-terracotta-wash hover:text-terracotta-deep",
                  )}
                >
                  {label}
                </a>
              </li>
            );
          })}
        </ul>

        <span aria-hidden="true" className="mx-1 h-5 w-px shrink-0 bg-line" />
        <ThemeToggle className="shrink-0" />
      </div>
    </nav>
  );
}
