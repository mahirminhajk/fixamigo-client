"use client";

import { useState } from "react";
import { submitSupportRequest, SupportRequestData } from "../lib/api";
import Select from "react-select";
import { useUserStore } from "@/stores/userStore";

type SupportRequestFormProps = {
  type: string; // "brand" | "device" | "service" | "can-not-find" | "support" | "feedback"
  value: string;
};

export default function SupportRequestForm({
  type,
  value,
}: SupportRequestFormProps) {
  const user = useUserStore((state) => state.user);

  // Suggestions
  const serviceOptions = [
    "Screen Repair",
    "Battery Replacement",
    "Software Issue",
  ];
  const serviceCategoryOptions = serviceOptions.map((opt) => ({
    value: opt,
    label: opt,
  }));

  // Dynamic state for inputs
  const [brandName, setBrandName] = useState(type === "brand" ? value : "");
  const [deviceName, setDeviceName] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [description, setDescription] = useState("");
  const [phoneNo, setPhoneNo] = useState(user?.phoneNo ?? "");
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      const data: SupportRequestData = {
        type: (type === "can-not-find" ||
        type === "support" ||
        type === "feedback"
          ? "service"
          : type) as "brand" | "device" | "service",
        details: { description },
        user: user?._id || "",
      };
      if (type === "brand") {
        data.details.brand = brandName;
      } else if (type === "service") {
        // device value passed in prop
        data.details.device = value;
        data.details.service = serviceType;
        data.phone = phoneNo;
      } else if (type === "can-not-find") {
        // General help request
        data.details.service = "General Help";
        data.phone = phoneNo;
      } else if (type === "support") {
        // General support request
        data.details.service = "General Support";
        data.phone = phoneNo;
      } else if (type === "feedback") {
        // Feedback request - no phone number needed
        data.details.service = "Feedback";
      } else {
        // device request
        data.details.brand = value;
        data.details.device = deviceName;
        data.details.service = serviceType;
        data.phone = phoneNo;
      }

      await submitSupportRequest(data);
      setStatus("Success! Your request has been submitted.");

      // reset inputs
      if (type === "brand") setBrandName("");
      setDeviceName("");
      setServiceType("");
      setDescription("");
      if (type !== "brand") setPhoneNo("");
    } catch {
      setStatus("Error submitting request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Brand input */}
      {type === "brand" && (
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Enter Brand Name
          </label>
          <input
            type="text"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
            placeholder="e.g., Apple, Samsung, OnePlus"
            required
            className="w-full pl-4 pr-4 py-4 text-gray-700 bg-white border-2 border-gray-200
                       rounded-2xl shadow-lg hover:shadow-xl focus:shadow-xl
                       focus:outline-none focus:border-[#D2691E] focus:ring-4 focus:ring-[#D2691E]/20
                       placeholder-gray-400 transition-all duration-300 ease-in-out"
          />
        </div>
      )}
      {/* Device info and service selection with Combobox */}
      {type === "device" && (
        <>
          <div>
            <label
              className="block text-sm font-semibold text-gray-900 mb-2"
              htmlFor="brand"
            >
              Brand
            </label>
            <input
              type="text"
              value={value}
              disabled
              title="Service Category"
              className="w-full pl-4 pr-4 py-4 text-gray-700 bg-gray-100 border-2 border-gray-200
                         rounded-2xl shadow-lg cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Device Model/Name
            </label>
            <input
              type="text"
              value={deviceName}
              onChange={(e) => setDeviceName(e.target.value)}
              placeholder="Enter your device model or name"
              required
              className="w-full pl-4 pr-4 py-4 text-gray-700 bg-white border-2 border-gray-200
                         rounded-2xl shadow-lg hover:shadow-xl focus:shadow-xl
                         focus:outline-none focus:border-[#D2691E] focus:ring-4 focus:ring-[#D2691E]/20
                         placeholder-gray-400 transition-all duration-300 ease-in-out"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              What kind of service are you looking for?
            </label>
            <Select
              options={serviceCategoryOptions}
              value={
                serviceCategoryOptions.find((o) => o.value === serviceType) ||
                null
              }
              onChange={(option) => setServiceType(option ? option.value : "")}
              placeholder="Select a service"
              className="w-full"
              isClearable
              isSearchable
              required
              styles={{
                control: (base, state) => ({
                  ...base,
                  borderRadius: "1rem",
                  borderWidth: "2px",
                  borderColor: state.isFocused ? "#D2691E" : "#E5E7EB",
                  boxShadow: state.isFocused
                    ? "0 0 0 4px rgba(210, 105, 30, 0.2)"
                    : "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                  padding: "8px",
                  "&:hover": {
                    borderColor: "#D2691E",
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
                  },
                }),
              }}
            />
          </div>
        </>
      )}
      {/* Service request type with Combobox */}
      {type === "service" && (
        <>
          <div>
            <label
              className="block text-sm font-semibold text-gray-900 mb-2"
              htmlFor="serviceCategory"
            >
              Service Category
            </label>
            <input
              type="text"
              name="serviceCategory"
              value={value}
              disabled
              title="Service Category"
              placeholder="Service Category"
              className="w-full pl-4 pr-4 py-4 text-gray-700 bg-gray-100 border-2 border-gray-200
                       rounded-2xl shadow-lg cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Service Needed
            </label>
            <Select
              options={serviceCategoryOptions}
              value={
                serviceCategoryOptions.find((o) => o.value === serviceType) ||
                null
              }
              onChange={(option) => setServiceType(option ? option.value : "")}
              placeholder="Type or select a service"
              className="w-full"
              isClearable
              isSearchable
              required
              styles={{
                control: (base, state) => ({
                  ...base,
                  borderRadius: "1rem",
                  borderWidth: "2px",
                  borderColor: state.isFocused ? "#D2691E" : "#E5E7EB",
                  boxShadow: state.isFocused
                    ? "0 0 0 4px rgba(210, 105, 30, 0.2)"
                    : "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                  padding: "8px",
                  "&:hover": {
                    borderColor: "#D2691E",
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
                  },
                }),
              }}
            />
          </div>
        </>
      )}

      {/* General help request for "can-not-find" type */}
      {type === "can-not-find" && (
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Phone Number{" "}
            <span className="text-sm text-gray-500 font-normal">
              (We&apos;ll use this number to contact you for assistance)
            </span>
          </label>
          <input
            type="text"
            value={phoneNo}
            onChange={(e) => setPhoneNo(e.target.value)}
            placeholder="e.g., +1234567890"
            required
            className="w-full pl-4 pr-4 py-4 text-gray-700 bg-white border-2 border-gray-200
                       rounded-2xl shadow-lg hover:shadow-xl focus:shadow-xl
                       focus:outline-none focus:border-[#D2691E] focus:ring-4 focus:ring-[#D2691E]/20
                       placeholder-gray-400 transition-all duration-300 ease-in-out"
          />
        </div>
      )}

      {/* General support request for "support" type */}
      {type === "support" && (
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Phone Number{" "}
            <span className="text-sm text-gray-500 font-normal">
              (Optional - We&apos;ll use this number to contact you if needed)
            </span>
          </label>
          <input
            type="text"
            value={phoneNo}
            onChange={(e) => setPhoneNo(e.target.value)}
            placeholder="e.g., +1234567890"
            className="w-full pl-4 pr-4 py-4 text-gray-700 bg-white border-2 border-gray-200
                       rounded-2xl shadow-lg hover:shadow-xl focus:shadow-xl
                       focus:outline-none focus:border-[#D2691E] focus:ring-4 focus:ring-[#D2691E]/20
                       placeholder-gray-400 transition-all duration-300 ease-in-out"
          />
        </div>
      )}

      {(type === "device" || type === "service") && (
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Phone Number{" "}
            <span className="text-sm text-gray-500 font-normal">
              (We&apos;ll use this number to contact you for more information)
            </span>
          </label>
          <input
            type="text"
            value={phoneNo}
            onChange={(e) => setPhoneNo(e.target.value)}
            placeholder="e.g., +1234567890"
            required
            className="w-full pl-4 pr-4 py-4 text-gray-700 bg-white border-2 border-gray-200
                       rounded-2xl shadow-lg hover:shadow-xl focus:shadow-xl
                       focus:outline-none focus:border-[#D2691E] focus:ring-4 focus:ring-[#D2691E]/20
                       placeholder-gray-400 transition-all duration-300 ease-in-out"
          />
        </div>
      )}

      {/* Common description */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          {type === "feedback" ? "Your Feedback" : "Additional Comments"}
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full pl-4 pr-4 py-4 text-gray-700 bg-white border-2 border-gray-200
                     rounded-2xl shadow-lg hover:shadow-xl focus:shadow-xl
                     focus:outline-none focus:border-[#D2691E] focus:ring-4 focus:ring-[#D2691E]/20
                     placeholder-gray-400 transition-all duration-300 ease-in-out
                     resize-none h-32"
          placeholder={
            type === "feedback"
              ? "Share your experience, suggestions, or feedback about our services..."
              : "Any other feedback or details..."
          }
          required={type === "feedback"}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full relative inline-flex items-center justify-center gap-3 px-6 md:px-8 py-4 md:py-5
                   bg-gradient-to-r from-[#D2691E] to-[#121212]
                   hover:from-[#121212] hover:to-[#D2691E]
                   disabled:from-gray-400 disabled:to-gray-500
                   text-white font-bold rounded-2xl text-lg
                   shadow-xl hover:shadow-2xl
                   transform transition-all duration-300
                   hover:scale-105 hover:-translate-y-1
                   disabled:hover:scale-100 disabled:hover:translate-y-0
                   focus:outline-none focus:ring-4 focus:ring-[#D2691E]/50
                   disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Submitting...
          </>
        ) : (
          "Submit Request"
        )}
      </button>

      {status && (
        <div
          className={`mt-4 p-4 rounded-2xl text-center font-medium ${
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
