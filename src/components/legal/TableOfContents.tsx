"use client";

import { useEffect, useState, type ReactElement } from "react";
import { cn } from "@/lib/utils";
import type { TocItem } from "./legal-types";

interface TableOfContentsProps {
  items: TocItem[];
  label?: string;
}

export function TableOfContents({
  items,
  label = "Sommaire",
}: Readonly<TableOfContentsProps>): ReactElement {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? "");

  useEffect(() => {
    if (typeof window === "undefined" || items.length === 0) return;

    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              (a.target as HTMLElement).offsetTop -
              (b.target as HTMLElement).offsetTop,
          );

        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-30% 0px -60% 0px",
        threshold: [0, 0.1, 0.5, 1],
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav aria-label={label} className="text-sm">
      <p className="mb-4 font-heading text-xs font-extrabold uppercase tracking-wider text-conteo-text-muted">
        {label}
      </p>
      <ol className="space-y-1 border-l border-conteo-light">
        {items.map((item, index) => {
          const isActive = activeId === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={cn(
                  "group relative -ml-px flex gap-3 border-l-2 py-1.5 pl-4 pr-2 text-[13px] leading-5 transition-colors",
                  isActive
                    ? "border-conteo-secondary font-semibold text-conteo-secondary"
                    : "border-transparent text-conteo-text-muted hover:border-conteo-secondary/40 hover:text-conteo-dark",
                )}
              >
                <span
                  aria-hidden="true"
                  className="shrink-0 tabular-nums opacity-60"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>{item.label}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
