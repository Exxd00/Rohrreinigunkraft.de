"use client";

import { useState, useEffect } from "react";
import {
  Phone,
  X,
  Clock,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { company } from "@/data/company";
import { trackCallIntent, trackDirectCallClick } from "@/lib/tracking";

interface CallConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  source: string;
}

export default function CallConfirmModal({
  isOpen,
  onClose,
  source,
}: CallConfirmModalProps) {
  const [step, setStep] = useState<"intent" | "confirm">("intent");
  const [isCallInProgress, setIsCallInProgress] = useState(false);

  useEffect(() => {
    if (isOpen) {
      trackCallIntent(source);
      setStep("intent");
      setIsCallInProgress(false);
    }
  }, [isOpen, source]);

  const handleConfirmIntent = () => {
    setStep("confirm");
  };

  const handleCall = () => {
    // Prevent double clicks
    if (isCallInProgress) return;
    setIsCallInProgress(true);

    // A tel: click does not prove that the call connected. Track it only as
    // engagement; connected Google Ads calls are imported separately.
    trackDirectCallClick(source);

    // IMMEDIATELY make the call - no waiting!
    window.location.href = `tel:${company.contact.phone}`;

    // Close modal after short delay
    setTimeout(() => {
      onClose();
      setIsCallInProgress(false);
    }, 100);
  };

  const handleClose = () => {
    if (isCallInProgress) return;
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal - Fixed size for mobile */}
      <div className="relative w-full max-w-[340px] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden animate-scale-in">
        {/* Close Button */}
        <button
          onClick={handleClose}
          disabled={isCallInProgress}
          className="absolute top-3 right-3 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors z-10 disabled:opacity-50"
          aria-label="Schließen"
        >
          <X className="w-5 h-5" />
        </button>

        {step === "intent" ? (
          /* Step 1: Intent */
          <div className="p-5 text-center">
            {/* Icon - smaller on mobile */}
            <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center">
              <Phone className="w-7 h-7 text-primary" />
            </div>

            {/* Title */}
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
              Möchten Sie uns anrufen?
            </h3>

            {/* Subtitle */}
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Unser Team ist jetzt erreichbar
            </p>

            {/* Availability */}
            <div className="flex items-center justify-center gap-2 mb-4 text-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-green-600 dark:text-green-400 font-medium">
                24/7 erreichbar
              </span>
            </div>

            {/* Buttons */}
            <div className="space-y-2">
              <button
                onClick={handleConfirmIntent}
                className="w-full py-3.5 px-5 bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" />
                Ja, jetzt anrufen
              </button>

              <button
                onClick={handleClose}
                className="w-full py-2.5 px-5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-xl transition-colors text-sm"
              >
                Später anrufen
              </button>
            </div>
          </div>
        ) : (
          /* Step 2: Confirm */
          <div className="p-5 text-center">
            {/* Header gradient */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent" />

            {/* Phone Number */}
            <div className="mb-4 pt-2">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                Sie werden verbunden mit:
              </p>
              <div className="text-2xl font-bold text-primary dark:text-[#3AB0FF]">
                {company.contact.phoneDisplay}
              </div>
            </div>

            {/* Benefits - Compact */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3 mb-4 text-left">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Kostenlose Beratung
                </span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-primary shrink-0" />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Ankunft telefonisch klären
                </span>
              </div>
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-orange-500 shrink-0" />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  24/7 Notdienst
                </span>
              </div>
            </div>

            {/* Call Button - With loading state */}
            <button
              onClick={handleCall}
              disabled={isCallInProgress}
              className="w-full py-4 px-5 gradient-primary text-white font-bold rounded-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2 text-lg shadow-lg shadow-primary/30 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isCallInProgress ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Verbinde...
                </>
              ) : (
                <>
                  <Phone className="w-5 h-5" />
                  Jetzt direkt anrufen
                </>
              )}
            </button>

            {/* Back link */}
            <button
              onClick={() => setStep("intent")}
              disabled={isCallInProgress}
              className="mt-3 text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 disabled:opacity-50"
            >
              ← Zurück
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
