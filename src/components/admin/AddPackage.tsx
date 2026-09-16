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
  highlights?: string[];
  inclusions?: string[];
  exclusions?: string[];
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
    highlights: "",
    inclusions: "",
    exclusions: "",
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
    formDataToSend.append("mealPrice", formData.mealPrice);
    formDataToSend.append("ticketPrice", formData.ticketPrice);
    formDataToSend.append("slug", formData.slug);
    formDataToSend.append("highlights", formData.highlights);
    formDataToSend.append("inclusions", formData.inclusions);
    formDataToSend.append("exclusions", formData.exclusions);

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
        body: formDataToSend,
      });

      const text = await res.text();
      let data: any = {};
      try {
        data = text ? JSON.parse(text) : {};
      } catch {
        data = { error: text };
      }

      if (!res.ok) {
        if (res.status === 401 || res.status === 403) {
          setError("Unauthorized: Session expired or invalid token. Please log in again.");
          return;
        }
        const message = data.details ? `${data.error || "Error"}: ${data.details}` : (data.error || text || `Request failed - Status: ${res.status}`);
        setError(message);
        return;
      }

      const updatedPackage = data;

      if (method === "PUT") {
        setPackages(packages.map((p) => (p.id === editId ? updatedPackage : p)));
        setEditId(null);
      } else {
        setPackages([...packages, updatedPackage]);
        await fetchPackages();
      }
      // Reset form
      setFormData({
        name: "",
        description: "",
        imageUrl: "",
        price: "",
        mealPrice: "",
        ticketPrice: "",
        slug: "",
        highlights: "",
        inclusions: "",
        exclusions: "",
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
      highlights: pkg.highlights ? pkg.highlights.join("\n") : "",
      inclusions: pkg.inclusions ? pkg.inclusions.join("\n") : "",
      exclusions: pkg.exclusions ? pkg.exclusions.join("\n") : "",
    });
    setImageFile(null);
    setEditId(pkg.id);
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/package?id=${id}`, {
        method: "DELETE",
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

  const handleAutoExtract = () => {
    if (!formData.description) return;
    const extractedHighlights = formData.description
      .split(".")
      .map((s) => s.trim())
      .filter((s) => s.length > 0)
      .join("\n");

    const defaultInc = [
      "Private 4x4 Safari Jeep with customized seating",
      "Experienced SLTDA-licensed driver guide",
      "Free pick-up & drop-off in Tissamaharama / Yala area",
      "Complimentary chilled bottled drinking water",
      "All jeep fees, fuel, tolls and taxes included",
    ].join("\n");

    const ticketPriceText = formData.ticketPrice ? `$${formData.ticketPrice}/person` : "$45/person";
    const mealPriceText = formData.mealPrice ? `$${formData.mealPrice}/person` : "$10/person";

    const defaultExc = [
      `National Park entrance permits (Optional add-on: ${ticketPriceText})`,
      `Breakfast / Lunch meals (Optional add-on: ${mealPriceText})`,
      "Tips & gratuities for driver-guide & tracker",
      "Transfers outside Tissamaharama / Yala area",
    ].join("\n");

    setFormData((prev) => ({
      ...prev,
      highlights: extractedHighlights,
      inclusions: prev.inclusions || defaultInc,
      exclusions: prev.exclusions || defaultExc,
    }));
  };

  return (
    <div className="p-4 max-w-3xl mx-auto bg-background">
      <h1 className="text-2xl font-bold mb-4 text-foreground">Manage Packages</h1>

      <form onSubmit={handleSubmit} className="mb-8 space-y-4" encType="multipart/form-data">
        <div>
          <label className="block text-sm font-medium text-foreground">Package Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="mt-1 block w-full border border-border rounded p-2 bg-input text-foreground"
            placeholder="e.g. Yala Morning Tour (4 Hours)"
            required
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="block text-sm font-medium text-foreground">Description</label>
            <button
              type="button"
              onClick={handleAutoExtract}
              className="text-xs bg-primary/10 text-primary px-2.5 py-1 rounded hover:bg-primary/20 font-semibold"
            >
              ⚡ Auto-Fill Highlights from Description
            </button>
          </div>
          <textarea
            name="description"
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="mt-1 block w-full border border-border rounded p-2 bg-input text-foreground"
            placeholder="Enter package summary description..."
          />
        </div>

        {/* Highlights, Inclusions & Exclusions */}
        <div>
          <label className="block text-sm font-medium text-foreground">
            Expedition Highlights <span className="text-xs text-muted-foreground">(One item per line)</span>
          </label>
          <textarea
            name="highlights"
            rows={4}
            value={formData.highlights}
            onChange={(e) => setFormData({ ...formData, highlights: e.target.value })}
            placeholder={"Time: 5:30 AM to 10:30 AM\nPrivate 4x4 Safari Jeep\nExperienced Driver Guide\nLeopard & Bear Sightings"}
            className="mt-1 block w-full border border-border rounded p-2 bg-input text-foreground font-mono text-sm"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground">
              Inclusions <span className="text-xs text-muted-foreground">(One item per line)</span>
            </label>
            <textarea
              name="inclusions"
              rows={5}
              value={formData.inclusions}
              onChange={(e) => setFormData({ ...formData, inclusions: e.target.value })}
              placeholder={"Private 4x4 Safari Jeep\nSLTDA Licensed Guide\nBottled Water\nFree Pickup & Drop-off\nAll Fees & Taxes Included"}
              className="mt-1 block w-full border border-border rounded p-2 bg-input text-foreground font-mono text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground">
              Exclusions <span className="text-xs text-muted-foreground">(One item per line)</span>
            </label>
            <textarea
              name="exclusions"
              rows={5}
              value={formData.exclusions}
              onChange={(e) => setFormData({ ...formData, exclusions: e.target.value })}
              placeholder={"Park Entrance Tickets\nMeals & Beverages\nTips for Driver Guide\nTransfers outside Tissa"}
              className="mt-1 block w-full border border-border rounded p-2 bg-input text-foreground font-mono text-sm"
            />
          </div>
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
            <label className="block text-sm font-medium text-foreground">Base Jeep Price ($)</label>
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
            <label className="block text-sm font-medium text-foreground">Meal Price ($ / Person)</label>
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
            <label className="block text-sm font-medium text-foreground">Ticket Price ($ / Person)</label>
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
            placeholder="yala-morning-tour-4-hours"
            required
          />
        </div>
        <div className="flex space-x-2">
          <button
            type="submit"
            className="bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/90 font-medium"
          >
            {editId ? "Update" : "Add"} Package
          </button>
          {editId && (
            <button
              type="button"
              onClick={() => {
                setFormData({ name: "", description: "", imageUrl: "", price: "", mealPrice: "", ticketPrice: "", slug: "", highlights: "", inclusions: "", exclusions: "" });
                setImageFile(null);
                setEditId(null);
              }}
              className="bg-muted text-muted-foreground px-4 py-2 rounded hover:bg-muted/90"
            >
              Cancel
            </button>
          )}
        </div>
        {error && <p className="text-destructive font-medium">{error}</p>}
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
                className="flex justify-between items-center border border-border p-3 rounded-lg bg-card"
              >
                <div className="flex items-center space-x-4">
                  <Image
                    src={pkg.imageUrl}
                    alt={pkg.name}
                    width={64}
                    height={64}
                    className="object-cover rounded-md"
                    onError={(e) => (e.currentTarget.src = "/fallback-image.jpg")}
                  />
                  <div>
                    <p className="font-medium text-foreground">{pkg.name}</p>
                    <p className="text-sm text-muted-foreground">Jeep: ${pkg.price.toFixed(2)}</p>
                    <p className="text-xs text-muted-foreground">
                      Meals: ${pkg.mealPrice?.toFixed(2) || '0.00'} | Tickets: ${pkg.ticketPrice?.toFixed(2) || '0.00'}
                    </p>
                    {(pkg.highlights?.length || pkg.inclusions?.length || pkg.exclusions?.length) ? (
                      <p className="text-[11px] text-primary font-medium mt-0.5">
                        ✓ Custom Details: {pkg.highlights?.length || 0} Highlights | {pkg.inclusions?.length || 0} Inclusions | {pkg.exclusions?.length || 0} Exclusions
                      </p>
                    ) : null}
                  </div>
                </div>
                <div className="space-x-2 flex-shrink-0">
                  <button
                    onClick={() => handleEdit(pkg)}
                    className="bg-yellow-500 text-white px-3 py-1.5 rounded hover:bg-yellow-600 font-medium text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(pkg.id)}
                    className="bg-destructive text-destructive-foreground px-3 py-1.5 rounded hover:bg-destructive/90 font-medium text-sm"
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