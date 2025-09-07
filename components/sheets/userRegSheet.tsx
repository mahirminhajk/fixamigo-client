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
import { useEffect, useState } from "react";
import api from "@/lib/axiosInstance";
import { AxiosError } from "axios";
import { useUserStore } from "@/stores/userStore";
import { FaWhatsapp } from "react-icons/fa";
import { useAuthSheetStore } from "@/stores/authSheetStore";

interface UserRegSheetProps {
  onCompleted: () => void;
}

const UserRegSheet = ({ onCompleted }: UserRegSheetProps) => {
  //* user-store
  const setUser = useUserStore((state) => state.setUser);
  const closeSheet = useAuthSheetStore((s) => s.closeSheet);

  const [step, setStep] = useState(1);

  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");

  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");

  const [loading, setLoading] = useState(false);

  // Resend OTP control
  const [resendTries, setResendTries] = useState(0);
  const [cooldown, setCooldown] = useState(0); // seconds
  const [resendError, setResendError] = useState("");
  const maxResends = 3;

  // Cooldown countdown
  useEffect(() => {
    if (cooldown <= 0) return;
    const id = setInterval(() => setCooldown((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, [cooldown]);

  const resetRegistration = () => {
    setStep(1);
    setPhone("");
    setPhoneError("");
    setOtp("");
    setOtpError("");
    setName("");
    setNameError("");
    setLoading(false);
    setResendTries(0);
    setCooldown(0);
    setResendError("");
  };

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
      if (user.name == null) {
        setStep(3);
      } else {
        setUser({
          _id: user._id,
          name: user.name,
          phoneNo: user.phone,
        });
        onCompleted();
        closeSheet();
        // Reset internal state so next open starts from phone step
        resetRegistration();
      }
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

  // Handle resend OTP
  const handleResendOtp = async () => {
    setResendError("");
    if (cooldown > 0) return;
    if (resendTries >= maxResends) {
      // Safety: already exceeded
      resetRegistration();
      return;
    }
    try {
      await api.post("/auth/resend-otp");
      const nextTries = resendTries + 1;
      setResendTries(nextTries);
      setCooldown(60);
      if (nextTries >= maxResends) {
        // After max tries reached, reset flow
        setTimeout(() => resetRegistration(), 800);
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        setResendError(error.response?.data?.message || "Failed to resend OTP");
      } else {
        setResendError("Failed to resend OTP. Please try again.");
      }
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
      const res = await api.patch("/user/name", { name });
      const user = res.data?.data?.user;
      setUser({
        _id: user._id,
        name: user.name,
        phoneNo: user.phone,
      });
      onCompleted();
      closeSheet();
      // Reset internal state so next open starts from phone step
      resetRegistration();
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
          {step === 1 &&
            "We will send you an OTP to whatsapp to verify your phone number"}
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
            {/* WhatsApp notice */}
            <div className="rounded-lg border border-green-200 bg-green-50 text-green-800 px-4 py-3">
              <div className="flex items-start gap-2">
                <FaWhatsapp className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">
                    OTP sent to your WhatsApp
                  </p>
                  <p className="text-xs opacity-90">+91 {phone}</p>
                </div>
              </div>
            </div>
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
            {/* Resend controls */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
              <div className="text-xs text-gray-600">
                Resends left: {Math.max(0, maxResends - resendTries)}{" "}
                {cooldown > 0 && `• Wait ${cooldown}s`}
              </div>
              <Button
                type="button"
                variant="outline"
                className="w-full sm:w-auto"
                onClick={handleResendOtp}
                disabled={cooldown > 0 || resendTries >= maxResends || loading}
              >
                {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend OTP"}
              </Button>
            </div>
            {resendError && (
              <div className="text-red-500 text-sm">{resendError}</div>
            )}
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
