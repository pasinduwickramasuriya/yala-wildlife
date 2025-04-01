export default function LocationMap() {
    return (
      <div className="mt-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Our Location
        </h3>
        <div className="relative h-64 rounded-lg overflow-hidden shadow-md border border-gray-200 dark:border-gray-700">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3968.3666666666666!2d81.30111451350646!3d6.265797090893244!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTUnNTYuOSJOIDgxwrAxOCcwNC4wIkU!5e0!3m2!1sen!2slk!4v1698765432100!5m2!1sen!2slk"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    );
  }