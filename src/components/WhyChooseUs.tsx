export default function WhyChooseUs() {
  return (
    <section className="bg-background py-20">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <h2 className="text-3xl md:text-2xl font-extrabold text-foreground mb-12 tracking-tight animate-fadeIn">
          Why Choose Yala Wildlife egshfdjl;s'fvfe
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Card 1: Expert Guides */}
          <div className="p-6  rounded-xl  hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 ">
            <div className="text-green-500 mb-4">
              <svg
                className="w-12 h-12 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 1.857h10M9 4a3 3 0 013-3h0a3 3 0 013 3m-6 0h6"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-card-foreground mb-3">
              Expert Guides
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Our experienced guides ensure a safe and unforgettable safari
              adventure.
            </p>
          </div>

          {/* Card 2: Comfortable Jeeps */}
          <div className="p-6  rounded-xl  hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 ">
            <div className="text-green-500 mb-4">
              <svg
                className="w-12 h-12 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 17V7m0 10h6m-6 0a2 2 0 01-2-2V9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-card-foreground mb-3">
              Comfortable Jeeps
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Travel in style with our well-maintained, spacious safari jeeps.
            </p>
          </div>

          {/* Card 3: Best Rates */}
          <div className="p-6  rounded-xl  hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 ">
            <div className="text-green-500 mb-4">
              <svg
                className="w-12 h-12 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2-1.343-2-3-2zm0 8c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-card-foreground mb-3">
              Best Rates
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Enjoy premium experiences at competitive prices without
              compromise.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
