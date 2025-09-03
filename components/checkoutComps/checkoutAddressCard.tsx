"use client";
import { FaChevronRight, FaPlus } from "react-icons/fa";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useUserStore } from "@/stores/userStore";
import { IAddress } from "@/types/address";
import api from "@/lib/axiosInstance";
import { AxiosError } from "axios";

interface AddressFormData {
  name: string;
  phone: string;
  pincode: string;
  street: string;
  city: string;
  landMark: string;
  alternateNumber: string;
}

interface GeoLocationData {
  latitude: number;
  longitude: number;
}

interface CheckoutAddressCardProps {
  address?: IAddress;
  onAddressSubmit: (
    address: IAddress | string,
    location?: GeoLocationData
  ) => Promise<void>;
  loading: boolean;
  error: "BAD_REQUEST" | "NO_ZONES" | null;
  onAddressSelect?: (address: IAddress) => void; // Optional prop to update local state
}

const CheckoutAddressCard = ({
  address,
  onAddressSubmit,
  loading,
  error,
  onAddressSelect,
}: CheckoutAddressCardProps) => {
  const [open, setOpen] = useState(false);
  const [showAddNewForm, setShowAddNewForm] = useState(false);
  const [existingAddresses, setExistingAddresses] = useState<IAddress[]>([]);
  const [fetchingAddresses, setFetchingAddresses] = useState(false);
  const [location, setLocation] = useState<GeoLocationData | null>(null);
  const [locating, setLocating] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  const toggleSheet = () => {
    setOpen(!open);
    if (!open) {
      // Reset states when opening
      setShowAddNewForm(false);
      setExistingAddresses([]);
    }
  };

  //* user
  const user = useUserStore((state) => state.user);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: address?.name ?? user?.name ?? "",
      phone: address?.phone ?? user?.phoneNo ?? "",
      pincode: address?.pincode ?? "",
      street: address?.address ?? "",
      city: address?.city ?? "",
      landMark: address?.landmark ?? "",
      alternateNumber: address?.altPhone ?? "",
    },
  });

  // Fetch existing addresses when sheet opens
  const fetchExistingAddresses = async () => {
    setFetchingAddresses(true);
    try {
      const response = await api.get("/user/address");
      setExistingAddresses(response.data?.data?.addresses || []);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(
          "Failed to fetch addresses:",
          error.response?.data?.message
        );
      }
      setExistingAddresses([]);
    } finally {
      setFetchingAddresses(false);
    }
  };

  // Handle selecting an existing address
  const handleSelectExistingAddress = async (selectedAddress: IAddress) => {
    try {
      // First call the parent's onAddressSubmit with just the ID
      await onAddressSubmit(selectedAddress._id!);

      // If there's an onAddressSelect callback, use it to update local state
      if (onAddressSelect) {
        onAddressSelect(selectedAddress);
      }

      toggleSheet();
    } catch (error) {
      console.error("Failed to select address:", error);
    }
  };

  // Load addresses when sheet opens
  useEffect(() => {
    if (open && user) {
      fetchExistingAddresses();
    }
  }, [open, user]);

  const onSubmit = async (data: AddressFormData): Promise<void> => {
    const newAddress: IAddress = {
      name: data.name,
      phone: data.phone,
      altPhone: data.alternateNumber,
      address: data.street,
      city: data.city,
      landmark: data.landMark,
      state: "Kerala",
      pincode: data.pincode,
    };

    try {
      await onAddressSubmit(
        newAddress,
        location
          ? { latitude: location.latitude, longitude: location.longitude }
          : undefined
      );

      // If there's an onAddressSelect callback, use it to update local state
      if (onAddressSelect) {
        onAddressSelect(newAddress);
      }

      toggleSheet();
    } catch (error) {
      console.error("Failed to submit new address:", error);
      // Don't close the sheet if there's an error
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <Sheet open={open} onOpenChange={toggleSheet}>
      <SheetTrigger className="w-full max-w-md lg:max-w-none group">
        <div className="bg-white p-6 lg:p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg hover:border-gray-300 transition-all duration-300 cursor-pointer group-hover:scale-[1.02]">
          <div className="flex items-start justify-between">
            <div className="flex-1 text-left">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-3 h-3 bg-gradient-to-r from-red-500 to-pink-600 rounded-full"></div>
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                  Shipping Address
                </p>
              </div>
              {address ? (
                <div className="space-y-2">
                  <p className="text-xl lg:text-2xl font-bold text-gray-900">
                    {address?.name}
                  </p>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p className="leading-relaxed">
                      {address.address}, {address.city}
                      {address.landmark && `, ${address.landmark}`}
                    </p>
                    <p className="font-medium">{address.pincode}</p>
                    <p className="flex items-center gap-2">
                      <span>{address?.phone}</span>
                      {address.altPhone && (
                        <span className="text-gray-400">
                          • {address.altPhone}
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-lg lg:text-xl text-gray-400 font-medium">
                  Add your shipping address
                </p>
              )}

              {error && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 text-red-500 mt-0.5">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      {error === "NO_ZONES" ? (
                        <div className="space-y-2">
                          <p className="text-sm font-semibold text-red-700">
                            Service not available in this area
                          </p>
                          <p className="text-xs text-red-600">
                            We&apos;re working to expand our services. Contact
                            us for assistance.
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <p className="text-sm font-semibold text-red-700">
                            Something went wrong
                          </p>
                          <p className="text-xs text-red-600">
                            Please try again or contact us for help.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="ml-4 flex items-center justify-center w-10 h-10 bg-gray-50 rounded-full group-hover:bg-red-50 transition-colors">
              <FaChevronRight className="text-gray-400 group-hover:text-red-500 transition-colors" />
            </div>
          </div>
        </div>
      </SheetTrigger>
      <SheetContent className="w-screen sm:max-w-lg flex flex-col h-full">
        <SheetHeader className="flex-shrink-0 space-y-4">
          <SheetTitle className="text-2xl font-bold text-gray-900">
            {showAddNewForm ? "Add New Address" : "Select Address"}
          </SheetTitle>
          <SheetDescription className="text-base text-gray-600">
            {showAddNewForm
              ? "This address will be used for device pickup and delivery."
              : "Choose from your saved addresses or add a new one for convenience."}
          </SheetDescription>
        </SheetHeader>

        {!showAddNewForm ? (
          <div className="mt-6 space-y-4 flex-1 overflow-y-auto">
            {fetchingAddresses ? (
              <p className="text-center py-4">Loading addresses...</p>
            ) : (
              <>
                {existingAddresses.length > 0 ? (
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium text-gray-700">
                      Your Addresses
                    </h3>
                    {existingAddresses.map((addr) => (
                      <Card
                        key={addr._id}
                        className="p-4 cursor-pointer hover:bg-gray-50 border border-gray-200"
                        onClick={() => handleSelectExistingAddress(addr)}
                      >
                        <div className="space-y-1">
                          <p className="font-medium text-gray-900">
                            {addr.name}
                          </p>
                          <p className="text-sm text-gray-600">
                            {addr.address}, {addr.city}
                            {addr.landmark && `, ${addr.landmark}`}
                            {`, ${addr.pincode}`}
                          </p>
                          <p className="text-sm text-gray-600">
                            {addr.phone}
                            {addr.altPhone && ` • ${addr.altPhone}`}
                          </p>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <p className="text-center py-4 text-gray-500">
                    No saved addresses found
                  </p>
                )}

                <Button
                  variant="outline"
                  className="w-full mt-4 flex items-center gap-2"
                  onClick={() => setShowAddNewForm(true)}
                >
                  <FaPlus className="w-4 h-4" />
                  Add New Address
                </Button>
              </>
            )}
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mt-4 space-y-1 pb-6">
                <Button
                  type="button"
                  variant="ghost"
                  className="mb-4 p-0 h-auto font-normal text-blue-600"
                  onClick={() => setShowAddNewForm(false)}
                >
                  ← Back to saved addresses
                </Button>

                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    {...register("name")}
                    id="name"
                    placeholder="Enter Your Name"
                    autoFocus={!user?.name}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    {...register("phone")}
                    id="phone"
                    placeholder="Enter Phone number"
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={12}
                    onInput={(e) =>
                      ((e.target as HTMLInputElement).value = (
                        e.target as HTMLInputElement
                      ).value.replace(/\D/g, ""))
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="street">Street Address</Label>
                  <Input
                    {...register("street")}
                    id="street"
                    placeholder="Enter street address"
                    autoFocus={!!user?.name}
                  />
                </div>

                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    {...register("city")}
                    id="city"
                    placeholder="Enter city"
                  />
                </div>

                <div>
                  <Label htmlFor="landMark">Landmark</Label>
                  <Input
                    {...register("landMark")}
                    id="landMark"
                    placeholder="Enter landmark"
                  />
                </div>

                <div>
                  <Label htmlFor="pincode">PIN Code</Label>
                  <Input
                    {...register("pincode")}
                    id="pincode"
                    placeholder="Enter PIN code"
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]{6}"
                    maxLength={6}
                    onInput={(e) =>
                      ((e.target as HTMLInputElement).value = (
                        e.target as HTMLInputElement
                      ).value.replace(/\D/g, ""))
                    }
                  />
                </div>

                {/* Optional Location Section */}
                <div className="mt-6 p-4 border rounded-xl bg-gradient-to-br from-gray-50 to-white space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-blue-600 text-xs font-semibold">
                      i
                    </span>
                    <p className="text-sm font-medium text-gray-800">
                      Pickup Location (Optional)
                    </p>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Share your approximate location to help us plan a faster
                    pickup. You can skip this step if you prefer.
                  </p>
                  {location && (
                    <div className="text-xs text-gray-700 bg-blue-50 border border-blue-100 rounded-md p-2 flex items-center justify-between gap-2">
                      <div>
                        <p>
                          Lat:{" "}
                          <span className="font-medium">
                            {location.latitude.toFixed(5)}
                          </span>
                          , Lng:{" "}
                          <span className="font-medium">
                            {location.longitude.toFixed(5)}
                          </span>
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setLocation(null)}
                        className="text-blue-600 hover:underline shrink-0"
                      >
                        Clear
                      </button>
                    </div>
                  )}
                  {locationError && (
                    <p className="text-xs text-red-600">{locationError}</p>
                  )}
                  <Button
                    type="button"
                    variant="outline"
                    disabled={locating}
                    onClick={() => {
                      setLocationError(null);
                      if (!navigator.geolocation) {
                        setLocationError(
                          "Geolocation not supported by this browser."
                        );
                        return;
                      }
                      setLocating(true);
                      navigator.geolocation.getCurrentPosition(
                        (pos) => {
                          setLocation({
                            latitude: pos.coords.latitude,
                            longitude: pos.coords.longitude,
                          });
                          setLocating(false);
                        },
                        (err) => {
                          let msg = "Failed to get location.";
                          if (err.code === err.PERMISSION_DENIED)
                            msg =
                              "Permission denied. You can still continue without it.";
                          else if (err.code === err.POSITION_UNAVAILABLE)
                            msg = "Location unavailable right now.";
                          else if (err.code === err.TIMEOUT)
                            msg = "Request timed out. Try again.";
                          setLocationError(msg);
                          setLocating(false);
                        },
                        {
                          enableHighAccuracy: true,
                          timeout: 10000,
                          maximumAge: 0,
                        }
                      );
                    }}
                    className="w-full"
                  >
                    {locating
                      ? "Detecting..."
                      : location
                      ? "Update Location"
                      : "Use My Current Location"}
                  </Button>
                </div>

                <div>
                  <Label htmlFor="alternateNumber">
                    Alternate Phone Number
                  </Label>
                  <Input
                    {...register("alternateNumber")}
                    id="alternateNumber"
                    placeholder="Enter alternate phone number"
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={12}
                    onInput={(e) =>
                      ((e.target as HTMLInputElement).value = (
                        e.target as HTMLInputElement
                      ).value.replace(/\D/g, ""))
                    }
                  />
                </div>

                <Button type="submit" className="w-full mt-4">
                  Continue
                </Button>
              </div>
            </form>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CheckoutAddressCard;
