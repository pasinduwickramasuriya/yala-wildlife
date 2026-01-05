"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

interface Blog {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  slug: string;
  createdAt: string;
}

interface User {
  id: string;
  email: string;
  role: string;
  createdAt: string;
}

export default function AddBlog() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    imageUrl: "",
    slug: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [editId, setEditId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchUserData = useCallback(async () => {
    try {
      // Browser automatically sends cookies
      const res = await fetch("/api/user");
      const text = await res.text();

      if (!res.ok) {
        if (res.status === 401) {
          setError("Unauthorized: Please log in again.");
          setUser(null);
          return;
        }
        if (res.status === 404) {
          setError("User not found.");
          setUser(null);
          return;
        }
        throw new Error(text || `Failed to fetch user data: ${res.status}`);
      }

      const data = text ? JSON.parse(text) : null;
      console.log("User data fetched:", data);
      setUser(data);
    } catch (err) {
      console.error("Fetch user error:", err);
      setError("Could not load user data");
    }
  }, []);

  const fetchBlogs = useCallback(async () => {
    try {
      const res = await fetch("/api/blog", { cache: "no-store" });
      const text = await res.text();
      if (!res.ok) {
        throw new Error(text || `Failed to fetch blogs: ${res.status}`);
      }
      const data = text ? JSON.parse(text) : [];
      setBlogs(data);
    } catch (err) {
      setError("Error fetching blogs");
      console.error("Fetch error:", err);
    }
  }, []);

  // Fetch initial data on mount
  useEffect(() => {
    fetchUserData();
    fetchBlogs();
  }, [fetchUserData, fetchBlogs]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const url = editId ? `/api/blog?id=${editId}` : "/api/blog";
    const method = editId ? "PUT" : "POST";

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("content", formData.content);
    formDataToSend.append("slug", formData.slug);

    if (method === "POST") {
      if (!imageFile && !formData.imageUrl) {
        setError("Please provide an image URL or upload an image");
        return;
      }
      if (imageFile) formDataToSend.append("image", imageFile);
      else if (formData.imageUrl) formDataToSend.append("imageUrl", formData.imageUrl);
    } else if (method === "PUT") {
      if (imageFile) formDataToSend.append("image", imageFile);
      if (formData.imageUrl) formDataToSend.append("imageUrl", formData.imageUrl);
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
        throw new Error(data.error || text || `Request failed with status: ${res.status}`);
      }

      // Handle response structure depending on API
      // Use logical OR/defaults to be safe
      const updatedBlog = data.blog || data;

      if (method === "PUT") {
        setBlogs(blogs.map((b) => (b.id === editId ? updatedBlog : b)));
        setEditId(null);
      } else {
        setBlogs([updatedBlog, ...blogs]);
        await fetchBlogs(); // Refresh to be sure
      }
      setFormData({ title: "", content: "", imageUrl: "", slug: "" });
      setImageFile(null);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "An unexpected error occurred";
      setError(errorMsg);
      console.error("Submit error:", err);
    }
  };

  const handleEdit = (blog: Blog) => {
    setFormData({
      title: blog.title,
      content: blog.content,
      imageUrl: blog.imageUrl,
      slug: blog.slug,
    });
    setImageFile(null);
    setEditId(blog.id);
  };

  const handleDelete = async (id: string) => {
    setError(null);

    try {
      const res = await fetch(`/api/blog?id=${id}`, {
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

      setBlogs(blogs.filter((b) => b.id !== id));
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "An error occurred";
      setError(errorMsg);
      console.error("Delete error:", err);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImageFile(file);
    if (file) setFormData({ ...formData, imageUrl: "" });
  };

  return (
    <div className="p-4 max-w-2xl mx-auto bg-background">
      <h1 className="text-2xl font-bold mb-4 text-foreground">Manage Blogs</h1>
      {user ? (
        <p className="mb-4 text-muted-foreground">
          Logged in as: {user.email} ({user.role})
        </p>
      ) : (
        <p className="mb-4 text-muted-foreground">User data not available</p>
      )}

      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="mt-1 block w-full border border-border rounded p-2 bg-input text-foreground"
            placeholder="Blog Title"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground">Content</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            className="mt-1 block w-full border border-border rounded p-2 h-32 bg-input text-foreground"
            placeholder="Blog Content"
            required
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
          <label className="block text-sm font-medium text-foreground">Slug</label>
          <input
            type="text"
            name="slug"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            className="mt-1 block w-full border border-border rounded p-2 bg-input text-foreground"
            placeholder="blog-slug"
            required
          />
        </div>
        <div className="flex space-x-2">
          <button
            type="submit"
            className="bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/90"
          >
            {editId ? "Update" : "Add"} Blog
          </button>
          {editId && (
            <button
              type="button"
              onClick={() => {
                setFormData({ title: "", content: "", imageUrl: "", slug: "" });
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
        <h2 className="text-xl font-semibold mb-2 text-foreground">Existing Blogs</h2>
        {blogs.length === 0 ? (
          <p className="text-muted-foreground">No blogs found.</p>
        ) : (
          <ul className="space-y-2">
            {blogs.map((blog) => (
              <li
                key={blog.id}
                className="flex justify-between items-center border border-border p-2 rounded bg-card"
              >
                <div className="flex items-center space-x-4">
                  <Image
                    src={blog.imageUrl}
                    alt={blog.title}
                    width={64}
                    height={64}
                    className="object-cover rounded"
                    onError={(e) => (e.currentTarget.src = "/fallback-image.jpg")}
                  />
                  <div>
                    <p className="font-medium text-foreground">{blog.title}</p>
                    <p className="text-sm text-muted-foreground line-clamp-2">{blog.content}</p>
                    <p className="text-xs text-muted-foreground">Slug: {blog.slug}</p>
                    <p className="text-xs text-muted-foreground">
                      Created: {new Date(blog.createdAt).toLocaleDateString()}
                    </p>
                    <p className="text-xs text-muted-foreground truncate max-w-xs">
                      {blog.imageUrl}
                    </p>
                  </div>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => handleEdit(blog)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(blog.id)}
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