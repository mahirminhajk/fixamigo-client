"use client";
import { useUserStore } from "@/stores/userStore";
import { useRouter } from "next/navigation";

// No Sheet imports; uses global auth sheet
import { Button } from "@/components/ui/button";
import { useAuthSheet } from "@/hooks/useAuthSheet";

interface EmptyAndNotLoginedProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  showAuth?: boolean; // Optionally show the Sign-in button
  showAction?: boolean; // Optionally show the Continue shopping button
  actionText?: string;
  actionLink?: string;
}

const EmptyAndNotLogined = ({
  icon,
  title,
  description,
  showAuth = false,
  showAction = true,
  actionText = "Continue shopping",
  actionLink = "/",
}: EmptyAndNotLoginedProps) => {
  const { openAuth } = useAuthSheet();
  const onCompleted = () => {};

  const isLogged = useUserStore((state) => state.isLogged);

  const router = useRouter();

  return (
    <div className="flex flex-col justify-center items-center h-[70vh] lg:h-[60vh] w-full">
      <div className="flex flex-col items-center justify-center space-y-6 text-center h-full max-w-lg mx-auto px-6">
        <div className="text-6xl lg:text-8xl text-gray-700">{icon}</div>
        <div className="space-y-3">
          <h2 className="text-xl lg:text-2xl font-semibold text-gray-900">
            {title}
          </h2>
          <p className="text-gray-500 text-sm lg:text-base leading-relaxed max-w-md">
            {description}
          </p>
        </div>
        <div className="space-y-3 w-full max-w-sm">
          {showAuth && !isLogged() && (
            <Button
              className="w-full bg-black text-white rounded-lg py-3 lg:py-4 text-sm lg:text-base font-medium hover:bg-gray-800 transition-colors"
              onClick={() => openAuth({ onCompleted })}
            >
              Sign in
            </Button>
          )}
          {showAction && (
            <Button
              variant="outline"
              className="w-full rounded-lg py-3 lg:py-4 text-sm lg:text-base font-medium hover:bg-gray-50 transition-colors border-gray-300"
              onClick={() => router.push(actionLink)}
            >
              {actionText}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmptyAndNotLogined;

// (Old inline Sheet-based implementation was removed in favor of global provider)
