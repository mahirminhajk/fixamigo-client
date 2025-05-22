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
        <SheetTrigger className="w-full max-w-md bg-gray-100 p-4 rounded-xl shadow-md cursor-pointer transition-colors hover:bg-gray-200">
          <div>
            <p className="text-gray-500 text-sm text-left">Pickup date</p>
            <div className="flex justify-between items-center">
              {selectedDate ? (
                <p className="text-lg font-semibold">
                  {selectedDate.weekday}, {selectedDate.day}{" "}
                  {selectedDate.month}
                </p>
              ) : (
                <p className="text-gray-500">Select a pickup date</p>
              )}
              <span>
                <FaChevronRight />
              </span>
            </div>
            {errorMessage && (
              <div className="mt-4 text-red-500 text-sm text-left">
                {errorMessage}
              </div>
            )}
          </div>
        </SheetTrigger>

        <SheetContent>
          <SheetHeader>
            <SheetTitle>Pickup Date</SheetTitle>
            <SheetDescription>
              Please select your preferred pickup date.
            </SheetDescription>
          </SheetHeader>

          <div className="flex flex-col items-center w-full mt-4">
            <div className="grid grid-cols-3 gap-3 mb-6" id="date-section">
              {dates.map((date, index) => (
                <div
                  key={index}
                  className={`bg-gray-100 border rounded-[8px] cursor-pointer w-20 h-20 lg:w-24 lg:h-24 flex flex-col justify-center items-center ${
                    selectedDate?.fullDate === date.fullDate
                      ? "border-blue-500 text-blue-500 border-dashed"
                      : "text-black border-gray-300"
                  }`}
                  onClick={() => setDate(date)}
                >
                  {isToday(date) && (
                    <p className="text-sm font-medium bg-gray-300 w-full text-center rounded-t-[6px] text-black">
                      Today
                    </p>
                  )}
                  {isTomorrow(date) && (
                    <p className="text-sm font-medium bg-gray-300 w-full text-center rounded-t-[6px] text-black">
                      Tomorrow
                    </p>
                  )}

                  <div className="flex flex-col items-center justify-center text-center flex-1">
                    <p className="text-2xl font-bold">{date.day}</p>
                    <p className="text-sm">{date.weekday}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default CheckoutPickupDateCard;
