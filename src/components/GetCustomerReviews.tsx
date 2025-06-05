"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm, ControllerRenderProps } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Define form schema
const ReviewSchema = z.object({
  customerName: z.string().min(2, "Name is required"),
  customerEmail: z.string().email("Invalid email"),
  description: z.string().min(10, "Description is too short"),
  image: z.any().optional(),
});

type ReviewForm = z.infer<typeof ReviewSchema>;

export default function GetCustomerReviews() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  // Setup react-hook-form with zod validation
  const form = useForm<ReviewForm>({
    resolver: zodResolver(ReviewSchema),
    defaultValues: {
      customerName: "",
      customerEmail: "",
      description: "",
      image: undefined,
    },
  });

  // Handle image preview and file input
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    form.setValue("image", file);
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setPreviewUrl(null);
    }
  };

  // Form submit handler
  const onSubmit = async (values: ReviewForm) => {
    setMessage(null);

    const data = new FormData();
    data.append("customerName", values.customerName);
    data.append("customerEmail", values.customerEmail);
    data.append("description", values.description);
    if (values.image) data.append("image", values.image);

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        body: data,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || `Failed to submit review: ${response.status}`
        );
      }

      setMessage("Review submitted! Awaiting approval.");
      form.reset();
      setPreviewUrl(null);
      // Close dialog after successful submission
      setTimeout(() => {
        setIsDialogOpen(false);
        setMessage(null);
      }, 2000);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";
      setMessage(`Error: ${errorMessage}`);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="success" className="w-full max-w-md mx-auto">
          Add Your Review
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Share Your Experience
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
            autoComplete="off"
          >
            <FormField
              control={form.control}
              name="customerName"
              render={({
                field,
              }: {
                field: ControllerRenderProps<ReviewForm, "customerName">;
              }) => (
                <FormItem>
                  <FormLabel className="mb-2">Your Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="customerEmail"
              render={({
                field,
              }: {
                field: ControllerRenderProps<ReviewForm, "customerEmail">;
              }) => (
                <FormItem>
                  <FormLabel className="mb-2">Your Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Your Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({
                field,
              }: {
                field: ControllerRenderProps<ReviewForm, "description">;
              }) => (
                <FormItem>
                  <FormLabel className="mb-2">Adventure Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us about your adventure..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormItem>
              <FormLabel className="mb-2">Profile Image (optional)</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </FormControl>
              {previewUrl && (
                <Avatar className="h-16 w-16 mt-2">
                  <AvatarImage src={previewUrl} alt="Preview" />
                  <AvatarFallback>
                    {form
                      .getValues("customerName")
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              )}
              <FormMessage />
            </FormItem>
            <div className="flex flex-col gap-2">
              <Button type="submit" className="w-full" variant="success">
                Submit Review
              </Button>
              <Button
                type="button"
                onClick={() => setIsDialogOpen(false)}
                className="w-full"
                variant="secondary"
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
        {message && (
          <Alert
            variant={message.includes("Error") ? "destructive" : "success"}
            className="mt-4"
          >
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}
      </DialogContent>
    </Dialog>
  );
}
