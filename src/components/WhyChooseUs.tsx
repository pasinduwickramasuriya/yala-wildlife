"use client";

import { ShieldCheck, Truck, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
export default function WhyChooseUs() {
  const features = [
    {
      title: "Expert Guides",
      description: "Our experienced guides ensure a safe and unforgettable safari adventure.",
      icon: <ShieldCheck className="w-12 h-12 text-[#00ff00]" />,
      color: "bg-green-100",
    },
    {
      title: "Comfortable Jeeps",
      description: "Travel in style with our well-maintained, spacious safari jeeps.",
      icon: <Truck className="w-12 h-12 text-[#00ff00]" />,
      color: "bg-emerald-100",
    },
    {
      title: "Best Rates",
      description: "Enjoy premium experiences at competitive prices without compromise.",
      icon: <Sparkles className="w-12 h-12 text-[#00ff00]" />,
      color: "bg-teal-100",
    },
  ];

  return (
    <section className="relative bg-background py-20 overflow-hidden bg-transparent">

      {/* FIX: Added 'transform-gpu' and 'translate-z-0' to force Hardware Acceleration */}
      {/* This moves the heavy blur calculation to the GPU, preventing mobile lag */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]  rounded-full blur-[120px] -z-10 pointer-events-none transform-gpu translate-z-0" />

      <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
        {/* Main Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-2xl md:text-2xl font-extrabold text-foreground mb-16 tracking-tight    inline-block px-4 py-2 rounded-3xl bg-black/70">
          Why Choose <span className="text-[#00ff00] underline decoration-wavy decoration-[#00ff00] underline-offset-4">Yala Wildlife</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="group relative p-8 rounded-[5rem] bg-black/80    hover:shadow-[0_20px_50px_-12px_rgba(22,163,74,0.15)] transition-all duration-500 hover:-translate-y-2"
            >
              {/* Icon Bubble */}
              <div className={`w-24 h-24 mx-auto ${feature.color} dark:bg-black/10 rounded-[2rem] flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-sm`}>
                {feature.icon}
              </div>

              {/* Card Heading */}
              <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-[#00ff00] transition-colors">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}





