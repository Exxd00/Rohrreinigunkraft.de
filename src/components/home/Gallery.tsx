"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, ZoomIn, X, ChevronLeft, ChevronRight, MoveHorizontal } from "lucide-react";
import { beforeAfterGallery, gallery } from "@/data/company";
import { Button } from "@/components/ui/button";

// Single work photos for the homepage grid (exclude the before/after pair to avoid duplicates)
const photoItems = gallery
  .filter(
    (g) =>
      g.image !== "/work/kanalreinigung-vorher.jpg" &&
      g.image !== "/work/kanalreinigung-nachher.jpg"
  )
  .slice(0, 6);

function InlineBeforeAfter({ before, after }: { before: string; after: string }) {
  const [pos, setPos] = useState(50);
  const [dragging, setDragging] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const move = useCallback((clientX: number) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = clientX - rect.left;
    setPos(Math.min(Math.max((x / rect.width) * 100, 3), 97));
  }, []);

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e: MouseEvent | TouchEvent) => {
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      move(clientX);
    };
    const onUp = () => setDragging(false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onMove);
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onUp);
    };
  }, [dragging, move]);

  return (
    <div
      ref={ref}
      className="relative w-full aspect-[4/3] md:aspect-[16/11] overflow-hidden rounded-2xl cursor-ew-resize select-none"
      onMouseDown={(e) => {
        setDragging(true);
        move(e.clientX);
      }}
      onTouchStart={(e) => {
        setDragging(true);
        move(e.touches[0].clientX);
      }}
    >
      {/* After (full) */}
      <img
        src={after}
        alt="Nachher"
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />
      {/* Before (clipped) */}
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
        <img
          src={before}
          alt="Vorher"
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full object-cover"
          style={{
            width: ref.current ? `${ref.current.offsetWidth}px` : "100%",
            maxWidth: "none",
          }}
          draggable={false}
        />
      </div>
      {/* Labels */}
      <span className="absolute top-3 left-3 px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-md shadow-lg uppercase tracking-wide">
        Vorher
      </span>
      <span className="absolute top-3 right-3 px-3 py-1 bg-primary text-white text-xs font-bold rounded-md shadow-lg uppercase tracking-wide">
        Nachher
      </span>
      {/* Handle */}
      <div
        className="absolute top-0 bottom-0 pointer-events-none"
        style={{ left: `${pos}%`, transform: "translateX(-50%)" }}
      >
        <div className="absolute inset-y-0 left-1/2 w-0.5 bg-white -translate-x-1/2" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white shadow-xl flex items-center justify-center border-4 border-primary">
          <MoveHorizontal className="w-5 h-5 text-primary" />
        </div>
      </div>
    </div>
  );
}

export default function Gallery() {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const pair = beforeAfterGallery[0];

  const close = () => setLightbox(null);
  const prev = () =>
    setLightbox((p) => (p === null ? p : p === 0 ? photoItems.length - 1 : p - 1));
  const next = () =>
    setLightbox((p) => (p === null ? p : p === photoItems.length - 1 ? 0 : p + 1));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    if (lightbox !== null) {
      window.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox]);

  const active = lightbox !== null ? photoItems[lightbox] : null;

  return (
    <>
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800/50">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 gap-4">
            <div>
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary font-semibold text-sm rounded-full mb-4">
                Echte Einsätze
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
                Unsere Arbeiten
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-xl">
                Echte Fotos aus unseren Rohr- und Kanaleinsätzen in Mittelfranken – keine
                Stockbilder.
              </p>
            </div>
            <Link href="/arbeiten">
              <Button variant="outline" className="group">
                Alle ansehen
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 items-start">
            {/* Featured before/after */}
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-3 shadow-lg">
              <InlineBeforeAfter before={pair.beforeImage} after={pair.afterImage} />
              <div className="p-4">
                <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded">
                  {pair.category}
                </span>
                <h3 className="font-bold text-gray-900 dark:text-white mt-2">{pair.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {pair.description}
                </p>
                <p className="text-xs text-primary mt-3 font-medium flex items-center gap-1.5">
                  <MoveHorizontal className="w-4 h-4" />
                  Schieberegler ziehen zum Vergleichen
                </p>
              </div>
            </div>

            {/* Photo grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {photoItems.map((item, i) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setLightbox(i)}
                  className="group relative aspect-square rounded-2xl overflow-hidden shadow hover:shadow-xl transition-all"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                  <span className="absolute bottom-2 left-2 right-2 text-white text-xs font-semibold leading-tight text-left line-clamp-2">
                    {item.title}
                  </span>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="w-11 h-11 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                      <ZoomIn className="w-5 h-5 text-gray-900" />
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {active && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Schließen"
            className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Vorheriges"
            className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Nächstes"
            className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
          <div className="max-w-3xl w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={active.image}
              alt={active.title}
              className="w-full max-h-[78vh] object-contain rounded-xl"
            />
            <div className="mt-4 text-center">
              <span className="px-2 py-1 bg-primary text-white text-xs font-medium rounded">
                {active.category}
              </span>
              <h3 className="text-white font-bold text-lg mt-2">{active.title}</h3>
              <p className="text-gray-400 text-sm mt-1">{active.description}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
