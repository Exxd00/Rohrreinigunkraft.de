"use client";
import Link from "next/link";
import { ArrowRight, Search, RotateCcw } from "lucide-react";
import { services, serviceCategories } from "@/data/services";
import { matchesSearch, serviceHref } from "@/lib/directory";
import { useDirectoryFilters } from "./useDirectoryFilters";
import { useMemo } from "react";
const defaults = { q: "", category: "", city: "" };
const field =
  "mt-2 min-h-12 w-full min-w-0 rounded-xl border border-slate-300 bg-white px-3 text-base text-slate-900 dark:border-slate-600 dark:bg-slate-950 dark:text-white";
const aliases: Record<string, string> = {
  abflussreinigung: "WC Klo Toilette Dusche Waschbecken Küche Spüle",
  "toilette-verstopft": "WC Klo",
  "kueche-abfluss-verstopft": "Spüle Spuelbecken Küche",
  "kamera-inspektion": "TV Kamera Untersuchung",
  "rohrreinigung-notdienst": "Notfall Soforthilfe 24 Stunden",
};

export default function ServiceDirectory({
  towns,
  localSlugs,
}: {
  towns: { name: string; slug: string }[];
  localSlugs: string[];
}) {
  const choices = useMemo(
    () => ({
      category: ["", ...serviceCategories],
      city: ["", ...towns.map((town) => town.slug)],
    }),
    [towns],
  );
  const { filters, update, reset, active } = useDirectoryFilters(
    defaults,
    choices,
  );
  const city = towns.find((town) => town.slug === filters.city);
  const results = services.filter(
    (service) =>
      (!filters.category || service.category === filters.category) &&
      (!city || localSlugs.includes(service.slug)) &&
      matchesSearch(
        filters.q,
        service.name,
        service.shortDescription,
        service.category,
        aliases[service.slug] ?? "",
      ),
  );
  return (
    <>
      <div className="rounded-2xl border border-sky-100 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900 sm:p-6">
        <label htmlFor="service-search" className="block font-semibold">
          Welche Hilfe brauchen Sie?
        </label>
        <div className="relative">
          <Search
            className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500"
            aria-hidden="true"
          />
          <input
            id="service-search"
            type="search"
            maxLength={100}
            autoComplete="off"
            placeholder="Zum Beispiel WC, Dusche oder Kamera"
            className={`${field} pl-12`}
            value={filters.q}
            onChange={(e) => update({ q: e.target.value })}
          />
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <label htmlFor="service-category" className="text-sm font-semibold">
            Leistungsbereich
            <select
              id="service-category"
              className={field}
              value={filters.category}
              onChange={(e) => update({ category: e.target.value })}
            >
              <option value="">Alle Bereiche</option>
              {serviceCategories.map((category) => (
                <option key={category}>{category}</option>
              ))}
            </select>
          </label>
          <label htmlFor="service-city" className="text-sm font-semibold">
            Leistungen mit eigener Stadtseite
            <select
              id="service-city"
              className={field}
              value={filters.city}
              onChange={(e) => update({ city: e.target.value })}
            >
              <option value="">Alle Leistungen · ohne Stadtfilter</option>
              {towns.map((town) => (
                <option value={town.slug} key={town.slug}>
                  {town.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          {city
            ? `Für ${city.name} finden Sie hier die acht Kernleistungen mit örtlichen Hinweisen. Weitere Problemfälle erreichen Sie ohne Stadtfilter.`
            : "Vom einzelnen verstopften Ablauf bis zur Untersuchung einer Leitung: Wählen Sie Ihr Anliegen oder einen Leistungsbereich."}{" "}
          <Link
            href="/staedte"
            className="inline-flex min-h-11 items-center font-semibold text-sky-800 underline underline-offset-4 dark:text-sky-300"
          >
            Alle Städte und Gemeinden im Einsatzgebiet
          </Link>
        </p>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
          <p
            role="status"
            aria-live="polite"
            aria-atomic="true"
            className="text-sm text-slate-600 dark:text-slate-300"
          >
            <strong>{results.length}</strong>{" "}
            {city
              ? `Leistungen in ${city.name}`
              : "Leistungen und Problemfälle"}
          </p>
          {active && (
            <button
              type="button"
              onClick={reset}
              className="inline-flex min-h-11 items-center gap-2 rounded-lg px-3 text-sm font-semibold text-sky-800 hover:bg-sky-50 dark:text-sky-300 dark:hover:bg-slate-800"
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              Filter zurücksetzen
            </button>
          )}
        </div>
      </div>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {results.map((service) => (
          <li key={service.slug}>
            <Link
              href={serviceHref(
                service.slug,
                filters.city,
                localSlugs,
                towns.map((town) => town.slug),
              )}
              className="group flex h-full min-w-0 flex-col rounded-2xl border border-slate-200 bg-white p-5 transition-colors hover:border-sky-500 dark:border-slate-700 dark:bg-slate-900 sm:p-6"
            >
              <span className="w-fit rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-800 dark:bg-sky-950 dark:text-sky-200">
                {service.category}
              </span>
              <h2 className="mt-4 break-words text-xl font-bold text-slate-900 group-hover:text-sky-700 dark:text-white dark:group-hover:text-sky-300">
                {service.name}
              </h2>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {service.shortDescription}
              </p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-sky-800 dark:text-sky-300">
                {city ? `Ablauf in ${city.name}` : "Leistung ansehen"}
                <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
      {results.length === 0 && (
        <div className="mt-6 rounded-2xl border border-dashed border-slate-300 p-6 text-center dark:border-slate-600">
          <h2 className="text-lg font-bold">
            Keine passende Leistung gefunden
          </h2>
          <p className="mt-2 text-slate-600 dark:text-slate-300">
            Entfernen Sie einen Filter oder versuchen Sie ein anderes Stichwort.
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-4 min-h-12 rounded-xl bg-sky-700 px-5 font-semibold text-white hover:bg-sky-800"
          >
            Alle Leistungen anzeigen
          </button>
        </div>
      )}
    </>
  );
}
