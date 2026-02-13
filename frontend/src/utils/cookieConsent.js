/**
 * Cookie Consent Utility
 * Manages user consent preferences for GDPR compliance
 */

const CONSENT_COOKIE_NAME = "cookie_consent";
const CONSENT_STORAGE_KEY = "cookie_consent_preferences";
const CONSENT_EXPIRY_DAYS = 365;

// Default consent state
export const DEFAULT_CONSENT = {
  necessary: true, // Always true, cannot be disabled
  analytics: false,
  marketing: false,
  timestamp: null,
  version: "1.0",
};

/**
 * Set a cookie
 */
const setCookie = (name, value, days) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
};

/**
 * Get a cookie value
 */
const getCookie = (name) => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

/**
 * Save consent preferences
 */
export const saveConsent = (preferences) => {
  const consentData = {
    ...preferences,
    necessary: true, // Always enforce necessary cookies
    timestamp: new Date().toISOString(),
    version: "1.0",
  };

  // Save to localStorage
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(consentData));
  } catch (error) {
    console.error("Failed to save consent to localStorage:", error);
  }

  // Save to cookie
  setCookie(
    CONSENT_COOKIE_NAME,
    JSON.stringify(consentData),
    CONSENT_EXPIRY_DAYS,
  );

  // Update GTM/GA4 consent
  updateGTMConsent(consentData);

  return consentData;
};

/**
 * Get saved consent preferences
 */
export const getConsent = () => {
  // Try localStorage first
  try {
    const stored = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error("Failed to read consent from localStorage:", error);
  }

  // Fallback to cookie
  const cookieValue = getCookie(CONSENT_COOKIE_NAME);
  if (cookieValue) {
    try {
      return JSON.parse(cookieValue);
    } catch (error) {
      console.error("Failed to parse consent cookie:", error);
    }
  }

  return null;
};

/**
 * Check if user has made a consent choice
 */
export const hasConsent = () => {
  return getConsent() !== null;
};

/**
 * Accept all cookies
 */
export const acceptAllCookies = () => {
  return saveConsent({
    necessary: true,
    analytics: true,
    marketing: true,
  });
};

/**
 * Reject all optional cookies (keep only necessary)
 */
export const rejectAllCookies = () => {
  return saveConsent({
    necessary: true,
    analytics: false,
    marketing: false,
  });
};

/**
 * Clear consent (for testing or reset)
 */
export const clearConsent = () => {
  localStorage.removeItem(CONSENT_STORAGE_KEY);
  setCookie(CONSENT_COOKIE_NAME, "", -1);
};

/**
 * Update GTM/GA4 consent mode
 */
export const updateGTMConsent = (consent) => {
  // Initialize dataLayer if not exists
  window.dataLayer = window.dataLayer || [];

  // Google Consent Mode v2
  if (typeof window.gtag === "function") {
    window.gtag("consent", "update", {
      ad_storage: consent.marketing ? "granted" : "denied",
      ad_user_data: consent.marketing ? "granted" : "denied",
      ad_personalization: consent.marketing ? "granted" : "denied",
      analytics_storage: consent.analytics ? "granted" : "denied",
      functionality_storage: "granted",
      personalization_storage: consent.analytics ? "granted" : "denied",
      security_storage: "granted",
    });
  }

  // Push to dataLayer for GTM
  window.dataLayer.push({
    event: "cookie_consent_update",
    cookie_consent: {
      necessary: consent.necessary,
      analytics: consent.analytics,
      marketing: consent.marketing,
      timestamp: consent.timestamp,
    },
  });

  // Explicitly push consent state for GTM triggers
  window.dataLayer.push({
    event: consent.analytics
      ? "analytics_consent_granted"
      : "analytics_consent_denied",
  });

  window.dataLayer.push({
    event: consent.marketing
      ? "marketing_consent_granted"
      : "marketing_consent_denied",
  });

  console.log("GTM Consent updated:", consent);
};

/**
 * Initialize default consent (call on app mount)
 * Note: Default consent is already set in index.html before GTM/GA4 loads
 * This function ensures consent is applied if user has previously consented
 */
export const initializeDefaultConsent = () => {
  // Check if user has previously consented
  const savedConsent = getConsent();
  if (savedConsent) {
    // Update GTM/GA4 with saved consent
    updateGTMConsent(savedConsent);
    console.log("Consent restored from storage:", savedConsent);
  } else {
    console.log("No saved consent found. Default consent (denied) is active.");
  }
};

/**
 * Get consent for specific category
 */
export const hasConsentFor = (category) => {
  const consent = getConsent();
  if (!consent) return false;
  return consent[category] === true;
};
