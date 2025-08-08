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
      <SheetTrigger className="w-full max-w-md lg:max-w-none group">
        <div className="bg-white p-6 lg:p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg hover:border-gray-300 transition-all duration-300 cursor-pointer group-hover:scale-[1.02]">
          <div className="flex items-center justify-between">
            <div className="flex-1 text-left">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full"></div>
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                  Payment Method
                </p>
              </div>
              {selectedMethod ? (
                <div className="space-y-1">
                  <p className="text-xl lg:text-2xl font-bold text-gray-900">
                    {selectedMethod === "onDelivery"
                      ? "Cash on Delivery"
                      : "Online Payment"}
                  </p>
                  <p className="text-sm text-gray-600">
                    {selectedMethod === "onDelivery"
                      ? "Pay when your device is delivered"
                      : "Secure online payment processing"}
                  </p>
                </div>
              ) : (
                <p className="text-lg lg:text-xl text-gray-400 font-medium">
                  Choose your payment method
                </p>
              )}
            </div>
            <div className="ml-4 flex items-center justify-center w-10 h-10 bg-gray-50 rounded-full group-hover:bg-green-50 transition-colors">
              <FaChevronRight className="text-gray-400 group-hover:text-green-500 transition-colors" />
            </div>
          </div>
        </div>
      </SheetTrigger>
      <SheetContent className="w-screen sm:max-w-lg">
        <SheetHeader className="space-y-4">
          <SheetTitle className="text-2xl font-bold text-gray-900">
            Payment Method
          </SheetTitle>
          <SheetDescription className="text-base text-gray-600">
            Choose your preferred payment option for a seamless experience.
          </SheetDescription>
        </SheetHeader>
        <div className="mt-8 space-y-4">
          <div className="relative">
            <input
              type="radio"
              name="paymentMethod"
              value="onDelivery"
              id="onDelivery"
              checked={selectedMethod === "onDelivery"}
              onChange={() => handleMethodChange("onDelivery")}
              className="sr-only peer"
            />
            <label
              htmlFor="onDelivery"
              className="flex items-start p-6 bg-white border-2 border-gray-200 rounded-2xl cursor-pointer hover:border-green-300 hover:shadow-lg transition-all duration-300 peer-checked:border-green-500 peer-checked:bg-green-50 peer-checked:shadow-lg"
            >
              <div className="flex items-center justify-center w-6 h-6 mr-4 mt-0.5">
                <div className="w-4 h-4 border-2 border-gray-300 rounded-full peer-checked:border-green-500 peer-checked:bg-green-500 relative">
                  <div className="absolute inset-0 hidden peer-checked:block">
                    <div className="w-2 h-2 bg-white rounded-full m-auto mt-0.5"></div>
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Cash on Delivery
                  </h3>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                    Popular
                  </span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">
                  Pay the delivery executive in cash or via UPI when you receive
                  your fully repaired device. No advance payment required.
                </p>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                    No advance payment
                  </span>
                  <span className="flex items-center gap-1">
                    <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                    Cash or UPI accepted
                  </span>
                </div>
              </div>
            </label>
          </div>

          <div className="relative opacity-60">
            <input
              type="radio"
              name="paymentMethod"
              value="online"
              id="online"
              checked={selectedMethod === "online"}
              onChange={() => handleMethodChange("online")}
              disabled
              className="sr-only peer"
            />
            <label
              htmlFor="online"
              className="flex items-start p-6 bg-gray-50 border-2 border-gray-200 rounded-2xl cursor-not-allowed"
            >
              <div className="flex items-center justify-center w-6 h-6 mr-4 mt-0.5">
                <div className="w-4 h-4 border-2 border-gray-300 rounded-full"></div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-400">
                    Online Payment
                  </h3>
                  <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded-full">
                    Coming Soon
                  </span>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Secure online payment with multiple options including cards,
                  UPI, and digital wallets.
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
