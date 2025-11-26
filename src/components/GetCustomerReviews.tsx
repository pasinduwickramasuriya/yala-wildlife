// "use client"

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
// import { Alert, AlertDescription } from "@/components/ui/alert";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import {
//   Form,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormControl,
//   FormMessage,
// } from "@/components/ui/form";
// import { z } from "zod";
// import { useForm, ControllerRenderProps } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";

// // Define form schema
// const ReviewSchema = z.object({
//   customerName: z.string().min(2, "Name is required"),
//   customerEmail: z.string().email("Invalid email"),
//   description: z.string().min(10, "Description is too short"),
//   image: z.any().optional(),
// });

// type ReviewForm = z.infer<typeof ReviewSchema>;

// export default function GetCustomerReviews() {
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [previewUrl, setPreviewUrl] = useState<string | null>(null);
//   const [message, setMessage] = useState<string | null>(null);

//   // Setup react-hook-form with zod validation
//   const form = useForm<ReviewForm>({
//     resolver: zodResolver(ReviewSchema),
//     defaultValues: {
//       customerName: "",
//       customerEmail: "",
//       description: "",
//       image: undefined,
//     },
//   });

//   // Handle image preview and file input
//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0] || null;
//     form.setValue("image", file);
//     if (file) {
//       setPreviewUrl(URL.createObjectURL(file));
//     } else {
//       setPreviewUrl(null);
//     }
//   };

//   // Form submit handler
//   const onSubmit = async (values: ReviewForm) => {
//     setMessage(null);

//     const data = new FormData();
//     data.append("customerName", values.customerName);
//     data.append("customerEmail", values.customerEmail);
//     data.append("description", values.description);
//     if (values.image) data.append("image", values.image);

//     try {
//       const response = await fetch("/api/reviews", {
//         method: "POST",
//         body: data,
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(
//           errorData.error || `Failed to submit review: ${response.status}`
//         );
//       }

//       setMessage("Review submitted! Awaiting approval.");
//       form.reset();
//       setPreviewUrl(null);
//       // Close dialog after successful submission
//       setTimeout(() => {
//         setIsDialogOpen(false);
//         setMessage(null);
//       }, 2000);
//     } catch (error) {
//       const errorMessage =
//         error instanceof Error ? error.message : "An unexpected error occurred";
//       setMessage(`Error: ${errorMessage}`);
//     }
//   };

//   return (
//     <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//       <DialogTrigger asChild>
//         <Button variant="success" className="w-full max-w-md mx-auto">
//           Add Your Review
//         </Button>
//       </DialogTrigger>
//       <DialogContent className="sm:max-w-md">
//         <DialogHeader>
//           <DialogTitle className="text-2xl font-bold">
//             Share Your Experience
//           </DialogTitle>
//         </DialogHeader>
//         <Form {...form}>
//           <form
//             onSubmit={form.handleSubmit(onSubmit)}
//             className="space-y-4"
//             autoComplete="off"
//           >
//             <FormField
//               control={form.control}
//               name="customerName"
//               render={({
//                 field,
//               }: {
//                 field: ControllerRenderProps<ReviewForm, "customerName">;
//               }) => (
//                 <FormItem>
//                   <FormLabel className="mb-2">Your Name</FormLabel>
//                   <FormControl>
//                     <Input placeholder="Your Name" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="customerEmail"
//               render={({
//                 field,
//               }: {
//                 field: ControllerRenderProps<ReviewForm, "customerEmail">;
//               }) => (
//                 <FormItem>
//                   <FormLabel className="mb-2">Your Email</FormLabel>
//                   <FormControl>
//                     <Input type="email" placeholder="Your Email" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="description"
//               render={({
//                 field,
//               }: {
//                 field: ControllerRenderProps<ReviewForm, "description">;
//               }) => (
//                 <FormItem>
//                   <FormLabel className="mb-2">Adventure Description</FormLabel>
//                   <FormControl>
//                     <Textarea
//                       placeholder="Tell us about your adventure..."
//                       {...field}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormItem>
//               <FormLabel className="mb-2">Profile Image (optional)</FormLabel>
//               <FormControl>
//                 <Input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleImageChange}
//                 />
//               </FormControl>
//               {previewUrl && (
//                 <Avatar className="h-16 w-16 mt-2">
//                   <AvatarImage src={previewUrl} alt="Preview" />
//                   <AvatarFallback>
//                     {form
//                       .getValues("customerName")
//                       .split(" ")
//                       .map((n) => n[0])
//                       .join("")
//                       .toUpperCase()}
//                   </AvatarFallback>
//                 </Avatar>
//               )}
//               <FormMessage />
//             </FormItem>
//             <div className="flex flex-col gap-2">
//               <Button type="submit" className="w-full" variant="success">
//                 Submit Review
//               </Button>
//               <Button
//                 type="button"
//                 onClick={() => setIsDialogOpen(false)}
//                 className="w-full"
//                 variant="secondary"
//               >
//                 Cancel
//               </Button>
//             </div>
//           </form>
//         </Form>
//         {message && (
//           <Alert
//             variant={message.includes("Error") ? "destructive" : "success"}
//             className="mt-4"
//           >
//             <AlertDescription>{message}</AlertDescription>
//           </Alert>
//         )}
//       </DialogContent>
//     </Dialog>
//   );
// }







"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  Camera, 
  User, 
  Mail, 
  Sparkles, 
  Loader2, 
  Send} from "lucide-react"; // Ensure you have lucide-react installed
import { cn } from "@/lib/utils";

// Define form schema
const ReviewSchema = z.object({
  customerName: z.string().min(2, "Name is required"),
  customerEmail: z.string().email("Invalid email"),
  description: z.string().min(10, "Tell us a bit more! (10+ chars)"),
  image: z.any().optional(),
});

type ReviewForm = z.infer<typeof ReviewSchema>;

export default function GetCustomerReviews() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<ReviewForm>({
    resolver: zodResolver(ReviewSchema),
    defaultValues: {
      customerName: "",
      customerEmail: "",
      description: "",
      image: undefined,
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    form.setValue("image", file);
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setPreviewUrl(null);
    }
  };

  const onSubmit = async (values: ReviewForm) => {
    setIsSubmitting(true);
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

      if (!response.ok) throw new Error("Failed");

      // Success State
      setIsSuccess(true);
      form.reset();
      setPreviewUrl(null);
      
      // Close after showing success animation
      setTimeout(() => {
        setIsDialogOpen(false);
        setIsSuccess(false);
        setIsSubmitting(false);
      }, 2000);

    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        {/* Modern Floating-style Trigger Button */}
        <Button 
          className="group relative overflow-hidden rounded-full bg-green-600 hover:bg-green-500 text-white px-8 py-6 shadow-lg hover:shadow-green-500/30 transition-all duration-300"
        >
          <span className="relative z-10 flex items-center gap-2 text-lg font-bold">
            <Sparkles className="w-5 h-5 animate-pulse" />
            Share Your Story
          </span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md rounded-[2.5rem] border-none bg-white/95 backdrop-blur-xl shadow-2xl p-0 overflow-hidden">
        
        {/* Header Section with Decoration */}
        <div className="bg-gradient-to-br from-green-600 to-emerald-800 p-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
          
          <DialogHeader className="relative z-10">
            <DialogTitle className="text-3xl font-bold text-center flex flex-col items-center gap-2">
              {isSuccess ? "Thank You! 🎉" : "Rate Your Safari"}
            </DialogTitle>
            <p className="text-green-100 text-center text-sm font-medium">
              {isSuccess ? "Your review has been submitted." : "We'd love to see your best moments!"}
            </p>
          </DialogHeader>
        </div>

        <div className="p-8 pt-4">
          {isSuccess ? (
             <div className="flex flex-col items-center justify-center py-8 space-y-4 animate-in fade-in zoom-in duration-300">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckIcon className="w-10 h-10 text-green-600" />
                </div>
             </div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                
                {/* Image Upload Zone - The "Cutter" Feature */}
                <div className="flex justify-center">
                  <div className="relative group">
                    <label 
                      htmlFor="image-upload" 
                      className={cn(
                        "cursor-pointer flex items-center justify-center w-28 h-28 rounded-full border-4 transition-all duration-300 overflow-hidden relative",
                        previewUrl 
                          ? "border-green-500 shadow-lg" 
                          : "border-dashed border-green-200 bg-green-50 hover:bg-green-100"
                      )}
                    >
                      {previewUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <div className="flex flex-col items-center text-green-400">
                          <Camera className="w-8 h-8 mb-1" />
                          <span className="text-[10px] font-bold uppercase tracking-wider">Add Photo</span>
                        </div>
                      )}
                      
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-full">
                        <span className="text-white text-xs font-bold">Change</span>
                      </div>
                    </label>
                    <Input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </div>
                </div>

                {/* Name Input with Icon */}
                <FormField
                  control={form.control}
                  name="customerName"
                  render={({ field }) => (
                    <FormItem>
                      <div className="relative">
                        <User className="absolute left-4 top-3.5 h-4 w-4 text-neutral-400" />
                        <FormControl>
                          <Input 
                            placeholder="Your Name" 
                            {...field} 
                            className="pl-10 rounded-2xl bg-neutral-50 border-neutral-200 focus-visible:ring-green-500 focus-visible:ring-2 h-11" 
                          />
                        </FormControl>
                      </div>
                      <FormMessage className="text-xs text-red-400 pl-4" />
                    </FormItem>
                  )}
                />

                {/* Email Input with Icon */}
                <FormField
                  control={form.control}
                  name="customerEmail"
                  render={({ field }) => (
                    <FormItem>
                      <div className="relative">
                        <Mail className="absolute left-4 top-3.5 h-4 w-4 text-neutral-400" />
                        <FormControl>
                          <Input 
                            type="email" 
                            placeholder="your@email.com" 
                            {...field} 
                            className="pl-10 rounded-2xl bg-neutral-50 border-neutral-200 focus-visible:ring-green-500 focus-visible:ring-2 h-11" 
                          />
                        </FormControl>
                      </div>
                      <FormMessage className="text-xs text-red-400 pl-4" />
                    </FormItem>
                  )}
                />

                {/* Description */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder="How was your adventure? What animals did you see?"
                          {...field}
                          className="min-h-[100px] rounded-2xl bg-neutral-50 border-neutral-200 focus-visible:ring-green-500 focus-visible:ring-2 resize-none p-4"
                        />
                      </FormControl>
                      <FormMessage className="text-xs text-red-400 pl-4" />
                    </FormItem>
                  )}
                />

                {/* Buttons */}
                <div className="flex gap-3 pt-2">
                  <Button
                    type="button"
                    onClick={() => setIsDialogOpen(false)}
                    variant="ghost"
                    className="flex-1 rounded-xl text-neutral-500 hover:text-neutral-800 hover:bg-neutral-100"
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="flex-[2] rounded-xl bg-green-600 hover:bg-green-500 text-white shadow-md hover:shadow-lg transition-all"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Submit Review
                        <Send className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Simple Check Icon Component for Success State
function CheckIcon({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="3" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}