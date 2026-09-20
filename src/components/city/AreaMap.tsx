import { cities } from "@/data/cities";
import { serviceArea } from "@/data/service-area";

export default function AreaMap() {
  const point = (lat: number, lon: number) => ({
    x:
      280 +
      (lon - serviceArea.center.longitude) *
        111.2 *
        Math.cos((serviceArea.center.latitude * Math.PI) / 180) *
        7.1,
    y: 280 - (lat - serviceArea.center.latitude) * 111.2 * 7.1,
  });
  const labels: Record<string, { dx: number; dy: number }> = {
    nuernberg: { dx: 12, dy: 19 },
    fuerth: { dx: -38, dy: -12 },
    erlangen: { dx: 12, dy: 3 },
    schwabach: { dx: 12, dy: 4 },
    hersbruck: { dx: -62, dy: -13 },
    roth: { dx: 12, dy: 4 },
  };
  return (
    <figure className="overflow-hidden rounded-3xl border border-sky-100 bg-[#f3f9fd] p-3 dark:border-slate-700 dark:bg-slate-800 sm:p-5">
      <svg
        viewBox="0 0 560 560"
        className="h-auto w-full"
        role="img"
        aria-labelledby="area-map-title area-map-desc"
      >
        <title id="area-map-title">Einsatzgebiet um Nürnberg</title>
        <desc id="area-map-desc">
          Schematische Lage der 97 Städte und Gemeinden, deren amtlicher
          Mittelpunkt innerhalb von 30 Kilometern Luftlinie um Nürnberg
          Hauptbahnhof liegt. Vollständige Ortsliste unterhalb der Karte.
        </desc>
        <circle
          cx="280"
          cy="280"
          r="213"
          fill="#e0f2fe"
          stroke="#0284c7"
          strokeWidth="2"
          strokeDasharray="6 7"
        />
        <circle
          cx="280"
          cy="280"
          r="142"
          fill="none"
          stroke="#7dd3fc"
          strokeWidth="1"
        />
        <circle
          cx="280"
          cy="280"
          r="71"
          fill="none"
          stroke="#7dd3fc"
          strokeWidth="1"
        />
        <path d="M280 58V502M58 280H502" stroke="#bae6fd" strokeWidth="1" />
        <text
          x="280"
          y="42"
          textAnchor="middle"
          fill="#075985"
          fontSize="14"
          fontWeight="600"
        >
          NORD · 30 KM LUFTLINIE
        </text>
        {cities.map((city) => {
          const p = point(city.latitude, city.longitude);
          const offset = labels[city.slug];
          return (
            <g key={city.slug}>
              <circle
                cx={p.x}
                cy={p.y}
                r={offset ? 5 : 2.7}
                fill={offset ? "#075985" : "#38bdf8"}
              />
              <title>{`${city.name}: ${city.distance.toLocaleString("de-DE")} km`}</title>
              {offset ? (
                <text
                  x={p.x + offset.dx}
                  y={p.y + offset.dy}
                  fill="#0c4a6e"
                  fontSize="13"
                  fontWeight="600"
                >
                  {city.name}
                </text>
              ) : null}
            </g>
          );
        })}
        <circle
          cx="280"
          cy="280"
          r="4"
          fill="#f59e0b"
          stroke="white"
          strokeWidth="1.5"
        />
        <text x="280" y="535" textAnchor="middle" fill="#075985" fontSize="13">
          Ausgangspunkt: Nürnberg Hauptbahnhof
        </text>
      </svg>
      <figcaption className="px-3 pb-3 text-center text-xs leading-relaxed text-slate-600 dark:text-slate-300">
        Schematische Lage, keine Straßenkarte. Die genaue Objektadresse
        entscheidet über die Abdeckung am Rand.
      </figcaption>
    </figure>
  );
}
