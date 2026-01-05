"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

interface Package {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  mealPrice: number;
  ticketPrice: number;
  slug: string;
}

export default function AddPackage() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    imageUrl: "",
    price: "",
    mealPrice: "",
    ticketPrice: "",
    slug: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [editId, setEditId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchPackages = useCallback(async () => {
    try {
      const res = await fetch("/api/package", { cache: "no-store" });
      if (!res.ok) throw new Error(`Failed to fetch packages: ${res.statusText}`);
      const data = await res.json();
      setPackages(data);
    } catch (err) {
      setError("Error fetching packages");
      console.error("Fetch error:", err);
    }
  }, []);

  // Fetch packages on mount
  useEffect(() => {
    fetchPackages();
  }, [fetchPackages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const url = editId ? `/api/package?id=${editId}` : "/api/package";
    const method = editId ? "PUT" : "POST";

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("price", formData.price);
    // Append new fields
    formDataToSend.append("mealPrice", formData.mealPrice);
    formDataToSend.append("ticketPrice", formData.ticketPrice);

    formDataToSend.append("slug", formData.slug);

    if (method === "POST") {
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
      if (imageFile) {
        formDataToSend.append("image", imageFile);
      }
      if (formData.imageUrl) {
        formDataToSend.append("imageUrl", formData.imageUrl);
      }
    }

    try {
      const res = await fetch(url, {
        method,
        // Cookies sent automatically
        body: formDataToSend,
      });

      const text = await res.text();
      const data = text ? JSON.parse(text) : {};

      if (!res.ok) {
        console.error("Server response:", data);
        if (res.status === 401) {
          setError("Unauthorized: Please log in again.");
          return;
        }
        throw new Error(data.error || text || `Request failed - Status: ${res.status}`);
      }

      const updatedPackage = data;

      if (method === "PUT") {
        setPackages(packages.map((p) => (p.id === editId ? updatedPackage : p)));
        setEditId(null);
      } else {
        setPackages([...packages, updatedPackage]);
        await fetchPackages();
      }
      // Reset form including new fields
      setFormData({
        name: "",
        description: "",
        imageUrl: "",
        price: "",
        mealPrice: "",
        ticketPrice: "",
        slug: ""
      });
      setImageFile(null);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "An error occurred";
      setError(errorMsg);
      console.error("Submit error:", err);
    }
  };

  const handleEdit = (pkg: Package) => {
    setFormData({
      name: pkg.name,
      description: pkg.description,
      imageUrl: pkg.imageUrl,
      price: pkg.price.toString(),
      mealPrice: pkg.mealPrice ? pkg.mealPrice.toString() : "0",
      ticketPrice: pkg.ticketPrice ? pkg.ticketPrice.toString() : "0",
      slug: pkg.slug,
    });
    setImageFile(null);
    setEditId(pkg.id);
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/package?id=${id}`, {
        method: "DELETE",
        // Cookies sent automatically
      });

      const text = await res.text();
      const data = text ? JSON.parse(text) : {};

      if (!res.ok) {
        if (res.status === 401) {
          setError("Unauthorized: Please log in again.");
          return;
        }
        throw new Error(data.error || text || "Delete failed");
      }
      setPackages(packages.filter((p) => p.id !== id));
      await fetchPackages();
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
      setFormData({ ...formData, imageUrl: "" });
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto bg-background">
      <h1 className="text-2xl font-bold mb-4 text-foreground">Manage Packages</h1>

      <form onSubmit={handleSubmit} className="mb-8 space-y-4" encType="multipart/form-data">
        <div>
          <label className="block text-sm font-medium text-foreground">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="mt-1 block w-full border border-border rounded p-2 bg-input text-foreground"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="mt-1 block w-full border border-border rounded p-2 bg-input text-foreground"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground">Image URL</label>
          <input
            type="url"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
            className="mt-1 block w-full border border-border rounded p-2 bg-input text-foreground"
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

        {/* Price Fields Group */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground">Base Jeep Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="mt-1 block w-full border border-border rounded p-2 bg-input text-foreground"
              placeholder="0.00"
              step="0.01"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground">Meal Price (Per Person)</label>
            <input
              type="number"
              name="mealPrice"
              value={formData.mealPrice}
              onChange={(e) => setFormData({ ...formData, mealPrice: e.target.value })}
              className="mt-1 block w-full border border-border rounded p-2 bg-input text-foreground"
              placeholder="0.00"
              step="0.01"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground">Ticket Price (Per Person)</label>
            <input
              type="number"
              name="ticketPrice"
              value={formData.ticketPrice}
              onChange={(e) => setFormData({ ...formData, ticketPrice: e.target.value })}
              className="mt-1 block w-full border border-border rounded p-2 bg-input text-foreground"
              placeholder="0.00"
              step="0.01"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground">Slug</label>
          <input
            type="text"
            name="slug"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            className="mt-1 block w-full border border-border rounded p-2 bg-input text-foreground"
            required
          />
        </div>
        <div className="flex space-x-2">
          <button
            type="submit"
            className="bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/90"
          >
            {editId ? "Update" : "Add"} Package
          </button>
          {editId && (
            <button
              type="button"
              onClick={() => {
                setFormData({ name: "", description: "", imageUrl: "", price: "", mealPrice: "", ticketPrice: "", slug: "" });
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
        <h2 className="text-xl font-semibold mb-2 text-foreground">Existing Packages</h2>
        {packages.length === 0 ? (
          <p className="text-muted-foreground">No packages found.</p>
        ) : (
          <ul className="space-y-2">
            {packages.map((pkg) => (
              <li
                key={pkg.id}
                className="flex justify-between items-center border border-border p-2 rounded bg-card"
              >
                <div className="flex items-center space-x-4">
                  <Image
                    src={pkg.imageUrl}
                    alt={pkg.name}
                    width={64}
                    height={64}
                    className="object-cover rounded"
                    onError={(e) => (e.currentTarget.src = "/fallback-image.jpg")}
                  />
                  <div>
                    <p className="font-medium text-foreground">{pkg.name}</p>
                    <p className="text-sm text-muted-foreground">Jeep: ${pkg.price.toFixed(2)}</p>
                    {/* Display new prices */}
                    <p className="text-xs text-muted-foreground">
                      Meals: ${pkg.mealPrice?.toFixed(2) || '0.00'} | Tickets: ${pkg.ticketPrice?.toFixed(2) || '0.00'}
                    </p>
                  </div>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => handleEdit(pkg)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(pkg.id)}
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