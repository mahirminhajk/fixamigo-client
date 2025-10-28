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
    <div className="w-full mb-8">
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-600">
            Step {currentStep} of {totalSteps}
          </span>
          <span className="text-sm font-medium text-blue-600">
            {Math.round(progressPercentage)}% Complete
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden relative">
          <div
            className={`bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500 ease-out absolute top-0 left-0 ${
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

      {/* Desktop Stepper - Horizontal */}
      <div className="hidden md:block">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const isCompleted = step.number < currentStep;
            const isCurrent = step.number === currentStep;

            return (
              <div key={step.number} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  {/* Circle */}
                  <div
                    className={`
                      w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm
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
                    {isCompleted ? <Check className="w-5 h-5" /> : step.number}
                  </div>
                  {/* Label */}
                  <div className="mt-3 text-center">
                    <div
                      className={`
                        text-sm font-semibold
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
                    <div className="text-xs text-gray-500 mt-1 max-w-[120px]">
                      {step.description}
                    </div>
                  </div>
                </div>
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div
                    className={`
                      h-0.5 flex-1 mx-2 -mt-12 transition-all duration-300
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
                  w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold
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
            );
          })}
        </div>
        <div className="text-center mt-3">
          <div className="text-base font-semibold text-gray-900">
            {steps[currentStep - 1].title}
          </div>
          <div className="text-sm text-gray-500">
            {steps[currentStep - 1].description}
          </div>
        </div>
      </div>
    </div>
  );
}
