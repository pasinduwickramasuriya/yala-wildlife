
//             <div className="max-w-7xl mx-auto relative z-10">
//                 {/* Header */}
//                 <header className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
//                     {/* <div>
//                         <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-2 inline-block px-4 py-2 rounded-3xl bg-black/70">
//                             LATEST <span className="text-[#00ff00]">STORIES</span>
//                         </h2><br />
//                         <p className="text-gray-400 text-lg inline-block px-4 py-2 rounded-3xl bg-black/70">Insights from the wild.</p>
//                     </div> */}
//                     <div className="text-center">
//                         <div className="inline-flex flex-col items-center gap-3">
//                             <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white inline-block px-4 py-2 rounded-3xl bg-black/70">
//                                 LATEST <span className="text-[#00ff00]">STORIES</span>
//                             </h2>

//                             <p className="text-gray-400 text-lg inline-block px-4 py-2 rounded-3xl bg-black/70">
//                                 Insights from the wild.
//                             </p>
//                         </div>
//                     </div>

//                     <Link
//                         href="/blog"
//                         className="hidden md:inline-flex items-center justify-center px-6 py-3 rounded-full bg-white/5 hover:bg-[#00ff00] text-white hover:text-black font-semibold transition-all duration-300 backdrop-blur-sm"
//                     >
//                         View All Posts
//                     </Link>
//                 </header>

//                 <motion.div
//                     className="grid grid-cols-1 lg:grid-cols-12 gap-8"
//                     variants={containerVariants}
//                     initial="hidden"
//                     whileInView="visible"
//                     viewport={{ once: true, margin: "-100px" }}
//                 >
//                     {/* LEFT COLUMN: Featured Blog (Large Card) */}
//                     <motion.article className="lg:col-span-7" variants={itemVariants}>
//                         <Link href={`/blog/${featuredPost.slug}`} className="group block relative h-full">
//                             <div className="relative w-full h-[500px] rounded-3xl overflow-hidden shadow-2xl">
//                                 {/* Image */}
//                                 <Image
//                                     src={featuredPost.imageUrl}
//                                     alt={featuredPost.title}
//                                     fill
//                                     className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
//                                 />

//                                 {/* Gradient Overlay */}
//                                 <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

//                                 {/* Content Overlay */}
//                                 <div className="absolute bottom-0 left-0 p-8 w-full">
//                                     <div className="flex items-center gap-3 mb-4">
//                                         <span className="px-4 py-1 rounded-full bg-[#00ff00] text-black text-xs font-bold uppercase tracking-wider">
//                                             Featured
//                                         </span>
//                                         <time dateTime={featuredPost.createdAt} className="text-gray-300 text-sm font-medium">
//                                             {format(new Date(featuredPost.createdAt), "MMMM dd, yyyy")}
//                                         </time>
//                                     </div>

//                                     <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight mb-4 group-hover:text-[#00ff00] transition-colors duration-300">
//                                         {featuredPost.title}
//                                     </h3>

//                                     <p className="text-gray-300 line-clamp-2 text-base md:text-lg mb-6 max-w-xl">
//                                         {getExcerpt(featuredPost.content, 150)}
//                                     </p>

//                                     <div className="inline-flex items-center gap-2 text-white font-semibold group-hover:gap-4 transition-all duration-300">
//                                         Read Article
//                                         <span className="text-[#00ff00] text-xl">→</span>
//                                     </div>
//                                 </div>
//                             </div>
//                         </Link>
//                     </motion.article>

//                     {/* RIGHT COLUMN: List of Side Blogs */}
//                     <motion.div className="lg:col-span-5 flex flex-col gap-5" variants={containerVariants}>
//                         {sidePosts.map((post) => (
//                             <motion.article key={post.id} variants={itemVariants}>
//                                 <Link
//                                     href={`/blog/${post.slug}`}
//                                     className="group flex items-center gap-5 p-4 rounded-3xl bg-white/5 hover:bg-white/10 border border-white/5 backdrop-blur-md transition-all duration-300"
//                                 >
//                                     {/* Image Thumbnail */}
//                                     <div className="relative w-24 h-24 md:w-32 md:h-32 shrink-0 rounded-2xl overflow-hidden">
//                                         <Image
//                                             src={post.imageUrl}
//                                             alt={post.title}
//                                             fill
//                                             className="object-cover transition-transform duration-500 group-hover:scale-110"
//                                         />
//                                     </div>

//                                     {/* Text Info */}
//                                     <div className="flex flex-col justify-center">
//                                         <div className="flex items-center gap-2 mb-2">
//                                             <span className="w-2 h-2 rounded-full bg-[#00ff00] shadow-[0_0_10px_#00ff00]"></span>
//                                             <span className="text-xs text-[#00ff00] uppercase font-bold tracking-widest">
//                                                 New
//                                             </span>
//                                         </div>
//                                         <h3 className="text-lg md:text-xl font-bold text-white leading-snug group-hover:text-[#00ff00] transition-colors duration-300 line-clamp-2">
//                                             {post.title}
//                                         </h3>
//                                         <time dateTime={post.createdAt} className="text-xs text-gray-500 mt-2">
//                                             {format(new Date(post.createdAt), "MMM dd, yyyy")}
//                                         </time>
//                                     </div>
//                                 </Link>
//                             </motion.article>
//                         ))}

//                         {/* Mobile "View All" Button */}
//                         <motion.div variants={itemVariants} className="mt-4 md:hidden">
//                             <Link
//                                 href="/blog"
//                                 className="block w-full text-center py-4 rounded-full bg-[#00ff00] text-black font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-colors"
//                             >
//                                 View All Stories
//                             </Link>
//                         </motion.div>
//                     </motion.div>
//                 </motion.div>
//             </div>
//         </section>
//     );
// }

// // --- Dark Mode Rounded Skeleton ---
// function BlogSkeleton() {
//     return (
//         <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto animate-pulse">
//             <div className="mb-12">
//                 <div className="h-12 w-64 bg-white/10 rounded-full mb-4"></div>
//                 <div className="h-4 w-32 bg-white/5 rounded-full"></div>
//             </div>

//             <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
//                 <div className="lg:col-span-7">
//                     <div className="w-full h-[500px] bg-white/5 rounded-3xl"></div>
//                 </div>
//                 <div className="lg:col-span-5 flex flex-col gap-5">
//                     {[1, 2, 3].map((i) => (
//                         <div key={i} className="flex items-center gap-5 p-4 rounded-3xl bg-white/5 border border-white/5">
//                             <div className="w-32 h-32 bg-white/10 rounded-2xl"></div>
//                             <div className="flex-1">
//                                 <div className="h-4 w-20 bg-white/10 rounded-full mb-3"></div>
//                                 <div className="h-6 w-full bg-white/10 rounded-full mb-2"></div>
//                                 <div className="h-6 w-2/3 bg-white/10 rounded-full"></div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </section>
//     );
// }






"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";

// --- Types ---
type Blog = {
    id: string;
    title: string;
    content: string;
    imageUrl: string;
    slug: string;
    createdAt: string;
};

const FALLBACK_BLOGS: Blog[] = [
    {
        id: "fb-1",
        title: "Leopard Spotting in Yala Block 1",
        content: "Discover the best granite outcrops and watering holes for spotting Sri Lankan leopards.",
        imageUrl: "/uploads/yala1.webp",
        slug: "leopard-spotting-yala-block-1",
        createdAt: new Date().toISOString(),
    },
    {
        id: "fb-2",
        title: "The Wild Elephant Herds of Menik River",
        content: "Experience Asian elephants gathering along the Menik River banks.",
        imageUrl: "/uploads/yala2.webp",
        slug: "wild-elephant-herds-menik-river",
        createdAt: new Date().toISOString(),
    },
    {
        id: "fb-3",
        title: "Complete Guide to Yala Safari Seasons",
        content: "Plan your wildlife trip with expert tips on climate and waterhole activity.",
        imageUrl: "https://res.cloudinary.com/dkfnpmzpv/image/upload/v1784456381/blogs/jqbr6khinkvptii7ax0c.jpg",
        slug: "yala-safari-seasons-guide",
        createdAt: new Date().toISOString(),
    },
    {
        id: "fb-4",
        title: "Sloth Bears & Rare Birdlife of Yala",
        content: "Uncover Yala's incredible biodiversity beyond big cats.",
        imageUrl: "https://res.cloudinary.com/dkfnpmzpv/image/upload/v1784789489/blogs/cey5tcc2jkxwzj4kd9dc.jpg",
        slug: "sloth-bears-rare-birdlife",
        createdAt: new Date().toISOString(),
    },
    {
        id: "fb-5",
        title: "Luxury 4x4 Jeep Safari Experience",
        content: "Why an upgraded custom 4x4 jeep makes all the difference.",
        imageUrl: "https://res.cloudinary.com/dkfnpmzpv/image/upload/v1784792078/blogs/q9pbmwka9hce9zfydocc.jpg",
        slug: "luxury-4x4-jeep-safari",
        createdAt: new Date().toISOString(),
    }
];

export default function HomeBlogSection() {
    const [blogs, setBlogs] = useState<Blog[]>(FALLBACK_BLOGS);

    useEffect(() => {
        async function fetchBlogs() {
            try {
                const res = await fetch("/api/blogs/featured");
                const data = await res.json();
                if (Array.isArray(data) && data.length > 0) {
                    const shuffled = [...data].sort(() => 0.5 - Math.random());
                    setBlogs(shuffled.slice(0, 5));
                }
            } catch (error) {
                console.error("Failed to load blogs");
            }
        }
        fetchBlogs();
    }, []);

    if (blogs.length === 0) return null;

    return (
        <section className="relative w-full p-0 m-0 overflow-hidden border-none bg-black">
            {/* THE SEAMLESS BIG BLOCK WALL 
               - grid-flow-row-dense: Fills every hole perfectly
               - gap-0: Zero space between images
            */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full gap-0 p-0 m-0 border-none grid-flow-row-dense">
                {blogs.map((post, index) => (
                    <Link
                        key={post.id}
                        href={`/blog/${post.slug}`}
                        className={`group relative overflow-hidden w-full p-0 m-0 border-none transition-all duration-700 ${
                            // Large blocks are now 2x2 squares, small blocks are 1x1 squares
                            // This prevents any one image from becoming "too tall"
                            index % 7 === 0 
                                ? "col-span-2 row-span-2 aspect-square md:aspect-auto" 
                                : "col-span-1 row-span-1 aspect-square"
                        }`}
                    >
                        {/* IMAGE: Fill + Object-Cover forces the image into the square shape */}
                        <Image
                            src={post.imageUrl}
                            alt={post.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                            className="object-cover transition-transform duration-[2s] cubic-bezier(0.16, 1, 0.3, 1) group-hover:scale-110"
                            priority={index < 3}
                        />

                        {/* Cinematic Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-700" />

                        {/* CONTENT: 12px Cutter Typography */}
                        <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                            <div className="space-y-3">
                                {/* <time className="text-[12px] font-black text-[#00ff00]  tracking-[0.4em] block opacity-80">
                                    {format(new Date(post.createdAt), "MMMM dd")}
                                </time> */}

                                <h3 className="text-[8px] font-bold text-white tracking-[0.1em] leading-[1.2] group-hover:text-[#00ff00] transition-colors duration-500  max-w-[180px]">
                                    {post.title}
                                </h3>

                                <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all duration-700">
                                    <div className="h-[1px] w-6 bg-[#00ff00]" />
                                    <span className="text-[12px] font-black uppercase tracking-widest text-white/50">
                                        Open
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}

function BlogSkeleton() {
    return (
        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-0 p-0 m-0 border-none overflow-hidden">
            {[...Array(5)].map((_, i) => (
                <div key={i} className="aspect-square bg-neutral-900 animate-pulse border-none" />
            ))}
        </div>
    );
}