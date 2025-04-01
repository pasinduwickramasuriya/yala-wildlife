import Image from "next/image";

export default function PhotoGallery() {
  const photos = [
    {
      id: 1,
      title: "Yala Leopard Sighting",
      description: "A majestic leopard spotted during a sunrise safari.",
      imageUrl:
        "https://images.unsplash.com/photo-1553524082-82690780f842?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fGxlb3BhcmR8ZW58MHx8MHx8fDA%3D",
    },
    {
      id: 2,
      title: "Elephant Herd",
      description: "A family of elephants roaming freely in Yala.",
      imageUrl:
        "https://images.unsplash.com/photo-1521651201144-634f700b36ef?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGVsZXBoYW50c3xlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      id: 3,
      title: "Sunset Over Yala",
      description: "A breathtaking sunset view during an evening safari.",
      imageUrl:
        "https://plus.unsplash.com/premium_photo-1669750818169-b598e1de3a1d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8U3Vuc2V0fGVufDB8fDB8fHww",
    },
    {
      id: 4,
      title: "Birds of Yala",
      description: "Colorful birdlife in Yala National Park.",
      imageUrl:
        "https://plus.unsplash.com/premium_photo-1724864863815-1469c8b74711?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8QmlyZHN8ZW58MHx8MHx8fDA%3D",
    },
    {
      id: 5,
      title: "Yala Crocodile",
      description: "A crocodile basking near a waterhole.",
      imageUrl:
        "https://images.unsplash.com/photo-1451303688941-9e06d4b1277a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZGVhcnxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      id: 6,
      title: "Yala Water Buffalo",
      description: "A water buffalo grazing in the wetlands.",
      imageUrl:
        "https://images.unsplash.com/photo-1603483080228-04f2313d9f10?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZWxlcGhhbnR8ZW58MHx8MHx8fDA%3D",
    },
    {
      id: 7,
      title: "Yala Deer",
      description: "A deer spotted in the park's grasslands.",
      imageUrl:
        "https://images.unsplash.com/photo-1579446565681-a6f1be0bf24e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGVlcnxlbnwwfHwwfHx8MA%3D%3D",
    },
  ];

  return (
    <section className="w-full py-16 px-4 md:px-6 bg-background">
      <h2 className="text-3xl md:text-2xl font-extrabold text-center text-foreground mb-12 tracking-tight">
        Yala Safari Photo Gallery
      </h2>
      <div className="container max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-6">
        {/* Left Side: Two Square Images on Top, Three in Middle, One at Bottom */}
        <div className="md:col-span-2 flex flex-col gap-6">
          {/* Top Row: Two Square Images */}
          <div className="grid grid-cols-2 gap-6">
            {photos.slice(0, 2).map((photo) => (
              <div
                key={photo.id}
                className="group relative rounded-xl overflow-hidden shadow-md border border-border/50 bg-card transition-all duration-300 hover:shadow-xl"
              >
                <div className="relative w-full h-[200px] md:h-[250px] aspect-square">
                  <Image
                    src={photo.imageUrl}
                    alt={photo.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 16.5vw, 12.5vw"
                  />
                </div>
              </div>
            ))}
          </div>
          {/* Middle Row: Three Stacked Images */}
          <div className="grid grid-cols-3 gap-6">
            {photos.slice(2, 5).map((photo) => (
              <div
                key={photo.id}
                className="group relative rounded-xl overflow-hidden shadow-md border border-border/50 bg-card transition-all duration-300 hover:shadow-xl"
              >
                <div className="relative w-full h-[200px] md:h-[250px]">
                  <Image
                    src={photo.imageUrl}
                    alt={photo.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 33vw, (max-width: 1024px) 11vw, 8.3vw"
                  />
                  {/* <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-4">
                    <h3 className="text-card-foreground text-lg md:text-xl font-bold mb-1">
                      {photo.title}
                    </h3>
                    <p className="text-muted-foreground text-sm md:text-base line-clamp-2">
                      {photo.description}
                    </p>
                  </div> */}
                </div>
              </div>
            ))}
          </div>
          {/* Bottom Row: One Full-Width Image */}
          <div className="w-full">
            <div className=" group relative rounded-xl overflow-hidden shadow-md border border-border/50 bg-card transition-all duration-300 hover:shadow-xl">
              <div className="relative w-full h-[200px] md:h-[250px]">
                <Image
                  src={photos[5].imageUrl}
                  alt={photos[5].title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 25vw"
                />
                {/* <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-4">
                  <h3 className="text-card-foreground text-lg md:text-xl font-bold mb-1">
                    {photos[5].title}
                  </h3>
                  <p className="text-muted-foreground text-sm md:text-base line-clamp-2">
                    {photos[5].description}
                  </p>
                </div> */}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Two Rows with Two Images */}
        <div className="md:col-span-3 grid grid-rows-2 gap-6">
          {/* First Image */}
          <div className="relative rounded-xl overflow-hidden shadow-md border border-border/50 bg-card transition-all duration-300 hover:shadow-xl">
            <div className="relative w-full h-[200px] md:h-[390px]">
              <Image
                src={photos[0].imageUrl}
                alt={photos[0].title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 66vw, 50vw"
              />
              <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-6 md:p-8">
                <h3 className="text-card-foreground text-2xl md:text-3xl font-bold mb-2">
                  {photos[0].title}
                </h3>
                {/* <p className="text-muted-foreground text-base md:text-lg line-clamp-2">
                  {photos[0].description}
                </p> */}
              </div>
            </div>
          </div>
          {/* Second Image */}
          <div className="relative rounded-xl overflow-hidden shadow-md border border-border/50 bg-card transition-all duration-300 hover:shadow-xl">
            <div className="relative w-full h-[200px] md:h-[390px]">
              <Image
                src={photos[1].imageUrl}
                alt={photos[1].title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 66vw, 50vw"
              />
              <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-6 md:p-8">
                <h3 className="text-card-foreground text-2xl md:text-3xl font-bold mb-2">
                  {photos[1].title}
                </h3>
                {/* <p className="text-muted-foreground text-base md:text-lg line-clamp-2">
                  {photos[1].description}
                </p> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <GallerySection/> */}
    </section>
  );
}
