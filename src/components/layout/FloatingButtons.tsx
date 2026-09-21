"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Phone, Zap } from "lucide-react";
import { trackCTAClick } from "@/lib/tracking";
import CallConfirmModal from "./CallConfirmModal";

export default function FloatingButtons() {
  const pathname = usePathname();
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);

  // Inner pages use the persistent header call button, leaving content and media clear.
  if (pathname !== "/") return null;

  const handlePhoneClick = () => {
    setIsCallModalOpen(true);
  };

  const handleContactClick = () => {
    trackCTAClick("contact_form", "floating_button");
    const contactSection = document.getElementById("kontakt");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "/kontakt";
    }
  };

  return (
    <>
      {/* Call Confirmation Modal */}
      <CallConfirmModal
        isOpen={isCallModalOpen}
        onClose={() => setIsCallModalOpen(false)}
        source="floating_button"
      />

      {/* Right side buttons - Mobile optimized */}
      <div className="fixed bottom-[max(0.75rem,env(safe-area-inset-bottom))] right-3 md:bottom-6 md:right-6 z-30 flex flex-col gap-2 md:gap-3">
        {/* Soforthilfe Button */}
        <button
          type="button"
          onClick={handleContactClick}
          className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 gradient-primary rounded-full shadow-lg shadow-primary/30 transition-colors active:scale-95"
          aria-label="Soforthilfe anfordern"
        >
          <Zap className="w-5 h-5 md:w-6 md:h-6 text-white" />
        </button>

        {/* Phone Button */}
        <button
          type="button"
          onClick={handlePhoneClick}
          className="flex items-center justify-center w-12 h-12 md:w-auto md:px-5 md:py-3 bg-[#3AB0FF] rounded-full shadow-lg shadow-[#3AB0FF]/30 transition-colors active:scale-95"
          aria-label="Jetzt anrufen"
        >
          <Phone className="w-5 h-5 md:w-6 md:h-6 text-white" />
          <span className="hidden md:inline text-white font-bold text-sm ml-2">
            Anrufen
          </span>
        </button>
      </div>
    </>
  );
}
