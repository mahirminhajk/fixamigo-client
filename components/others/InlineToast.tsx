"use client";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

interface InlineToastProps {
  message: string;
  variant?: "info" | "error" | "success";
  duration?: number; // ms
}

const variantStyles: Record<string, string> = {
  info: "bg-gray-900 text-white",
  error: "bg-red-600 text-white",
  success: "bg-green-600 text-white",
};

export default function InlineToast({ message, variant = "info", duration = 4000 }: InlineToastProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!duration) return;
    const id = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(id);
  }, [duration]);

  if (!visible) return null;

  return (
    <div className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 shadow-lg rounded-md px-4 py-3 flex items-center gap-3 text-sm font-medium ${variantStyles[variant]}`}>      
      <span>{message}</span>
      <button
        onClick={() => setVisible(false)}
        className="ml-2 p-1 rounded hover:bg-white/20 focus:outline-none"
        aria-label="Close notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
