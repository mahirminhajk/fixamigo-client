import { ReactNode } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CheckoutStepWrapperProps {
  children: ReactNode;
  currentStep: number;
  totalSteps: number;
  onNext?: () => void;
  onBack?: () => void;
  nextLabel?: string;
  backLabel?: string;
  isNextDisabled?: boolean;
  isNextLoading?: boolean;
  hideNextButton?: boolean;
  hideBackButton?: boolean;
}

export default function CheckoutStepWrapper({
  children,
  currentStep,
  totalSteps,
  onNext,
  onBack,
  nextLabel = "Continue",
  backLabel = "Back",
  isNextDisabled = false,
  isNextLoading = false,
  hideNextButton = false,
  hideBackButton = false,
}: CheckoutStepWrapperProps) {
  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Step Content - Flat Design, Minimal Padding */}
      <div className="bg-white border-2 border-gray-200 rounded-lg p-5 lg:p-6 mb-6 hover:border-gray-300 transition-colors">
        {children}
      </div>

      {/* Navigation Buttons - Enhanced Design */}
      <div className="flex items-center justify-between gap-4 mb-8 px-2">
        {/* Back Button */}
        {!hideBackButton && currentStep > 1 ? (
          <Button
            onClick={onBack}
            variant="outline"
            size="lg"
            className="flex items-center gap-2 px-8 py-6 text-base font-semibold border-2 hover:bg-gray-50 transition-all"
            disabled={isNextLoading}
          >
            <ArrowLeft className="w-5 h-5" />
            {backLabel}
          </Button>
        ) : (
          <div /> // Spacer for alignment
        )}

        {/* Next/Continue Button - More Prominent */}
        {!hideNextButton && (
          <Button
            onClick={onNext}
            disabled={isNextDisabled || isNextLoading}
            size="lg"
            className="flex items-center gap-3 px-10 py-6 text-base font-bold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transition-all ml-auto transform hover:scale-105 disabled:transform-none disabled:opacity-50"
          >
            {isNextLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <span className="text-lg">{nextLabel}</span>
                {currentStep < totalSteps && <ArrowRight className="w-5 h-5" />}
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  );
}
