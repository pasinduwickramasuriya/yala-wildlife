// export default function WhyChooseUs() {
//   return (
//     <section className="bg-background py-20">
//       <div className="container mx-auto px-4 md:px-6 text-center">
//         <h2 className="text-3xl md:text-2xl font-extrabold text-foreground mb-12 tracking-tight animate-fadeIn text-green-400">
//           Why Choose Yala Wildlife
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
//           {/* Card 1: Expert Guides */}
//           <div className="p-6  rounded-xl  hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 ">
//             <div className="text-green-500 mb-4">
//               <svg
//                 className="w-12 h-12 mx-auto"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 1.857h10M9 4a3 3 0 013-3h0a3 3 0 013 3m-6 0h6"
//                 />
//               </svg>
//             </div>
//             <h3 className="text-2xl font-bold text-card-foreground mb-3">
//               Expert Guides
//             </h3>
//             <p className="text-muted-foreground leading-relaxed">
//               Our experienced guides ensure a safe and unforgettable safari
//               adventure.
//             </p>
//           </div>

//           {/* Card 2: Comfortable Jeeps */}
//           <div className="p-6  rounded-xl  hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 ">
//             <div className="text-green-500 mb-4">
//               <svg
//                 className="w-12 h-12 mx-auto"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M9 17V7m0 10h6m-6 0a2 2 0 01-2-2V9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9z"
//                 />
//               </svg>
//             </div>
//             <h3 className="text-2xl font-bold text-card-foreground mb-3">
//               Comfortable Jeeps
//             </h3>
//             <p className="text-muted-foreground leading-relaxed">
//               Travel in style with our well-maintained, spacious safari jeeps.
//             </p>
//           </div>

//           {/* Card 3: Best Rates */}
//           <div className="p-6  rounded-xl  hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 ">
//             <div className="text-green-500 mb-4">
//               <svg
//                 className="w-12 h-12 mx-auto"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2-1.343-2-3-2zm0 8c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"
//                 />
//               </svg>
//             </div>
//             <h3 className="text-2xl font-bold text-card-foreground mb-3">
//               Best Rates
//             </h3>
//             <p className="text-muted-foreground leading-relaxed">
//               Enjoy premium experiences at competitive prices without
//               compromise.
//             </p>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }



import { ShieldCheck, Truck, Sparkles } from 'lucide-react'; // Ensure you have lucide-react installed

export default function WhyChooseUs() {
  const features = [
    {
      title: "Expert Guides",
      description: "Our experienced guides ensure a safe and unforgettable safari adventure.",
      icon: <ShieldCheck className="w-12 h-12 text-green-600" />,
      color: "bg-green-100",
    },
    {
      title: "Comfortable Jeeps",
      description: "Travel in style with our well-maintained, spacious safari jeeps.",
      icon: <Truck className="w-12 h-12 text-green-600" />, // Using Truck for Jeep representation
      color: "bg-emerald-100",
    },
    {
      title: "Best Rates",
      description: "Enjoy premium experiences at competitive prices without compromise.",
      icon: <Sparkles className="w-12 h-12 text-green-600" />,
      color: "bg-teal-100",
    },
  ];

  return (
    <section className="relative bg-background py-20 overflow-hidden bg-transparent">
      {/* Decorative Background Blur for Modern Feel */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-500/5 rounded-full blur-[120px] -z-10 pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 text-center">
        {/* Main Heading */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-16 tracking-tight">
          Why Choose <span className="text-green-500 underline decoration-wavy decoration-green-300 underline-offset-4">Yala Wildlife</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group relative p-8 rounded-[2.5rem] bg-white/50 dark:bg-neutral-900/50 border border-green-100 dark:border-white/5 backdrop-blur-sm hover:shadow-[0_20px_50px_-12px_rgba(22,163,74,0.15)] transition-all duration-500 hover:-translate-y-2"
            >
              {/* Icon Bubble - The "Cute" Element */}
              <div className={`w-24 h-24 mx-auto ${feature.color} dark:bg-white/10 rounded-[2rem] flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-sm`}>
                {feature.icon}
              </div>

              {/* Card Heading */}
              <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-green-600 transition-colors">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}