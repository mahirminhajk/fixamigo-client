"use client";
import { useState, useCallback } from "react";
import { IOrder, SparePartType } from "@/types/order";
import api from "@/lib/axiosInstance";
import { cn } from "@/lib/utils";

interface CheckoutNoteCardProps {
  order: IOrder | null;
  onNoteSaved?: (note: string) => void;
}

export default function CheckoutNoteCard({
  order,
  onNoteSaved,
}: CheckoutNoteCardProps) {
  const [note, setNote] = useState(order?.note || "");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const orderId = order?._id; // stable primitive for dependencies
  const hasDiagnosis = !!order?.sparePartsDetails?.some(
    (sp) => sp.type === SparePartType.DIAGNOSIS
  );
  const hasUnknown = !!order?.sparePartsDetails?.some(
    (sp) => sp.type === SparePartType.UNKNOWN
  );

  const helperText = hasDiagnosis
    ? "Describe symptoms, issues observed, when they occur, prior repairs, liquid exposure or any error messages. More detail helps our technicians diagnose faster."
    : "Add any context or expectations for the services requiring a quote (e.g. issue description, urgency, preferred time to call).";

  const saveNote = useCallback(async () => {
    if (!orderId) return;
    setSaving(true);
    setError(null);
    setSaved(false);
    try {
      await api.patch(`/order/${orderId}/note`, { note });
      setSaved(true);
      onNoteSaved?.(note);
    } catch (e: unknown) {
      const err = e as { response?: { data?: { message?: string } } };
      setError(
        err?.response?.data?.message || "Failed to save note. Try again."
      );
    } finally {
      setSaving(false);
      setTimeout(() => setSaved(false), 2500);
    }
  }, [note, orderId, onNoteSaved]);

  if (!orderId) return null;
  if (!hasDiagnosis && !hasUnknown) return null;

  return (
    <div className="border border-gray-200 bg-white rounded-lg p-4 lg:p-5 shadow-sm">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-base font-semibold text-gray-900">
          Repair Note (Optional)
        </h3>
        {saving && (
          <span className="text-xs text-gray-500 animate-pulse">Saving...</span>
        )}
        {saved && !saving && (
          <span className="text-xs text-green-600">Saved</span>
        )}
      </div>
      <p className="text-xs text-gray-600 mb-3 leading-relaxed">{helperText}</p>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value.slice(0, 800))}
        placeholder={
          hasDiagnosis
            ? "Eg: Phone heats up after 10 mins of gaming, random restarts, no signal indoors..."
            : "Eg: Back glass cracked, please confirm if frame needs replacement."
        }
        rows={4}
        className="w-full resize-y rounded-md border border-gray-300 focus:border-black focus:ring-1 focus:ring-black text-sm p-3 outline-none bg-gray-50"
        disabled={saving}
      />
      <div className="flex items-center justify-between mt-3">
        <span className="text-[11px] text-gray-400">{note.length}/800</span>
        <button
          onClick={saveNote}
          disabled={saving || note === order.note}
          className={cn(
            "px-4 py-2 rounded-md text-sm font-medium transition-colors",
            saving || note === order.note
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-black text-white hover:bg-black/80"
          )}
        >
          {saving ? "Saving" : note === order.note ? "Saved" : "Save Note"}
        </button>
      </div>
      {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
    </div>
  );
}
