// import Image from "next/image";
// import Link from "next/link";
// import Header from "@/components/Header";

// export default function AboutPage() {
//   return (
//     <div className="min-h-screen bg-background text-foreground">
//       {/* Header */}
//       <Header />

//       {/* Main Content */}
//       <main>
//         <section className="py-16">
//           <div className="container mx-auto px-4 md:px-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
//               <div className="text-center">
//                 <h2 className="text-3xl md:text-4xl font-bold text-green-600 mb-6">
//                   Yala National Park
//                 </h2>
//                 <p className="text-base md:text text-muted-foreground leading-relaxed mb-4">
//                   Nestled in the southeast of Sri Lanka, Yala National Park is a
//                   biodiversity hotspot renowned for its rich wildlife and
//                   stunning landscapes. Spanning over 979 square kilometers, it’s
//                   home to one of the highest leopard densities in the world,
//                   alongside elephants, sloth bears, crocodiles, and over 200
//                   species of birds. The park’s diverse ecosystems—ranging from
//                   dense jungles to coastal lagoons—offer a breathtaking backdrop
//                   for safari adventures.
//                 </p>
//                 <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
//                   Whether you’re captivated by the roar of a leopard or the
//                   serene beauty of a sunset over the savannah, Yala promises an
//                   immersive experience into nature’s wonders.
//                 </p>
//               </div>
//               <div className="relative h-64 md:h-96 rounded-xl overflow-hidden shadow-lg border border-border">
//                 <Image
//                   src="https://images.unsplash.com/photo-1553524082-82690780f842?w=1000&auto=format&fit=crop&q=60"
//                   alt="Yala National Park"
//                   fill
//                   className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
//                   sizes="(max-width: 768px) 100vw, 50vw"
//                 />
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Our Services */}
//         <section className="py-16 bg-background">
//           <div className="container mx-auto px-4 md:px-6">
//             <h2 className="text-3xl md:text-4xl font-bold text-center text-green-500 mb-12">
//               Our Services
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//               <div className="p-6 rounded-xl  hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 text-center">
//                 <h3 className="text-2xl font-semibold text-foreground mb-4">
//                   Custom Safari Packages
//                 </h3>
//                 <p className="text-muted-foreground leading-relaxed">
//                   From half-day excursions to multi-day adventures, we tailor
//                   our safari packages to suit every traveler—whether you’re a
//                   solo explorer, a family, or a group of friends.
//                 </p>
//               </div>
//               <div className="p-6 rounded-xl  hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 text-center">
//                 <h3 className="text-2xl font-semibold text-foreground mb-4">
//                   Expert Guided Tours
//                 </h3>
//                 <p className="text-muted-foreground leading-relaxed">
//                   Our passionate and knowledgeable guides bring Yala to life,
//                   sharing insights about the park’s wildlife, history, and
//                   conservation efforts while ensuring your safety.
//                 </p>
//               </div>
//               <div className="p-6 rounded-xl  hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 text-center">
//                 <h3 className="text-2xl font-semibold text-foreground mb-4">
//                   Luxury Jeep Safaris
//                 </h3>
//                 <p className="text-muted-foreground leading-relaxed">
//                   Explore Yala in comfort with our well-equipped, spacious
//                   jeeps, designed to provide the best views and a smooth ride
//                   through the park’s rugged terrain.
//                 </p>
//               </div>
//             </div>
//             <div className="text-center mt-12">

//               <Link
//                 href="/safari-packages"
//                 className="inline-block bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full font-semibold shadow-lg transform hover:scale-105 transition-all duration-300"
//               >
//                 {/* Changed: Set button background to solid green (bg-green-600, hover:bg-green-700), removed gradient for dark mode consistency */}
//                 Explore Our Packages
//               </Link>
//             </div>
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// }



// import Image from "next/image";
// import Link from "next/link";
// import Header from "@/components/Header";

// export default function AboutPage() {
//   return (
//     <div className="min-h-screen bg-background text-foreground">
//       {/* Header */}
//       <Header />

//       {/* Main Content */}
//       <main>
//         <section className="py-16">
//           <div className="container mx-auto px-4 md:px-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
//               <div className="text-center">
//                 <h2 className="text-2xl md:text-2xl font-bold text-green-600 mb-6 text-green-400">
//                   Yala National Park
//                 </h2>
//                 <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-4">
//                   Nestled in the southeastern region of Sri Lanka, Yala National Park is a remarkable biodiversity hotspot famed for its abundant wildlife and breathtaking scenery. Covering an area of over 979 square kilometers, it boasts one of the world's highest concentrations of leopards, along with elephants, sloth bears, crocodiles, and more than 200 species of birds. The park's varied ecosystems, from lush jungles to serene coastal lagoons, provide a stunning setting for unforgettable safari adventures.
//                 </p>

//                 <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
//                   Whether you're captivated by the roar of a leopard or the
//                   serene beauty of a sunset over the savannah, Yala promises an
//                   immersive experience into nature's wonders.
//                 </p>
//               </div>
//               <div className="relative h-64 md:h-96 rounded-xl overflow-hidden shadow-lg border border-border">
//                 <Image
//                   src="https://images.unsplash.com/photo-1553524082-82690780f842?w=1000&auto=format&fit=crop&q=60"
//                   alt="Yala National Park"
//                   fill
//                   className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
//                   sizes="(max-width: 768px) 100vw, 50vw"
//                 />
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* NEW SECTION - Add This Premium Safari Services Section */}
//         <section className="py-16 ">
//           <div className="container mx-auto px-4 md:px-6 max-w-4xl">
//             <h2 className="text-2xl md:text-2xl font-bold text-center text-green-400 mb-8">
//               Premium Yala Safari Experience
//             </h2>
//             <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
//               Our <strong>Yala safari</strong> offers an unparalleled wildlife experience in one of Sri Lanka's most famous national parks.
//               With our <strong>Yala safari jeep service</strong>, you'll enjoy comfortable, safe, and expertly guided journeys through diverse landscapes and wildlife-rich zones of the park.
//               Our jeeps are designed for optimal wildlife viewing, ensuring you have the best opportunity to see leopards, elephants, and many other fascinating species.
//             </p>
//             <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
//               Our <strong>Yala safari</strong> packages are carefully customized to fit your schedule and interests, from half-day excursions to full-day adventures, perfect for photographers, families, and adventure seekers alike.
//               The knowledgeable guides included in every tour share in-depth insights into the park's wildlife, ecosystems, and conservation efforts, elevating your <strong>Yala safari</strong> experience.
//             </p>
//             <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
//               As part of our commitment to quality, our <strong>Yala safari jeep service</strong> uses modern, spacious vehicles with experienced drivers who prioritize your safety while navigating Yala's rugged terrain.
//               Whether you want to track the majestic leopard or simply immerse yourself in the natural beauty of the park, we provide the best possible safari experience tailored to your desires.
//             </p>
//             <p className="text-base md:text-lg text-muted-foreground leading-relaxed text-center">
//               Book your premium safari adventure with us today and discover why our guests consistently rate our service as the premier choice for exploring Yala National Park's incredible wildlife and landscapes.
//             </p>
//           </div>
//         </section>
//         {/* END NEW SECTION */}

//         {/* Our Services */}
//         <section className="py-16 bg-background">
//           <div className="container mx-auto px-4 md:px-6">
//             <h2 className="text-2xl md:text-2xl font-bold text-center text-green-400 mb-12">
//               Our Services
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//               <div className="p-6 rounded-xl hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 text-center">
//                 <h3 className="text-2xl font-semibold text-foreground mb-4">
//                   Custom Safari Packages
//                 </h3>
//                 <p className="text-muted-foreground leading-relaxed">
//                   From half-day excursions to multi-day adventures, we tailor
//                   our safari packages to suit every traveler—whether you're a
//                   solo explorer, a family, or a group of friends.
//                 </p>
//               </div>
//               <div className="p-6 rounded-xl hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 text-center">
//                 <h3 className="text-2xl font-semibold text-foreground mb-4">
//                   Expert Guided Tours
//                 </h3>
//                 <p className="text-muted-foreground leading-relaxed">
//                   Our passionate and knowledgeable guides bring Yala to life,
//                   sharing insights about the park's wildlife, history, and
//                   conservation efforts while ensuring your safety.
//                 </p>
//               </div>
//               <div className="p-6 rounded-xl hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 text-center">
//                 <h3 className="text-2xl font-semibold text-foreground mb-4">
//                   Luxury Jeep Safaris
//                 </h3>
//                 <p className="text-muted-foreground leading-relaxed">
//                   Explore Yala in comfort with our well-equipped, spacious
//                   jeeps, designed to provide the best views and a smooth ride
//                   through the park's rugged terrain.
//                 </p>
//               </div>
//             </div>
//             <div className="text-center mt-12">
//               <Link
//                 href="/safari-packages"
//                 className="inline-block bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full font-semibold shadow-lg transform hover:scale-105 transition-all duration-300"
//               >
//                 Explore Our Packages
//               </Link>
//             </div>
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// }



import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main>
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="text-center">
                <h2 className="text-2xl md:text-2xl font-bold text-green-600 mb-6 text-green-400">
                  Yala National Park
                </h2>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-4">
                  {/* FIXED: Escaped apostrophes in "world's" and other contractions */}
                  Nestled in the southeastern region of Sri Lanka, Yala National Park is a remarkable biodiversity hotspot famed for its abundant wildlife and breathtaking scenery. Covering an area of over 979 square kilometers, it boasts one of the world&apos;s highest concentrations of leopards, along with elephants, sloth bears, crocodiles, and more than 200 species of birds. The park&apos;s varied ecosystems, from lush jungles to serene coastal lagoons, provide a stunning setting for unforgettable safari adventures.
                </p>

                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  {/* FIXED: Escaped apostrophes in "you're" and "nature's" */}
                  Whether you&apos;re captivated by the roar of a leopard or the
                  serene beauty of a sunset over the savannah, Yala promises an
                  immersive experience into nature&apos;s wonders.
                </p>
              </div>
              <div className="relative h-64 md:h-96 rounded-xl overflow-hidden shadow-lg border border-border">
                <Image
                  src="https://images.unsplash.com/photo-1553524082-82690780f842?w=1000&auto=format&fit=crop&q=60"
                  alt="Yala National Park"
                  fill
                  className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </section>

        {/* NEW SECTION - Add This Premium Safari Services Section */}
        <section className="py-16 ">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-2xl md:text-2xl font-bold text-center text-green-400 mb-8">
              Premium Yala Safari Experience
            </h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
              {/* FIXED: Escaped apostrophe in "Sri Lanka's" */}
              Our <strong>Yala safari</strong> offers an unparalleled wildlife experience in one of Sri Lanka&apos;s most famous national parks.
              With our <strong>Yala safari jeep service</strong>, you&apos;ll enjoy comfortable, safe, and expertly guided journeys through diverse landscapes and wildlife-rich zones of the park.
              Our jeeps are designed for optimal wildlife viewing, ensuring you have the best opportunity to see leopards, elephants, and many other fascinating species.
            </p>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
              {/* FIXED: Escaped apostrophes in "park's" */}
              Our <strong>Yala safari</strong> packages are carefully customized to fit your schedule and interests, from half-day excursions to full-day adventures, perfect for photographers, families, and adventure seekers alike.
              The knowledgeable guides included in every tour share in-depth insights into the park&apos;s wildlife, ecosystems, and conservation efforts, elevating your <strong>Yala safari</strong> experience.
            </p>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
              {/* FIXED: Escaped apostrophes in "Yala's" */}
              As part of our commitment to quality, our <strong>Yala safari jeep service</strong> uses modern, spacious vehicles with experienced drivers who prioritize your safety while navigating Yala&apos;s rugged terrain.
              Whether you want to track the majestic leopard or simply immerse yourself in the natural beauty of the park, we provide the best possible safari experience tailored to your desires.
            </p>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed text-center">
              Book your premium safari adventure with us today and discover why our guests consistently rate our service as the premier choice for exploring Yala National Park&apos;s incredible wildlife and landscapes.
            </p>
          </div>
        </section>
        {/* END NEW SECTION */}

        {/* Our Services */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-2xl md:text-2xl font-bold text-center text-green-400 mb-12">
              Our Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 rounded-xl hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 text-center">
                <h3 className="text-2xl font-semibold text-foreground mb-4">
                  Custom Safari Packages
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {/* FIXED: Escaped apostrophes in "you're" */}
                  From half-day excursions to multi-day adventures, we tailor
                  our safari packages to suit every traveler—whether you&apos;re a
                  solo explorer, a family, or a group of friends.
                </p>
              </div>
              <div className="p-6 rounded-xl hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 text-center">
                <h3 className="text-2xl font-semibold text-foreground mb-4">
                  Expert Guided Tours
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {/* FIXED: Escaped apostrophes in "park's" */}
                  Our passionate and knowledgeable guides bring Yala to life,
                  sharing insights about the park&apos;s wildlife, history, and
                  conservation efforts while ensuring your safety.
                </p>
              </div>
              <div className="p-6 rounded-xl hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 text-center">
                <h3 className="text-2xl font-semibold text-foreground mb-4">
                  Luxury Jeep Safaris
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {/* FIXED: Escaped apostrophes in "park's" */}
                  Explore Yala in comfort with our well-equipped, spacious
                  jeeps, designed to provide the best views and a smooth ride
                  through the park&apos;s rugged terrain.
                </p>
              </div>
            </div>
            <div className="text-center mt-12">
              <Link
                href="/safari-packages"
                className="inline-block bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full font-semibold shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                Explore Our Packages
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
