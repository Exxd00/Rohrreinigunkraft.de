"use client";
import { useEffect, useState } from "react";

/** Keep the static list crawlable, then restore shareable filters after hydration. */
export function useDirectoryFilters<T extends Record<string, string>>(
  defaults: T,
  choices: Partial<Record<keyof T, readonly string[]>>,
) {
  const [filters, setFilters] = useState<T>(defaults);
  useEffect(() => {
    const restore = () => {
      const params = new URLSearchParams(window.location.search);
      const next = { ...defaults };
      for (const key of Object.keys(defaults) as (keyof T & string)[]) {
        const value = params.get(key);
        if (value !== null && (!choices[key] || choices[key]!.includes(value)))
          next[key] = value.slice(0, 100) as T[typeof key];
      }
      setFilters(next);
    };
    restore();
    window.addEventListener("popstate", restore);
    return () => window.removeEventListener("popstate", restore);
  }, [defaults, choices]);
  const update = (change: Partial<T>) => {
    const next = { ...filters, ...change };
    setFilters(next);
    const url = new URL(window.location.href);
    for (const key of Object.keys(defaults)) {
      if (next[key] === defaults[key]) url.searchParams.delete(key);
      else url.searchParams.set(key, next[key]);
    }
    window.history.replaceState(
      window.history.state,
      "",
      `${url.pathname}${url.search}${url.hash}`,
    );
  };
  return {
    filters,
    update,
    reset: () => update(defaults),
    active: Object.keys(defaults).some((key) => filters[key] !== defaults[key]),
  };
}
