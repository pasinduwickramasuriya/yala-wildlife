"use client";

import { useState, useEffect } from "react";
import Image from "next/image"; // Added import for Image component

interface Package {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  slug: string;
}

export default function AddPackage() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    imageUrl: "",
    price: "",
    slug: "",
  });
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

  // Fetch packages on mount
  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const res = await fetch("/api/package");
      if (!res.ok) throw new Error(`Failed to fetch packages: ${res.statusText}`);
      const data = await res.json();
      setPackages(data);
    } catch (err) {
      setError("Error fetching packages");
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

    const url = editId ? `/api/package?id=${editId}` : "/api/package";
    const method = editId ? "PUT" : "POST";

    console.log("Submitting:", { method, editId, formData, imageFile });

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("slug", formData.slug);

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

      const updatedPackage = await res.json();
      if (method === "PUT") {
        setPackages(packages.map((p) => (p.id === editId ? updatedPackage : p)));
        setEditId(null);
      } else {
        setPackages([...packages, updatedPackage]);
        fetchPackages(); // Refresh list after create
      }
      setFormData({ name: "", description: "", imageUrl: "", price: "", slug: "" });
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
      price: pkg.price.toString(), // Convert number to string for input
      slug: pkg.slug,
    });
    setImageFile(null); // Clear file input for edits
    setEditId(pkg.id);
    console.log("Editing package:", pkg);
  };

  const handleDelete = async (id: string) => {
    setError(null);

    if (!token) {
      setError("Please log in to perform this action");
      return;
    }

    try {
      const res = await fetch(`/api/package?id=${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Delete failed");
      }

      setPackages(packages.filter((p) => p.id !== id));
      fetchPackages(); // Refresh list
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
            placeholder="Package Name"
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
            placeholder="Package Description"
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
          <label className="block text-sm font-medium text-foreground">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            className="mt-1 block w-full border border-border rounded p-2 bg-input text-foreground"
            placeholder="199.99"
            step="0.01"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground">Slug</label>
          <input
            type="text"
            name="slug"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            className="mt-1 block w-full border border-border rounded p-2 bg-input text-foreground"
            placeholder="package-slug"
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
                setFormData({ name: "", description: "", imageUrl: "", price: "", slug: "" });
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
                  {/* Changed: Replaced <img> with <Image> to fix @next/next/no-img-element */}
                  <Image
                    src={pkg.imageUrl}
                    alt={pkg.name}
                    width={64} // 16 * 4 = 64px (matches w-16)
                    height={64} // 16 * 4 = 64px (matches h-16)
                    className="object-cover rounded"
                    onError={(e) => (e.currentTarget.src = "/fallback-image.jpg")}
                  />
                  <div>
                    <p className="font-medium text-foreground">{pkg.name}</p>
                    <p className="text-sm text-muted-foreground">{pkg.description}</p>
                    <p className="text-sm text-muted-foreground">Price: ${pkg.price.toFixed(2)}</p>
                    <p className="text-xs text-muted-foreground">Slug: {pkg.slug}</p>
                    <p className="text-xs text-muted-foreground truncate max-w-xs">{pkg.imageUrl}</p>
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