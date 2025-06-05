// "use client";

// import * as React from "react";
// import { Moon, Sun } from "lucide-react";
// import { useTheme } from "next-themes";
// import { Button } from "@/components/ui/button";
// import { cn } from "@/lib/utils";

// export function ModeToggle() {
//   const { theme, setTheme } = useTheme();
//   const [mounted, setMounted] = React.useState(false);

//   // Ensure the component mounts before rendering to avoid hydration issues
//   React.useEffect(() => {
//     setMounted(true);
//   }, []);

//   // Prevent rendering until mounted
//   if (!mounted) return null;

//   // Toggle between light and dark modes
//   const toggleTheme = () => {
//     setTheme(theme === "dark" ? "light" : "dark");
//   };

//   return (
//     <Button
//       variant="ghost"
//       size="icon"
//       onClick={toggleTheme}
//       className={cn(
//         "bg-transparent text-white hover:bg-white/50 transition-colors duration-200",
//         // Remove light mode-specific styling
//         "focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
//       )}
//     >
//       <Sun
//         className={cn(
//           "h-[1.2rem] w-[1.2rem] transition-all",
//           theme === "dark" ? "rotate-0 scale-0" : "rotate-0 scale-100"
//         )}
//       />
//       <Moon
//         className={cn(
//           "absolute h-[1.2rem] w-[1.2rem] transition-all",
//           theme === "dark" ? "rotate-0 scale-100" : "rotate-90 scale-0"
//         )}
//       />
//       <span className="sr-only">Toggle theme</span>
//     </Button>
//   );
// }





"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Ensure the component mounts before rendering to avoid hydration issues
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent rendering until mounted
  if (!mounted) return null;

  // Toggle between light and dark modes
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className={cn(
        "bg-transparent text-white hover:bg-white/20 transition-colors duration-200",
        "focus:ring-0 focus:ring-offset-0 outline-none"
      )}
    >
      <Sun
        className={cn(
          "h-[1.2rem] w-[1.2rem] transition-all",
          theme === "dark" ? "rotate-100 scale-0" : "rotate-0 scale-100"
        )}
      />
      <Moon
        className={cn(
          "absolute h-[1.2rem] w-[1.2rem] transition-all",
          theme === "dark" ? "rotate-0 scale-100" : "rotate-90 scale-0"
        )}
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}