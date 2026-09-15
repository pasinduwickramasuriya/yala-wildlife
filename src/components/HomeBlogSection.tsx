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

export default function HomeBlogSection({ initialBlogs }: { initialBlogs?: Blog[] }) {
    const [blogs, setBlogs] = useState<Blog[]>(
        initialBlogs && initialBlogs.length > 0 ? initialBlogs.slice(0, 5) : FALLBACK_BLOGS
    );

    useEffect(() => {
        if (initialBlogs && initialBlogs.length > 0) {
            const shuffled = [...initialBlogs].sort(() => 0.5 - Math.random()).slice(0, 5);
            setBlogs(shuffled);
            return;
        }
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
    }, [initialBlogs]);

    if (blogs.length === 0) return null;

    return (
        <section className="relative w-full p-0 m-0 overflow-hidden border-none bg-black cv-auto">
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
                            loading="lazy"
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