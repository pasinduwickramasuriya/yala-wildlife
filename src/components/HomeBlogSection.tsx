"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
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

// --- Helper to strip HTML/Markdown ---
const getExcerpt = (content: string, length: number = 100) => {
    const stripped = content.replace(/(<([^>]+)>)/gi, "");
    return stripped.length > length ? stripped.substring(0, length) + "..." : stripped;
};

// --- Animations ---
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 40, damping: 15 },
    },
};

export default function HomeBlogSection() {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchBlogs() {
            try {
                const res = await fetch("/api/blogs/featured");
                const data = await res.json();
                setBlogs(data);
            } catch (error) {
                console.error("Failed to load blogs");
            } finally {
                setLoading(false);
            }
        }
        fetchBlogs();
    }, []);

    if (loading) return <BlogSkeleton />;
    if (blogs.length === 0) return null;

    const [featuredPost, ...sidePosts] = blogs;

    return (
        <section className="relative py-20 px-4 md:px-8 overflow-hidden">
            {/* Background Gradient Blob for Atmosphere */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#00ff00] rounded-full mix-blend-screen filter blur-[150px] opacity-[0.05] pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <header className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-2">
                            LATEST <span className="text-[#00ff00]">STORIES</span>
                        </h2>
                        <p className="text-gray-400 text-lg">Insights from the wild.</p>
                    </div>
                    <Link
                        href="/blog"
                        className="hidden md:inline-flex items-center justify-center px-6 py-3 rounded-full bg-white/5 hover:bg-[#00ff00] text-white hover:text-black font-semibold transition-all duration-300 backdrop-blur-sm"
                    >
                        View All Posts
                    </Link>
                </header>

                <motion.div
                    className="grid grid-cols-1 lg:grid-cols-12 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {/* LEFT COLUMN: Featured Blog (Large Card) */}
                    <motion.article className="lg:col-span-7" variants={itemVariants}>
                        <Link href={`/blog/${featuredPost.slug}`} className="group block relative h-full">
                            <div className="relative w-full h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                                {/* Image */}
                                <Image
                                    src={featuredPost.imageUrl}
                                    alt={featuredPost.title}
                                    fill
                                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                />

                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

                                {/* Content Overlay */}
                                <div className="absolute bottom-0 left-0 p-8 w-full">
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="px-4 py-1 rounded-full bg-[#00ff00] text-black text-xs font-bold uppercase tracking-wider">
                                            Featured
                                        </span>
                                        <time dateTime={featuredPost.createdAt} className="text-gray-300 text-sm font-medium">
                                            {format(new Date(featuredPost.createdAt), "MMMM dd, yyyy")}
                                        </time>
                                    </div>

                                    <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight mb-4 group-hover:text-[#00ff00] transition-colors duration-300">
                                        {featuredPost.title}
                                    </h3>

                                    <p className="text-gray-300 line-clamp-2 text-base md:text-lg mb-6 max-w-xl">
                                        {getExcerpt(featuredPost.content, 150)}
                                    </p>

                                    <div className="inline-flex items-center gap-2 text-white font-semibold group-hover:gap-4 transition-all duration-300">
                                        Read Article
                                        <span className="text-[#00ff00] text-xl">→</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </motion.article>

                    {/* RIGHT COLUMN: List of Side Blogs */}
                    <motion.div className="lg:col-span-5 flex flex-col gap-5" variants={containerVariants}>
                        {sidePosts.map((post) => (
                            <motion.article key={post.id} variants={itemVariants}>
                                <Link
                                    href={`/blog/${post.slug}`}
                                    className="group flex items-center gap-5 p-4 rounded-3xl bg-white/5 hover:bg-white/10 border border-white/5 backdrop-blur-md transition-all duration-300"
                                >
                                    {/* Image Thumbnail */}
                                    <div className="relative w-24 h-24 md:w-32 md:h-32 shrink-0 rounded-2xl overflow-hidden">
                                        <Image
                                            src={post.imageUrl}
                                            alt={post.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                    </div>

                                    {/* Text Info */}
                                    <div className="flex flex-col justify-center">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="w-2 h-2 rounded-full bg-[#00ff00] shadow-[0_0_10px_#00ff00]"></span>
                                            <span className="text-xs text-[#00ff00] uppercase font-bold tracking-widest">
                                                New
                                            </span>
                                        </div>
                                        <h3 className="text-lg md:text-xl font-bold text-white leading-snug group-hover:text-[#00ff00] transition-colors duration-300 line-clamp-2">
                                            {post.title}
                                        </h3>
                                        <time dateTime={post.createdAt} className="text-xs text-gray-500 mt-2">
                                            {format(new Date(post.createdAt), "MMM dd, yyyy")}
                                        </time>
                                    </div>
                                </Link>
                            </motion.article>
                        ))}

                        {/* Mobile "View All" Button */}
                        <motion.div variants={itemVariants} className="mt-4 md:hidden">
                            <Link
                                href="/blog"
                                className="block w-full text-center py-4 rounded-full bg-[#00ff00] text-black font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-colors"
                            >
                                View All Stories
                            </Link>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}

// --- Dark Mode Rounded Skeleton ---
function BlogSkeleton() {
    return (
        <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto animate-pulse">
            <div className="mb-12">
                <div className="h-12 w-64 bg-white/10 rounded-full mb-4"></div>
                <div className="h-4 w-32 bg-white/5 rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-7">
                    <div className="w-full h-[500px] bg-white/5 rounded-3xl"></div>
                </div>
                <div className="lg:col-span-5 flex flex-col gap-5">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center gap-5 p-4 rounded-3xl bg-white/5 border border-white/5">
                            <div className="w-32 h-32 bg-white/10 rounded-2xl"></div>
                            <div className="flex-1">
                                <div className="h-4 w-20 bg-white/10 rounded-full mb-3"></div>
                                <div className="h-6 w-full bg-white/10 rounded-full mb-2"></div>
                                <div className="h-6 w-2/3 bg-white/10 rounded-full"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}