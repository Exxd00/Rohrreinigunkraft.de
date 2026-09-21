"use client";
import Link from "next/link";
import { ArrowRight, MapPin, Search, RotateCcw } from "lucide-react";
import { filterCities, type CityDirectoryEntry } from "@/lib/directory";
import { useDirectoryFilters } from "@/components/directory/useDirectoryFilters";
const defaults = { q: "", radius: "30", type: "all", sort: "name" };
const choices = {
  radius: ["10", "20", "30"],
  type: ["all", "city", "municipality"],
  sort: ["name", "distance"],
};
const field =
  "mt-2 min-h-12 w-full min-w-0 rounded-xl border border-slate-300 bg-white px-3 text-base text-slate-900 dark:border-slate-600 dark:bg-slate-950 dark:text-white";

export default function CityDirectory({
  entries,
}: {
  entries: CityDirectoryEntry[];
}) {
  const { filters, update, reset, active } = useDirectoryFilters(
    defaults,
    choices,
  );
  const results = filterCities(entries, filters);
  return (
    <>
      <div className="rounded-2xl border border-sky-100 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900 sm:p-6">
        <label htmlFor="city-search" className="block font-semibold">
          Stadt, Gemeinde oder PLZ suchen
        </label>
        <div className="relative">
          <Search
            aria-hidden="true"
            className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500"
          />
          <input
            id="city-search"
            type="search"
            maxLength={100}
            autoComplete="off"
            placeholder="Zum Beispiel Nürnberg, Fürth oder 90513"
            value={filters.q}
            onChange={(e) => update({ q: e.target.value })}
            className={`${field} pl-12`}
          />
        </div>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          Die PLZ steht für den Verwaltungssitz. Die genaue Einsatzadresse
          klären wir vor der Zusage.
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          <label className="text-sm font-semibold" htmlFor="city-radius">
            Entfernung ab Nürnberg Hbf
            <select
              id="city-radius"
              value={filters.radius}
              onChange={(e) => update({ radius: e.target.value })}
              className={field}
            >
              <option value="30">Bis 30 km · gesamtes Gebiet</option>
              <option value="20">Bis 20 km Luftlinie</option>
              <option value="10">Bis 10 km Luftlinie</option>
            </select>
          </label>
          <label className="text-sm font-semibold" htmlFor="city-type">
            Ortstyp
            <select
              id="city-type"
              value={filters.type}
              onChange={(e) => update({ type: e.target.value })}
              className={field}
            >
              <option value="all">Alle Orte</option>
              <option value="city">Städte</option>
              <option value="municipality">Weitere Gemeinden</option>
            </select>
          </label>
          <label className="text-sm font-semibold" htmlFor="city-sort">
            Sortieren nach
            <select
              id="city-sort"
              value={filters.sort}
              onChange={(e) => update({ sort: e.target.value })}
              className={field}
            >
              <option value="name">Name A–Z</option>
              <option value="distance">Entfernung zum Zentrum</option>
            </select>
          </label>
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
          <p
            role="status"
            aria-live="polite"
            aria-atomic="true"
            className="text-sm text-slate-600 dark:text-slate-300"
          >
            <strong>{results.length}</strong> von {entries.length} Orten
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
        {results.map((city) => (
          <li key={city.slug}>
            <Link
              href={`/${city.slug}`}
              className="group flex h-full min-h-28 items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-5 transition-colors hover:border-sky-500 dark:border-slate-700 dark:bg-slate-900"
            >
              <div className="min-w-0">
                <h3 className="break-words text-lg font-bold text-slate-900 group-hover:text-sky-700 dark:text-white dark:group-hover:text-sky-300">
                  {city.name}
                </h3>
                <p className="mt-2 flex items-start gap-1.5 text-sm text-slate-600 dark:text-slate-400">
                  <MapPin
                    className="mt-0.5 h-4 w-4 shrink-0"
                    aria-hidden="true"
                  />
                  {city.distance.toLocaleString("de-DE")} km Luftlinie ·{" "}
                  {city.region}
                </p>
              </div>
              <ArrowRight
                className="h-5 w-5 shrink-0 text-sky-700 dark:text-sky-300"
                aria-hidden="true"
              />
            </Link>
          </li>
        ))}
      </ul>
      {results.length === 0 && (
        <div className="mt-6 rounded-2xl border border-dashed border-slate-300 p-6 text-center dark:border-slate-600">
          <h3 className="text-lg font-bold">
            Kein Ort passt zu diesen Filtern
          </h3>
          <p className="mt-2 text-slate-600 dark:text-slate-300">
            Prüfen Sie die Schreibweise oder vergrößern Sie die Entfernung auf
            30 km.
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-4 min-h-12 rounded-xl bg-sky-700 px-5 font-semibold text-white hover:bg-sky-800"
          >
            Alle Orte anzeigen
          </button>
        </div>
      )}
    </>
  );
}
