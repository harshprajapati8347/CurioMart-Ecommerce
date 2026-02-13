import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { AiOutlineCheck } from "react-icons/ai";

const CookiePreferencesModal = ({
  isOpen,
  onClose,
  onSave,
  initialPreferences,
}) => {
  const [preferences, setPreferences] = useState(
    initialPreferences || {
      necessary: true,
      analytics: false,
      marketing: false,
    },
  );

  if (!isOpen) return null;

  const handleToggle = (category) => {
    if (category === "necessary") return; // Cannot disable necessary cookies

    setPreferences((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const handleSave = () => {
    onSave(preferences);
    onClose();
  };

  const cookieCategories = [
    {
      id: "necessary",
      title: "Necessary Cookies",
      description:
        "Essential for the website to function properly. These cookies enable core functionality such as security, network management, and accessibility. You cannot opt-out of these cookies.",
      required: true,
    },
    {
      id: "analytics",
      title: "Analytics Cookies",
      description:
        "Help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve our website and your shopping experience.",
      required: false,
    },
    {
      id: "marketing",
      title: "Marketing Cookies",
      description:
        "Used to track visitors across websites to display relevant advertisements. These cookies help us show you personalized content and measure the effectiveness of our campaigns.",
      required: false,
    },
  ];

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998] animate-fadeIn"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden animate-slideUp">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-5 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">
                Cookie Preferences
              </h2>
              <p className="text-blue-100 text-sm mt-1">
                Manage your cookie settings
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              aria-label="Close"
            >
              <RxCross1 size={24} className="text-white" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
            <p className="text-gray-600 mb-6">
              We use cookies to enhance your browsing experience, serve
              personalized content, and analyze our traffic. You can choose
              which types of cookies to allow below.
            </p>

            {/* Cookie Categories */}
            <div className="space-y-4">
              {cookieCategories.map((category) => (
                <div
                  key={category.id}
                  className="border border-gray-200 rounded-xl p-5 hover:border-blue-300 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-gray-900">
                          {category.title}
                        </h3>
                        {category.required && (
                          <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                            Required
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {category.description}
                      </p>
                    </div>

                    {/* Toggle Switch */}
                    <button
                      onClick={() => handleToggle(category.id)}
                      disabled={category.required}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                        preferences[category.id] ? "bg-blue-600" : "bg-gray-300"
                      } ${category.required ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                      aria-label={`Toggle ${category.title}`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          preferences[category.id]
                            ? "translate-x-6"
                            : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Info Box */}
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex gap-3">
                <svg
                  className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
                <div className="text-sm text-blue-800">
                  <p className="font-medium mb-1">Your privacy matters</p>
                  <p className="text-blue-700">
                    You can change your preferences at any time by clicking
                    "Cookie Settings" in the footer.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 flex flex-col sm:flex-row gap-3 justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2.5 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              <AiOutlineCheck size={20} />
              Save Preferences
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </>
  );
};

export default CookiePreferencesModal;
