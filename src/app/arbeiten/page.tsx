"use client";

import TrackedPhoneLink from "@/components/ui/tracked-phone-link";

import Link from "next/link";
import { Phone, Camera, Wrench, AlertCircle, Search, Construction, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { gallery } from "@/data/company";
import { company } from "@/data/company";
import { useState } from "react";
import VideoShowcase from "@/components/home/VideoShowcase";

const categoryIcons: Record<string, React.ElementType> = {
  Kanalreinigung: Wrench,
  Inspektion: Camera,
  Rohrreinigung: Search,
  Notdienst: AlertCircle,
  Sanierung: Construction,
};

const categories = ["Alle", ...new Set(gallery.map((item) => item.category))];

export default function ArbeitenPage() {
  const [selectedCategory, setSelectedCategory] = useState("Alle");

  const filteredGallery = selectedCategory === "Alle"
    ? gallery
    : gallery.filter((item) => item.category === selectedCategory);

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-12 bg-gradient-to-br from-[#F8FBFF] via-white to-[#E8F4FF] dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Unsere <span className="text-gradient">Arbeiten</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Einblicke in unsere professionellen Einsätze.
              Überzeugen Sie sich von unserer Arbeit.
            </p>
          </div>
        </div>
      </section>

      {/* Video Showcase - Real footage from our jobs */}
      <VideoShowcase />

      {/* Filter */}
      <section className="py-8 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 sticky top-16 z-40">
        <div className="container mx-auto px-4">
          <div className="flex justify-center gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="shrink-0"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12 bg-gray-50 dark:bg-gray-800/50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredGallery.map((item) => (
                <Link
                  key={item.id}
                  href={`/service/${item.serviceSlug}`}
                  className="group relative rounded-2xl overflow-hidden cursor-pointer hover-lift aspect-square block"
                >
                  {/* Real image */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />

                  {/* Dark overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {/* Content overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                    <h3 className="font-semibold text-sm line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-xs opacity-80 line-clamp-1 mt-1">
                      {item.description}
                    </p>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/30 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg transform scale-50 group-hover:scale-100 transition-transform">
                      <ArrowRight className="w-5 h-5 text-gray-900" />
                    </div>
                  </div>

                  {/* Category Badge */}
                  <Badge className="absolute top-2 left-2 bg-white/90 text-gray-700">
                    {item.category}
                  </Badge>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Interesse an unseren Leistungen?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Kontaktieren Sie uns für eine kostenlose Beratung!
            </p>
            <TrackedPhoneLink source="arbeiten_cta" href={`tel:${company.contact.phone}`}>
              <Button size="lg" className="gradient-primary text-white h-14 px-8">
                <Phone className="w-5 h-5 mr-2" />
                {company.contact.phoneDisplay}
              </Button>
            </TrackedPhoneLink>
          </div>
        </div>
      </section>
    </>
  );
}
