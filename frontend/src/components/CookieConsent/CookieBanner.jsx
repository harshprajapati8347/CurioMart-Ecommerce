import React, { useState, useEffect } from "react";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { MdSettings } from "react-icons/md";
import { FaCookieBite } from "react-icons/fa";
import CookiePreferencesModal from "./CookiePreferencesModal";
import {
  hasConsent,
  acceptAllCookies,
  rejectAllCookies,
  saveConsent,
  getConsent,
} from "../../utils/cookieConsent";

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consentGiven = hasConsent();
    if (!consentGiven) {
      // Show banner after a short delay for better UX
      setTimeout(() => {
        setIsVisible(true);
      }, 1000);
    }
  }, []);

  const handleAcceptAll = () => {
    acceptAllCookies();
    closeBanner();
  };

  const handleRejectAll = () => {
    rejectAllCookies();
    closeBanner();
  };

  const handleManagePreferences = () => {
    setIsModalOpen(true);
  };

  const handleSavePreferences = (preferences) => {
    saveConsent(preferences);
    closeBanner();
  };

  const closeBanner = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      setIsClosing(false);
    }, 300);
  };

  // Allow reopening from footer link
  useEffect(() => {
    const handleCookieSettings = () => {
      setIsVisible(true);
      setIsModalOpen(true);
    };

    window.openCookieSettings = handleCookieSettings;

    return () => {
      delete window.openCookieSettings;
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Cookie Banner */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-[9997] transition-all duration-300 ${
          isClosing ? "translate-y-full opacity-0" : "translate-y-0 opacity-100"
        }`}
      >
        {/* Desktop Banner */}
        <div className="hidden md:block bg-white border-t-2 border-gray-200 shadow-2xl">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex items-center gap-6">
              {/* Icon */}
              <div className="flex-shrink-0">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
                  <FaCookieBite size={32} className="text-white" />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  We value your privacy
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  We use cookies to enhance your browsing experience, serve
                  personalized content, and analyze our traffic. By clicking
                  "Accept All", you consent to our use of cookies.{" "}
                  <a
                    href="/privacy"
                    className="text-blue-600 hover:text-blue-700 underline font-medium"
                  >
                    Learn more
                  </a>
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3">
                <button
                  onClick={handleManagePreferences}
                  className="px-5 py-2.5 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all flex items-center gap-2"
                >
                  <MdSettings size={18} />
                  Manage Preferences
                </button>
                <button
                  onClick={handleRejectAll}
                  className="px-5 py-2.5 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all flex items-center gap-2"
                >
                  <AiOutlineClose size={18} />
                  Reject All
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
                >
                  <AiOutlineCheck size={20} />
                  Accept All
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Banner */}
        <div className="md:hidden bg-white border-t-2 border-gray-200 shadow-2xl">
          <div className="px-4 py-5">
            {/* Header */}
            <div className="flex items-start gap-3 mb-4">
              <div className="flex-shrink-0">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg">
                  <FaCookieBite size={24} className="text-white" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-base font-bold text-gray-900 mb-1">
                  We value your privacy
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  We use cookies to enhance your experience.{" "}
                  <a
                    href="/privacy"
                    className="text-blue-600 hover:text-blue-700 underline font-medium"
                  >
                    Learn more
                  </a>
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2">
              <button
                onClick={handleAcceptAll}
                className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <AiOutlineCheck size={18} />
                Accept All Cookies
              </button>
              <div className="flex gap-2">
                <button
                  onClick={handleRejectAll}
                  className="flex-1 px-4 py-2.5 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all text-sm"
                >
                  Reject All
                </button>
                <button
                  onClick={handleManagePreferences}
                  className="flex-1 px-4 py-2.5 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all flex items-center justify-center gap-2 text-sm"
                >
                  <MdSettings size={16} />
                  Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Preferences Modal */}
      <CookiePreferencesModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSavePreferences}
        initialPreferences={getConsent() || undefined}
      />
    </>
  );
};

export default CookieBanner;
