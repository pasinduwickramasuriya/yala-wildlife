"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Plus, Trash2, Edit3, X, Sparkles, Check, Info } from "lucide-react";

interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  included?: string | null;
  highlight?: string | null;
}

interface Tour {
  id: string;
  title: string;
  slug: string;
  route: string | null;
  price: number;
  duration: string | null;
  imageUrl: string | null;
  isFeatured: boolean;
  description: string;
  longDescription?: string | null;
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  itinerary: ItineraryDay[];
  seoKeywords?: string | null;
}

export default function AddTour() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    route: "",
    price: "",
    duration: "",
    imageUrl: "",
    isFeatured: false,
    description: "",
    longDescription: "",
    seoKeywords: "",
    highlights: "",  // Line separated strings
    inclusions: "",  // Line separated strings
    exclusions: "",  // Line separated strings
  });

  const [itinerary, setItinerary] = useState<ItineraryDay[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [editId, setEditId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch all tours
  const fetchTours = useCallback(async () => {
    try {
      const res = await fetch("/api/tours", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch tours");
      const data = await res.json();
      setTours(data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch tour packages");
    }
  }, []);

  useEffect(() => {
    fetchTours();
  }, [fetchTours]);

  // Automated clean slug generation from Title
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    const generatedSlug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    setFormData((prev) => ({
      ...prev,
      title,
      slug: editId ? prev.slug : generatedSlug, // Generate slug on title change ONLY when adding
    }));
  };

  // Image file select handler
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImageFile(file);
    if (file) {
      setFormData((prev) => ({ ...prev, imageUrl: "" }));
    }
  };

  // Dynamic Itinerary Day actions
  const addItineraryDay = () => {
    const nextDay = itinerary.length + 1;
    setItinerary([
      ...itinerary,
      { day: nextDay, title: "", description: "", included: "", highlight: "" }
    ]);
  };

  const removeItineraryDay = (index: number) => {
    const updated = itinerary.filter((_, i) => i !== index);
    // Renumber days sequentially
    const renumbered = updated.map((item, idx) => ({
      ...item,
      day: idx + 1
    }));
    setItinerary(renumbered);
  };

  const handleItineraryDayChange = (index: number, field: keyof ItineraryDay, value: any) => {
    const updated = [...itinerary];
    updated[index] = {
      ...updated[index],
      [field]: field === "day" ? parseInt(value) || 1 : value
    };
    setItinerary(updated);
  };

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    const url = editId ? `/api/tours?id=${editId}` : "/api/tours";
    const method = editId ? "PUT" : "POST";

    const bodyData = new FormData();
    bodyData.append("title", formData.title);
    bodyData.append("slug", formData.slug);
    bodyData.append("route", formData.route);
    bodyData.append("price", formData.price);
    bodyData.append("duration", formData.duration);
    bodyData.append("isFeatured", String(formData.isFeatured));
    bodyData.append("description", formData.description);
    bodyData.append("longDescription", formData.longDescription);
    bodyData.append("seoKeywords", formData.seoKeywords);
    bodyData.append("highlights", formData.highlights);
    bodyData.append("inclusions", formData.inclusions);
    bodyData.append("exclusions", formData.exclusions);
    
    // Append itinerary array as JSON string
    bodyData.append("itinerary", JSON.stringify(itinerary));

    // Handle Image
    if (imageFile) {
      bodyData.append("image", imageFile);
    } else if (formData.imageUrl) {
      bodyData.append("imageUrl", formData.imageUrl);
    } else if (method === "POST") {
      setError("Please choose a cover image file or provide an image URL.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(url, {
        method,
        body: bodyData
      });

      const text = await res.text();
      const data = text ? JSON.parse(text) : {};

      if (!res.ok) {
        throw new Error(data.error || text || `Request failed with code ${res.status}`);
      }

      setSuccess(`Tour package ${editId ? "updated" : "created"} successfully!`);
      
      // Reset Form State
      setFormData({
        title: "",
        slug: "",
        route: "",
        price: "",
        duration: "",
        imageUrl: "",
        isFeatured: false,
        description: "",
        longDescription: "",
        seoKeywords: "",
        highlights: "",
        inclusions: "",
        exclusions: "",
      });
      setItinerary([]);
      setImageFile(null);
      setEditId(null);
      
      // Re-fetch tours
      await fetchTours();
    } catch (err: any) {
      setError(err.message || "An error occurred during submission");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Populate form to edit
  const handleEdit = (tour: Tour) => {
    setError(null);
    setSuccess(null);
    setEditId(tour.id);
    
    setFormData({
      title: tour.title,
      slug: tour.slug,
      route: tour.route || "",
      price: tour.price.toString(),
      duration: tour.duration || "",
      imageUrl: tour.imageUrl || "",
      isFeatured: tour.isFeatured,
      description: tour.description,
      longDescription: tour.longDescription || "",
      seoKeywords: tour.seoKeywords || "",
      highlights: tour.highlights.join("\n"),
      inclusions: tour.inclusions.join("\n"),
      exclusions: tour.exclusions.join("\n"),
    });

    setItinerary(tour.itinerary);
    setImageFile(null);
  };

  // Delete handler
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this tour package?")) return;
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch(`/api/tours?id=${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Delete failed");

      setSuccess("Tour package deleted successfully!");
      setTours(tours.filter((t) => t.id !== id));
      if (editId === id) {
        // Clear if editing the deleted tour
        setEditId(null);
        setItinerary([]);
        setFormData({
          title: "", slug: "", route: "", price: "", duration: "", imageUrl: "",
          isFeatured: false, description: "", longDescription: "", seoKeywords: "",
          highlights: "", inclusions: "", exclusions: ""
        });
      }
    } catch (err: any) {
      setError(err.message || "Delete failed");
      console.error(err);
    }
  };

  return (
    <div className="p-2 md:p-6 max-w-6xl mx-auto space-y-8">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-border pb-6 gap-4">
        <div>
          <h1 className="text-3xl font-black uppercase text-white tracking-tighter flex items-center gap-2">
            <Sparkles className="w-8 h-8 text-[#00ff00]" />
            Manage Tours
          </h1>
          <p className="text-sm text-muted-foreground uppercase tracking-widest font-semibold mt-1">
            Dynamic Tour & Cultural Expedition Control Center
          </p>
        </div>
        {editId && (
          <button
            onClick={() => {
              setEditId(null);
              setFormData({
                title: "", slug: "", route: "", price: "", duration: "", imageUrl: "",
                isFeatured: false, description: "", longDescription: "", seoKeywords: "",
                highlights: "", inclusions: "", exclusions: ""
              });
              setItinerary([]);
              setImageFile(null);
              setSuccess(null);
            }}
            className="flex items-center gap-2 bg-destructive/15 text-destructive border border-destructive/20 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider hover:bg-destructive/20 transition-all"
          >
            <X className="w-4 h-4" /> Cancel Edit Mode
          </button>
        )}
      </div>

      {/* FEEDBACK SYSTEM */}
      {error && (
        <div className="bg-rose-500/10 border border-rose-500/20 text-rose-500 p-4 rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center gap-2">
          <Info className="w-5 h-5 flex-shrink-0" /> {error}
        </div>
      )}
      {success && (
        <div className="bg-[#00ff00]/10 border border-[#00ff00]/20 text-[#00ff00] p-4 rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center gap-2">
          <Check className="w-5 h-5 flex-shrink-0" /> {success}
        </div>
      )}

      {/* EDITOR & FORM */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8" encType="multipart/form-data">
        {/* LEFT COLUMN: CORE SPECS */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card border border-border p-6 rounded-3xl space-y-4 shadow-xl">
            <h2 className="text-lg font-black uppercase tracking-tight text-white pb-3 border-b border-border">
              1. Tour Specifications
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">
                  Tour Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={handleTitleChange}
                  className="w-full bg-background border border-border rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#00ff00]/50"
                  placeholder="e.g., 5-Day Sri Lanka Escape"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">
                  Slug (Auto-generated)
                </label>
                <input
                  type="text"
                  required
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="w-full bg-background border border-border rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#00ff00]/50"
                  placeholder="e.g., 5-day-sri-lanka-escape"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">
                  Price ($ USD)
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full bg-background border border-border rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#00ff00]/50"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">
                  Duration Label
                </label>
                <input
                  type="text"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  className="w-full bg-background border border-border rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#00ff00]/50"
                  placeholder="e.g., 5 Days / 4 Nights"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">
                  Route Summary
                </label>
                <input
                  type="text"
                  value={formData.route}
                  onChange={(e) => setFormData({ ...formData, route: e.target.value })}
                  className="w-full bg-background border border-border rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#00ff00]/50"
                  placeholder="e.g., Sigiriya → Kandy → Ella"
                />
              </div>
            </div>

            {/* Checkbox Group */}
            <div className="flex items-center gap-3 pt-2 bg-background/35 p-4 rounded-2xl border border-border/50">
              <input
                id="isFeatured"
                type="checkbox"
                checked={formData.isFeatured}
                onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                className="w-4 h-4 text-[#00ff00] bg-background border-border rounded focus:ring-0 focus:ring-offset-0"
              />
              <label htmlFor="isFeatured" className="text-xs font-black uppercase tracking-widest text-white cursor-pointer select-none">
                ★ Mark as Featured Tour (Display with glowing badge)
              </label>
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">
                Short Description
              </label>
              <textarea
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full bg-background border border-border rounded-xl p-3 text-sm text-white h-24 focus:outline-none focus:border-[#00ff00]/50"
                placeholder="Brief summary showing in public card lists..."
              />
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">
                Long Description (Detailed Overview)
              </label>
              <textarea
                value={formData.longDescription}
                onChange={(e) => setFormData({ ...formData, longDescription: e.target.value })}
                className="w-full bg-background border border-border rounded-xl p-3 text-sm text-white h-32 focus:outline-none focus:border-[#00ff00]/50"
                placeholder="Detailed overview shown at the header of single tour detail page..."
              />
            </div>
          </div>

          {/* DYNAMIC ITINERARY BUILDER */}
          <div className="bg-card border border-border p-6 rounded-3xl space-y-6 shadow-xl">
            <div className="flex justify-between items-center pb-3 border-b border-border">
              <h2 className="text-lg font-black uppercase tracking-tight text-white">
                2. Operational Itinerary Days
              </h2>
              <button
                type="button"
                onClick={addItineraryDay}
                className="flex items-center gap-1 bg-[#00ff00]/10 hover:bg-[#00ff00]/20 text-[#00ff00] border border-[#00ff00]/30 px-3.5 py-2 rounded-xl text-xs font-black uppercase tracking-wider"
              >
                <Plus className="w-4 h-4" /> Add Day
              </button>
            </div>

            {itinerary.length === 0 ? (
              <div className="text-center py-12 bg-background/20 rounded-2xl border border-dashed border-border flex flex-col items-center justify-center gap-2">
                <p className="text-xs uppercase tracking-widest font-black text-neutral-500">
                  No itinerary days declared yet.
                </p>
                <button
                  type="button"
                  onClick={addItineraryDay}
                  className="text-xs font-black uppercase tracking-widest text-[#00ff00] hover:underline"
                >
                  Click here to add Day 1
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {itinerary.map((dayItem, index) => (
                  <div key={index} className="bg-background/40 border border-border rounded-2xl p-4 space-y-3 relative group">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-[#00ff00]/15 text-[#00ff00] text-xs font-black uppercase">
                          D{dayItem.day}
                        </span>
                        <input
                          type="text"
                          required
                          value={dayItem.title}
                          onChange={(e) => handleItineraryDayChange(index, "title", e.target.value)}
                          className="bg-transparent border-b border-transparent focus:border-border font-black text-sm uppercase tracking-tight text-white py-1 focus:outline-none"
                          placeholder="Day Title (e.g., Kandy Spiritual Wonders)"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItineraryDay(index)}
                        className="text-rose-500 hover:text-rose-400 p-1.5 bg-rose-500/10 border border-rose-500/10 hover:border-rose-500/20 rounded-xl"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                      <div>
                        <textarea
                          required
                          value={dayItem.description}
                          onChange={(e) => handleItineraryDayChange(index, "description", e.target.value)}
                          className="w-full bg-background border border-border rounded-xl p-2.5 text-xs text-white h-20 focus:outline-none focus:border-[#00ff00]/30"
                          placeholder="Activities description for this day..."
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <input
                            type="text"
                            value={dayItem.included || ""}
                            onChange={(e) => handleItineraryDayChange(index, "included", e.target.value)}
                            className="w-full bg-background border border-border rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-[#00ff00]/30"
                            placeholder="Inclusions specific to this day (optional)"
                          />
                        </div>
                        <div>
                          <input
                            type="text"
                            value={dayItem.highlight || ""}
                            onChange={(e) => handleItineraryDayChange(index, "highlight", e.target.value)}
                            className="w-full bg-background border border-border rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-[#00ff00]/30"
                            placeholder="Special Sunset/Scenic Highlight (optional)"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: LISTS & IMAGES */}
        <div className="space-y-6">
          {/* IMAGE UPLOAD PANEL */}
          <div className="bg-card border border-border p-6 rounded-3xl space-y-4 shadow-xl">
            <h2 className="text-lg font-black uppercase tracking-tight text-white pb-3 border-b border-border">
              3. Media Cover
            </h2>

            {/* Choose file upload */}
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">
                Choose Image File
              </label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full text-xs text-neutral-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-black file:uppercase file:bg-[#00ff00]/10 file:text-[#00ff00] hover:file:bg-[#00ff00]/20"
              />
            </div>

            <div className="text-center py-2 text-[10px] text-neutral-500 font-bold uppercase tracking-widest">
              --- OR ---
            </div>

            {/* Raw URL alternative */}
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">
                Fallback Image URL
              </label>
              <input
                type="url"
                value={formData.imageUrl}
                disabled={!!imageFile}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                className="w-full bg-background border border-border rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#00ff00]/50"
                placeholder="Cloudinary/Unsplash image URL..."
              />
            </div>

            {/* Image Preview */}
            {(imageFile || formData.imageUrl) && (
              <div className="relative w-full h-40 rounded-2xl overflow-hidden border border-border bg-neutral-900 mt-2">
                <Image
                  src={imageFile ? URL.createObjectURL(imageFile) : formData.imageUrl}
                  alt="Tour cover preview"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            )}
          </div>

          {/* LISTS: HIGHLIGHTS, INCLUSIONS & EXCLUSIONS */}
          <div className="bg-card border border-border p-6 rounded-3xl space-y-4 shadow-xl">
            <h2 className="text-lg font-black uppercase tracking-tight text-white pb-3 border-b border-border">
              4. Lists (One item per line)
            </h2>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">
                Tour Highlights
              </label>
              <textarea
                value={formData.highlights}
                onChange={(e) => setFormData({ ...formData, highlights: e.target.value })}
                className="w-full bg-background border border-border rounded-xl p-3 text-xs text-white h-24 focus:outline-none focus:border-[#00ff00]/50"
                placeholder="e.g.&#10;Nine Arches Bridge Viewpoint&#10;Sacred Temple of the Tooth"
              />
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-[#00ff00] mb-1">
                Inclusions (Included Services)
              </label>
              <textarea
                value={formData.inclusions}
                onChange={(e) => setFormData({ ...formData, inclusions: e.target.value })}
                className="w-full bg-background border border-[#00ff00]/10 focus:border-[#00ff00]/30 rounded-xl p-3 text-xs text-white h-24 focus:outline-none"
                placeholder="e.g.&#10;Private Luxury Air-Conditioned Transport&#10;All highway tolls and parking fees"
              />
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-rose-500 mb-1">
                Exclusions (Not Included)
              </label>
              <textarea
                value={formData.exclusions}
                onChange={(e) => setFormData({ ...formData, exclusions: e.target.value })}
                className="w-full bg-background border border-rose-500/10 focus:border-rose-500/30 rounded-xl p-3 text-xs text-white h-24 focus:outline-none"
                placeholder="e.g.&#10;International flight tickets&#10;Sightseeing entrance fees"
              />
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">
                SEO Keywords (Comma separated)
              </label>
              <input
                type="text"
                value={formData.seoKeywords}
                onChange={(e) => setFormData({ ...formData, seoKeywords: e.target.value })}
                className="w-full bg-background border border-border rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#00ff00]/50"
                placeholder="Sri Lanka tours, Ella scenic train..."
              />
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#00ff00] hover:bg-[#00ff00]/95 text-black font-black uppercase tracking-widest p-4 rounded-2xl shadow-[0_0_30px_rgba(0,255,0,0.2)] hover:shadow-[0_0_40px_rgba(0,255,0,0.3)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Saving Package..." : `${editId ? "Update" : "Add"} Tour Package`}
          </button>
        </div>
      </form>

      {/* EXISTING TOURS GRID */}
      <div className="bg-card border border-border p-6 rounded-3xl space-y-4 shadow-xl">
        <h2 className="text-xl font-black uppercase tracking-tight text-white pb-3 border-b border-border">
          Existing Tour Packages ({tours.length})
        </h2>

        {tours.length === 0 ? (
          <p className="text-sm text-neutral-500 uppercase tracking-wider font-semibold py-8 text-center">
            No Tour Packages fetched from database.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tours.map((tour) => (
              <div
                key={tour.id}
                className="flex flex-col bg-background/50 border border-border rounded-2xl overflow-hidden hover:border-[#00ff00]/30 transition-all duration-300"
              >
                {/* Thumbnail */}
                <div className="relative w-full h-36 bg-neutral-900">
                  <Image
                    src={tour.imageUrl || "https://res.cloudinary.com/dkfnpmzpv/image/upload/v1771401761/hero_sections/dcjjvovjfbgidkiydjgw.jpg"}
                    alt={tour.title}
                    fill
                    className="object-cover brightness-95"
                    unoptimized
                  />
                  <div className="absolute top-2 right-2 flex flex-col gap-1">
                    {tour.isFeatured && (
                      <span className="bg-[#00ff00] text-black text-[7.5px] font-black uppercase px-2 py-0.5 rounded shadow">
                        ★ Featured
                      </span>
                    )}
                    <span className="bg-black/85 border border-[#00ff00]/30 text-[#00ff00] text-[7.5px] font-black uppercase px-2 py-0.5 rounded">
                      🕒 {tour.duration || `${tour.itinerary.length} Days`}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 flex-1 flex flex-col justify-between gap-4">
                  <div>
                    <h3 className="text-sm font-black uppercase text-white tracking-tighter line-clamp-1">
                      {tour.title}
                    </h3>
                    <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider mt-1">
                      💰 Price: ${tour.price} USD
                    </p>
                    {tour.route && (
                      <p className="text-[9px] text-neutral-500 font-semibold uppercase tracking-wider truncate mt-1">
                        📍 Route: {tour.route}
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-3 border-t border-border/40">
                    <button
                      onClick={() => handleEdit(tour)}
                      className="flex-1 flex items-center justify-center gap-1 bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-500 border border-yellow-500/20 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all"
                    >
                      <Edit3 className="w-3.5 h-3.5" /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(tour.id)}
                      className="flex-1 flex items-center justify-center gap-1 bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 border border-rose-500/20 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
