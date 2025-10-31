"use client";

import Footer from "@/components/core/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getCampaignByCode, redeemCampaign } from "@/lib/campaignApi";
import { useWalletStore } from "@/stores/walletStore";
import { ICampaign, ICampaignRedemption } from "@/types/campaign";
import { Calendar, CheckCircle2, Coins, Gift, Loader2, Tag, XCircle } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CampaignRedeemPage() {
  const params = useParams();
  const router = useRouter();
  const code = params.code as string;
  const { fetchBalance } = useWalletStore();

  const [campaign, setCampaign] = useState<ICampaign | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRedeeming, setIsRedeeming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [redemption, setRedemption] = useState<ICampaignRedemption | null>(null);
  const [autoRedeemed, setAutoRedeemed] = useState(false);

  useEffect(() => {
    if (code) {
      loadCampaign();
    }
  }, [code]);

  const loadCampaign = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const campaignData = await getCampaignByCode(code.toUpperCase());
      setCampaign(campaignData);
      
      // Auto-redeem for QR code campaigns
      if (campaignData.type === "QR" && campaignData.isActive && !autoRedeemed) {
        await handleRedeem(campaignData);
        setAutoRedeemed(true);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Campaign not found or invalid");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRedeem = async (campaignToRedeem?: ICampaign) => {
    const targetCampaign = campaignToRedeem || campaign;
    if (!targetCampaign) return;

    setIsRedeeming(true);
    setError(null);

    try {
      const result = await redeemCampaign({ code: targetCampaign.refCode });
      setRedemption(result);
      
      // Refresh wallet balance
      await fetchBalance();
    } catch (err: any) {
      setError(
        err.response?.data?.message || 
        err.response?.data?.errors?.join(", ") || 
        "Failed to redeem campaign"
      );
    } finally {
      setIsRedeeming(false);
    }
  };

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading campaign...</p>
        </div>
      </div>
    );
  }

  if (error && !campaign) {
    return (
      <>
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 py-12 px-4">
          <div className="container mx-auto max-w-2xl">
            <Card className="p-8 text-center">
              <div className="bg-red-100 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <XCircle className="h-12 w-12 text-red-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Campaign Not Found
              </h1>
              <p className="text-gray-600 mb-6">{error}</p>
              <Button onClick={() => router.push("/")} className="bg-blue-600 hover:bg-blue-700">
                Go to Home
              </Button>
            </Card>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // Success state - Campaign redeemed
  if (redemption) {
    return (
      <>
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 py-12 px-4">
          <div className="container mx-auto max-w-2xl">
            <Card className="p-8 text-center">
              <div className="bg-green-100 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center animate-bounce">
                <CheckCircle2 className="h-12 w-12 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                🎉 Campaign Redeemed!
              </h1>
              <p className="text-gray-600 mb-6">
                Congratulations! You've successfully redeemed this campaign.
              </p>

              {/* Reward Display */}
              <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-6 rounded-xl border-2 border-green-300 mb-6">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <Coins className="h-8 w-8 text-green-600" />
                  <p className="text-4xl font-bold text-green-600">
                    +{redemption.coinsGranted || campaign?.rewardCoins || 0}
                  </p>
                </div>
                <p className="text-sm text-green-700">Coins added to your wallet</p>
              </div>

              {/* Campaign Details */}
              <div className="bg-gray-50 p-4 rounded-lg mb-6 text-left">
                <h3 className="font-semibold text-gray-900 mb-3">Campaign Details:</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Tag className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-600">Code:</span>
                    <span className="font-mono font-semibold">{campaign?.refCode}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Gift className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-600">Reward:</span>
                    <span className="font-semibold">{campaign?.rewardCoins} coins</span>
                  </div>
                  {redemption.redeemedAt && (
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-600">Redeemed:</span>
                      <span className="font-semibold">{formatDate(redemption.redeemedAt)}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={() => router.push("/wallet")}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  View Wallet
                </Button>
                <Button
                  onClick={() => router.push("/")}
                  variant="outline"
                  className="flex-1"
                >
                  Go to Home
                </Button>
              </div>
            </Card>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // Campaign loaded - Show details and redeem button
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
        <div className="container mx-auto max-w-2xl">
          <Card className="p-8">
            {/* Campaign Header */}
            <div className="text-center mb-8">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <Gift className="h-10 w-10 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {campaign?.name || "Special Campaign"}
              </h1>
              {campaign?.description && (
                <p className="text-gray-600">{campaign.description}</p>
              )}
            </div>

            {/* Campaign Type Badge */}
            <div className="flex justify-center mb-6">
              <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                campaign?.type === "QR" 
                  ? "bg-blue-100 text-blue-700" 
                  : "bg-purple-100 text-purple-700"
              }`}>
                {campaign?.type === "QR" ? "QR Code Campaign" : "Referral Campaign"}
              </span>
            </div>

            {/* Reward Info */}
            <div className="bg-gradient-to-r from-yellow-50 to-amber-50 p-6 rounded-xl border-2 border-yellow-300 mb-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">You'll receive</p>
                <div className="flex items-center justify-center gap-2">
                  <Coins className="h-8 w-8 text-yellow-600" />
                  <p className="text-4xl font-bold text-yellow-600">
                    {campaign?.rewardCoins}
                  </p>
                  <p className="text-lg text-gray-700">coins</p>
                </div>
              </div>
            </div>

            {/* Campaign Details */}
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Details:</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Campaign Code:</span>
                  <span className="font-mono font-semibold">{campaign?.refCode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className={`font-semibold ${
                    campaign?.isActive ? "text-green-600" : "text-red-600"
                  }`}>
                    {campaign?.isActive ? "Active" : "Inactive"}
                  </span>
                </div>
                {campaign?.startDate && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Valid From:</span>
                    <span className="font-semibold">{formatDate(campaign.startDate)}</span>
                  </div>
                )}
                {campaign?.endDate && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Valid Until:</span>
                    <span className="font-semibold">{formatDate(campaign.endDate)}</span>
                  </div>
                )}
                {campaign?.maxRedemptions && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Max Redemptions:</span>
                    <span className="font-semibold">{campaign.maxRedemptions}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Terms & Conditions */}
            {campaign?.meta?.termsAndConditions && (
              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <h3 className="font-semibold text-gray-900 mb-2 text-sm">
                  Terms & Conditions:
                </h3>
                <p className="text-xs text-gray-600 whitespace-pre-wrap">
                  {campaign.meta.termsAndConditions}
                </p>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                <div className="flex items-start gap-2">
                  <XCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            )}

            {/* Redeem Button - Only for REFERRAL type (QR auto-redeems) */}
            {campaign?.type === "REFERRAL" && campaign?.isActive && (
              <Button
                onClick={() => handleRedeem()}
                disabled={isRedeeming}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-6 text-lg font-semibold"
              >
                {isRedeeming ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin mr-2" />
                    Redeeming...
                  </>
                ) : (
                  <>
                    <Gift className="h-5 w-5 mr-2" />
                    Redeem Campaign
                  </>
                )}
              </Button>
            )}

            {/* Back Button */}
            <Button
              onClick={() => router.push("/")}
              variant="outline"
              className="w-full mt-3"
            >
              Back to Home
            </Button>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  );
}
