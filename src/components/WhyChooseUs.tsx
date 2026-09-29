import { ShieldCheck, Truck, Sparkles } from "lucide-react";

const FEATURES = [
  {
    title: "Expert Guides",
    description:
      "Licensed naturalist trackers ensure safe adventures, optimal game drives, and guaranteed leopard sightings.",
    icon: <ShieldCheck className="w-8 h-8 text-[#000000]" strokeWidth={2.2} />,
  },
  {
    title: "Comfortable Jeeps",
    description:
      "Travel in modified 4x4 Toyota Hilux jeeps featuring elevated stadium seating and shock-absorbing suspension.",
    icon: <Truck className="w-8 h-8 text-[#000000]" strokeWidth={2.2} />,
  },
  {
    title: "Best Rates",
    description:
      "Direct park concession rates with full park admissions, taxes, and complimentary hotel transfers included.",
    icon: <Sparkles className="w-8 h-8 text-[#000000]" strokeWidth={2.2} />,
  },
];

export default function WhyChooseUs() {
  return (
    <section
      className="w-full py-16 sm:py-24 px-4 sm:px-8 md:px-12 selection:bg-[#00ff00] selection:text-black [content-visibility:auto] [contain-intrinsic-size:1px_500px]"
      style={{
        fontFamily:
          '"Google Sans", "Open Sans", Roboto, -apple-system, BlinkMacSystemFont, Arial, sans-serif',
      }}
    >
      <div className="max-w-[1300px] mx-auto text-center">
        {/* --- GOOGLE PILL HEADER & TITLE --- */}
        <div className="flex flex-col items-center justify-center mb-14">
          <h2 className="text-3xl sm:text-5xl font-bold text-black tracking-tight leading-[1.15]">
            Why Choose Yala Wildlife
          </h2>
          <p className="mt-3 text-[18px] text-black leading-relaxed font-semibold max-w-4xl">
            Engineered For The Ultimate Safari Reliable expedition gear, seasoned wildlife trackers, and transparent rates designed for memorable wilderness exploration.
          </p>
        </div>

        {/* --- PURE WHITE GOOGLE BENTO CARDS --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {FEATURES.map((feature, index) => (
            <div
              key={index}
              className="relative p-8 sm:p-10 rounded-[2.5rem] bg-white text-center flex flex-col items-center justify-between [contain:paint] transform-gpu transition-transform duration-200 hover:scale-[1.01]"
            >
              {/* Icon Container Centered */}
              <div className="w-16 h-16 rounded-2xl bg-[#f8f9fa] flex items-center justify-center mb-8 shrink-0 mx-auto">
                {feature.icon}
              </div>

              {/* Text Area Centered */}
              <div className="flex flex-col items-center">
                <h3 className="text-2xl font-bold text-[#000000] tracking-tight leading-snug mb-3">
                  {feature.title}
                </h3>
                <p className="text-[18px] text-[#3c4043] leading-relaxed font-medium max-w-sm">
                  {feature.description}
                </p>
              </div>

              {/* Bottom Micro Indicator Centered */}
              <div className="mt-8 pt-4 flex items-center justify-center gap-2.5 w-full">
                <span className="text-[14px] font-medium text-[#5f6368]">
                  Standard Feature
                </span>
                <span className="w-2 h-2 rounded-full bg-[#00ff00]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}