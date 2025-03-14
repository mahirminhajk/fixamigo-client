import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { InputOTP } from "@/components/ui/inputOtp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { InputOTPGroup, InputOTPSlot } from "../ui/inputOtp";
import { useState } from "react";
import api from "@/lib/axiosInstance";
import { AxiosError } from "axios";
import { useUserStore } from "@/stores/userStore";

interface UserRegSheetProps {
  onCompleted: () => void;
}

const UserRegSheet = ({ onCompleted }: UserRegSheetProps) => {
  //* user-store
  const setUser = useUserStore((state) => state.setUser);

  const [step, setStep] = useState(1);

  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");

  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");

  const [loading, setLoading] = useState(false);

  // Handle phone submission
  const handlePhoneSubmit = async () => {
    setPhoneError("");
    setLoading(true);
    try {
      //* check if phone number is valid
      if (!/^\d{10}$/.test(phone)) {
        setPhoneError("Invalid phone number");
        return;
      }
      await api.post("/auth/register", { phone: `91${phone}` });
      setStep(2);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        setPhoneError(error.response?.data?.message || "Something went wrong");
      } else {
        setPhoneError("Something went wrong, please try again");
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle OTP verification
  const handleOtpSubmit = async () => {
    setOtpError("");
    setLoading(true);
    try {
      //* check if otp is valid
      if (!/^\d{6}$/.test(otp)) {
        setOtpError("Invalid OTP");
        return;
      }
      const res = await api.post("/auth/verify", { otp });
      // setStep(3);
      const user = res.data?.data?.user;
      // if (user.name == null) {
      //   setStep(3);
      // }
      setUser({
        _id: user._id,
        name: user.name || "no-name",
        phoneNo: user.phone,
      });
      onCompleted();
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        setOtpError(error.response?.data?.message || "Something went wrong");
      } else {
        setOtpError("Something went wrong, please try again");
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle name submission
  const handleNameSubmit = async () => {
    setNameError("");
    setLoading(true);
    try {
      //* validate name
      if (name.trim().length === 0) {
        setNameError("Name is required");
        return;
      }
      await api.patch("/user/name", { name });
      onCompleted();
    } catch (error) {
      if (error instanceof AxiosError) {
        setNameError(error.response?.data?.message || "Something went wrong");
      } else {
        setNameError("Something went wrong, please try again");
      }
    } finally {
      setLoading(false);
    }
  };

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
        <SheetDescription>
          {step === 1 && "We will send you an OTP to verify your phone number"}
          {step === 2 && "Enter the OTP sent to your whatsapp number"}
          {step === 3 && "Enter your name to complete registration"}
        </SheetDescription>
      </SheetHeader>

      <div className="mt-6">
        {/* Phone Number Step */}
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
            {phoneError && <div className="text-red-500">{phoneError}</div>}
            <Button
              className="w-full"
              onClick={handlePhoneSubmit}
              disabled={loading}
            >
              {loading ? "Sending..." : "Continue"}
            </Button>
          </div>
        )}

        {/* OTP Step */}
        {step === 2 && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-center">
              <InputOTP
                maxLength={6}
                pattern={REGEXP_ONLY_DIGITS}
                value={otp}
                onChange={setOtp}
              >
                {Array.from({ length: 6 }, (_, index) => (
                  <InputOTPGroup key={index}>
                    <InputOTPSlot index={index} className="border-black" />
                  </InputOTPGroup>
                ))}
              </InputOTP>
            </div>
            {otpError && <div className="text-red-500">{otpError}</div>}
            <Button
              className="w-full"
              onClick={handleOtpSubmit}
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </Button>
          </div>
        )}

        {/* Name Step */}
        {step === 3 && (
          <div className="flex flex-col gap-4">
            <Input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {nameError && <div className="text-red-500">{nameError}</div>}
            <Button className="w-full" onClick={handleNameSubmit}>
              Submit
            </Button>
          </div>
        )}
      </div>
    </SheetContent>
  );
};

export default UserRegSheet;
