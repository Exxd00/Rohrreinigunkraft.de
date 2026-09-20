"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";

type Entry = {
  name: string;
  slug: string;
  distance: number;
  isCity: boolean;
  region: string;
};
const normalize = (value: string) =>
  value
    .toLocaleLowerCase("de-DE")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ß/g, "ss");

export default function CityDirectory({ entries }: { entries: Entry[] }) {
  const [query, setQuery] = useState("");
  const [onlyCities, setOnlyCities] = useState(false);
  const search = normalize(query.trim());
  const filtered = entries.filter(
    (city) =>
      (!onlyCities || city.isCity) &&
      normalize(`${city.name} ${city.slug}`).includes(search),
  );
  return (
    <div>
      <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900 md:flex-row md:items-end md:justify-between">
        <div className="w-full md:max-w-md">
          <label
            htmlFor="city-search"
            className="mb-2 block text-sm font-semibold"
          >
            Stadt oder Gemeinde suchen
          </label>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
            <input
              id="city-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Zum Beispiel Nürnberg, Feucht oder Stein"
              className="min-h-12 w-full rounded-lg border border-slate-300 bg-white py-3 pl-10 pr-3 text-base text-slate-900 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200 dark:border-slate-600 dark:bg-slate-950 dark:text-white"
            />
          </div>
        </div>
        <label className="flex min-h-12 cursor-pointer items-center gap-3 text-sm font-medium">
          <input
            type="checkbox"
            checked={onlyCities}
            onChange={(event) => setOnlyCities(event.target.checked)}
            className="h-5 w-5 accent-sky-600"
          />
          Nur Städte anzeigen
        </label>
      </div>
      <p
        role="status"
        aria-live="polite"
        className="my-5 text-sm text-slate-600 dark:text-slate-300"
      >
        {filtered.length} von {entries.length} Orten · alphabetisch sortiert
      </p>
      {filtered.length ? (
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((city) => (
            <li key={city.slug}>
              <Link
                href={`/${city.slug}`}
                className="group flex h-full min-h-24 items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-5 transition-colors hover:border-sky-500 dark:border-slate-700 dark:bg-slate-900"
              >
                <div className="min-w-0">
                  <h3 className="break-words font-semibold leading-snug text-slate-900 group-hover:text-sky-700 dark:text-white dark:group-hover:text-sky-300">
                    {city.name}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                    {city.distance.toLocaleString("de-DE")} km Luftlinie ·{" "}
                    {city.region}
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 shrink-0 text-sky-700 dark:text-sky-300" />
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center">
          <p className="font-semibold">Kein passender Ort gefunden.</p>
          <p className="mt-2 leading-relaxed text-slate-600 dark:text-slate-300">
            Versuchen Sie den vollständigen Ortsnamen oder lassen Sie die
            konkrete Adresse telefonisch prüfen.
          </p>
          <button
            onClick={() => {
              setQuery("");
              setOnlyCities(false);
            }}
            className="mt-4 min-h-11 rounded-lg border border-slate-300 px-5 py-2 font-semibold"
          >
            Alle Orte anzeigen
          </button>
        </div>
      )}
    </div>
  );
}
