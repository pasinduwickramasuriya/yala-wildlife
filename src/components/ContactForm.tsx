"use client";

import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface Notification {
  type: "success" | "error";
  message: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [notification, setNotification] = useState<Notification | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setNotification(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to send message");
      }

      setNotification({
        type: "success",
        message: "Message sent successfully!",
      });
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setNotification({
        type: "error",
        message: error instanceof Error ? error.message : "An error occurred",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-background p-6 rounded-xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-2xl font-bold text-foreground mb-6">
          Send Us a Message
        </h2>
        {/* Name */}
        <div className="space-y-2">
          <Label htmlFor="name" className="text-muted-foreground">
            Name
          </Label>
          <Input
            id="name"
            type="text"
            placeholder="Your Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-muted-foreground">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>
        {/* Message */}
        <div className="space-y-2">
          <Label htmlFor="message" className="text-muted-foreground">
            Message
          </Label>
          <Textarea
            id="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            required
            className="min-h-[120px]"
          />
        </div>
        {/* Submit Button */}
        <div className="flex flex-col gap-4">
          <Button
            type="submit"
            disabled={isSubmitting}
            className={cn(
              "w-full bg-green-600 text-white hover:bg-green-700 rounded-full",
              isSubmitting && "opacity-50 cursor-not-allowed"
            )}
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>
        </div>
        {/* Notification */}
        {notification && (
          <div
            className={cn(
              "mt-6 p-4 rounded-lg text-center",
              notification.type === "error"
                ? "bg-destructive/20 text-destructive"
                : "bg-green-100 text-green-800"
            )}
          >
            {notification.message}
          </div>
        )}
      </form>
    </div>
  );
}