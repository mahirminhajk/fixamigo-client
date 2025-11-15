"use client";

import Navbar from "@/components/core/navbar";
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
import {
  CheckCircle2,
  Clock3,
  Coins,
  Compass,
  Gift,
  Key,
  Loader2,
  Phone,
  ShieldCheck,
  Sparkles,
  Truck,
  Wrench,
} from "lucide-react";
import dynamic from "next/dynamic";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

// Client-only testimonials (uses simple client component)
const TestimonialsSection = dynamic(() => import("@/components/others/Testimonials"), { ssr: false });

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
      console.error("Failed to resend OTP", error);
    }
  };

  // Loading state
  if (campaignLoading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-white">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-orange-600" />
            <p className="mt-4 text-gray-600">Loading campaign...</p>
          </div>
        </div>
      </>
    );
  }

  // Error state
  if (campaignError || !campaign) return null;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 py-8 px-4">
          <div className="mx-auto max-w-6xl">
              {/* Top header */}
              <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
            <Gift className="w-8 h-8 text-orange-600" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            {campaign.name}
          </h1>
          {campaign.description && (
                      <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
              {campaign.description}
            </p>
          )}
                  <div className="mt-3 inline-flex items-center gap-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-semibold">
            <Sparkles className="w-4 h-4" />
            Get {campaign.rewardCoins} coins on signup!
          </div>
              </div>

              {/* Content layout */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                  {/* Left: What we do + How it works */}
                  <div className="space-y-6 order-2 lg:order-1">
                      {/* What we do */}
                      <div className="bg-white border border-gray-200 rounded-xl p-5 md:p-6 shadow-sm">
                          <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-4">What we do at Fixamigo</h2>
                          <ul className="space-y-3">
                              <li className="flex items-start gap-3">
                                  <ShieldCheck className="w-5 h-5 text-green-600 mt-0.5" />
                                  <div>
                                      <p className="font-medium text-gray-900">Trusted Repairs</p>
                                      <p className="text-sm text-gray-600">Genuine parts and skilled technicians with warranty support.</p>
                                  </div>
                              </li>
                              <li className="flex items-start gap-3">
                                  <Wrench className="w-5 h-5 text-orange-600 mt-0.5" />
                                  <div>
                                      <p className="font-medium text-gray-900">Multi-brand Service</p>
                                      <p className="text-sm text-gray-600">Phones and laptops — diagnostics to complete repair.</p>
                                  </div>
                              </li>
                              <li className="flex items-start gap-3">
                                  <Truck className="w-5 h-5 text-blue-600 mt-0.5" />
                                  <div>
                                      <p className="font-medium text-gray-900">Doorstep Convenience</p>
                                      <p className="text-sm text-gray-600">Pickup and delivery options across Kerala.</p>
                                  </div>
                              </li>
                              <li className="flex items-start gap-3">
                                  <Clock3 className="w-5 h-5 text-gray-700 mt-0.5" />
                                  <div>
                                      <p className="font-medium text-gray-900">Fast Turnaround</p>
                                      <p className="text-sm text-gray-600">Quick diagnosis and reliable, timely repairs.</p>
                                  </div>
                              </li>
                          </ul>
                      </div>

                      {/* How it works */}
                      <div className="bg-white border border-gray-200 rounded-xl p-5 md:p-6 shadow-sm">
                          <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-4">How this campaign works</h2>
                          <ol className="space-y-3">
                              <li className="flex items-start gap-3">
                                  <div className="w-6 h-6 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center font-bold text-xs mt-0.5">1</div>
                                  <div className="flex items-start gap-2">
                                      <Phone className="w-5 h-5 text-orange-600 mt-0.5" />
                                      <div>
                                          <p className="font-medium text-gray-900">Enter phone and name</p>
                                          <p className="text-sm text-gray-600">Use your WhatsApp number to receive OTP.</p>
                                      </div>
                                  </div>
                              </li>
                              <li className="flex items-start gap-3">
                                  <div className="w-6 h-6 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center font-bold text-xs mt-0.5">2</div>
                                  <div className="flex items-start gap-2">
                                      <Key className="w-5 h-5 text-orange-600 mt-0.5" />
                                      <div>
                                          <p className="font-medium text-gray-900">Verify OTP</p>
                                          <p className="text-sm text-gray-600">Enter the 6-digit code we send to WhatsApp.</p>
                                      </div>
                                  </div>
                              </li>
                              <li className="flex items-start gap-3">
                                  <div className="w-6 h-6 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center font-bold text-xs mt-0.5">3</div>
                                  <div className="flex items-start gap-2">
                                      <Coins className="w-5 h-5 text-orange-600 mt-0.5" />
                                      <div>
                                          <p className="font-medium text-gray-900">Instant reward for new users</p>
                                          <p className="text-sm text-gray-600">If this is your first account, coins are auto-credited.</p>
                                      </div>
                                  </div>
                              </li>
                              <li className="flex items-start gap-3">
                                  <div className="w-6 h-6 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center font-bold text-xs mt-0.5">4</div>
                                  <div className="flex items-start gap-2">
                                      <Compass className="w-5 h-5 text-orange-600 mt-0.5" />
                                      <div>
                                          <p className="font-medium text-gray-900">Book a service anytime</p>
                                          <p className="text-sm text-gray-600">Use your coins on eligible services in your wallet.</p>
                                      </div>
                                  </div>
                              </li>
                          </ol>
                      </div>
                  </div>

                  {/* Right: Auth Card */}
                  <div className="order-1 lg:order-2">
                      {/* Step indicator */}
                      <div className="mb-4">
                          <div className="flex items-center justify-center gap-3 text-sm font-medium">
                              <div className={`px-3 py-1 rounded-full ${step >= 1 ? "bg-orange-600 text-white" : "bg-gray-200 text-gray-700"}`}>1. Account</div>
                              <span className="text-gray-400">→</span>
                              <div className={`px-3 py-1 rounded-full ${step >= 2 ? "bg-orange-600 text-white" : "bg-gray-200 text-gray-700"}`}>2. Verify</div>
                              <span className="text-gray-400">→</span>
                              <div className={`px-3 py-1 rounded-full ${step >= 3 ? "bg-orange-600 text-white" : "bg-gray-200 text-gray-700"}`}>3. Reward</div>
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
                      We&apos;ve sent an OTP to your WhatsApp
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
                        {cooldown > 0 ? `Resend in ${cooldown}s` : "Didn&apos;t receive?"}
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
                          You&apos;ve successfully claimed your reward
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

              {/* Testimonials */}
              <TestimonialsSection />
      </div>
    </div>
    </>
  );
}
