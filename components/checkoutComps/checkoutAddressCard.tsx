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
import { INFO } from "@/constants";
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

interface CheckoutAddressCardProps {
  address?: IAddress;
  onAddressSubmit: (address: IAddress | string) => Promise<void>;
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

  const { register, handleSubmit, watch } = useForm({
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
      await onAddressSubmit(newAddress);

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
      <SheetTrigger className="w-full max-w-md bg-gray-100 p-4 rounded-xl shadow-md cursor-pointer transition-colors hover:bg-gray-200">
        <div>
          <p className="text-gray-500 text-sm text-left">Shipping Address</p>
          <div className="flex justify-between items-center">
            {address ? (
              <div className="text-left">
                <p className="text-lg font-medium">{address?.name}</p>
                <p className="text-sm text-gray-600">{`${address.address}, ${address.city}, ${address.landmark}, ${address.pincode}`}</p>
                <p className="text-sm text-gray-600">
                  {address?.phone}{" "}
                  {address.altPhone ? " - " + address.altPhone : null}
                </p>
              </div>
            ) : (
              <p className="text-gray-500">Add Shipping Address</p>
            )}
            <span>
              <FaChevronRight />
            </span>
          </div>
          <div className="text-sm text-red-500 mt-2 text-left">
            {error &&
              (error === "NO_ZONES" ? (
                <p className="">
                  <span className="text-red-500 font-semibold">
                    Delivery not available in your area. Please Contact us for
                    more details.
                  </span>{" "}
                  <span className="text-green-500 font-semibold">
                    <a
                      href={INFO.waLink(
                        `Hi, I am trying to book a service for the pin code ${watch(
                          "pincode"
                        )} Could you please assist me?`
                      )}
                    >
                      {INFO.phoneLabel}
                    </a>
                  </span>
                </p>
              ) : (
                <p className="">
                  <span className="text-red-500 font-semibold">
                    Something went wrong!. Please Contact us for more details.
                  </span>{" "}
                  <span className="text-green-500 font-semibold">
                    <a
                      href={INFO.waLink(
                        "Hi, I am unable to place an order. Please help me."
                      )}
                    >
                      {INFO.phoneLabel}
                    </a>
                  </span>
                </p>
              ))}
          </div>
        </div>
      </SheetTrigger>
      <SheetContent className="w-screen flex flex-col h-full">
        <SheetHeader className="flex-shrink-0">
          <SheetTitle>
            {showAddNewForm ? "Add New Address" : "Select Address"}
          </SheetTitle>
          <SheetDescription>
            {showAddNewForm
              ? "This address will be used to pickup your device."
              : "Choose from your existing addresses or add a new one."}
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
