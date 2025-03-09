import { FaChevronRight } from "react-icons/fa";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useEffect, useState } from "react";

const CheckoutPickupDateCard = () => {
  const [open, setOpen] = useState(false);
  const toggleSheet = () => setOpen(!open);

  const [selectedDate, setSelectedDate] = useState<{
    day: number;
    month: string;
    weekday: string;
  } | null>(null);
  const [dates, setDates] = useState<
    Array<{ day: number; month: string; weekday: string }>
  >([]);

  useEffect(() => {
    const today = new Date();
    const newDates = [];
    for (let i = 0; i < 5; i++) {
      const futureDate = new Date();
      futureDate.setDate(today.getDate() + i);
      newDates.push({
        day: futureDate.getDate(),
        month: futureDate.toLocaleString("default", { month: "long" }),
        weekday: futureDate.toLocaleString("default", { weekday: "long" }),
      });
    }
    setDates(newDates);
  }, []);

  const setDate = (date: { day: number; month: string; weekday: string }) => {
    setSelectedDate(date);
    toggleSheet();
  };

  return (
    <Sheet open={open} onOpenChange={toggleSheet}>
      <SheetTrigger className="w-full max-w-md bg-gray-100 p-4 rounded-xl shadow-md cursor-pointer">
        <div>
          <p className="text-gray-500 text-sm text-left">Pickup date</p>
          <div className="flex justify-between items-center">
            {selectedDate ? (
              <>
                <p className="text-lg font-semibold">
                  {selectedDate.weekday}, {selectedDate.day}{" "}
                  {selectedDate.month}
                </p>
              </>
            ) : (
              <p className="text-gray-500">Select a pickup date</p>
            )}
            <span className="">
              <FaChevronRight />
            </span>
          </div>
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Pickup Date</SheetTitle>
          <SheetDescription>
            Please select your preferred pickup date.
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col items-center w-full  mt-4">
          <div className="grid grid-cols-3 gap-3 mb-6" id="date-section">
            {dates.map((date, index) => (
              <div
                key={index}
                className={`bg-gray-100 border rounded-[8px] cursor-pointer w-20 h-20 lg:w-24 lg:h-24 flex flex-col justify-center items-center ${
                  selectedDate === date
                    ? "border-blue-500 text-blue-500 border-dashed"
                    : "text-black border-gray-300"
                }`}
                onClick={() => setDate(date)}
              >
                {/* Keep Today and Tomorrow headings in original color */}
                {index === 0 && (
                  <p className="text-sm font-medium bg-gray-300 w-full text-center rounded-t-[6px] text-black">
                    Today
                  </p>
                )}
                {index === 1 && (
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
  );
};

export default CheckoutPickupDateCard;
