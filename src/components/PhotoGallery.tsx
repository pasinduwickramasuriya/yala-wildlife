// import Image from "next/image";

// export default function PhotoGallery() {
//   const photos = [
//     {
//       id: 1,
//       title: "Yala Leopard Sighting",
//       description: "A majestic leopard spotted during a sunrise safari.",
//       imageUrl:
//         "https://images.unsplash.com/photo-1553524082-82690780f842?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fGxlb3BhcmR8ZW58MHx8MHx8fDA%3D",
//     },
//     {
//       id: 2,
//       title: "Elephant Herd",
//       description: "A family of elephants roaming freely in Yala.",
//       imageUrl:
//         "https://images.unsplash.com/photo-1521651201144-634f700b36ef?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGVsZXBoYW50c3xlbnwwfHwwfHx8MA%3D%3D",
//     },
//     {
//       id: 3,
//       title: "Sunset Over Yala",
//       description: "A breathtaking sunset view during an evening safari.",
//       imageUrl:
//         "https://plus.unsplash.com/premium_photo-1669750818169-b598e1de3a1d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8U3Vuc2V0fGVufDB8fDB8fHww",
//     },
//     {
//       id: 4,
//       title: "Birds of Yala",
//       description: "Colorful birdlife in Yala National Park.",
//       imageUrl:
//         "https://plus.unsplash.com/premium_photo-1724864863815-1469c8b74711?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8QmlyZHN8ZW58MHx8MHx8fDA%3D",
//     },
//     {
//       id: 5,
//       title: "Yala Crocodile",
//       description: "A crocodile basking near a waterhole.",
//       imageUrl:
//         "https://images.unsplash.com/photo-1451303688941-9e06d4b1277a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZGVhcnxlbnwwfHwwfHx8MA%3D%3D",
//     },
//     {
//       id: 6,
//       title: "Yala Water Buffalo",
//       description: "A water buffalo grazing in the wetlands.",
//       imageUrl:
//         "https://images.unsplash.com/photo-1603483080228-04f2313d9f10?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZWxlcGhhbnR8ZW58MHx8MHx8fDA%3D",
//     },
//     {
//       id: 7,
//       title: "Yala Deer",
//       description: "A deer spotted in the park's grasslands.",
//       imageUrl:
//         "https://images.unsplash.com/photo-1579446565681-a6f1be0bf24e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGVlcnxlbnwwfHwwfHx8MA%3D%3D",
//     },
//   ];

//   return (
//     <section className="w-full py-16 px-4 md:px-6 bg-background">
//       <h2 className="text-3xl md:text-2xl font-extrabold text-center text-foreground mb-12 tracking-tight text-green-400">
//         Yala Wildlife Photo Gallery
//       </h2>
//       <div className="container max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-6">
//         {/* Left Side: Two Square Images on Top, Three in Middle, One at Bottom */}
//         <div className="md:col-span-2 flex flex-col gap-6">
//           {/* Top Row: Two Square Images */}
//           <div className="grid grid-cols-2 gap-6">
//             {photos.slice(0, 2).map((photo) => (
//               <div
//                 key={photo.id}
//                 className="group relative rounded-xl overflow-hidden shadow-md border border-border/50 bg-card transition-all duration-300 hover:shadow-xl"
//               >
//                 <div className="relative w-full h-[200px] md:h-[250px] aspect-square">
//                   <Image
//                     src={photo.imageUrl}
//                     alt={photo.title}
//                     fill
//                     className="object-cover transition-transform duration-500 group-hover:scale-105"
//                     sizes="(max-width: 640px) 50vw, (max-width: 1024px) 16.5vw, 12.5vw"
//                   />
//                 </div>
//               </div>
//             ))}
//           </div>
//           {/* Middle Row: Three Stacked Images */}
//           <div className="grid grid-cols-3 gap-6">
//             {photos.slice(2, 5).map((photo) => (
//               <div
//                 key={photo.id}
//                 className="group relative rounded-xl overflow-hidden shadow-md border border-border/50 bg-card transition-all duration-300 hover:shadow-xl"
//               >
//                 <div className="relative w-full h-[200px] md:h-[250px]">
//                   <Image
//                     src={photo.imageUrl}
//                     alt={photo.title}
//                     fill
//                     className="object-cover transition-transform duration-500 group-hover:scale-105"
//                     sizes="(max-width: 640px) 33vw, (max-width: 1024px) 11vw, 8.3vw"
//                   />
//                   {/* <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-4">
//                     <h3 className="text-card-foreground text-lg md:text-xl font-bold mb-1">
//                       {photo.title}
//                     </h3>
//                     <p className="text-muted-foreground text-sm md:text-base line-clamp-2">
//                       {photo.description}
//                     </p>
//                   </div> */}
//                 </div>
//               </div>
//             ))}
//           </div>
//           {/* Bottom Row: One Full-Width Image */}
//           <div className="w-full">
//             <div className=" group relative rounded-xl overflow-hidden shadow-md border border-border/50 bg-card transition-all duration-300 hover:shadow-xl">
//               <div className="relative w-full h-[200px] md:h-[250px]">
//                 <Image
//                   src={photos[5].imageUrl}
//                   alt={photos[5].title}
//                   fill
//                   className="object-cover transition-transform duration-500 group-hover:scale-105"
//                   sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 25vw"
//                 />
//                 {/* <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-4">
//                   <h3 className="text-card-foreground text-lg md:text-xl font-bold mb-1">
//                     {photos[5].title}
//                   </h3>
//                   <p className="text-muted-foreground text-sm md:text-base line-clamp-2">
//                     {photos[5].description}
//                   </p>
//                 </div> */}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Right Side: Two Rows with Two Images */}
//         <div className="md:col-span-3 grid grid-rows-2 gap-6">
//           {/* First Image */}
//           <div className="relative rounded-xl overflow-hidden shadow-md border border-border/50 bg-card transition-all duration-300 hover:shadow-xl">
//             <div className="relative w-full h-[200px] md:h-[390px]">
//               <Image
//                 src={photos[0].imageUrl}
//                 alt={photos[0].title}
//                 fill
//                 className="object-cover transition-transform duration-500 group-hover:scale-105"
//                 sizes="(max-width: 640px) 100vw, (max-width: 1024px) 66vw, 50vw"
//               />
//               <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-6 md:p-8">
//                 <h3 className="text-card-foreground text-2xl md:text-3xl font-bold mb-2">
//                   {photos[0].title}
//                 </h3>
//                 {/* <p className="text-muted-foreground text-base md:text-lg line-clamp-2">
//                   {photos[0].description}
//                 </p> */}
//               </div>
//             </div>
//           </div>
//           {/* Second Image */}
//           <div className="relative rounded-xl overflow-hidden shadow-md border border-border/50 bg-card transition-all duration-300 hover:shadow-xl">
//             <div className="relative w-full h-[200px] md:h-[390px]">
//               <Image
//                 src={photos[1].imageUrl}
//                 alt={photos[1].title}
//                 fill
//                 className="object-cover transition-transform duration-500 group-hover:scale-105"
//                 sizes="(max-width: 640px) 100vw, (max-width: 1024px) 66vw, 50vw"
//               />
//               <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-6 md:p-8">
//                 <h3 className="text-card-foreground text-2xl md:text-3xl font-bold mb-2">
//                   {photos[1].title}
//                 </h3>
//                 {/* <p className="text-muted-foreground text-base md:text-lg line-clamp-2">
//                   {photos[1].description}
//                 </p> */}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       {/* <GallerySection/> */}
//     </section>
//   );
// }




"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Photo {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

export default function PhotoGallery() {
  const photos: Photo[] = [
    {
      id: 1,
      title: "Yala Leopard Sighting",
      description: "A majestic leopard spotted during a sunrise safari.",
      imageUrl: "https://images.unsplash.com/photo-1553524082-82690780f842?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fGxlb3BhcmR8ZW58MHx8MHx8fDA%3D",
    },
    {
      id: 2,
      title: "Elephant Herd",
      description: "A family of elephants roaming freely in Yala.",
      imageUrl: "https://images.unsplash.com/photo-1521651201144-634f700b36ef?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGVsZXBoYW50c3xlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      id: 3,
      title: "Sunset Over Yala",
      description: "A breathtaking sunset view during an evening safari.",
      imageUrl: "https://plus.unsplash.com/premium_photo-1669750818169-b598e1de3a1d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8U3Vuc2V0fGVufDB8fDB8fHww",
    },
    {
      id: 4,
      title: "Birds of Yala",
      description: "Colorful birdlife in Yala National Park.",
      imageUrl: "https://plus.unsplash.com/premium_photo-1724864863815-1469c8b74711?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8QmlyZHN8ZW58MHx8MHx8fDA%3D",
    },
    {
      id: 5,
      title: "wild dear",
      description: "Yala national park",
      imageUrl: "https://images.unsplash.com/photo-1451303688941-9e06d4b1277a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZGVhcnxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      id: 6,
      title: "Yala elephant",
      description: "wild elephant",
      imageUrl: "https://images.unsplash.com/photo-1603483080228-04f2313d9f10?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZWxlcGhhbnR8ZW58MHx8MHx8fDA%3D",
    },
    {
      id: 7,
      title: "Yala Deer",
      description: "A deer spotted in the park's grasslands.",
      imageUrl: "https://images.unsplash.com/photo-1745240939551-9a1a9dd41325?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGRlZXIlMjBzcmklMjBsYW5ha2F8ZW58MHx8MHx8fDA%3D",
    },
  ];

  const [displayPhotos, setDisplayPhotos] = useState<Photo[]>(photos);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  // Safe photo shuffling with comprehensive bounds checking
  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayPhotos((prevPhotos) => {
        if (!prevPhotos || prevPhotos.length < 2) return prevPhotos;
        
        const newPhotos = [...prevPhotos];
        const index1 = Math.floor(Math.random() * newPhotos.length);
        let index2 = Math.floor(Math.random() * newPhotos.length);
        
        while (index2 === index1 && newPhotos.length > 1) {
          index2 = Math.floor(Math.random() * newPhotos.length);
        }
        
        if (newPhotos[index1] && newPhotos[index2]) {
          [newPhotos[index1], newPhotos[index2]] = [newPhotos[index2], newPhotos[index1]];
        }
        
        return newPhotos;
      });
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const photoHoverVariants = {
    rest: { scale: 1, rotateY: 0 },
    hover: {
      scale: 1.05,
      rotateY: 5,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  // Safe function to get photo by index
  const getPhotoSafely = (index: number): Photo | null => {
    return displayPhotos && displayPhotos[index] ? displayPhotos[index] : null;
  };

  // Safe function to get photo slice
  const getPhotoSliceSafely = (start: number, end: number): Photo[] => {
    return displayPhotos ? displayPhotos.slice(start, end) : [];
  };

  return (
    <section className="relative w-full py-20 px-4 md:px-6 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-xl"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 via-transparent to-green-600/10 animate-pulse"></div>
      
      <div className="absolute top-20 left-10 w-32 h-32 bg-green-400/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-48 h-48 bg-green-400/3 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl md:text-2xl font-extrabold text-white mb-4">
            Yala Wildlife{" "}
            <span className="text-green-400 relative">
              Photo Gallery
              <motion.div
                className="absolute -bottom-2 left-0 w-full h-1 bg-green-400/30 rounded-full"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.8 }}
              ></motion.div>
            </span>
          </h2>
          <p className="text-green-200 text-lg max-w-2xl mx-auto">
            Discover the incredible wildlife and breathtaking moments captured in Yala National Park
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="container max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-6"
        >
          {/* Left Side */}
          <div className="md:col-span-2 flex flex-col gap-6">
            {/* Top Row: Two Square Images */}
            <div className="grid grid-cols-2 gap-6">
              {getPhotoSliceSafely(0, 2).map((photo) => (
                <motion.div
                  key={photo.id}
                  layoutId={`photo-${photo.id}`}
                  variants={itemVariants}
                  whileHover="hover"
                  initial="rest"
                  animate="rest"
                  className="group relative rounded-2xl overflow-hidden shadow-2xl bg-black/20 backdrop-blur-sm border border-white/10 hover:border-green-400/40 transition-all duration-500 cursor-pointer"
                  onClick={() => setSelectedPhoto(photo)}
                >
                  <motion.div
                    variants={photoHoverVariants}
                    className="relative w-full h-[200px] md:h-[250px] aspect-square"
                  >
                    <Image
                      src={photo.imageUrl}
                      alt={photo.title || "Gallery image"}
                      fill
                      className="object-cover transition-all duration-700 group-hover:brightness-110"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 16.5vw, 12.5vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <h3 className="font-bold text-sm mb-1">{photo.title}</h3>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* Middle Row: Three Stacked Images */}
            <div className="grid grid-cols-3 gap-6">
              {getPhotoSliceSafely(2, 5).map((photo) => (
                <motion.div
                  key={photo.id}
                  layoutId={`photo-${photo.id}`}
                  variants={itemVariants}
                  whileHover="hover"
                  initial="rest"
                  animate="rest"
                  className="group relative rounded-2xl overflow-hidden shadow-2xl bg-black/20 backdrop-blur-sm border border-white/10 hover:border-green-400/40 transition-all duration-500 cursor-pointer"
                  onClick={() => setSelectedPhoto(photo)}
                >
                  <motion.div
                    variants={photoHoverVariants}
                    className="relative w-full h-[200px] md:h-[250px]"
                  >
                    <Image
                      src={photo.imageUrl}
                      alt={photo.title || "Gallery image"}
                      fill
                      className="object-cover transition-all duration-700 group-hover:brightness-110"
                      sizes="(max-width: 640px) 33vw, (max-width: 1024px) 11vw, 8.3vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-2 left-2 right-2 text-white">
                        <h3 className="font-bold text-xs">{photo.title}</h3>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* Bottom Row: One Full-Width Image - SAFE ACCESS */}
            {(() => {
              const bottomPhoto = getPhotoSafely(5);
              return bottomPhoto ? (
                <motion.div
                  layoutId={`photo-${bottomPhoto.id}`}
                  variants={itemVariants}
                  whileHover="hover"
                  initial="rest"
                  animate="rest"
                  className="w-full group relative rounded-2xl overflow-hidden shadow-2xl bg-black/20 backdrop-blur-sm border border-white/10 hover:border-green-400/40 transition-all duration-500 cursor-pointer"
                  onClick={() => setSelectedPhoto(bottomPhoto)}
                >
                  <motion.div
                    variants={photoHoverVariants}
                    className="relative w-full h-[200px] md:h-[250px]"
                  >
                    <Image
                      src={bottomPhoto.imageUrl}
                      alt={bottomPhoto.title || "Gallery image"}
                      fill
                      className="object-cover transition-all duration-700 group-hover:brightness-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <h3 className="font-bold text-lg">{bottomPhoto.title}</h3>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ) : null;
            })()}
          </div>

          {/* Right Side - COMPLETELY SAFE ACCESS */}
          <div className="md:col-span-3 grid grid-rows-2 gap-6">
            {[0, 1].map((idx) => {
              const photo = getPhotoSafely(idx);
              return photo ? (
                <motion.div
                  key={photo.id}
                  layoutId={`photo-${photo.id}`}
                  variants={itemVariants}
                  whileHover="hover"
                  initial="rest"
                  animate="rest"
                  className="group relative rounded-2xl overflow-hidden shadow-2xl bg-black/20 backdrop-blur-sm border border-white/10 hover:border-green-400/40 transition-all duration-500 cursor-pointer"
                  onClick={() => setSelectedPhoto(photo)}
                >
                  <motion.div
                    variants={photoHoverVariants}
                    className="relative w-full h-[200px] md:h-[390px]"
                  >
                    <Image
                      src={photo.imageUrl}
                      alt={photo.title || "Gallery image"}
                      fill
                      className="object-cover transition-all duration-700 group-hover:brightness-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 66vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
                      <div className="absolute bottom-6 left-6 right-6 text-white">
                        <motion.h3
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          className="text-2xl md:text-3xl font-bold mb-2 text-green-400"
                        >
                          {photo.title}
                        </motion.h3>
                        <motion.p
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 }}
                          className="text-sm md:text-base text-gray-200"
                        >
                          {photo.description}
                        </motion.p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ) : (
                <div key={`placeholder-${idx}`} className="bg-black/20 rounded-2xl flex items-center justify-center">
                  <p className="text-green-400">Loading...</p>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Modal */}
        <AnimatePresence>
          {selectedPhoto && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPhoto(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              <motion.div
                layoutId={`photo-${selectedPhoto.id}`}
                className="relative max-w-4xl max-h-4xl bg-black/40 backdrop-blur-sm rounded-2xl overflow-hidden border border-green-400/40"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative w-full h-96 md:h-[600px]">
                  <Image
                    src={selectedPhoto.imageUrl}
                    alt={selectedPhoto.title || "Selected gallery image"}
                    fill
                    className="object-cover"
                    sizes="90vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent">
                    <div className="absolute bottom-6 left-6 right-6 text-white">
                      <h3 className="text-3xl md:text-4xl font-bold mb-2 text-green-400">
                        {selectedPhoto.title}
                      </h3>
                      <p className="text-lg text-gray-200">
                        {selectedPhoto.description}
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
                  aria-label="Close modal"
                >
                  &times;
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
