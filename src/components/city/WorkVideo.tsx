import Link from "next/link";
import { ArrowRight, Film } from "lucide-react";
import { workVideos } from "@/data/company";
/** Existing company footage illustrates the method; it is not city-specific evidence. */
export default function WorkVideo({ serviceSlug }: { serviceSlug?: string }) {
  const id =
    serviceSlug && /kanal|schacht|wurzel/.test(serviceSlug)
      ? "einsatz-kanal"
      : serviceSlug &&
          /rohrreinigung|abfluss|verstopft/.test(serviceSlug) &&
          !/wartung/.test(serviceSlug)
        ? "einsatz-rohr"
        : "kamerabefahrung-stromkabel";
  const video = workVideos.find((item) => item.id === id)!;
  const caption =
    id === "einsatz-kanal"
      ? "Im Video sehen Sie Ablagerungen in einem Kanalschacht vor dem Einsatz. Welche Reinigung passt, hängt vom Zugang und Zustand der Leitung ab."
      : id === "einsatz-rohr"
        ? "Die Aufnahme zeigt Ablagerungen im Inneren einer Rohrleitung. Ein solcher Befund hilft, die weiteren Arbeitsschritte zu erklären."
        : "Die Kamerafahrt zeigt ein Hindernis in einer Abwasserleitung. Eine Aufnahme kann helfen, die Ursache einzugrenzen und die nächsten Schritte zu besprechen.";
  return (
    <section
      className="border-y border-slate-200 bg-slate-50 py-12 dark:border-slate-800 dark:bg-slate-900 md:py-16"
      aria-label="Einblick in unsere Arbeit"
    >
      <div className="container mx-auto grid max-w-6xl items-center gap-8 px-4 lg:grid-cols-2 lg:gap-12">
        <div>
          <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-sky-700 dark:text-sky-300">
            <Film className="h-4 w-4" aria-hidden="true" />
            Einblick in unsere Arbeit
          </p>
          <h2 className="mt-3 text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
            {video.shortTitle}: ein Beispiel aus der Praxis
          </h2>
          <p className="mt-5 leading-relaxed text-slate-600 dark:text-slate-300">
            {caption}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
            Firmenaufnahme zur Veranschaulichung. Sie dokumentiert keinen
            Einsatz an Ihrem Ort. Das Video startet erst, wenn Sie es abspielen.
          </p>
          <Link
            href="/arbeiten"
            className="mt-5 inline-flex min-h-12 items-center gap-2 font-semibold text-sky-800 underline underline-offset-4 dark:text-sky-300"
          >
            Weitere Einblicke in unsere Arbeit
            <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
          </Link>
        </div>
        <figure className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-950">
          <div className="aspect-video bg-slate-950">
            <video
              controls
              playsInline
              preload="none"
              poster={video.poster}
              aria-label={video.title}
              aria-describedby={`video-${id}-caption`}
              className="h-full w-full object-contain"
            >
              <source src={video.src} type="video/mp4" />
              Ihr Browser kann dieses Video nicht wiedergeben.{" "}
              <a href={video.src}>Video öffnen</a>
            </video>
          </div>
          <figcaption
            id={`video-${id}-caption`}
            className="p-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300"
          >
            <span className="font-semibold text-slate-900 dark:text-white">
              {video.title}
            </span>{" "}
            · {video.duration}
            <br />
            {caption}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
