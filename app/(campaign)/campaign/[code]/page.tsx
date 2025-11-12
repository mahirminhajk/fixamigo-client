"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/inputOtp";
import { Label } from "@/components/ui/label";
import api from "@/lib/axiosInstance";
import { useUserStore } from "@/stores/userStore";
import { useWalletStore } from "@/stores/walletStore";
import { ICampaign } from "@/types/campaign";
import { AxiosError } from "axios";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { CheckCircle2, Gift, Loader2, Sparkles } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

export default function CampaignSignupPage() {
  const params = useParams();
  const router = useRouter();
  const code = params.code as string;

  const setUser = useUserStore((state) => state.setUser);
  const fetchWalletBalance = useWalletStore((s) => s.fetchBalance);

  // Campaign state
  const [campaign, setCampaign] = useState<ICampaign | null>(null);
  const [campaignLoading, setCampaignLoading] = useState(true);
  const [campaignError, setCampaignError] = useState("");

  // Form steps: 1=phone+name, 2=otp, 3=success
  const [step, setStep] = useState(1);

  // Form data
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [otp, setOtp] = useState("");

  // Errors
  const [phoneError, setPhoneError] = useState("");
  const [nameError, setNameError] = useState("");
  const [otpError, setOtpError] = useState("");

  // Loading states
  const [loading, setLoading] = useState(false);

  // Success data
  const [rewardCoins, setRewardCoins] = useState(0);
  const [isNewUser, setIsNewUser] = useState(false);

  // Resend OTP control
  const [cooldown, setCooldown] = useState(0);

  // Fetch campaign details
  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        setCampaignLoading(true);
        const res = await api.get(`/campaigns/${code}`);
        setCampaign(res.data.data);
      } catch (error) {
        if (error instanceof AxiosError) {
          setCampaignError(error.response?.data?.message || "Campaign not found");
        } else {
          setCampaignError("Failed to load campaign");
        }
      } finally {
        setCampaignLoading(false);
      }
    };

    if (code) {
      fetchCampaign();
    }
  }, [code]);

  // If campaign not found or any error, redirect to home with toast
  useEffect(() => {
    if (!campaignLoading && (campaignError || !campaign)) {
      router.replace("/?toast=campaign-not-found");
    }
  }, [campaignLoading, campaignError, campaign, router]);

  // Cooldown countdown
  useEffect(() => {
    if (cooldown <= 0) return;
    const id = setInterval(() => setCooldown((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, [cooldown]);

  // Handle phone + name submission
  const handlePhoneNameSubmit = async () => {
    setPhoneError("");
    setNameError("");

    // Validation
    if (!/^\d{10}$/.test(phone)) {
      setPhoneError("Invalid phone number");
      return;
    }
    if (name.trim().length === 0) {
      setNameError("Name is required");
      return;
    }

    setLoading(true);
    try {
      await api.post("/auth/register", { phone: `91${phone}`, name });
      setStep(2);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const msg = error.response?.data?.message || "Something went wrong";
        if (msg.toLowerCase().includes("phone")) {
          setPhoneError(msg);
        } else {
          setPhoneError(msg);
        }
      } else {
        setPhoneError("Something went wrong, please try again");
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle OTP verification with campaign code
  const handleOtpSubmit = async () => {
    setOtpError("");

    // Validation
    if (!/^\d{6}$/.test(otp)) {
      setOtpError("Invalid OTP");
      return;
    }

    setLoading(true);
    try {
      // Pass campaignCode to backend for automatic redemption
      const res = await api.post("/auth/verify", { 
        otp,
        campaignCode: code 
      });

      const user = res.data?.data?.user;
      const campaignReward = res.data?.data?.campaignReward;

      // Set user in store
      setUser({
        _id: user._id,
        name: user.name,
        phoneNo: user.phone,
      });

      // Fetch wallet balance
      try {
        await fetchWalletBalance();
      } catch {}

      // Check if campaign reward was granted
      if (campaignReward && campaignReward.coinsGranted > 0) {
        setRewardCoins(campaignReward.coinsGranted);
        setIsNewUser(true);
        setStep(3); // Success step
      } else {
        // Existing user - redirect to home with message
        router.push("/?message=existing-user");
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        setOtpError(error.response?.data?.message || "Invalid OTP");
      } else {
        setOtpError("Something went wrong, please try again");
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle resend OTP
  const handleResendOtp = async () => {
    if (cooldown > 0) return;

    try {
      await api.post("/auth/resend-otp");
      setCooldown(60);
    } catch (error) {
      console.error("Failed to resend OTP");
    }
  };

  // Loading state
  if (campaignLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-white">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-orange-600" />
          <p className="mt-4 text-gray-600">Loading campaign...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (campaignError || !campaign) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Campaign Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
            <Gift className="w-8 h-8 text-orange-600" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            {campaign.name}
          </h1>
          {campaign.description && (
            <p className="text-gray-600 text-sm md:text-base">
              {campaign.description}
            </p>
          )}
          <div className="mt-4 inline-flex items-center gap-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-semibold">
            <Sparkles className="w-4 h-4" />
            Get {campaign.rewardCoins} coins on signup!
          </div>
        </div>

        {/* Step 1: Phone + Name */}
        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Sign Up to Claim Reward</CardTitle>
              <CardDescription>
                Enter your phone number and name to get started
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-orange-500">
                  <span className="px-3 py-2 bg-gray-50 text-gray-600 border-r">+91</span>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="flex-1 border-none focus-visible:ring-0"
                    maxLength={10}
                  />
                </div>
                {phoneError && <p className="text-red-500 text-sm">{phoneError}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border-gray-300"
                />
                {nameError && <p className="text-red-500 text-sm">{nameError}</p>}
              </div>

              <Button
                className="w-full bg-orange-600 hover:bg-orange-700"
                onClick={handlePhoneNameSubmit}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Sending OTP...
                  </>
                ) : (
                  "Continue"
                )}
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Step 2: OTP Verification */}
        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Enter OTP</CardTitle>
              <CardDescription>
                We've sent an OTP to your WhatsApp
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* WhatsApp notice */}
              <div className="rounded-lg border border-green-200 bg-green-50 text-green-800 px-4 py-3">
                <div className="flex items-start gap-2">
                  <FaWhatsapp className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">OTP sent to your WhatsApp</p>
                    <p className="text-xs opacity-90">+91 {phone}</p>
                  </div>
                </div>
              </div>

              {/* OTP Input */}
              <div className="flex items-center justify-center">
                <InputOTP
                  maxLength={6}
                  pattern={REGEXP_ONLY_DIGITS}
                  value={otp}
                  onChange={setOtp}
                >
                  {Array.from({ length: 6 }, (_, index) => (
                    <InputOTPGroup key={index}>
                      <InputOTPSlot index={index} className="border-gray-300" />
                    </InputOTPGroup>
                  ))}
                </InputOTP>
              </div>

              {/* Resend controls */}
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">
                  {cooldown > 0 ? `Resend in ${cooldown}s` : "Didn't receive?"}
                </span>
                <Button
                  type="button"
                  variant="link"
                  className="p-0 h-auto text-orange-600"
                  onClick={handleResendOtp}
                  disabled={cooldown > 0 || loading}
                >
                  Resend OTP
                </Button>
              </div>

              {otpError && <p className="text-red-500 text-sm">{otpError}</p>}

              <Button
                className="w-full bg-orange-600 hover:bg-orange-700"
                onClick={handleOtpSubmit}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Verify & Claim Reward"
                )}
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Success */}
        {step === 3 && isNewUser && (
          <Card className="border-green-200 bg-green-50">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full">
                  <CheckCircle2 className="w-12 h-12 text-green-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Welcome to Fixamigo! 🎉
                  </h2>
                  <p className="text-gray-700 mb-4">
                    You've successfully claimed your reward
                  </p>
                  <div className="bg-white border border-green-300 rounded-lg p-4 mb-4">
                    <div className="flex items-center justify-center gap-2">
                      <Sparkles className="w-6 h-6 text-orange-600" />
                      <span className="text-3xl font-bold text-orange-600">
                        {rewardCoins} Coins
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      Added to your wallet
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Button
                    className="w-full bg-orange-600 hover:bg-orange-700"
                    onClick={() => router.push("/repair")}
                  >
                    Start Exploring Services
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => router.push("/wallet")}
                  >
                    View My Wallet
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
