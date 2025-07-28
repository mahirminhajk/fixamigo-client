import { useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface CheckoutServiceMethodCardProps {
  onServiceMethodChange: () => void;
}

const CheckoutServiceMethodCard = ({
  onServiceMethodChange,
}: CheckoutServiceMethodCardProps) => {
  const [open, setOpen] = useState(false);
  const toggleSheet = () => setOpen(!open);

  const [selectedMethod, setSelectedMethod] = useState<string | null>(
    "pickupDelivery"
  );

  const handleMethodChange = (method: string) => {
    setSelectedMethod(method);
    onServiceMethodChange(); //! For now, there is no other service method functionality
    toggleSheet();
  };

  return (
    <Sheet open={open} onOpenChange={toggleSheet}>
      <SheetTrigger className="w-full max-w-md lg:max-w-none bg-gray-100 p-4 lg:p-6 rounded-xl shadow-md cursor-pointer transition-colors hover:bg-gray-200">
        <div>
          <p className="text-gray-500 text-sm text-left">Service Method</p>
          <div className="flex justify-between items-center">
            {selectedMethod ? (
              <>
                <p className="text-lg lg:text-xl font-semibold">
                  {selectedMethod === "pickupDelivery"
                    ? "Pickup & Delivery Repair"
                    : "On-Site Repair"}
                </p>
              </>
            ) : (
              <p className="text-gray-500 lg:text-lg">
                Select a service method
              </p>
            )}

            <span className="">
              <FaChevronRight />
            </span>
          </div>
        </div>
      </SheetTrigger>
      <SheetContent className="w-screen">
        <SheetHeader>
          <SheetTitle>Service Method</SheetTitle>
          <SheetDescription>Choose how we repair your device.</SheetDescription>
        </SheetHeader>
        <div className="mt-4">
          <div className="bg-white p-4 rounded-xl shadow-md mb-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="serviceMethod"
                value="pickupDelivery"
                checked={selectedMethod === "pickupDelivery"}
                onChange={() => handleMethodChange("pickupDelivery")}
                className="mr-2"
              />
              <div>
                <p className="text-lg font-medium">Pickup & Delivery Repair</p>
                <p className="text-sm text-gray-500">
                  We pick up your device, repair it at our center, and deliver
                  it back to you.
                </p>
              </div>
            </label>
          </div>
          <div className="bg-gray-200 p-4 rounded-xl shadow-md">
            <label className="flex items-center">
              <input
                type="radio"
                name="serviceMethod"
                value="onSite"
                checked={selectedMethod === "onSite"}
                onChange={() => handleMethodChange("onSite")}
                disabled
                className="mr-2"
              />
              <div>
                <p className="text-lg font-medium text-gray-400">
                  On-Site Repair
                </p>
                <p className="text-sm text-gray-500">
                  Our technician comes to your location and repairs the device
                  on the spot.
                </p>
                <p className="text-xs text-red-500 mt-1">
                  This method is currently not available as we are expanding our
                  on-site services.
                </p>
              </div>
            </label>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CheckoutServiceMethodCard;
