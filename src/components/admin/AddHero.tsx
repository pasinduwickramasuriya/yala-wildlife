"use client";

import { useState, useEffect } from "react";
import Image from "next/image"; // Added import for Image component

interface HeroSection {
  id: string;
  imageUrl: string;
  title: string;
  subtitle: string;
}

export default function AddHero() {
  const [heroSections, setHeroSections] = useState<HeroSection[]>([]);
  const [formData, setFormData] = useState({ imageUrl: "", title: "", subtitle: "" });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [editId, setEditId] = useState<string | null>(null);
  const [token, setToken] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  // Fetch token from localStorage on mount (client-side only)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token") || "";
      setToken(storedToken);
      if (!storedToken) console.warn("No token found. Please log in.");
    }
  }, []);

  // Fetch hero sections on mount
  useEffect(() => {
    fetchHeroSections();
  }, []);

  const fetchHeroSections = async () => {
    try {
      const res = await fetch("/api/hero");
      if (!res.ok) throw new Error(`Failed to fetch hero sections: ${res.statusText}`);
      const data = await res.json();
      setHeroSections(data);
    } catch (err) {
      setError("Error fetching hero sections");
      console.error("Fetch error:", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!token) {
      setError("Please log in to perform this action");
      return;
    }

    const url = editId ? `/api/hero?id=${editId}` : "/api/hero";
    const method = editId ? "PUT" : "POST";

    // Debug log to verify state before submission
    console.log("Submitting:", { method, editId, formData, imageFile });

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("subtitle", formData.subtitle);

    // Image handling based on method
    if (method === "POST") {
      // For create, require an image
      if (!imageFile && !formData.imageUrl) {
        setError("Please provide an image URL or upload an image");
        return;
      }
      if (imageFile) {
        formDataToSend.append("image", imageFile);
      } else if (formData.imageUrl) {
        formDataToSend.append("imageUrl", formData.imageUrl);
      }
    } else if (method === "PUT") {
      // For update, image is optional
      if (imageFile) {
        formDataToSend.append("image", imageFile);
      }
      if (formData.imageUrl) {
        formDataToSend.append("imageUrl", formData.imageUrl);
      }
      // No error if neither is provided; API retains existing imageUrl
    }

    try {
      const res = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Server response:", errorData);
        throw new Error(`${errorData.error || "Request failed"} - Status: ${res.status}`);
      }

      const updatedHero = await res.json();
      if (method === "PUT") {
        setHeroSections(heroSections.map((h) => (h.id === editId ? updatedHero : h)));
        setEditId(null);
      } else {
        setHeroSections([...heroSections, updatedHero]);
        fetchHeroSections(); // Refresh list after create
      }
      setFormData({ imageUrl: "", title: "", subtitle: "" });
      setImageFile(null);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "An error occurred";
      setError(errorMsg);
      console.error("Submit error:", err);
    }
  };

  const handleEdit = (hero: HeroSection) => {
    setFormData({ imageUrl: hero.imageUrl, title: hero.title, subtitle: hero.subtitle });
    setImageFile(null); // Clear file input for edits
    setEditId(hero.id);
    console.log("Editing hero:", hero); // Debug log
  };

  const handleDelete = async (id: string) => {
    setError(null);

    if (!token) {
      setError("Please log in to perform this action");
      return;
    }

    try {
      const res = await fetch(`/api/hero?id=${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Delete failed");
      }

      setHeroSections(heroSections.filter((h) => h.id !== id));
      fetchHeroSections(); // Refresh list
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "An error occurred";
      setError(errorMsg);
      console.error("Delete error:", err);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImageFile(file);
    if (file) {
      setFormData({ ...formData, imageUrl: "" }); // Clear imageUrl if file is selected
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto bg-background">
      <h1 className="text-2xl font-bold mb-4 text-foreground">Manage Hero Sections</h1>

      <form onSubmit={handleSubmit} className="mb-8 space-y-4" encType="multipart/form-data">
        <div>
          <label className="block text-sm font-medium text-foreground">Image URL</label>
          <input
            type="url"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
            className="mt-1 block w-full border border-border rounded p-2 bg-input text-foreground"
            placeholder="https://example.com/image.jpg"
            disabled={!!imageFile}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground">Or Upload Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-1 block w-full text-foreground"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="mt-1 block w-full border border-border rounded p-2 bg-input text-foreground"
            placeholder="Hero Title"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground">Subtitle</label>
          <input
            type="text"
            name="subtitle"
            value={formData.subtitle}
            onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
            className="mt-1 block w-full border border-border rounded p-2 bg-input text-foreground"
            placeholder="Hero Subtitle"
            required
          />
        </div>
        <div className="flex space-x-2">
          <button
            type="submit"
            className="bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/90"
          >
            {editId ? "Update" : "Add"} Hero
          </button>
          {editId && (
            <button
              type="button"
              onClick={() => {
                setFormData({ imageUrl: "", title: "", subtitle: "" });
                setImageFile(null);
                setEditId(null);
              }}
              className="bg-muted text-muted-foreground px-4 py-2 rounded hover:bg-muted/90"
            >
              Cancel
            </button>
          )}
        </div>
        {error && <p className="text-destructive">{error}</p>}
      </form>

      <div>
        <h2 className="text-xl font-semibold mb-2 text-foreground">Existing Hero Sections</h2>
        {heroSections.length === 0 ? (
          <p className="text-muted-foreground">No hero sections found.</p>
        ) : (
          <ul className="space-y-2">
            {heroSections.map((hero) => (
              <li
                key={hero.id}
                className="flex justify-between items-center border border-border p-2 rounded bg-card"
              >
                <div className="flex items-center space-x-4">
                  {/* Changed: Replaced <img> with <Image> to fix @next/next/no-img-element */}
                  <Image
                    src={hero.imageUrl}
                    alt={hero.title}
                    width={64} // 16 * 4 = 64px (matches w-16)
                    height={64} // 16 * 4 = 64px (matches h-16)
                    className="object-cover rounded"
                    onError={(e) => (e.currentTarget.src = "/fallback-image.jpg")}
                  />
                  <div>
                    <p className="font-medium text-foreground">{hero.title}</p>
                    <p className="text-sm text-muted-foreground">{hero.subtitle}</p>
                    <p className="text-xs text-muted-foreground truncate max-w-xs">{hero.imageUrl}</p>
                  </div>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => handleEdit(hero)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(hero.id)}
                    className="bg-destructive text-destructive-foreground px-2 py-1 rounded hover:bg-destructive/90"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}