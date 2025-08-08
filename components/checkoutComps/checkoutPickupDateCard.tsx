import { useState, useEffect } from "react";
import { FaChevronRight } from "react-icons/fa";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { convertDate } from "@/lib/utils";

interface CheckoutPickupDateCardProps {
  pickupAvailableDates: string[];
  pickupDate: Date | null;
  onPickupDateChange: (date: string) => Promise<void>;
  loading: boolean;
}

const CheckoutPickupDateCard = ({
  pickupAvailableDates,
  pickupDate,
  onPickupDateChange,
  loading,
}: CheckoutPickupDateCardProps) => {
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const toggleSheet = () => {
    if (pickupAvailableDates.length === 0) {
      setErrorMessage(
        "Please enter your address to get available pickup dates."
      );
    } else {
      setErrorMessage(null);
      setOpen(!open);
    }
  };

  const [selectedDate, setSelectedDate] = useState<{
    day: number;
    month: string;
    weekday: string;
    fullDate: string;
  } | null>(null);
  const [dates, setDates] = useState<
    Array<{ day: number; month: string; weekday: string; fullDate: string }>
  >([]);

  useEffect(() => {
    // Convert pickupAvailableDates into formatted objects
    const formattedDates = pickupAvailableDates.map((dateString) => {
      const [day, month, year] = dateString.split("-").map(Number);
      const dateObj = new Date(year, month - 1, day);

      return {
        day: dateObj.getDate(),
        month: dateObj.toLocaleString("default", { month: "long" }),
        weekday: dateObj.toLocaleString("default", { weekday: "long" }),
        fullDate: dateString, // Store original format for easy comparison
      };
    });

    setDates(formattedDates);

    // Set default selected date if pickupDate exists
    if (pickupDate) {
      const formattedPickupDateString = convertDate(pickupDate);
      const defaultDate = formattedDates.find(
        (d) => d.fullDate === formattedPickupDateString
      );
      if (defaultDate) {
        setSelectedDate(defaultDate);
      }
    }
  }, [pickupAvailableDates, pickupDate]);

  const setDate = async (date: {
    day: number;
    month: string;
    weekday: string;
    fullDate: string;
  }) => {
    setSelectedDate(date);
    await onPickupDateChange(date.fullDate);
    setOpen(false);
  };

  const isToday = (date: { fullDate: string }) => {
    const today = new Date();
    const [day, month, year] = date.fullDate.split("-").map(Number);
    const dateObj = new Date(year, month - 1, day);
    return (
      today.getDate() === dateObj.getDate() &&
      today.getMonth() === dateObj.getMonth() &&
      today.getFullYear() === dateObj.getFullYear()
    );
  };

  const isTomorrow = (date: { fullDate: string }) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const [day, month, year] = date.fullDate.split("-").map(Number);
    const dateObj = new Date(year, month - 1, day);
    return (
      tomorrow.getDate() === dateObj.getDate() &&
      tomorrow.getMonth() === dateObj.getMonth() &&
      tomorrow.getFullYear() === dateObj.getFullYear()
    );
  };

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <Sheet open={open} onOpenChange={toggleSheet}>
        <SheetTrigger className="w-full max-w-md lg:max-w-none group">
          <div className="bg-white p-6 lg:p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg hover:border-gray-300 transition-all duration-300 cursor-pointer group-hover:scale-[1.02]">
            <div className="flex items-center justify-between">
              <div className="flex-1 text-left">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full"></div>
                  <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                    Pickup Date
                  </p>
                </div>
                {selectedDate ? (
                  <div className="space-y-1">
                    <p className="text-xl lg:text-2xl font-bold text-gray-900">
                      {selectedDate.weekday}, {selectedDate.day}{" "}
                      {selectedDate.month}
                    </p>
                    <p className="text-sm text-gray-600">
                      We&apos;ll pick up your device on this date
                    </p>
                  </div>
                ) : (
                  <p className="text-lg lg:text-xl text-gray-400 font-medium">
                    Choose your preferred pickup date
                  </p>
                )}
                {errorMessage && (
                  <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <p className="text-sm text-amber-700 font-medium">
                      {errorMessage}
                    </p>
                  </div>
                )}
              </div>
              <div className="ml-4 flex items-center justify-center w-10 h-10 bg-gray-50 rounded-full group-hover:bg-purple-50 transition-colors">
                <FaChevronRight className="text-gray-400 group-hover:text-purple-500 transition-colors" />
              </div>
            </div>
          </div>
        </SheetTrigger>

        <SheetContent className="w-screen sm:max-w-lg">
          <SheetHeader className="space-y-4">
            <SheetTitle className="text-2xl font-bold text-gray-900">
              Pickup Date
            </SheetTitle>
            <SheetDescription className="text-base text-gray-600">
              Select your preferred date for device pickup. We&apos;ll arrive at
              your scheduled time.
            </SheetDescription>
          </SheetHeader>

          <div className="flex flex-col items-center w-full mt-8">
            <div
              className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6 w-full"
              id="date-section"
            >
              {dates.map((date, index) => (
                <div
                  key={index}
                  className={`relative bg-white border-2 rounded-2xl cursor-pointer transition-all duration-300 hover:shadow-lg ${
                    selectedDate?.fullDate === date.fullDate
                      ? "border-purple-500 bg-purple-50 shadow-lg scale-105"
                      : "border-gray-200 hover:border-purple-300"
                  }`}
                  onClick={() => setDate(date)}
                >
                  {(isToday(date) || isTomorrow(date)) && (
                    <div
                      className={`absolute -top-2 left-1/2 transform -translate-x-1/2 px-3 py-1 text-xs font-bold rounded-full ${
                        isToday(date)
                          ? "bg-green-500 text-white"
                          : "bg-blue-500 text-white"
                      }`}
                    >
                      {isToday(date) ? "Today" : "Tomorrow"}
                    </div>
                  )}

                  <div className="flex flex-col items-center justify-center p-4 h-24 text-center">
                    <p
                      className={`text-2xl font-bold mb-1 ${
                        selectedDate?.fullDate === date.fullDate
                          ? "text-purple-700"
                          : "text-gray-900"
                      }`}
                    >
                      {date.day}
                    </p>
                    <p
                      className={`text-sm font-medium ${
                        selectedDate?.fullDate === date.fullDate
                          ? "text-purple-600"
                          : "text-gray-600"
                      }`}
                    >
                      {date.weekday.slice(0, 3)}
                    </p>
                    <p
                      className={`text-xs ${
                        selectedDate?.fullDate === date.fullDate
                          ? "text-purple-500"
                          : "text-gray-500"
                      }`}
                    >
                      {date.month.slice(0, 3)}
                    </p>
                  </div>

                  {selectedDate?.fullDate === date.fullDate && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {dates.length === 0 && (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <p className="text-gray-500">No available pickup dates</p>
                <p className="text-sm text-gray-400 mt-1">
                  Please add your address first
                </p>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default CheckoutPickupDateCard;
