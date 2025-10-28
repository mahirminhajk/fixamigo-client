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
    <div className="w-full max-w-2xl mx-auto">
      {/* Step Content */}
      <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8 mb-6">
        {children}
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between gap-4 mb-8">
        {/* Back Button */}
        {!hideBackButton && currentStep > 1 ? (
          <Button
            onClick={onBack}
            variant="outline"
            className="flex items-center gap-2 px-6 py-3 text-base"
            disabled={isNextLoading}
          >
            <ArrowLeft className="w-4 h-4" />
            {backLabel}
          </Button>
        ) : (
          <div /> // Spacer for alignment
        )}

        {/* Next/Continue Button */}
        {!hideNextButton && (
          <Button
            onClick={onNext}
            disabled={isNextDisabled || isNextLoading}
            className="flex items-center gap-2 px-8 py-3 text-base bg-blue-600 hover:bg-blue-700 ml-auto"
          >
            {isNextLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Processing...
              </>
            ) : (
              <>
                {nextLabel}
                {currentStep < totalSteps && <ArrowRight className="w-4 h-4" />}
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  );
}
