import { Check } from "lucide-react";

interface CheckoutStepperProps {
  currentStep: number;
  totalSteps: number;
  steps: {
    number: number;
    title: string;
    description: string;
  }[];
}

export default function CheckoutStepper({
  currentStep,
  totalSteps,
  steps,
}: CheckoutStepperProps) {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full mb-6">
      {/* Progress Bar - More Compact */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-gray-600">
            Step {currentStep} of {totalSteps}
          </span>
          <span className="text-xs font-medium text-blue-600">
            {Math.round(progressPercentage)}% Complete
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden relative">
          <div
            className={`bg-gradient-to-r from-blue-500 to-blue-600 h-1.5 rounded-full transition-all duration-500 ease-out absolute top-0 left-0 ${
              currentStep === 1
                ? "w-1/4"
                : currentStep === 2
                ? "w-2/4"
                : currentStep === 3
                ? "w-3/4"
                : "w-full"
            }`}
          />
        </div>
      </div>

      {/* Desktop Stepper - Horizontal - More Compact */}
      <div className="hidden md:block">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const isCompleted = step.number < currentStep;
            const isCurrent = step.number === currentStep;

            return (
              <div key={step.number} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  {/* Circle - Smaller */}
                  <div
                    className={`
                      w-9 h-9 rounded-full flex items-center justify-center font-semibold text-sm
                      transition-all duration-300
                      ${
                        isCompleted
                          ? "bg-green-500 text-white"
                          : isCurrent
                          ? "bg-blue-600 text-white ring-4 ring-blue-100"
                          : "bg-gray-200 text-gray-400"
                      }
                    `}
                  >
                    {isCompleted ? <Check className="w-4 h-4" /> : step.number}
                  </div>
                  {/* Label - More Compact */}
                  <div className="mt-2 text-center">
                    <div
                      className={`
                        text-xs font-semibold
                        ${
                          isCurrent
                            ? "text-blue-600"
                            : isCompleted
                            ? "text-green-600"
                            : "text-gray-400"
                        }
                      `}
                    >
                      {step.title}
                    </div>
                  </div>
                </div>
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div
                    className={`
                      h-0.5 flex-1 mx-2 -mt-10 transition-all duration-300
                      ${isCompleted ? "bg-green-500" : "bg-gray-200"}
                    `}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile Stepper - Compact */}
      <div className="md:hidden">
        <div className="flex items-center justify-center space-x-2">
          {steps.map((step) => {
            const isCompleted = step.number < currentStep;
            const isCurrent = step.number === currentStep;

            return (
              <div
                key={step.number}
                className={`
                  w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold
                  transition-all duration-300
                  ${
                    isCompleted
                      ? "bg-green-500 text-white"
                      : isCurrent
                      ? "bg-blue-600 text-white ring-4 ring-blue-100"
                      : "bg-gray-200 text-gray-400"
                  }
                `}
              >
                {isCompleted ? <Check className="w-3 h-3" /> : step.number}
              </div>
            );
          })}
        </div>
        <div className="text-center mt-2">
          <div className="text-sm font-semibold text-gray-900">
            {steps[currentStep - 1].title}
          </div>
        </div>
      </div>
    </div>
  );
}
