"use client";
import { FaChevronRight } from "react-icons/fa";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/stores/userStore";
import { IAddress } from "@/types/address";
import { CONTACT_INFO } from "@/constants";

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
}

const CheckoutAddressCard = ({
  address,
  onAddressSubmit,
  loading,
  error,
}: CheckoutAddressCardProps) => {
  const [open, setOpen] = useState(false);
  const toggleSheet = () => setOpen(!open);

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

  const onSubmit = async (data: AddressFormData): Promise<void> => {
    const address: IAddress = {
      name: data.name,
      phone: data.phone,
      altPhone: data.alternateNumber,
      address: data.street,
      city: data.city,
      landmark: data.landMark,
      state: "Kerala",
      pincode: data.pincode,
    };
    await onAddressSubmit(address);
    toggleSheet();
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
                      href={`https://wa.me/${
                        CONTACT_INFO.waPhone
                      }?text=Hi%2C%20I%20am%20trying%20to%20book%20a%20service%20for%20the%20pin%20code%20${watch(
                        "pincode"
                      )}%20Could%20you%20please%20assist%20me%3F`}
                    >
                      {CONTACT_INFO.phoneLabel}
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
                      href={`https://wa.me/${CONTACT_INFO.waPhone}?text=Hi%2C%20I%20am%20unable%20to%20place%20an%20order%2E%20Please%20help%20me%2E`}
                    >
                      {CONTACT_INFO.phoneLabel}
                    </a>
                  </span>
                </p>
              ))}
          </div>
        </div>
      </SheetTrigger>
      <SheetContent className="w-screen">
        <SheetHeader>
          <SheetTitle>Add Address</SheetTitle>
          <SheetDescription>
            This address will be used to pickup your device.
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
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
            <Input {...register("city")} id="city" placeholder="Enter city" />
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
            <Label htmlFor="alternateNumber">Alternate Phone Number</Label>
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
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default CheckoutAddressCard;
