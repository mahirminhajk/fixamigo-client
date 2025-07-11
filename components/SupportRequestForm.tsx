"use client";

import { useState } from "react";
import { submitSupportRequest, SupportRequestData } from "../lib/api";
import Select from "react-select";
import { useUserStore } from "@/stores/userStore";

type SupportRequestFormProps = {
  type: "brand" | "device" | "service";
  value: string;
};

export default function SupportRequestForm({
  type,
  value,
}: SupportRequestFormProps) {
  const user = useUserStore((state) => state.user);

  // Suggestions
  const deviceServices = [
    "Screen Repair",
    "Battery Replacement",
    "Software Issue",
  ];
  const serviceOptions = ["Installation", "Maintenance", "Consultation"];
  // Map to react-select option format
  const deviceServiceOptions = deviceServices.map((opt) => ({
    value: opt,
    label: opt,
  }));
  const serviceCategoryOptions = serviceOptions.map((opt) => ({
    value: opt,
    label: opt,
  }));

  // Dynamic state for inputs
  const [brandName, setBrandName] = useState(type === "brand" ? value : "");
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
        type,
        details: {
          description: description,
        },
        user: user?._id || "",
      };
      if (type === "brand") {
        data.details.brand = brandName;
      } else if (type === "device") {
        // device value passed in prop
        data.details.device = value;
        data.details.service = serviceType;
        data.phone = phoneNo;
      } else {
        // service type request
        data.details.service = serviceType || value;
        data.phone = phoneNo;
      }

      await submitSupportRequest(data);
      setStatus("Success! Your request has been submitted.");

      // reset inputs
      if (type === "brand") setBrandName("");
      setServiceType("");
      setDescription("");
    } catch {
      setStatus("Error submitting request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Brand input */}
      {type === "brand" && (
        <div>
          <label className="block font-medium mb-1">Enter Brand Name</label>
          <input
            type="text"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
            placeholder="e.g., Apple"
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>
      )}
      {/* Device info and service selection with Combobox */}
      {type === "device" && (
        <>
          <div>
            <label className="block font-medium mb-1">Device Model</label>
            <input
              type="text"
              value={value}
              disabled
              className="w-full border rounded px-3 py-2 bg-gray-100"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Service Needed</label>
            <Select
              options={deviceServiceOptions}
              value={
                deviceServiceOptions.find((o) => o.value === serviceType) ||
                null
              }
              onChange={(option) => setServiceType(option ? option.value : "")}
              placeholder="Type or select a service"
              className="w-full"
              isClearable
              isSearchable
              required
            />
          </div>
        </>
      )}
      {/* Service request type with Combobox */}
      {type === "service" && (
        <>
          <div>
            <label className="block font-medium mb-1">Service Category</label>
            <input
              type="text"
              value={value}
              disabled
              className="w-full border rounded px-3 py-2 bg-gray-100"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Sub-Service Needed</label>
            <Select
              options={serviceCategoryOptions}
              value={
                serviceCategoryOptions.find((o) => o.value === serviceType) ||
                null
              }
              onChange={(option) => setServiceType(option ? option.value : "")}
              placeholder="Type or select a sub-service"
              className="w-full"
              isClearable
              isSearchable
              required
            />
          </div>
        </>
      )}

      {(type === "device" || type === "service") && (
        <div>
          <label className="block font-medium mb-1">
            Phone Number{" "}
            <span className="text-sm text-gray-500">
              (We&apos;ll use this number to contact you for more information)
            </span>
          </label>
          <input
            type="text"
            value={phoneNo}
            onChange={(e) => setPhoneNo(e.target.value)}
            placeholder="e.g., +1234567890"
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>
      )}

      {/* Common description */}
      <div>
        <label className="block font-medium mb-1">Additional Comments</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border rounded px-3 py-2"
          placeholder="Any other feedback or details"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Submitting..." : "Submit Request"}
      </button>

      {status && <p className="mt-4">{status}</p>}
    </form>
  );
}
