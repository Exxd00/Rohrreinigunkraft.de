"use client";

import { useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Send,
  Phone,
  Clock,
  Users,
  Loader2,
  CheckCircle,
  Zap,
  Upload,
  X,
  Camera,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { company } from "@/data/company";
import {
  compressImage,
  formatFileSize,
  type CompressedImage,
} from "@/lib/imageCompression";
import {
  trackPhoneClick,
  trackCTAClick,
  getCompleteTrackingData,
} from "@/lib/tracking";

interface FormData {
  name: string;
  phone: string;
  city: string;
  service: string;
  message: string;
}

const MAX_IMAGES = 3;

export default function ContactForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    city: "",
    service: "",
    message: "",
  });
  const [wantsToUpload, setWantsToUpload] = useState(false);
  const [images, setImages] = useState<CompressedImage[]>([]);
  const [isCompressing, setIsCompressing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [website, setWebsite] = useState("");
  const pendingEventId = useRef<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);
      if (files.length === 0) return;

      const remainingSlots = MAX_IMAGES - images.length;
      const filesToProcess = files.slice(0, remainingSlots);

      if (filesToProcess.length === 0) return;

      setIsCompressing(true);

      try {
        const compressedImages: CompressedImage[] = [];
        for (const file of filesToProcess) {
          const compressed = await compressImage(file);
          compressedImages.push(compressed);
        }
        setImages((prev) =>
          [...prev, ...compressedImages].slice(0, MAX_IMAGES),
        );
      } catch (error) {
        console.error("Error compressing images:", error);
      } finally {
        setIsCompressing(false);
        e.target.value = "";
      }
    },
    [images.length],
  );

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!privacyAccepted) {
      alert("Bitte akzeptieren Sie die Datenschutzerklärung.");
      return;
    }

    setIsSubmitting(true);

    // Get complete tracking data including GCLID, source, etc.
    const trackingData = getCompleteTrackingData();
    const eventId = pendingEventId.current || crypto.randomUUID();
    pendingEventId.current = eventId;

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          email: "",
          images: images.map((img) => img.dataUrl),
          // Include tracking data for Google Sheets
          gclid: trackingData.gclid,
          gbraid: trackingData.gbraid,
          wbraid: trackingData.wbraid,
          eventId,
          website,
          source: trackingData.source,
          medium: trackingData.medium,
          campaign: trackingData.campaign,
          landingPage: trackingData.landingPage,
          currentPage: trackingData.currentPage,
          referrer: trackingData.referrer,
          requestType: "contact",
        }),
      });

      const result = await response.json();

      if (response.ok && result.recorded === true) {
        pendingEventId.current = null;
        sessionStorage.setItem("form_submitted", "true");
        sessionStorage.setItem("kraft_form_event_id", eventId);
        router.push("/thank-you");
      } else {
        console.error("Form submission failed:", result);
        const errorMsg = result.details || result.error || "Unbekannter Fehler";
        alert(
          `Fehler: ${errorMsg}\n\nBitte rufen Sie uns direkt an: ${company.contact.phoneDisplay}`,
        );
      }
    } catch (error) {
      console.error("Form submission error:", error);
      alert(
        `Verbindungsfehler. Bitte rufen Sie uns an: ${company.contact.phoneDisplay}`,
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePhoneClick = () => {
    trackPhoneClick("contact_form");
  };

  const services = [
    "Toilette verstopft",
    "Rohrreinigung",
    "Kanalreinigung",
    "Abflussreinigung",
    "Notdienst 24/7",
    "Dusche verstopft",
    "Waschbecken verstopft",
    "Kamera-Inspektion",
    "Sonstiges",
  ];

  return (
    <section
      id="kontakt"
      className="py-6 md:py-16 bg-gray-50 dark:bg-gray-800/50"
    >
      <div className="container mx-auto px-2 md:px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-3 lg:gap-8">
            {/* Form */}
            <div className="bg-white dark:bg-gray-900 rounded-lg md:rounded-2xl p-4 md:p-6 shadow-xl border border-gray-100 dark:border-gray-700">
              {/* Urgency Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3 md:mb-4">
                <div className="flex items-center gap-1.5 md:gap-2">
                  <span className="relative flex h-2 w-2 md:h-3 md:w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/75 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 md:h-3 md:w-3 bg-primary"></span>
                  </span>
                  <span className="text-xs md:text-sm font-medium text-primary dark:text-[#3AB0FF]">
                    Verfügbarkeit telefonisch klären
                  </span>
                </div>
                <div className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                  Nürnberg & Umgebung
                </div>
              </div>

              <h2 className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white mb-1">
                Kostenlose Anfrage
              </h2>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-4 flex items-center gap-2">
                <Zap className="w-4 h-4 text-primary" />
                <span>Rückruf anfordern – bei akutem Rückstau bitte anrufen</span>
              </p>

              <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="contact-website">Website</label>
                  <input
                    id="contact-website"
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={website}
                    onChange={(event) => setWebsite(event.target.value)}
                  />
                </div>
                {/* Service Selection */}
                <div className="space-y-1">
                  <Label
                    htmlFor="service"
                    className="text-sm md:text-base font-medium"
                  >
                    Was ist das Problem? *
                  </Label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    className="w-full h-11 md:h-12 px-3 md:px-4 rounded-lg md:rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm md:text-base"
                  >
                    <option value="">Bitte wählen...</option>
                    {services.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Name Field */}
                <div className="space-y-1">
                  <Label
                    htmlFor="name"
                    className="text-sm md:text-base font-medium"
                  >
                    Name *
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Ihr Name"
                    required
                    className="h-11 md:h-12 rounded-lg md:rounded-xl text-sm md:text-base"
                  />
                </div>

                {/* Phone & City - Grid */}
                <div className="grid grid-cols-2 gap-2 md:gap-3">
                  <div className="space-y-1">
                    <Label
                      htmlFor="phone"
                      className="text-sm md:text-base font-medium"
                    >
                      Telefon *
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="0176..."
                      required
                      className="h-11 md:h-12 rounded-lg md:rounded-xl text-sm md:text-base"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label
                      htmlFor="city"
                      className="text-sm md:text-base font-medium"
                    >
                      Ort *
                    </Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="z.B. Nürnberg"
                      required
                      className="h-11 md:h-12 rounded-lg md:rounded-xl text-sm md:text-base"
                    />
                  </div>
                </div>

                {/* Problem Description */}
                <div className="space-y-1">
                  <Label
                    htmlFor="message"
                    className="text-sm md:text-base font-medium"
                  >
                    Beschreibung{" "}
                    <span className="text-gray-400 text-xs md:text-sm">
                      (optional)
                    </span>
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Beschreiben Sie kurz das Problem..."
                    rows={2}
                    className="resize-none rounded-lg md:rounded-xl text-sm md:text-base min-h-[60px] md:min-h-[70px]"
                  />
                </div>

                {/* Image Upload Toggle */}
                <div className="space-y-2 md:space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm md:text-base font-medium flex items-center gap-2">
                      <Camera className="w-4 h-4 text-gray-500" />
                      Fotos hochladen?
                    </Label>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setWantsToUpload(true)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                          wantsToUpload
                            ? "bg-primary text-white"
                            : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                        }`}
                      >
                        Ja
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setWantsToUpload(false);
                          setImages([]);
                        }}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                          !wantsToUpload
                            ? "bg-gray-600 text-white"
                            : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                        }`}
                      >
                        Nein
                      </button>
                    </div>
                  </div>

                  {/* Image Upload Section - Conditional */}
                  {wantsToUpload && (
                    <div className="space-y-2 md:space-y-3 animate-fade-in-up">
                      <div className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg md:rounded-xl p-3 md:p-4 text-center hover:border-primary/50 transition-colors bg-gray-50/50 dark:bg-gray-800/50">
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handleImageUpload}
                          className="hidden"
                          id="image-upload"
                          disabled={
                            images.length >= MAX_IMAGES || isCompressing
                          }
                        />
                        <label
                          htmlFor="image-upload"
                          className={`cursor-pointer flex flex-col items-center ${images.length >= MAX_IMAGES ? "opacity-50 cursor-not-allowed" : ""}`}
                        >
                          {isCompressing ? (
                            <Loader2 className="w-6 h-6 md:w-8 md:h-8 text-primary animate-spin mb-2" />
                          ) : (
                            <Upload className="w-6 h-6 md:w-8 md:h-8 text-gray-400 mb-2" />
                          )}
                          <span className="text-sm md:text-base text-gray-600 dark:text-gray-400">
                            {isCompressing
                              ? "Komprimieren..."
                              : "Klicken zum Hochladen"}
                          </span>
                          <span className="text-xs md:text-sm text-gray-500 mt-1">
                            Max. {MAX_IMAGES} Bilder
                          </span>
                        </label>
                      </div>

                      {/* Image previews */}
                      {images.length > 0 && (
                        <div className="grid grid-cols-3 gap-2 md:gap-3">
                          {images.map((image, index) => (
                            <div
                              key={index}
                              className="relative group aspect-square"
                            >
                              <img
                                src={image.dataUrl}
                                alt={`Upload ${index + 1}`}
                                className="w-full h-full object-cover rounded-lg md:rounded-xl border border-gray-200 dark:border-gray-700"
                              />
                              <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs p-1 rounded-b-lg md:rounded-b-xl text-center">
                                {formatFileSize(image.compressedSize)}
                              </div>
                              <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors"
                                aria-label="Bild entfernen"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Privacy Consent Checkbox */}
                <div className="flex items-start gap-2 md:gap-3">
                  <input
                    type="checkbox"
                    id="privacy"
                    checked={privacyAccepted}
                    onChange={(e) => setPrivacyAccepted(e.target.checked)}
                    className="mt-1 w-4 h-4 md:w-5 md:h-5 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
                    required
                  />
                  <label
                    htmlFor="privacy"
                    className="text-xs md:text-sm text-gray-600 dark:text-gray-400 cursor-pointer leading-relaxed"
                  >
                    Ich akzeptiere die{" "}
                    <Link
                      href="/datenschutz"
                      className="text-primary underline hover:no-underline"
                    >
                      Datenschutzerklärung
                    </Link>{" "}
                    und bin mit der Verarbeitung meiner Daten einverstanden. *
                  </label>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting || isCompressing || !privacyAccepted}
                  className="w-full h-12 md:h-14 gradient-primary text-white text-base md:text-lg font-semibold rounded-lg md:rounded-xl btn-shimmer disabled:opacity-50"
                  onClick={() =>
                    trackCTAClick("contact_form_submit", "contact_form")
                  }
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Wird gesendet...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="w-4 h-4 md:w-5 md:h-5" />
                      Kostenlos anfragen
                    </span>
                  )}
                </Button>
              </form>
            </div>

            {/* Right Side - Contact Info & Pricing */}
            <div className="space-y-3 md:space-y-4">
              {/* Emergency Call Box */}
              <div className="bg-gradient-to-br from-primary to-accent rounded-lg md:rounded-2xl p-4 md:p-5 text-white">
                <div className="flex items-center gap-2 mb-2 md:mb-3">
                  <Clock className="w-5 h-5" />
                  <span className="text-base md:text-lg font-bold">
                    Ankunftszeit telefonisch klären
                  </span>
                </div>
                <a
                  href={`tel:${company.contact.phone}`}
                  onClick={handlePhoneClick}
                  className="flex items-center gap-3 p-3 bg-white/10 backdrop-blur rounded-lg md:rounded-xl hover:bg-white/20 transition-colors mb-2 md:mb-3"
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 rounded-lg flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <div>
                    <p className="text-xs md:text-sm opacity-80">
                      Jetzt anrufen
                    </p>
                    <p className="text-lg md:text-xl font-bold">
                      {company.contact.phoneDisplay}
                    </p>
                  </div>
                </a>
                <p className="text-xs md:text-sm opacity-80 text-center">
                  24/7 erreichbar – auch an Sonn- und Feiertagen
                </p>
              </div>

              {/* Pricing Hints */}
              <div className="bg-white dark:bg-gray-900 rounded-lg md:rounded-xl p-3 md:p-4 border border-gray-100 dark:border-gray-700">
                <h4 className="font-bold text-gray-900 dark:text-white mb-2 md:mb-3 flex items-center gap-2 text-sm md:text-base">
                  <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                  100% Kostenlose Beratung
                </h4>

                {/* Trust Messages */}
                <div className="space-y-2 mb-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                    <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                    <span>
                      Diagnose vor Ort{" "}
                      <strong className="text-primary">kostenlos</strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                    <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                    <span>Kein Arbeitsbeginn ohne Ihre Zustimmung</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                    <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                    <span>
                      Festpreis <strong>vor</strong> Arbeitsbeginn
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-2 md:p-3 text-center">
                    <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                      Rohrreinigung
                    </p>
                    <p className="font-bold text-gray-900 dark:text-white text-base md:text-lg">
                      ab {company.pricing.services.rohrreinigung.from}€
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-2 md:p-3 text-center">
                    <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                      Toilette
                    </p>
                    <p className="font-bold text-gray-900 dark:text-white text-base md:text-lg">
                      ab {company.pricing.services.toiletteVerstopft.from}€
                    </p>
                  </div>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center justify-center gap-4 md:gap-6 text-xs md:text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-primary" />
                  <span>{company.stats.projectsCompleted} Kunden</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  <span>{company.stats.satisfactionRate} zufrieden</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
