import { SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { InputOTP } from "@/components/ui/inputOtp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { InputOTPGroup, InputOTPSlot } from "../ui/inputOtp";
import { useState } from "react";

const UserRegSheet = () => {
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  return (
    <SheetContent
      side="bottom"
      className="h-[80%] w-full md:w-[60%] lg:w-[40%] mx-auto p-6"
    >
      <SheetHeader>
        <SheetTitle>
          {step === 1 && "Enter Your Phone Number"}
          {step === 2 && "Enter OTP"}
          {step === 3 && "Enter Your Name"}
        </SheetTitle>
      </SheetHeader>

      <div className="mt-6">
        {step === 1 && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center border border-gray-300 rounded-lg p-2">
              <span className="pr-2">+91</span>
              <Input
                type="tel"
                placeholder="Enter phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="flex-1 border-none focus:ring-0"
              />
            </div>
            <Button className="w-full" onClick={() => setStep(2)}>
              Continue
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-center">
              <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} className="border-black" />
                </InputOTPGroup>
                <InputOTPGroup>
                  <InputOTPSlot index={1} className="border-black" />
                </InputOTPGroup>
                <InputOTPGroup>
                  <InputOTPSlot index={2} className="border-black" />
                </InputOTPGroup>
                <InputOTPGroup>
                  <InputOTPSlot index={3} className="border-black" />
                </InputOTPGroup>
                <InputOTPGroup>
                  <InputOTPSlot index={4} className="border-black" />
                </InputOTPGroup>
                <InputOTPGroup>
                  <InputOTPSlot index={5} className="border-black" />
                </InputOTPGroup>
              </InputOTP>
            </div>
            <Button className="w-full" onClick={() => setStep(3)}>
              Verify OTP
            </Button>
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col gap-4">
            <Input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Button className="w-full">Submit</Button>
          </div>
        )}
      </div>
    </SheetContent>
  );
};

export default UserRegSheet;
