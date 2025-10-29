import { useState } from "react";
import { IOrder } from "@/types/order";
import { Button } from "@/components/ui/button";

interface PlaceServiceBtnProps {
  order: IOrder | null;
  bookOrder: () => Promise<void>;
  loading: boolean;
  deviceSlug: string | null;
}

const PlaceServiceBtn = ({
  order,
  bookOrder,
  loading,
}: PlaceServiceBtnProps) => {
  const [error, setError] = useState<string | null>(null);

  const handleBookOrder = async () => {
    setError(null);
    //? Validate everything before booking
    if (!order?.address) {
      setError("Please select an address");
      return;
    } else if (!order?.schedules?.pickupDate) {
      setError("Please select a pickup date");
      return;
    } else if (!order?.payment) {
      setError("Please select a payment method");
      return;
    }
    await bookOrder();
  };

  return (
    <div className="w-full">
      <div className="w-full max-w-md lg:max-w-none mx-auto">
        <div className="w-full space-y-4 lg:space-y-6">
          {/* Place Service Button */}
          <div>
            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
            <Button
              size="lg"
              className="w-full font-medium text-lg lg:text-xl lg:py-4"
              onClick={handleBookOrder}
              disabled={loading}
            >
              {loading ? "Placing order..." : "Place service"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceServiceBtn;
