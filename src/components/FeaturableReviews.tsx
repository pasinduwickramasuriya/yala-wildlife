'use client';

import { useEffect } from 'react';

export default function FeaturableReviews() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://featurable.com/assets/bundle.js";
    script.charset = "UTF-8";
    script.defer = true;
    script.id = "featurable-widget-script";

    // Ensure the script isn't added multiple times if hot-reloading
    if (!document.getElementById(script.id)) {
      document.body.appendChild(script);
    }

    return () => {
      const existingScript = document.getElementById(script.id);
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, []);

  return (
    // CHANGED: The background is now 'transparent' and text color is removed
    <section className="py-20 bg-transparent"> 
      <div className="container mx-auto px-4">
        
        {/* Your Specific Widget Container */}
        <div 
          id="featurable-02875487-3ff5-4724-bc19-625eae42705b" 
          data-featurable-async 
          className="w-full"
        ></div>
        
      </div>
    </section>
  );
}