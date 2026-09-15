"use client";

export default function CookiePreferencesButton() {
  return (
    <button
      onClick={() => window.dispatchEvent(new Event("open-cookie-settings"))}
      className="hover:text-white transition-colors duration-300 cursor-pointer"
    >
      Cookie Preferences
    </button>
  );
}
