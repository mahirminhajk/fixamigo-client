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

interface CheckoutPaymentMethodCardProps {
  onPaymentMethodChange: () => void;
}

const CheckoutPaymentMethodCard = ({
  onPaymentMethodChange,
}: CheckoutPaymentMethodCardProps) => {
  const [open, setOpen] = useState(false);
  const toggleSheet = () => setOpen(!open);

  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  const handleMethodChange = (method: string) => {
    setSelectedMethod(method);
    onPaymentMethodChange(); //! For now, there is no other payment method, that is the reason not passing any argument.
    toggleSheet();
  };

  return (
    <Sheet open={open} onOpenChange={toggleSheet}>
      <SheetTrigger className="w-full max-w-md bg-gray-100 p-4 rounded-xl shadow-md cursor-pointer transition-colors hover:bg-gray-200">
        <div>
          <p className="text-gray-500 text-sm text-left">Payment Method</p>
          <div className="flex justify-between items-center">
            {selectedMethod ? (
              <>
                <p className="text-lg font-semibold">
                  {selectedMethod === "onDelivery"
                    ? "On Delivery"
                    : "Online Payment"}
                </p>
              </>
            ) : (
              <p className="text-gray-500">Select a payment method</p>
            )}

            <span className="">
              <FaChevronRight />
            </span>
          </div>
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Select Payment Method</SheetTitle>
          <SheetDescription>
            Please choose your preferred payment method.
          </SheetDescription>
        </SheetHeader>
        <div className="mt-4">
          <div className="bg-white p-4 rounded-xl shadow-md mb-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="paymentMethod"
                value="onDelivery"
                checked={selectedMethod === "onDelivery"}
                onChange={() => handleMethodChange("onDelivery")}
                className="mr-2"
              />
              <div>
                <p className="text-lg font-medium">On Delivery</p>
                <p className="text-sm text-gray-500">
                  Pay the delivery boy in cash or UPI upon receiving the
                  repaired device.
                </p>
              </div>
            </label>
          </div>
          <div className="bg-gray-200 p-4 rounded-xl shadow-md">
            <label className="flex items-center">
              <input
                type="radio"
                name="paymentMethod"
                value="online"
                checked={selectedMethod === "online"}
                onChange={() => handleMethodChange("online")}
                disabled
                className="mr-2"
              />
              <div>
                <p className="text-lg font-medium text-gray-400">Online</p>
                <p className="text-sm text-gray-500">
                  This method is currently unavailable.
                </p>
              </div>
            </label>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CheckoutPaymentMethodCard;
