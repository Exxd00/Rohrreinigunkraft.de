"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { X, Volume2, VolumeX, Camera, Phone, ArrowRight, Maximize2 } from "lucide-react";
import { workVideos, company } from "@/data/company";
import { Button } from "@/components/ui/button";
import YouTubeFacade from "@/components/home/YouTubeFacade";

export default function VideoShowcase() {
  const featured = workVideos.find((v) => v.featured) ?? workVideos[0];
  const reels = workVideos.filter((v) => !v.featured);

  const [lightboxId, setLightboxId] = useState<string | null>(null);
  const [soundOn, setSoundOn] = useState(false);
  const featuredRef = useRef<HTMLVideoElement>(null);

  const activeVideo = workVideos.find((v) => v.id === lightboxId) ?? null;

  // Auto-play the featured clip (muted) once it scrolls into view — motion grabs attention
  useEffect(() => {
    const v = featuredRef.current;
    if (!v || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) v.play().catch(() => {});
          else v.pause();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(v);
    return () => observer.disconnect();
  }, []);

  const toggleSound = () => {
    const v = featuredRef.current;
    if (!v) return;
    const next = !soundOn;
    v.muted = !next;
    v.play().catch(() => {});
    setSoundOn(next);
  };

  // Escape to close lightbox + scroll lock
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxId(null);
    };
    if (lightboxId) {
      window.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightboxId]);

  return (
    <>
      <section
        id="videos"
        className="relative py-10 md:py-16 overflow-hidden bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950"
      >
        {/* Ambient glow */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-teal-500/10 rounded-full blur-[120px]" />
          {/* Subtle grid */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
        </div>

        <div className="container relative mx-auto px-4">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/15 text-primary font-semibold text-sm rounded-full mb-4 ring-1 ring-primary/30">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              Echte Einsätze auf Video
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Sehen Sie uns <span className="text-primary">bei der Arbeit</span>
            </h2>
            <p className="text-gray-300 md:text-lg">
              Ein Blick in die Leitung sagt mehr als viele Worte. Erleben Sie
              Rohrreinigung und Kamerainspektion anhand unserer Firmenaufnahmen.
            </p>
          </div>

          <p className="mx-auto mb-8 max-w-2xl text-center text-sm text-gray-400">Die Aufnahmen zeigen Beispiele unserer Arbeit in der Region, nicht jeden einzelnen Einsatzort.</p>

          {/* Vorher / Nachher — echte YouTube-Aufnahmen unserer Rohrreinigung */}
          <div className="max-w-5xl mx-auto mb-12 md:mb-16 grid gap-6 md:grid-cols-2 md:gap-8">
            {/* Vorher */}
            <div>
              <div className="mb-3 flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-500/15 px-3 py-1 text-sm font-bold text-orange-400 ring-1 ring-orange-500/30">
                  <span className="h-2 w-2 rounded-full bg-orange-500" />
                  Vorher
                </span>
              </div>
              <div className="overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/10">
                <YouTubeFacade videoId="VTKZqTzQyjs" title="Rohrreinigung – Vorher" />
              </div>
              <h4 className="mt-3 text-base md:text-lg font-bold text-white">
                Verstopfte Leitung
              </h4>
              <p className="mt-1 text-sm text-gray-400 leading-relaxed">
                Starke Ablagerungen und Schmutz verengen das Rohr – das Wasser läuft kaum noch ab.
              </p>
            </div>

            {/* Nachher */}
            <div>
              <div className="mb-3 flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-3 py-1 text-sm font-bold text-emerald-400 ring-1 ring-emerald-500/30">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  Nachher
                </span>
              </div>
              <div className="overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/10">
                <YouTubeFacade videoId="mmDZeTvNOJo" title="Rohrreinigung – Nachher" />
              </div>
              <h4 className="mt-3 text-base md:text-lg font-bold text-white">
                Saubere Leitung
              </h4>
              <p className="mt-1 text-sm text-gray-400 leading-relaxed">
                Nach unserer Reinigung ist das Rohr wieder komplett frei und glatt.
              </p>
            </div>
          </div>

          {/* Featured landscape video */}
          <div className="max-w-4xl mx-auto mb-8 md:mb-12">
            <div className="group relative rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/10 bg-black">
              <div className="relative aspect-video">
                <video
                  ref={featuredRef}
                  src={featured.src}
                  poster={featured.poster}
                  muted={!soundOn}
                  loop={!soundOn}
                  controls={soundOn}
                  playsInline
                  preload="none"
                  className="w-full h-full object-cover"
                  onEnded={() => setSoundOn(false)}
                />

                {!soundOn && (
                  <button
                    type="button"
                    onClick={toggleSound}
                    aria-label="Ton einschalten"
                    className="group/sound absolute inset-0 flex items-end justify-center pb-5 md:pb-6 bg-gradient-to-t from-black/60 via-transparent to-black/10"
                  >
                    <span className="flex items-center gap-2 px-5 py-3 rounded-full bg-white/95 text-gray-900 text-sm font-bold shadow-2xl group-hover/sound:scale-105 group-hover/sound:bg-white transition-all">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary" />
                      </span>
                      <VolumeX className="w-4 h-4" />
                      Tippen für Ton
                    </span>
                  </button>
                )}

                {!soundOn && (
                  <>
                    {/* REC badge */}
                    <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-sm text-white text-xs font-semibold tracking-wide pointer-events-none">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                      REC · Live-Kamerabefahrung
                    </div>
                    {/* Duration */}
                    <div className="absolute top-4 right-4 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-sm text-white text-xs font-mono pointer-events-none">
                      {featured.duration}
                    </div>
                  </>
                )}
              </div>

              {/* Caption */}
              <div className="p-5 md:p-6 bg-gradient-to-b from-gray-900 to-gray-950 border-t border-white/5">
                <div className="flex items-center gap-2 mb-2">
                  <Camera className="w-4 h-4 text-primary" />
                  <span className="text-primary text-xs font-semibold uppercase tracking-wider">
                    {featured.category}
                  </span>
                </div>
                <h3 className="text-white text-lg md:text-2xl font-bold mb-2">
                  {featured.title}
                </h3>
                <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                  {featured.description}
                </p>
              </div>
            </div>
          </div>

          {/* Portrait reels */}
          <div className="grid grid-cols-2 gap-4 md:gap-6 max-w-2xl mx-auto">
            {reels.map((reel) => (
              <button
                key={reel.id}
                type="button"
                onClick={() => setLightboxId(reel.id)}
                className="group relative rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-xl bg-black text-left"
              >
                <div className="relative aspect-[9/16]">
                  <img
                    src={reel.poster}
                    alt={reel.title}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/30" />

                  {/* Sound / expand hint */}
                  <div className="absolute top-3 right-3 flex items-center gap-1.5">
                    <span className="w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center opacity-90 group-hover:opacity-100">
                      <Volume2 className="w-4 h-4 text-white" />
                    </span>
                  </div>

                  {/* Label */}
                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="inline-block px-2 py-0.5 mb-1.5 rounded bg-primary text-white text-[10px] font-bold uppercase tracking-wide">
                      {reel.category}
                    </span>
                    <p className="text-white text-sm font-semibold leading-tight">
                      {reel.shortTitle}
                    </p>
                  </div>

                  {/* Hover play */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-xl">
                      <Maximize2 className="w-5 h-5 text-gray-900" />
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-12 md:mt-16">
            <p className="text-gray-300 mb-5">
              Ihr Rohr macht Probleme? Wir zeigen Ihnen per Kamera, was wirklich los ist.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href={`tel:${company.contact.phone}`}>
                <Button size="lg" className="h-14 px-8 gradient-primary text-white w-full sm:w-auto">
                  <Phone className="w-5 h-5 mr-2" />
                  {company.contact.phoneDisplay}
                </Button>
              </Link>
              <Link href="/arbeiten">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-14 px-8 border-white/20 text-white hover:bg-white/10 hover:text-white bg-transparent w-full sm:w-auto"
                >
                  Alle Arbeiten ansehen
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
          onClick={() => setLightboxId(null)}
        >
          <button
            type="button"
            onClick={() => setLightboxId(null)}
            aria-label="Schließen"
            className="absolute top-4 right-4 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <div
            className="relative flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              key={activeVideo.id}
              src={activeVideo.src}
              poster={activeVideo.poster}
              controls
              autoPlay
              playsInline
              className={
                activeVideo.orientation === "portrait"
                  ? "rounded-2xl shadow-2xl max-h-[82vh] w-auto"
                  : "rounded-2xl shadow-2xl max-w-[92vw] max-h-[82vh]"
              }
            />
            <div className="mt-4 text-center max-w-md">
              <h3 className="text-white font-bold text-lg">{activeVideo.title}</h3>
              <p className="text-gray-400 text-sm mt-1">{activeVideo.description}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
