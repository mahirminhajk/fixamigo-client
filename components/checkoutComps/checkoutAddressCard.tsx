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

interface AddressFormData {
  name: string;
  phone: string;
  pincode: string;
  street: string;
  city: string;
  landMark: string;
  alternateNumber: string;
}

interface FormattedAddress {
  name: string;
  details: string;
  phone: string;
}

const CheckoutAddressCard = () => {
  const [address, setAddress] = useState<FormattedAddress | null>(null);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      phone: "",
      pincode: "",
      street: "",
      city: "",
      landMark: "",
      alternateNumber: "",
    },
  });

  const onSubmit = (data: AddressFormData): void => {
    setAddress({
      name: data.name,
      details: `${data.street}, ${data.city}, ${data.landMark}, ${data.pincode}`,
      phone: `${data.phone}, ${data.alternateNumber}`,
    });
  };

  return (
    <Sheet>
      <SheetTrigger className="w-full max-w-md bg-gray-100 p-4 rounded-xl shadow-md cursor-pointer">
        <div>
          <p className="text-gray-500 text-sm text-left">Shipping Address</p>
          <div className="flex justify-between items-center">
            {address ? (
              <div className="text-left">
                <p className="text-lg font-medium">{address?.name}</p>
                <p className="text-sm text-gray-600">{address?.details}</p>
                <p className="text-sm text-gray-600">{address?.phone}</p>
              </div>
            ) : (
              <p className="text-gray-500">Add Shipping Address</p>
            )}
            <span>
              <FaChevronRight />
            </span>
          </div>
        </div>
      </SheetTrigger>
      <SheetContent>
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
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input
              {...register("phone")}
              id="phone"
              placeholder="Enter Phone number"
              type="tel"
            />
          </div>

          <div>
            <Label htmlFor="pincode">PIN Code</Label>
            <Input
              {...register("pincode")}
              id="pincode"
              placeholder="Enter PIN code"
              type="number"
            />
          </div>

          <div>
            <Label htmlFor="street">Street Address</Label>
            <Input
              {...register("street")}
              id="street"
              placeholder="Enter street address"
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
            <Label htmlFor="alternateNumber">Alternate Phone Number</Label>
            <Input
              {...register("alternateNumber")}
              id="alternateNumber"
              placeholder="Enter alternate phone number"
              type="tel"
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
