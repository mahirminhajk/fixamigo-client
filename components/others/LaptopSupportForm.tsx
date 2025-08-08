"use client";

import { useState } from "react";
import { submitSupportRequest, SupportRequestData } from "@/lib/api";
import { useUserStore } from "@/stores/userStore";

const laptopIssues = [
  "Battery not charging",
  "Screen replacement",
  "Keyboard not working",
  "Trackpad issue",
  "Overheating",
  "Fan noise",
  "SSD upgrade",
  "Charging port repair",
  "Liquid damage",
  "No power",
  "Slow performance",
];

export default function LaptopSupportForm() {
  const user = useUserStore((s) => s.user);

  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [pincode, setPincode] = useState("");
  const [issue, setIssue] = useState("");
  const [description, setDescription] = useState("");
  const [phone, setPhone] = useState(user?.phoneNo ?? "");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      const payload: SupportRequestData = {
        type: "service",
        user: user?._id || "",
        details: {
          brand,
          device: model,
          service: issue,
          description: `Pincode: ${pincode}${
            description ? " | " + description : ""
          }`,
        },
        phone,
      };

      await submitSupportRequest(payload);
      setStatus("Success! We'll contact you shortly.");
      setBrand("");
      setModel("");
      setPincode("");
      setIssue("");
      setDescription("");
      // keep phone as is
    } catch {
      setStatus("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Quick issue shortcuts */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          Common Laptop Issues
        </label>
        <div className="flex flex-wrap gap-2">
          {laptopIssues.slice(0, 8).map((it) => (
            <button
              type="button"
              key={it}
              onClick={() => setIssue(it)}
              className={`px-3 py-2 text-sm rounded-full border-2 transition-all duration-200 ${
                issue === it
                  ? "bg-[#D2691E] border-[#D2691E] text-white"
                  : "bg-white border-gray-200 text-gray-700 hover:border-[#D2691E] hover:text-[#D2691E]"
              }`}
            >
              {it}
            </button>
          ))}
        </div>
      </div>

      {/* Brand */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          Laptop Brand
        </label>
        <input
          type="text"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          placeholder="e.g., Dell, HP, Lenovo, Apple"
          required
          className="w-full pl-4 pr-4 py-4 text-gray-700 bg-white border-2 border-gray-200 rounded-2xl shadow-lg hover:shadow-xl focus:shadow-xl focus:outline-none focus:border-[#D2691E] focus:ring-4 focus:ring-[#D2691E]/20 placeholder-gray-400 transition-all duration-300 ease-in-out"
        />
      </div>

      {/* Model */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          Model (Optional)
        </label>
        <input
          type="text"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          placeholder="e.g., MacBook Pro 13, ThinkPad X1, Pavilion 15"
          className="w-full pl-4 pr-4 py-4 text-gray-700 bg-white border-2 border-gray-200 rounded-2xl shadow-lg hover:shadow-xl focus:shadow-xl focus:outline-none focus:border-[#D2691E] focus:ring-4 focus:ring-[#D2691E]/20 placeholder-gray-400 transition-all duration-300 ease-in-out"
        />
      </div>

      {/* Pincode */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          Pincode
        </label>
        <input
          type="text"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
          placeholder="e.g., 560001"
          required
          className="w-full pl-4 pr-4 py-4 text-gray-700 bg-white border-2 border-gray-200 rounded-2xl shadow-lg hover:shadow-xl focus:shadow-xl focus:outline-none focus:border-[#D2691E] focus:ring-4 focus:ring-[#D2691E]/20 placeholder-gray-400 transition-all duration-300 ease-in-out"
        />
      </div>

      {/* Issue */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          Issue
        </label>
        <select
          value={issue}
          onChange={(e) => setIssue(e.target.value)}
          required
          className="w-full pl-4 pr-4 py-4 text-gray-700 bg-white border-2 border-gray-200 rounded-2xl shadow-lg focus:shadow-xl focus:outline-none focus:border-[#D2691E] focus:ring-4 focus:ring-[#D2691E]/20 transition-all duration-300 ease-in-out"
        >
          <option value="" disabled>
            Select an issue
          </option>
          {laptopIssues.map((it) => (
            <option key={it} value={it}>
              {it}
            </option>
          ))}
        </select>
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          Phone Number
          <span className="text-sm text-gray-500 font-normal">
            {" "}
            (We&apos;ll contact you on this number)
          </span>
        </label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="e.g., +911234567890"
          required
          className="w-full pl-4 pr-4 py-4 text-gray-700 bg-white border-2 border-gray-200 rounded-2xl shadow-lg hover:shadow-xl focus:shadow-xl focus:outline-none focus:border-[#D2691E] focus:ring-4 focus:ring-[#D2691E]/20 placeholder-gray-400 transition-all duration-300 ease-in-out"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          Additional Details (Optional)
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add any specific symptoms or details..."
          className="w-full pl-4 pr-4 py-4 text-gray-700 bg-white border-2 border-gray-200 rounded-2xl shadow-lg hover:shadow-xl focus:shadow-xl focus:outline-none focus:border-[#D2691E] focus:ring-4 focus:ring-[#D2691E]/20 placeholder-gray-400 transition-all duration-300 ease-in-out resize-none h-28"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full relative inline-flex items-center justify-center gap-3 px-6 md:px-8 py-4 md:py-5 bg-gradient-to-r from-[#D2691E] to-[#121212] hover:from-[#121212] hover:to-[#D2691E] disabled:from-gray-400 disabled:to-gray-500 text-white font-bold rounded-2xl text-lg shadow-xl hover:shadow-2xl transform transition-all duration-300 hover:scale-105 hover:-translate-y-1 disabled:hover:scale-100 disabled:hover:translate-y-0 focus:outline-none focus:ring-4 focus:ring-[#D2691E]/50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Submitting...
          </>
        ) : (
          "Request Callback"
        )}
      </button>

      {status && (
        <div
          className={`mt-2 p-4 rounded-2xl text-center font-medium ${
            status.includes("Success")
              ? "bg-green-50 text-green-800 border-2 border-green-200"
              : "bg-red-50 text-red-800 border-2 border-red-200"
          }`}
        >
          {status}
        </div>
      )}
    </form>
  );
}
